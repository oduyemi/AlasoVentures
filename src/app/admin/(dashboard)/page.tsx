"use client";
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { DashboardStats } from "@/components/Admin/Stats";
import { Booking, Bookings } from "@/components/Admin/Bookings";

export default function DashboardHome() {
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
      <Box className="bg-white border-b border-gray-200 px-6 py-4">
        <Text className="text-lg font-bold">Dashboard</Text>
        <Text className="text-sm text-gray-500">
          Overview of your store performance and activities
        </Text>
      </Box>

      <DashboardStats stats={stats} loading={loading} />

      <Box className="p-6">
        <Bookings bookings={bookings} loading={loading} />
      </Box>
    </Box>
  );
}