"use client";
import { useState } from "react";
import { ContactDialog } from "@/dialogs/ContactDialog";
import { ContactEntry } from "@/types/contact";
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";


interface ContactTableProps {
  contacts?: ContactEntry[];
  loading: boolean;
  onUpdateStatus: (
    id: string,
    status: "pending" | "treated"
  ) => void;
  onDelete: (id: string) => void;
}

const statusColor = (status: ContactEntry["status"]) =>
  status === "treated" ? "green" : "yellow";

export const ContactTable = ({
  contacts = [],
  loading,
  onUpdateStatus,
  onDelete,
}: ContactTableProps) => {
  const [selected, setSelected] =
    useState<ContactEntry | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openDetails = (contact: ContactEntry) => {
    setSelected(contact);
    setIsOpen(true);
  };

  const closeDetails = () => {
    setSelected(null);
    setIsOpen(false);
  };

  const handleStatusUpdate = (
    id: string,
    status: "pending" | "treated"
  ) => {
    onUpdateStatus(id, status);

    if (selected?._id === id) {
      setSelected({
        ...selected,
        status,
        treatedAt:
          status === "treated"
            ? new Date().toISOString()
            : undefined,
      });
    }
  };

  const handleDelete = (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this contact message?"
      )
    ) {
      return;
    }

    onDelete(id);

    if (selected?._id === id) {
      closeDetails();
    }
  };

  return (
    <>
      <Box
        bg="#111"
        border="1px solid"
        borderColor="whiteAlpha.200"
        borderRadius="2xl"
        p={5}
      >
        <Flex
          justify="space-between"
          align="center"
          mb={5}
        >
          <Text
            fontSize="lg"
            fontWeight="600"
            color="white"
          >
            Contact Messages
          </Text>

          <Badge
            colorScheme="purple"
            px={3}
            py={1}
            borderRadius="full"
          >
            {contacts.length}
          </Badge>
        </Flex>

        {loading ? (
          <Stack spacing={3}>
            <Skeleton height="48px" />
            <Skeleton height="48px" />
            <Skeleton height="48px" />
          </Stack>
        ) : contacts.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            py={20}
          >
            <Text fontSize="5xl">📩</Text>

            <Text
              mt={4}
              fontWeight="600"
              color="white"
            >
              No contact messages
            </Text>

            <Text
              mt={1}
              fontSize="sm"
              color="gray.500"
            >
              Messages submitted through the website
              will appear here.
            </Text>
          </Flex>
        ) : (
          <Box overflowX="auto">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Subject</Th>
                  <Th>Message</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                  <Th textAlign="right">
                    Actions
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {contacts.map((contact) => (
                  <Tr
                    key={contact._id}
                    _hover={{
                      bg: "whiteAlpha.50",
                    }}
                  >
                    <Td minW="220px">
                      <Text fontWeight="600">
                        {contact.fullname}
                      </Text>

                      <Text
                        fontSize="sm"
                        color="gray.400"
                      >
                        {contact.email}
                      </Text>
                    </Td>

                    <Td>
                      <Badge
                        textTransform="capitalize"
                      >
                        {contact.subject}
                      </Badge>
                    </Td>

                    <Td maxW="280px">
                      <Text
                        noOfLines={2}
                        whiteSpace="pre-wrap"
                        color="gray.300"
                      >
                        {contact.message}
                      </Text>
                    </Td>

                    <Td
                      fontSize="sm"
                      color="gray.400"
                      whiteSpace="nowrap"
                    >
                      {new Date(
                        contact.createdAt
                      ).toLocaleDateString()}
                    </Td>

                    <Td>
                      <Badge
                        colorScheme={statusColor(
                          contact.status
                        )}
                        textTransform="capitalize"
                      >
                        {contact.status}
                      </Badge>
                    </Td>

                    <Td>
                      <Flex
                        justify="flex-end"
                        gap={2}
                        wrap="wrap"
                      >
                        <Button
                          size="xs"
                          onClick={() =>
                            openDetails(contact)
                          }
                        >
                          View
                        </Button>

                        <Button
                          size="xs"
                          colorScheme={
                            contact.status ===
                            "treated"
                              ? "yellow"
                              : "green"
                          }
                          onClick={() =>
                            handleStatusUpdate(
                              contact._id,
                              contact.status ===
                                "treated"
                                ? "pending"
                                : "treated"
                            )
                          }
                        >
                          {contact.status ===
                          "treated"
                            ? "Reopen"
                            : "Treat"}
                        </Button>

                        <Button
                          size="xs"
                          colorScheme="red"
                          variant="outline"
                          onClick={() =>
                            handleDelete(
                              contact._id
                            )
                          }
                        >
                          Delete
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>

      <ContactDialog
        isOpen={isOpen}
        onClose={closeDetails}
        contact={selected}
        onDelete={handleDelete}
        onUpdateStatus={handleStatusUpdate}
      />
    </>
  );
};