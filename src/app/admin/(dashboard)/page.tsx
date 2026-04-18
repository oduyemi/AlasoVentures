"use client";
import { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { DashboardStats } from "@/components/Admin/Stats";
import { Order, OrdersTable } from "@/components/Admin/Bookings";
import { useAuth } from "@/app/context/auth.context";

export default function DashboardHome() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    products: 0,
    customOrders: 0,
    bookings: 0,
    flashSales: 0,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      const mockOrders: Order[] = [
        {
          id: "1",
          customerName: "Sarah Johnson",
          email: "sarah@example.com",
          title: "Ankara Gown",
          type: "pre order",
          date: new Date().toISOString(),
          status: "ordered",
        },
        {
          id: "2",
          customerName: "David Lee",
          email: "david@example.com",
          title: "Agbada",
          type: "flash sale",
          date: new Date().toISOString(),
          status: "processing",
        },
        {
          id: "3",
          customerName: "Segun Oni",
          email: "shegzyleee@gmail.com",
          title: "Atiku",
          type: "custom style",
          date: new Date().toISOString(),
          status: "ordered",
        },
      ];

      setOrders(mockOrders);

      setStats({
        products: 24,
        customOrders: 12,
        bookings: 8,
        flashSales: 3,
      });

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handleUpdateStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
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

      {/* Stats Section */}
      <Box px={{ base: 4, md: 6 }} py={{ base: 4, md: 5 }}>
        <DashboardStats stats={stats} loading={loading} />
      </Box>

      {/* Bookings Section */}
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