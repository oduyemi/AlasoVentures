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

export type PreOrder = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  style: string;
  description: string;
  additionalInfo?: string;
  images: string[];
  status: "ordered" | "processing" | "sorted" | "complete";
  createdAt: string;
};

const statusColor = (status: PreOrder["status"]) => {
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

export const PreOrdersTable = ({
  orders,
  loading,
  onUpdateStatus,
}: {
  orders?: PreOrder[];
  loading: boolean;
  onUpdateStatus: (id: string, status: PreOrder["status"]) => void;
}) => {
  const safeOrders = orders ?? [];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<PreOrder | null>(null);

  const openDetails = (order: PreOrder) => {
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
          Pre-Orders
        </Text>
      </Flex>

      {/* Loading */}
      {loading || !orders ? (
        <Stack spacing={3}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : safeOrders.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={16}
          textAlign="center"
          color="gray.400"
        >
          <Box fontSize="40px">🧵</Box>
          <Text fontSize="lg" color="gray.300">
            No pre-orders yet
          </Text>
          <Text fontSize="sm">
            Customer custom orders will appear here.
          </Text>
        </Flex>
      ) : (
        <Box overflowX="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Customer</Th>
                <Th>Style</Th>
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
                    <Text fontWeight="500">{o.fullname}</Text>
                    <Text fontSize="sm" color="gray.400">
                      {o.email}
                    </Text>
                  </Td>

                  {/* Style */}
                  <Td>{o.style}</Td>

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
                        isDisabled={o.status === "processing"}
                      >
                        Processing
                      </Button>

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
          <ModalHeader color="white">Pre-Order Details</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {selected && (
              <Stack spacing={3}>
                <Text>
                  <b>Name:</b> {selected.fullname}
                </Text>
                <Text>
                  <b>Email:</b> {selected.email}
                </Text>
                <Text>
                  <b>Phone:</b> {selected.phone}
                </Text>

                <Text>
                  <b>Style:</b> {selected.style}
                </Text>

                <Text>
                  <b>Status:</b> {selected.status}
                </Text>

                <Text>
                  <b>Date:</b>{" "}
                  {new Date(selected.createdAt).toLocaleString()}
                </Text>

                <Text>
                  <b>Description:</b> {selected.description}
                </Text>

                {selected.additionalInfo && (
                  <Text>
                    <b>Additional Info:</b>{" "}
                    {selected.additionalInfo}
                  </Text>
                )}

                {/* Images */}
                {selected.images?.length > 0 && (
                  <Flex gap={2} wrap="wrap">
                    {selected.images.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        boxSize="80px"
                        objectFit="cover"
                        borderRadius="md"
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