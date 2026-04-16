"use client";
import { Box, Text, Flex, Spinner } from "@chakra-ui/react";

type Stats = {
  products: number;
  customOrders: number;
  bookings: number;
  flashSales: number;
};

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      p={5}
      transition="0.2s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "md" }}
    >
      <Text fontSize="sm" color="gray.500">
        {title}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" mt={2} color={color}>
        {value}
      </Text>
    </Box>
  );
}

export const DashboardStats = ({
  stats,
  loading,
}: {
  stats: Stats;
  loading: boolean;
}) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        base: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
      }}
      gap={4}
      w="100%"
    >
      {loading ? (
        <Flex justify="center" gridColumn="span 4">
          <Spinner />
        </Flex>
      ) : (
        <>
          <StatCard title="Products" value={stats.products} color="#2563eb" />
          <StatCard title="Custom Orders" value={stats.customOrders} color="#7c3aed" />
          <StatCard title="Bookings" value={stats.bookings} color="#16a34a" />
          <StatCard title="Flash Sales" value={stats.flashSales} color="#f59e0b" />
        </>
      )}
    </Box>
  );
};