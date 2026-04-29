"use client";
import { useEffect, useState } from "react";
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import {
  PreOrdersTable,
  PreOrder,
} from "@/components/Admin/PreOrders";

export default function PreOrderPage() {
  const { user } = useAuth();
  const toast = useToast();
  const [orders, setOrders] = useState<PreOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/pre-orders");
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      const formatted = data.orders.map((o: any) => ({
        ...o,
        id: o._id,
      }));

      setOrders(formatted);
    } catch (err: any) {
      toast({
        title: "Error fetching orders",
        description: err.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);


  const handleUpdateStatus = async (
    id: string,
    status: PreOrder["status"]
  ) => {
    try {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );

      const res = await fetch(`/api/pre-orders/status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast({
        title: "Status updated",
        status: "success",
      });
    } catch (err: any) {
      toast({
        title: "Update failed",
        description: err.message,
        status: "error",
      });

      fetchOrders();
    }
  };

  return (
    <Box>
      {/* Header */}
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
            See who's booking early
          </Text>
        </Flex>
      </Box>

      {/* Table */}
      <Box px={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }} mt={2}>
        <PreOrdersTable
          orders={orders}
          loading={loading}
          onUpdateStatus={handleUpdateStatus}
        />
      </Box>
    </Box>
  );
}