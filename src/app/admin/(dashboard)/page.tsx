"use client";
import { useEffect, useState } from "react";
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import { DashboardStats } from "@/components/Admin/Stats";
import { Order, OrdersTable } from "@/components/Admin/Bookings";
import { useAuth } from "@/app/context/auth.context";


export default function DashboardHome() {
  const { user } = useAuth();
  const toast = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/orders", {
        cache: "no-store",
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setOrders(data.orders);
    } catch (err: any) {
      toast({
        title: "Failed to fetch orders",
        description: err.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: Order["status"]
  ) => {
    const target = orders.find((o) => o.id === id);
    if (!target) return;

    try {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );

      const res = await fetch(`/api/orders/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          source: target.source, 
        }),
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
            Hello {user?.fname || "Admin"}
          </Text>

          <Text fontSize="sm" color="gray.400">
            Overview of your store performance and activities
          </Text>
        </Flex>
      </Box>

      {/* Stats */}
      <Box px={{ base: 4, md: 6 }} py={{ base: 4, md: 5 }}>
        <DashboardStats />
      </Box>

      {/* Orders */}
      <Box px={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }}>
        <OrdersTable
          orders={orders}
          loading={loading}
          onUpdateStatus={handleUpdateStatus}
        />
      </Box>
    </Box>
  );
}