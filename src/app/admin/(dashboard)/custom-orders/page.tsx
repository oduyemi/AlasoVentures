"use client";
import { useEffect, useState } from "react";
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import { CustomOrdersTable } from "@/components/Admin/CustomOrder";

type CustomOrder = any;

export default function CustomOrderPage() {
  const { user } = useAuth();
  const toast = useToast();
  const [orders, setOrders] = useState<CustomOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/custom-orders");
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      const mapped = (data.orders || []).map((o: any) => ({
        ...o,
        id: o._id, 
      }));

      setOrders(mapped);
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to fetch orders",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, status } : o
        )
      );

      await fetch(`/api/custom-orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      toast({
        title: "Order updated",
        status: "success",
      });
    } catch (err) {
      console.error(err);

      toast({
        title: "Update failed",
        status: "error",
      });

      fetchOrders(); 
    }
  };

  return (
    <Box>
      <Box
        px={{ base: 4, md: 6 }}
        py={{ base: 4, md: 5 }}
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
        bg="#111"
      >
        <Flex direction="column" gap={1}>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            {user?.fname || "Admin"}
          </Text>

          <Text fontSize="sm" color="gray.400">
            Manage your custom orders in one place.
          </Text>
        </Flex>
      </Box>

      {/* TABLE */}
      <Box px={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }} mt={2}>
        <CustomOrdersTable
          orders={orders}
          loading={loading}
          onUpdateStatus={handleUpdateStatus}
        />
      </Box>
    </Box>
  );
}