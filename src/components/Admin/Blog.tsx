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
  Input,
  Textarea,
  Image,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

export type Blog = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  content: string;
};

type BlogForm = Partial<Blog> & {
  imageFile?: File;
};

export const BlogTable = ({
  blogs,
  loading,
  onDelete,
  onSave,
}: {
  blogs?: Blog[];
  loading: boolean;
  onDelete: (id: string) => void;
  onSave: (form: BlogForm, editing?: Blog | null) => void;
}) => {
  const safeBlogs = blogs ?? [];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState<BlogForm>({});

  const openNew = () => {
    setEditing(null);
    setForm({});
    onOpen();
  };

  const openEdit = (blog: Blog) => {
    setEditing(blog);
    setForm(blog);
    onOpen();
  };

  const handleSave = () => {
    onSave(form, editing);
    onClose();
  };

  return (
    <Box bg="#111" border="1px solid" borderColor="whiteAlpha.200" borderRadius="2xl" p={5}>
      
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontWeight="600" color="white" fontSize="lg">
          Blog Posts
        </Text>

        <Button size="sm" colorScheme="yellow" onClick={openNew}>
          + New Post
        </Button>
      </Flex>

      {loading ? (
        <Stack spacing={3}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : safeBlogs.length === 0 ? (
        <Flex direction="column" align="center" py={16}>
          <Text fontSize="40px">📝</Text>
          <Text color="gray.300">No blog posts yet</Text>
        </Flex>
      ) : (
        <Box overflowX="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Post</Th>
                <Th>Category</Th>
                <Th>Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
              {safeBlogs.map((b) => (
                <Tr key={b.id}>
                  <Td>
                    <HStack>
                      <Image src={b.image} boxSize="40px" />
                      <Box>
                        <Text color="gray.400">{b.title}</Text>
                        <Text color="gray.300" fontSize="sm">{b.excerpt}</Text>
                      </Box>
                    </HStack>
                  </Td>

                  <Td><Badge>{b.category}</Badge></Td>
                  <Td>{new Date(b.date).toLocaleDateString()}</Td>

                  <Td>
                    <HStack>
                      <Button size="xs" onClick={() => openEdit(b)}>Edit</Button>
                      <Button size="xs" colorScheme="red" onClick={() => onDelete(b.id)}>Delete</Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#1a1a1a">
          <ModalHeader color="white">{editing ? "Edit" : "New"}</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Stack spacing={4}>
              <Input
                placeholder="Title"
                value={form.title || ""}
                color="white"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <Textarea
                placeholder="Excerpt"
                value={form.excerpt || ""}
                color="white"
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />

              <Input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setForm({
                    ...form,
                    imageFile: file,
                    image: URL.createObjectURL(file),
                  });
                }}
              />

              {form.image && <Image src={form.image} boxSize="120px" />}

              <Select
                value={form.category || ""}
                color="gray.500"
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select category</option>
                <option value="fashion">Fashion</option>
                <option value="events">Events</option>
                <option value="tips">Tips</option>
              </Select>

              <Textarea
              color="white"
                value={form.content || ""}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />

              <Button colorScheme="yellow" onClick={handleSave}>
                Save
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};