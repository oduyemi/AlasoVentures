"use client";
import { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { DashboardStats } from "@/components/Admin/Stats";
import { Booking, Bookings } from "@/components/Admin/Bookings";
import { useAuth } from "@/app/context/auth.context";

export default function DashboardHome() {
  const { user } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    products: 0,
    customOrders: 0,
    bookings: 0,
    flashSales: 0,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      const mockBookings: Booking[] = [
        {
          id: "1",
          customerName: "Sarah Johnson",
          email: "sarah@example.com",
          style: "Ankara Gown",
          date: new Date().toISOString(),
          status: "confirmed",
        },
        {
          id: "2",
          customerName: "David Lee",
          email: "david@example.com",
          style: "Agbada",
          date: new Date().toISOString(),
          status: "pending",
        },
      ];

      setBookings(mockBookings);

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
        <Bookings bookings={bookings} loading={loading} />
      </Box>
    </Box>
  );
}