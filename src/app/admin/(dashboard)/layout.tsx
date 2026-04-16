"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Center,
  Spinner,
  Flex,
  Text,
  Avatar,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { Sidebar } from "@/components/Admin/Sidebar";
import { useAuth } from "@/app/context/auth.context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (loading) return;

    if (!user || user.role !== "admin") {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <Center minH="100vh" bg="#0D0D0D">
        <Spinner size="lg" thickness="4px" color="white" />
      </Center>
    );
  }

  if (!user || user.role !== "admin") return null;

  return (
    <Flex minH="100vh" bg="#0D0D0D" color="white">
      {/* Sidebar */}
      <Sidebar logoutAdmin={logout} />

      {/* Main Area */}
      <Box
        flex="1"
        ml={{ base: 0, md: "260px" }}
        display="flex"
        flexDirection="column"
      >
        {/* Topbar */}
        <Flex
          px={{ base: 4, md: 6 }}
          h="64px"
          align="center"
          justify="space-between"
          borderBottom="1px solid"
          borderColor="whiteAlpha.200"
          bg="#111"
          position="sticky"
          top="0"
          zIndex="10"
        >
          {/* LEFT SIDE */}
          <Flex align="center" gap={3}>
            {/* Spacer for mobile menu button */}
            {isMobile && <Box w="40px" />} 

            <Text fontSize="lg" fontWeight="600">
              Admin Dashboard
            </Text>
          </Flex>

          {/* RIGHT SIDE */}
          <Flex align="center" gap={3}>
            <Text
              fontSize="sm"
              color="gray.400"
              display={{ base: "none", sm: "block" }}
              className="mt-3"
            >
              {user?.email}
            </Text>
            <Avatar size="sm" name={user?.email} />
          </Flex>
        </Flex>

        {/* Page Content */}
        <Box
          flex="1"
          px={{ base: 4, md: 6 }}
          py={{ base: 4, md: 5 }}
        >
          {children}
        </Box>
      </Box>
    </Flex>
  );
}