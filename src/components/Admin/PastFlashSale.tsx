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
  Button,
  HStack,
  Image,
} from "@chakra-ui/react";
import { FlashSaleProduct } from "./ActiveFlashSale";

export const ExpiredFlashSales = ({
  products,
  loading,
  onRestart,
}: {
  products?: FlashSaleProduct[];
  loading: boolean;
  onRestart: (id: string) => void;
}) => {
  const safeProducts = products ?? [];

  return (
    <Box mt={6} bg="#111" border="1px solid" borderColor="whiteAlpha.200" borderRadius="2xl" p={5}>
      
      <Text fontWeight="600" color="white" fontSize="lg" mb={4}>
        Previous Flash Sales
      </Text>

      {loading || !products ? (
        <Stack spacing={3}>
          <Skeleton height="40px" />
        </Stack>
      ) : safeProducts.length === 0 ? (
        <Flex align="center" justify="center" py={10}>
          <Text color="gray.400">No previous flash sales</Text>
        </Flex>
      ) : (
        <Box overflowX="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Last Price</Th>
                <Th>Ended</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {safeProducts.map((p) => (
                <Tr key={p.id}>
                  
                  <Td>
                    <HStack>
                      <Image src={p.imageUrl} boxSize="40px" borderRadius="md" />
                      <Text color="gray.400">{p.name}</Text>
                    </HStack>
                  </Td>

                  <Td>₦{p.pricing?.salePrice}</Td>

                  <Td fontSize="sm">
                    {p.sales?.expiryDate
                      ? new Date(p.sales.expiryDate).toLocaleDateString()
                      : "-"}
                  </Td>

                  <Td>
                    <Button
                      size="xs"
                      colorScheme="yellow"
                      onClick={() => onRestart(p.id)}
                    >
                      Restart Sale
                    </Button>
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