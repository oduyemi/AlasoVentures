"use client";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import AdminsContainer from "@/components/Admin/AdminContainer";

export default function Admins() {
  const { user } = useAuth();

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
            User management to organize your staff
          </Text>
        </Flex>
      </Box>

      {/* Content */}
      <Box px={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }} mt={2}>
        <AdminsContainer />
      </Box>
    </Box>
  );
}