"use client";
import { useState } from "react";
import { AppointmentDialog } from "@/dialogs/AppointmentDialog";
import { AppointmentEntry } from "@/types/appointment";
import {
  Badge,
  Box,
  Button,
  Flex,
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

interface AppointmentTableProps {
  appointments?: AppointmentEntry[];
  loading: boolean;
  onUpdateStatus: (
    id: string,
    status: "pending" | "treated"
  ) => void;
  onDelete: (id: string) => void;
}

const statusColor = (
  status: AppointmentEntry["status"]
) => (status === "treated" ? "green" : "yellow");

export const AppointmentTable = ({
  appointments = [],
  loading,
  onUpdateStatus,
  onDelete,
}: AppointmentTableProps) => {
  const [selected, setSelected] =
    useState<AppointmentEntry | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openDetails = (
    appointment: AppointmentEntry
  ) => {
    setSelected(appointment);
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
        "Are you sure you want to delete this appointment request?"
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
            Appointment Requests
          </Text>

          <Badge
            colorScheme="purple"
            px={3}
            py={1}
            borderRadius="full"
          >
            {appointments.length}
          </Badge>
        </Flex>

        {loading ? (
          <Stack spacing={3}>
            <Skeleton height="48px" />
            <Skeleton height="48px" />
            <Skeleton height="48px" />
          </Stack>
        ) : appointments.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            py={20}
          >
            <Text fontSize="5xl">📅</Text>

            <Text
              mt={4}
              fontWeight="600"
              color="white"
            >
              No appointment requests
            </Text>

            <Text
              mt={1}
              fontSize="sm"
              color="gray.500"
            >
              Appointment requests submitted through
              the website will appear here.
            </Text>
          </Flex>
        ) : (
          <Box overflowX="auto">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Person</Th>
                  <Th>Service</Th>
                  <Th>Preferred Date</Th>
                  <Th>Notes</Th>
                  <Th>Status</Th>
                  <Th textAlign="right">
                    Actions
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {appointments.map((appointment) => (
                  <Tr
                    key={appointment._id}
                    _hover={{
                      bg: "whiteAlpha.50",
                    }}
                  >
                    <Td minW="230px">
                      <Text fontWeight="600">
                        {appointment.fullname}
                      </Text>

                      <Text
                        fontSize="sm"
                        color="gray.400"
                      >
                        {appointment.email}
                      </Text>
                    </Td>

                    <Td>
                      <Badge
                        colorScheme="blue"
                        textTransform="capitalize"
                      >
                        {appointment.service}
                      </Badge>
                    </Td>

                    <Td
                      whiteSpace="nowrap"
                      color="gray.300"
                      fontSize="sm"
                    >
                      {new Date(
                        appointment.proposedDate
                      ).toLocaleDateString()}
                    </Td>

                    <Td maxW="280px">
                      <Text
                        noOfLines={2}
                        whiteSpace="pre-wrap"
                        color="gray.300"
                      >
                        {appointment.additionalNotes}
                      </Text>
                    </Td>

                    <Td>
                      <Badge
                        colorScheme={statusColor(
                          appointment.status
                        )}
                        textTransform="capitalize"
                      >
                        {appointment.status}
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
                            openDetails(
                              appointment
                            )
                          }
                        >
                          View
                        </Button>

                        <Button
                          size="xs"
                          colorScheme={
                            appointment.status ===
                            "treated"
                              ? "yellow"
                              : "green"
                          }
                          onClick={() =>
                            handleStatusUpdate(
                              appointment._id,
                              appointment.status ===
                                "treated"
                                ? "pending"
                                : "treated"
                            )
                          }
                        >
                          {appointment.status ===
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
                              appointment._id
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

      <AppointmentDialog
        isOpen={isOpen}
        onClose={closeDetails}
        appointment={selected}
        onDelete={handleDelete}
        onUpdateStatus={handleStatusUpdate}
      />
    </>
  );
}