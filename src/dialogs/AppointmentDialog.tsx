"use client";

import { motion } from "framer-motion";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  Mail,
  NotebookText,
  Phone,
} from "lucide-react";

import { AppointmentEntry } from "@/types/appointment";

const MotionBox = motion(Box);

const statusColor = (
  status: AppointmentEntry["status"]
) => (status === "treated" ? "green" : "yellow");

interface AppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentEntry | null;

  onDelete?: (id: string) => void;

  onUpdateStatus?: (
    id: string,
    status: "pending" | "treated"
  ) => void;
}

export function AppointmentDialog({
  isOpen,
  onClose,
  appointment,
  onDelete,
  onUpdateStatus,
}: AppointmentDialogProps) {
  if (!appointment) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay
        bg="blackAlpha.700"
        backdropFilter="blur(8px)"
      />

      <ModalContent
        bg="#111827"
        border="1px solid"
        borderColor="whiteAlpha.200"
        borderRadius="2xl"
        overflow="hidden"
      >
        <ModalHeader pb={0}>
          <Flex
            justify="space-between"
            align="center"
          >
            <Box>
              <Text
                fontSize="xl"
                fontWeight="700"
              >
                Appointment Details
              </Text>

              <Text
                color="gray.400"
                fontSize="sm"
              >
                Review this appointment request
              </Text>
            </Box>

            <Badge
              colorScheme={statusColor(
                appointment.status
              )}
              px={3}
              py={1}
              borderRadius="full"
              textTransform="capitalize"
            >
              {appointment.status}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody pb={8}>
          <MotionBox
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <VStack
              spacing={6}
              align="stretch"
            >
              <Box>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                >
                  {appointment.fullname}
                </Text>

                <Text color="gray.400">
                  {appointment.service}
                </Text>
              </Box>

              <Divider />

              <HStack
                spacing={6}
                align="stretch"
              >
                <Box flex={1}>
                  <HStack mb={2}>
                    <Icon as={Mail} />
                    <Text fontWeight="600">
                      Email
                    </Text>
                  </HStack>

                  <Link
                    href={`mailto:${appointment.email}`}
                    color="blue.300"
                  >
                    {appointment.email}
                  </Link>
                </Box>

                <Box flex={1}>
                  <HStack mb={2}>
                    <Icon as={Phone} />
                    <Text fontWeight="600">
                      Phone
                    </Text>
                  </HStack>

                  <Link
                    href={`tel:${appointment.phone}`}
                    color="blue.300"
                  >
                    {appointment.phone}
                  </Link>
                </Box>
              </HStack>

              <Divider />

              <Box>
                <HStack mb={2}>
                  <Icon as={Calendar} />
                  <Text fontWeight="600">
                    Preferred Appointment Date
                  </Text>
                </HStack>

                <Text color="gray.300">
                  {new Date(
                    appointment.proposedDate
                  ).toLocaleString()}
                </Text>
              </Box>

              <Box>
                <HStack mb={2}>
                  <Icon
                    as={BriefcaseBusiness}
                  />
                  <Text fontWeight="600">
                    Requested Service
                  </Text>
                </HStack>

                <Badge
                  colorScheme="blue"
                  px={3}
                  py={1}
                  borderRadius="full"
                  textTransform="capitalize"
                >
                  {appointment.service}
                </Badge>
              </Box>

              <Box>
                <HStack mb={2}>
                  <Icon
                    as={NotebookText}
                  />
                  <Text fontWeight="600">
                    Additional Notes
                  </Text>
                </HStack>

                <Box
                  bg="whiteAlpha.50"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  borderRadius="xl"
                  p={5}
                  maxH="260px"
                  overflowY="auto"
                >
                  <Text
                    whiteSpace="pre-wrap"
                    color="gray.300"
                  >
                    {appointment.additionalNotes}
                  </Text>
                </Box>
              </Box>

              <Box>
                <HStack mb={2}>
                  <Icon as={Calendar} />
                  <Text fontWeight="600">
                    Submitted On
                  </Text>
                </HStack>

                <Text color="gray.400">
                  {new Date(
                    appointment.createdAt
                  ).toLocaleString()}
                </Text>
              </Box>

              {appointment.treatedBy && (
                <>
                  <Divider />

                  <Box>
                    <HStack
                      align="start"
                      spacing={4}
                    >
                      <Avatar
                        size="md"
                        src={
                          appointment
                            .treatedBy.image
                        }
                        name={`${appointment.treatedBy.fname} ${appointment.treatedBy.lname}`}
                      />

                      <Box>
                        <HStack mb={1}>
                          <Icon
                            as={CheckCircle2}
                            color="green.400"
                          />

                          <Text
                            fontWeight="600"
                          >
                            Treated By
                          </Text>
                        </HStack>

                        <Text>
                          {
                            appointment
                              .treatedBy.fname
                          }{" "}
                          {
                            appointment
                              .treatedBy.lname
                          }
                        </Text>

                        <Text color="gray.400">
                          {
                            appointment
                              .treatedBy.email
                          }
                        </Text>

                        {appointment.treatedAt && (
                          <Text
                            mt={2}
                            fontSize="sm"
                            color="gray.500"
                          >
                            {new Date(
                              appointment.treatedAt
                            ).toLocaleString()}
                          </Text>
                        )}
                      </Box>
                    </HStack>
                  </Box>
                </>
              )}

              <Divider />

              <Flex
                justify="flex-end"
                gap={3}
                wrap="wrap"
              >
                {onUpdateStatus && (
                  <Button
                    colorScheme={
                      appointment.status ===
                      "treated"
                        ? "yellow"
                        : "green"
                    }
                    onClick={() =>
                      onUpdateStatus(
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
                      ? "Mark as Pending"
                      : "Mark as Treated"}
                  </Button>
                )}

                {onDelete && (
                  <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() =>
                      onDelete(
                        appointment._id
                      )
                    }
                  >
                    Delete
                  </Button>
                )}
              </Flex>
            </VStack>
          </MotionBox>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}