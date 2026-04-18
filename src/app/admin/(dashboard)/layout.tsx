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
import { Sidebar } from "@/components/Admin/Sidebar";
import { useAuth } from "@/app/context/auth.context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthChecked, logout } = useAuth();
  const router = useRouter();

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (!isAuthChecked) return;

    if (!user) {
      router.replace("/admin/login");
    }
  }, [isAuthChecked, user, router]);

  if (!isAuthChecked) {
    return (
      <Center minH="100vh" bg="#0D0D0D">
        <Spinner size="lg" thickness="4px" color="white" />
      </Center>
    );
  }

  if (!user || user.role !== "admin") return null;

  return (
    <Flex minH="100vh" bg="#0D0D0D" color="white">
      <Sidebar logoutAdmin={logout} />

      <Box flex="1" ml={{ base: 0, md: "260px" }} display="flex" flexDirection="column">
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
          <Flex align="center" gap={3}>
            {isMobile && <Box w="40px" />}
            <Text fontSize="lg" fontWeight="600">
              Admin Dashboard
            </Text>
          </Flex>

          <Flex align="center" gap={3}>
            <Text fontSize="sm" color="gray.400" display={{ base: "none", sm: "block" }}>
              {user?.email}
            </Text>
            <Avatar size="sm" name={user?.email} />
          </Flex>
        </Flex>

        <Box flex="1" px={{ base: 4, md: 6 }} py={{ base: 4, md: 5 }}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}