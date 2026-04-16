"use client";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Flex,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

export type Booking = {
  id: string;
  customerName: string;
  email: string;
  style: string;
  date: string;
  status: "pending" | "confirmed" | "completed";
};

const statusColor = (status: Booking["status"]) => {
  switch (status) {
    case "completed":
      return "green";
    case "confirmed":
      return "blue";
    default:
      return "yellow";
  }
};

export const Bookings = ({
  bookings,
  loading,
}: {
  bookings: Booking[];
  loading: boolean;
}) => {
  return (
    <Box
      bg="#111"
      border="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="2xl"
      p={{ base: 4, md: 5 }}
    >
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontWeight="600" fontSize="lg">
          Recent Bookings
        </Text>
      </Flex>

      {/* Loading State */}
      {loading ? (
        <Stack spacing={3}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : bookings.length === 0 ? (
        /* Empty State */
        <Flex justify="center" py={10}>
          <Text color="gray.400">No bookings yet</Text>
        </Flex>
      ) : (
        /* Table */
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th color="gray.400">Customer</Th>
                <Th color="gray.400">Email</Th>
                <Th color="gray.400">Style</Th>
                <Th color="gray.400">Date</Th>
                <Th color="gray.400">Status</Th>
              </Tr>
            </Thead>

            <Tbody>
              {bookings.map((b) => (
                <Tr
                  key={b.id}
                  _hover={{ bg: "whiteAlpha.50" }}
                  transition="0.2s"
                >
                  <Td fontWeight="500">{b.customerName}</Td>

                  <Td color="gray.400" fontSize="sm">
                    {b.email}
                  </Td>

                  <Td>{b.style}</Td>

                  <Td color="gray.400" fontSize="sm">
                    {new Date(b.date).toLocaleDateString()}
                  </Td>

                  <Td>
                    <Badge
                      colorScheme={statusColor(b.status)}
                      borderRadius="full"
                      px={2}
                      py={1}
                      textTransform="capitalize"
                    >
                      {b.status}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};