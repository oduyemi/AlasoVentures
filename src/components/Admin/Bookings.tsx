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
  Spinner,
} from "@chakra-ui/react";

export type Booking = {
  id: string;
  customerName: string;
  email: string;
  style: string;
  date: string;
  status: "pending" | "confirmed" | "completed";
};

export const Bookings = ({
  bookings,
  loading,
}: {
  bookings: Booking[];
  loading: boolean;
}) => {
  if (loading) {
    return (
      <Flex justify="center" py={10}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Box className="bg-white border border-gray-200 rounded-2xl p-5">
      <Text className="font-semibold mb-4">Bookings</Text>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Customer</Th>
            <Th>Email</Th>
            <Th>Style</Th>
            <Th>Date</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookings.map((b) => (
            <Tr key={b.id}>
              <Td>{b.customerName}</Td>
              <Td>{b.email}</Td>
              <Td>{b.style}</Td>
              <Td>{new Date(b.date).toLocaleDateString()}</Td>
              <Td>
                <Badge
                  colorScheme={
                    b.status === "completed"
                      ? "green"
                      : b.status === "confirmed"
                      ? "blue"
                      : "yellow"
                  }
                >
                  {b.status}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}


