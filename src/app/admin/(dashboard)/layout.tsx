"use client";
import { Box, Spinner, Center } from "@chakra-ui/react";
import { Sidebar } from "@/components/Admin/Sidebar";
import { useAdmin } from "@/app/context/admin.context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, loading, logoutAdmin } = useAdmin();
  if (loading) {
    return (
      <Center minH="100vh" bg="gray.100">
        <Spinner size="lg" thickness="4px" />
      </Center>
    );
  }

  if (!admin) return null;

  return (
    <Box display="flex" minH="100vh" bg="gray.100">
      {/* Sidebar */}
      <Sidebar logoutAdmin={logoutAdmin} />

      {/* Main Content */}
      <Box flex="1" px={6} py={5}>
        {children}
      </Box>
    </Box>
  );
}