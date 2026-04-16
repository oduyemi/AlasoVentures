"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { Sidebar } from "@/components/Admin/Sidebar";
import { useAuth } from "@/app/context/auth.context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (loading) return;

    if (!user || user.role !== "admin") {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <Center minH="100vh" bg="gray.100">
        <Spinner size="lg" thickness="4px" />
      </Center>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <Box display="flex" minH="100vh" bg="#0D0D0D">
      <Sidebar 
        logoutAdmin={logout} 
      />

      <Box flex="1" display="flex" flexDirection="column" w="full">
        <Box
          px={6}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px solid"
        />

        <Box flex="1" px={6} py={5} w="full">
          {children}
        </Box>
      </Box>
    </Box>
  );
}