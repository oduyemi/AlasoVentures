"use client";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import { AdminsTable, AdminUser } from "@/components/Admin/Administrators";
import { useState } from "react";

export default function Admins() {
  const { user } = useAuth();

  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRemoveAdmin = (id: string) => {
    // TODO: call API
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  const handleCreateAdmin = (data: {
    fname: string;
    lname: string;
    email: string;
    password: string;
  }) => {
    // TODO: call API
    const newAdmin: AdminUser = {
      id: Date.now().toString(),
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      role: "admin",
      createdAt: new Date().toISOString(),
    };

    setAdmins((prev) => [newAdmin, ...prev]);
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

      <Box px={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }} mt={2}>
        <AdminsTable
          admins={admins}
          loading={loading}
          onRemoveAdmin={handleRemoveAdmin}
          onCreateAdmin={handleCreateAdmin}
        />
      </Box>
    </Box>
  );
}