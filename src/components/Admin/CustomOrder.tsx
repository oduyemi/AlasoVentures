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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

export type CustomOrder = {
  id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;

  outfit: {
    category: "male" | "female" | "couple";
    style: string;
  };

  sizes: any[];

  fabricType?: string;
  fabricColor?: string;
  quantity?: number;

  description: string;
  additionalInfo?: string;
  measurementNotes?: string;

  images: string[];

  status:
    | "ordered"
    | "processing"
    | "ready"
    | "shipped"
    | "complete"
    | "cancelled";

  createdAt: string;
};

const statusColor = (status: CustomOrder["status"]) => {
  switch (status) {
    case "complete":
      return "green";
    case "shipped":
      return "cyan";
    case "ready":
      return "purple";
    case "processing":
      return "blue";
    case "cancelled":
      return "red";
    default:
      return "yellow";
  }
};

export const CustomOrdersTable = ({
  orders,
  loading,
  onUpdateStatus,
}: {
  orders?: CustomOrder[];
  loading: boolean;
  onUpdateStatus: (
    id: string,
    status: CustomOrder["status"]
  ) => void;
}) => {
  const safeOrders = orders ?? [];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<CustomOrder | null>(null);

  const openDetails = (order: CustomOrder) => {
    setSelected(order);
    onOpen();
  };

  return (
    <Box bg="#111" border="1px solid" borderColor="whiteAlpha.200" borderRadius="2xl" p={5}>
      <Flex justify="space-between" mb={4}>
        <Text fontSize="lg" fontWeight="600">
          Custom Orders
        </Text>
      </Flex>

      {loading || !orders ? (
        <Stack spacing={3}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : safeOrders.length === 0 ? (
        <Flex direction="column" align="center" py={16}>
          <Text fontSize="40px">👗</Text>
          <Text color="gray.300">No custom orders yet</Text>
        </Flex>
      ) : (
        <Box overflowX="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Customer</Th>
                <Th>Outfit</Th>
                <Th>Fabric</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
              {safeOrders.map((o) => (
                <Tr key={o.id} _hover={{ bg: "whiteAlpha.50" }}>
                  
                  {/* Customer */}
                  <Td>
                    <Text fontWeight="500">
                      {o.fname} {o.lname}
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      {o.email}
                    </Text>
                  </Td>

                  {/* Outfit */}
                  <Td>
                    <Badge mr={1}>{o.outfit.category}</Badge>
                    <Badge colorScheme="purple">
                      {o.outfit.style}
                    </Badge>
                  </Td>

                  {/* Fabric */}
                  <Td>
                    {o.fabricType || "-"}{" "}
                    <Text as="span" fontSize="sm" color="gray.400">
                      {o.fabricColor}
                    </Text>
                  </Td>

                  {/* Date */}
                  <Td fontSize="sm" color="gray.400">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </Td>

                  {/* Status */}
                  <Td>
                    <Badge colorScheme={statusColor(o.status)}>
                      {o.status}
                    </Badge>
                  </Td>

                  {/* Actions */}
                  <Td>
                    <HStack spacing={2} wrap="wrap">
                      
                      <Button size="xs" onClick={() => openDetails(o)}>
                        View
                      </Button>

                      <Button
                        size="xs"
                        colorScheme="blue"
                        onClick={() =>
                          onUpdateStatus(o.id, "processing")
                        }
                      >
                        Processing
                      </Button>

                      <Button
                        size="xs"
                        colorScheme="purple"
                        onClick={() =>
                          onUpdateStatus(o.id, "ready")
                        }
                      >
                        Ready
                      </Button>

                      <Button
                        size="xs"
                        colorScheme="cyan"
                        onClick={() =>
                          onUpdateStatus(o.id, "shipped")
                        }
                      >
                        Shipped
                      </Button>

                      <Button
                        size="xs"
                        colorScheme="yellow"
                        onClick={() =>
                          onUpdateStatus(o.id, "complete")
                        }
                      >
                        Complete
                      </Button>

                      <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() =>
                          onUpdateStatus(o.id, "cancelled")
                        }
                      >
                        Cancel
                      </Button>

                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* DETAILS MODAL */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="#1a1a1a">
          <ModalHeader>Custom Order Details</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {selected && (
              <Stack spacing={3}>
                
                <Text><b>Name:</b> {selected.fname} {selected.lname}</Text>
                <Text><b>Email:</b> {selected.email}</Text>
                <Text><b>Phone:</b> {selected.phone}</Text>

                <Text><b>Outfit:</b> {selected.outfit.category} - {selected.outfit.style}</Text>

                <Text><b>Fabric:</b> {selected.fabricType} ({selected.fabricColor})</Text>

                <Text><b>Quantity:</b> {selected.quantity}</Text>

                <Text><b>Status:</b> {selected.status}</Text>

                <Text><b>Description:</b> {selected.description}</Text>

                {selected.additionalInfo && (
                  <Text><b>Additional Info:</b> {selected.additionalInfo}</Text>
                )}

                {selected.measurementNotes && (
                  <Text><b>Measurement Notes:</b> {selected.measurementNotes}</Text>
                )}

                {/* Sizes */}
                <Box>
                  <Text fontWeight="600">Sizes:</Text>
                  {selected.sizes.map((s, i) => (
                    <Box key={i} p={2} border="1px solid #333" borderRadius="md">
                      <Text><b>Role:</b> {s.role}</Text>
                      <Text><b>Mode:</b> {s.sizeMode}</Text>
                      {s.standardSize && (
                        <Text><b>Standard:</b> {s.standardSize}</Text>
                      )}
                    </Box>
                  ))}
                </Box>

                {/* Images */}
                <Flex gap={2} wrap="wrap">
                  {selected.images.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      boxSize="80px"
                      borderRadius="md"
                      objectFit="cover"
                    />
                  ))}
                </Flex>

              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};