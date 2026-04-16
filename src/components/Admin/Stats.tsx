"use client";
import {
  Box,
  Text,
  Flex,
  Spinner,
  Skeleton,
  VStack,
} from "@chakra-ui/react";

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
      bg="#111"
      border="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="2xl"
      p={5}
      transition="all 0.25s ease"
      _hover={{
        transform: "translateY(-4px)",
        borderColor: color,
        boxShadow: `0 0 0 1px ${color}`,
      }}
    >
      <Text fontSize="sm" color="gray.400" letterSpacing="wide">
        {title}
      </Text>

      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="bold"
        mt={2}
        color={color}
      >
        {value}
      </Text>
    </Box>
  );
}

function StatSkeleton() {
  return (
    <Box
      bg="#111"
      border="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="2xl"
      p={5}
    >
      <VStack align="start" spacing={3}>
        <Skeleton height="10px" width="80px" />
        <Skeleton height="20px" width="50px" />
      </VStack>
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
        sm: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
      }}
      gap={{ base: 3, md: 5 }}
      w="100%"
    >
      {loading ? (
        <>
          <StatSkeleton />
          <StatSkeleton />
          <StatSkeleton />
          <StatSkeleton />
        </>
      ) : (
        <>
          <StatCard
            title="Products"
            value={stats.products}
            color="#3b82f6"
          />
          <StatCard
            title="Custom Orders"
            value={stats.customOrders}
            color="#8b5cf6"
          />
          <StatCard
            title="Bookings"
            value={stats.bookings}
            color="#22c55e"
          />
          <StatCard
            title="Flash Sales"
            value={stats.flashSales}
            color="#f59e0b"
          />
        </>
      )}
    </Box>
  );
};