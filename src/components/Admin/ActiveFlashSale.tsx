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

export type FlashSaleProduct = {
  id: string;
  name: string;
  imageUrl: string;
  pricing?: {
    originalPrice: number;
    salePrice?: number;
  };
  inventory?: {
    quantity: number;
  };
  sales?: {
    expiryDate?: Date;
  };
};

export const FlashSalesTable = ({
  products,
  loading,
  onEdit,
  onEndSale,
  onDelete,
}: {
  products?: FlashSaleProduct[];
  loading: boolean;
  onEdit: (p: FlashSaleProduct) => void;
  onEndSale: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const safeProducts = products ?? [];

  return (
    <Box bg="#111" border="1px solid" borderColor="whiteAlpha.200" borderRadius="2xl" p={5}>
      
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontWeight="600" color="white" fontSize="lg">
          Active Flash Sales
        </Text>
      </Flex>

      {loading || !products ? (
        <Stack spacing={3}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : safeProducts.length === 0 ? (
        <Flex align="center" justify="center" py={12} direction="column">
          <Text color="gray.400">⚡ No active flash sales</Text>
          <Text fontSize="sm" color="gray.500">
            Create or activate a product as flash sale
          </Text>
        </Flex>
      ) : (
        <Box overflowX="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Ends</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
              {safeProducts.map((p) => {
                const isExpired =
                  p.sales?.expiryDate &&
                  new Date(p.sales.expiryDate) < new Date();

                return (
                  <Tr key={p.id} _hover={{ bg: "whiteAlpha.50" }}>
                    
                    <Td>
                      <HStack>
                        <Image src={p.imageUrl} boxSize="40px" borderRadius="md" />
                        <Text color="gray.400">{p.name}</Text>
                      </HStack>
                    </Td>

                    <Td>
                      ₦{p.pricing?.salePrice}{" "}
                      <Text as="span" fontSize="sm" color="gray.400">
                        (₦{p.pricing?.originalPrice})
                      </Text>
                    </Td>

                    <Td>{p.inventory?.quantity || "-"}</Td>

                    <Td fontSize="sm">
                      {p.sales?.expiryDate
                        ? new Date(p.sales.expiryDate).toLocaleDateString()
                        : "-"}
                    </Td>

                    <Td>
                      <Badge colorScheme={isExpired ? "red" : "yellow"}>
                        {isExpired ? "Expired" : "Active"}
                      </Badge>
                    </Td>

                    <Td>
                      <HStack>
                        <Button size="xs" onClick={() => onEdit(p)}>
                          Edit
                        </Button>

                        <Button
                          size="xs"
                          colorScheme="yellow"
                          onClick={() => onEndSale(p.id)}
                        >
                          End
                        </Button>

                        <Button
                          size="xs"
                          colorScheme="red"
                          onClick={() => onDelete(p.id)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};