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
  Calendar,
  CheckCircle2,
  Mail,
  Phone,
} from "lucide-react";
import { ContactEntry } from "@/types/contact";


const MotionBox = motion(Box);

const statusColor = (status: ContactEntry["status"]) =>
  status === "treated" ? "green" : "yellow";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contact: ContactEntry | null;

  onDelete?: (id: string) => void;

  onUpdateStatus?: (
    id: string,
    status: "pending" | "treated"
  ) => void;
}

export function ContactDialog({
  isOpen,
  onClose,
  contact,
  onDelete,
  onUpdateStatus,
}: ContactDialogProps) {
  if (!contact) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(8px)" />

      <ModalContent
        bg="#111827"
        border="1px solid"
        borderColor="whiteAlpha.200"
        borderRadius="2xl"
        overflow="hidden"
      >
        <ModalHeader pb={0}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xl" fontWeight="700">
                Contact Details
              </Text>

              <Text color="gray.400" fontSize="sm">
                Review this enquiry
              </Text>
            </Box>

            <Badge
              colorScheme={statusColor(contact.status)}
              px={3}
              py={1}
              borderRadius="full"
              textTransform="capitalize"
            >
              {contact.status}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody pb={8}>
          <MotionBox
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .3 }}
          >
            <VStack spacing={6} align="stretch">

              <Box>
                <Text
                  fontWeight="bold"
                  fontSize="2xl"
                >
                  {contact.fullname}
                </Text>

                <Text color="gray.400">
                  {contact.subject}
                </Text>
              </Box>

              <Divider />

              <HStack
                align="stretch"
                spacing={5}
              >
                <Box flex={1}>
                  <HStack mb={2}>
                    <Icon as={Mail} />
                    <Text
                      fontWeight="600"
                    >
                      Email
                    </Text>
                  </HStack>

                  <Link
                    href={`mailto:${contact.email}`}
                    color="blue.300"
                  >
                    {contact.email}
                  </Link>
                </Box>

                <Box flex={1}>
                  <HStack mb={2}>
                    <Icon as={Phone} />
                    <Text
                      fontWeight="600"
                    >
                      Phone
                    </Text>
                  </HStack>

                  <Link
                    href={`tel:${contact.phone}`}
                    color="blue.300"
                  >
                    {contact.phone}
                  </Link>
                </Box>
              </HStack>

              <Box>
                <HStack mb={3}>
                  <Icon as={Calendar} />
                  <Text fontWeight="600">
                    Received
                  </Text>
                </HStack>

                <Text color="gray.300">
                  {new Date(
                    contact.createdAt
                  ).toLocaleString()}
                </Text>
              </Box>

              <Box>
                <Text
                  mb={3}
                  fontWeight="600"
                >
                  Message
                </Text>

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
                    {contact.message}
                  </Text>
                </Box>
              </Box>

              {contact.treatedBy && (
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
                          contact.treatedBy
                            .image
                        }
                        name={`${contact.treatedBy.fname} ${contact.treatedBy.lname}`}
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
                            contact
                              .treatedBy
                              .fname
                          }{" "}
                          {
                            contact
                              .treatedBy
                              .lname
                          }
                        </Text>

                        <Text
                          color="gray.400"
                        >
                          {
                            contact
                              .treatedBy
                              .email
                          }
                        </Text>

                        {contact.treatedAt && (
                          <Text
                            mt={2}
                            fontSize="sm"
                            color="gray.500"
                          >
                            {new Date(
                              contact.treatedAt
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
              >
                {contact.status ===
                  "pending" &&
                  onUpdateStatus && (
                    <Button
                      colorScheme="green"
                      onClick={() =>
                        onUpdateStatus(contact._id, "treated")
                      }
                    >
                      Mark as Treated
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