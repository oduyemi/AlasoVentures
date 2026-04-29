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

export type Order = {
  id: string;
  customerName?: string;
  email?: string;
  phone?: string;
  title: string;
  type: "pre order" | "flash sale" | "custom style";
  description?: string;
  images?: string[];
  date: string;
  status: "ordered" | "processing" | "sorted" | "complete";
  source: "custom" | "pre" | "sale"; 
};

const statusColor = (status: Order["status"]) => {
  switch (status) {
    case "complete":
      return "yellow";
    case "sorted":
      return "purple";
    case "processing":
      return "blue";
    default:
      return "yellow";
  }
};

export const OrdersTable = ({
  orders,
  loading,
  onUpdateStatus,
}: {
  orders?: Order[]; 
  loading: boolean;
  onUpdateStatus: (id: string, status: Order["status"]) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<Order | null>(null);

  const safeOrders = orders ?? [];
  const openDetails = (order: Order) => {
    setSelected(order);
    onOpen();
  };

  return (
    <Box
      bg="#111"
      border="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="2xl"
      p={5}
    >
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontWeight="600" color="white" fontSize="lg">
          Recent Orders
        </Text>
      </Flex>

      {/* Loading */}
      {loading || !orders ? (
        <Stack spacing={3}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : safeOrders.length === 0 ? (
        /* EMPTY STATE */
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={16}
          textAlign="center"
          color="gray.400"
        >
          <Box mb={4} fontSize="40px" opacity={0.6}>
            📦
          </Box>

          <Text fontSize="lg" fontWeight="500" color="gray.300">
            No orders yet
          </Text>

          <Text fontSize="sm" maxW="300px">
            When customers place pre-orders or purchase from flash sales,
            their orders will appear here.
          </Text>
        </Flex>
      ) : (
        /* TABLE */
        <Box overflowX="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Customer</Th>
                <Th>Type</Th>
                <Th>Title</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
              {safeOrders.map((o) => (
                <Tr key={o.id} _hover={{ bg: "whiteAlpha.50" }}>
                  <Td>{o.customerName || "N/A"}</Td>

                  <Td>
                    <Badge
                      colorScheme={
                        o.type === "pre order" ? "orange" : "pink"
                      }
                    >
                      {o.type}
                    </Badge>
                  </Td>

                  <Td>{o.title}</Td>

                  <Td fontSize="sm" color="gray.400">
                    {new Date(o.date).toLocaleDateString()}
                  </Td>

                  <Td>
                    <Badge colorScheme={statusColor(o.status)}>
                      {o.status}
                    </Badge>
                  </Td>

                  <Td>
                    <HStack spacing={2} wrap="wrap">
                      {/* View */}
                      <Button size="xs" onClick={() => openDetails(o)}>
                        View
                      </Button>

                      {/* Processing */}
                      <Button
                        size="xs"
                        colorScheme="blue"
                        onClick={() =>
                          onUpdateStatus(o.id, "processing")
                        }
                        isDisabled={o.status === "processing"}
                      >
                        Processing
                      </Button>

                      {/* Sorted */}
                      <Button
                        size="xs"
                        colorScheme="purple"
                        onClick={() =>
                          onUpdateStatus(o.id, "sorted")
                        }
                        isDisabled={o.status === "sorted"}
                      >
                        Sorted
                      </Button>

                      {/* Complete */}
                      <Button
                        size="xs"
                        colorScheme="yellow"
                        onClick={() =>
                          onUpdateStatus(o.id, "complete")
                        }
                        isDisabled={o.status === "complete"}
                      >
                        Complete
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
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent bg="#1a1a1a">
          <ModalHeader color="white">Order Details</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {selected && (
              <Stack spacing={3}>
                <Text>
                  <b>Type:</b> {selected.type}
                </Text>
                <Text>
                  <b>Title:</b> {selected.title}
                </Text>
                <Text>
                  <b>Status:</b> {selected.status}
                </Text>
                <Text>
                  <b>Date:</b>{" "}
                  {new Date(selected.date).toLocaleString()}
                </Text>

                {selected.customerName && (
                  <Text>
                    <b>Customer:</b> {selected.customerName}
                  </Text>
                )}

                {selected.email && (
                  <Text>
                    <b>Email:</b> {selected.email}
                  </Text>
                )}

                {selected.phone && (
                  <Text>
                    <b>Phone:</b> {selected.phone}
                  </Text>
                )}

                {selected.description && (
                  <Text>
                    <b>Description:</b> {selected.description}
                  </Text>
                )}

                {/* Images */}
                {selected.images && selected.images.length > 0 && (
                  <Flex gap={2} wrap="wrap">
                    {selected.images.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        boxSize="80px"
                        objectFit="cover"
                        borderRadius="md"
                        fallbackSrc="https://via.placeholder.com/80"
                      />
                    ))}
                  </Flex>
                )}
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};