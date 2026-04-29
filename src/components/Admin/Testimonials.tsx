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
} from "@chakra-ui/react";
import { useState } from "react";

export type Testimonial = {
  id: string;
  fullname: string;
  email: string;
  who: string;
  testimony: string;
  status: "pending" | "approved" | "disapproved";
  createdAt: string;
};

const statusColor = (status: Testimonial["status"]) => {
  switch (status) {
    case "approved":
      return "green";
    case "disapproved":
      return "red";
    default:
      return "yellow";
  }
};

export const TestimonialsTable = ({
  testimonials,
  loading,
  onUpdateStatus,
}: {
  testimonials?: Testimonial[];
  loading: boolean;
  onUpdateStatus: (
    id: string,
    status: "approved" | "disapproved"
  ) => void;
}) => {
  const safeTestimonials = testimonials ?? [];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<Testimonial | null>(null);

  const openDetails = (t: Testimonial) => {
    setSelected(t);
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
      <Flex justify="space-between" mb={4}>
        <Text fontSize="lg" fontWeight="600">
          Testimonials Moderation
        </Text>
      </Flex>

      {/* Loading */}
      {loading || !testimonials ? (
        <Stack spacing={3}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : safeTestimonials.length === 0 ? (
        <Flex direction="column" align="center" py={16}>
          <Text fontSize="40px">💬</Text>
          <Text color="gray.300">No testimonials yet</Text>
          <Text fontSize="sm" color="gray.500">
            User submissions will appear here
          </Text>
        </Flex>
      ) : (
        <Box overflowX="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Category</Th>
                <Th>Preview</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
              {safeTestimonials.map((t) => (
                <Tr key={t.id} _hover={{ bg: "whiteAlpha.50" }}>
                  
                  {/* User */}
                  <Td>
                    <Text fontWeight="500">{t.fullname}</Text>
                    <Text fontSize="sm" color="gray.400">
                      {t.email}
                    </Text>
                  </Td>

                  {/* Category */}
                  <Td>
                    <Badge>{t.who}</Badge>
                  </Td>

                  {/* Preview */}
                  <Td maxW="200px">
                    <Text noOfLines={2} fontSize="sm" color="gray.300">
                      {t.testimony}
                    </Text>
                  </Td>

                  {/* Date */}
                  <Td fontSize="sm" color="gray.400">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </Td>

                  {/* Status */}
                  <Td>
                    <Badge colorScheme={statusColor(t.status)}>
                      {t.status}
                    </Badge>
                  </Td>

                  {/* Actions */}
                  <Td>
                    <HStack spacing={2} wrap="wrap">
                      
                      <Button size="xs" onClick={() => openDetails(t)}>
                        View
                      </Button>

                      <Button
                        size="xs"
                        colorScheme="green"
                        onClick={() =>
                          onUpdateStatus(t.id, "approved")
                        }
                        isDisabled={t.status === "approved"}
                      >
                        Approve
                      </Button>

                      <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() =>
                          onUpdateStatus(t.id, "disapproved")
                        }
                        isDisabled={t.status === "disapproved"}
                      >
                        Disapprove
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
          <ModalHeader>Testimonial</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {selected && (
              <Stack spacing={3}>
                <Text><b>Name:</b> {selected.fullname}</Text>
                <Text><b>Email:</b> {selected.email}</Text>
                <Text><b>Category:</b> {selected.who}</Text>
                <Text><b>Status:</b> {selected.status}</Text>

                <Box
                  p={3}
                  border="1px solid #333"
                  borderRadius="md"
                >
                  <Text>{selected.testimony}</Text>
                </Box>

                <Text fontSize="sm" color="gray.400">
                  {new Date(selected.createdAt).toLocaleString()}
                </Text>
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};