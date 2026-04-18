"use client";
import { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import {
  PreOrdersTable,
  PreOrder,
} from "@/components/Admin/PreOrders";

export default function PreOrderPage() {
  const { user } = useAuth();

  const [orders, setOrders] = useState<PreOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mock: PreOrder[] = [
      {
        id: "1",
        fullname: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "08012345678",
        style: "Ankara Gown",
        description: "Fitted gown with slit",
        images: ["https://via.placeholder.com/80"],
        status: "ordered",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        fullname: "David Lee",
        email: "david@example.com",
        phone: "08087654321",
        style: "Agbada",
        description: "Traditional agbada with embroidery",
        images: ["https://via.placeholder.com/80"],
        status: "processing",
        createdAt: new Date().toISOString(),
      },
    ];

    setTimeout(() => {
      setOrders(mock);
      setLoading(false);
    }, 1000);
  }, []);

  const handleUpdateStatus = (
    id: string,
    status: PreOrder["status"]
  ) => {
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
            {user?.fname || "Admin"}
          </Text>

          <Text fontSize="sm" color="gray.400">
            See who's booking early
          </Text>
        </Flex>
      </Box>

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