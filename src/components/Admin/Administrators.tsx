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
  Input,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

export type AdminUser = {
  id: string;
  fname: string;
  lname: string;
  email: string;
  role: "admin";
  image?: string;
  lastLogin?: string;
  createdAt: string;
};

export const AdminsTable = ({
  admins,
  loading,
  onRemoveAdmin,
  onCreateAdmin,
}: {
  admins?: AdminUser[];
  loading: boolean;
  onRemoveAdmin: (id: string) => void;
  onCreateAdmin: (data: {
    fname: string;
    lname: string;
    email: string;
    password: string;
  }) => void;
}) => {
  const safeAdmins = admins ?? [];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleCreate = () => {
    onCreateAdmin(form);

    setForm({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });

    onClose();
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
          Administrators
        </Text>

        <Button size="sm" colorScheme="yellow" onClick={onOpen}>
          + New Admin
        </Button>
      </Flex>

      {/* Loading */}
      {loading || !admins ? (
        <Stack spacing={3}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : safeAdmins.length === 0 ? (
        <Flex direction="column" align="center" py={16}>
          <Text fontSize="40px">👤</Text>
          <Text color="gray.300">No admins found</Text>
          <Text fontSize="sm" color="gray.500">
            Create your first administrator
          </Text>
        </Flex>
      ) : (
        <Box overflowX="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Admin</Th>
                <Th>Email</Th>
                <Th>Last Login</Th>
                <Th>Created</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {safeAdmins.map((a) => (
                <Tr key={a.id} _hover={{ bg: "whiteAlpha.50" }}>
                  
                  {/* Admin Info */}
                  <Td>
                    <HStack>
                      <Image
                        src={a.image || "https://via.placeholder.com/40"}
                        boxSize="40px"
                        borderRadius="full"
                      />
                      <Text fontWeight="500">
                        {a.fname} {a.lname}
                      </Text>
                    </HStack>
                  </Td>

                  {/* Email */}
                  <Td>{a.email}</Td>

                  {/* Last Login */}
                  <Td fontSize="sm" color="gray.400">
                    {a.lastLogin
                      ? new Date(a.lastLogin).toLocaleString()
                      : "Never"}
                  </Td>

                  {/* Created */}
                  <Td fontSize="sm" color="gray.400">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </Td>

                  {/* Actions */}
                  <Td>
                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() => onRemoveAdmin(a.id)}
                    >
                      Remove Admin
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* CREATE ADMIN MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#1a1a1a">
          <ModalHeader color="white">Create New Admin</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Stack spacing={3}>
              
              <Input
                placeholder="First Name"
                value={form.fname}
                color="white"
                onChange={(e) =>
                  setForm({ ...form, fname: e.target.value })
                }
              />

              <Input
                placeholder="Last Name"
                value={form.lname}
                color="white"
                onChange={(e) =>
                  setForm({ ...form, lname: e.target.value })
                }
              />

              <Input
                placeholder="Email"
                type="email"
                color="white"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <Input
                placeholder="Temporary Password"
                type="password"
                color="white"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <Button colorScheme="yellow" onClick={handleCreate}>
                Create Admin
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};