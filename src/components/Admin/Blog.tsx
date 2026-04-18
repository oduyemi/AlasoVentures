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

export const BlogTable = ({
  blogs,
  loading,
  onDelete,
  onSave,
}: {
  blogs?: Blog[];
  loading: boolean;
  onDelete: (id: string) => void;
  onSave: (blog: Partial<Blog>) => void;
}) => {
  const safeBlogs = blogs ?? [];

  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclosure();

  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState<Partial<Blog>>({});

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
    onSave({
      ...form,
      date: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <Box bg="#111" border="1px solid" borderColor="whiteAlpha.200" borderRadius="2xl" p={5}>
      
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontWeight="600" color="white" fontSize="lg">
          Blog Posts
        </Text>

        <Button size="sm" colorScheme="yellow" onClick={openNew}>
          + New Post
        </Button>
      </Flex>

      {/* Loading */}
      {loading || !blogs ? (
        <Stack spacing={3}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : safeBlogs.length === 0 ? (
        <Flex direction="column" align="center" py={16}>
          <Text fontSize="40px">📝</Text>
          <Text color="gray.300">No blog posts yet</Text>
          <Text fontSize="sm" color="gray.500">
            Start writing your first post
          </Text>
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
                <Tr key={b.id} _hover={{ bg: "whiteAlpha.50" }}>
                  
                  {/* Post */}
                  <Td>
                    <HStack>
                      <Image
                        src={b.image}
                        boxSize="40px"
                        borderRadius="md"
                        objectFit="cover"
                      />
                      <Box>
                        <Text fontWeight="500">{b.title}</Text>
                        <Text fontSize="sm" color="gray.400" noOfLines={1}>
                          {b.excerpt}
                        </Text>
                      </Box>
                    </HStack>
                  </Td>

                  {/* Category */}
                  <Td>
                    <Badge>{b.category}</Badge>
                  </Td>

                  {/* Date */}
                  <Td fontSize="sm" color="gray.400">
                    {new Date(b.date).toLocaleDateString()}
                  </Td>

                  {/* Actions */}
                  <Td>
                    <HStack>
                      <Button size="xs" onClick={() => openEdit(b)}>
                        Edit
                      </Button>

                      <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() => onDelete(b.id)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* CREATE / EDIT MODAL */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="#1a1a1a">
          <ModalHeader color="white">
            {editing ? "Edit Post" : "New Post"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Stack spacing={4}>
              
              {/* TITLE */}
              <Input
                placeholder="Title"
                value={form.title || ""}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              {/* EXCERPT */}
              <Textarea
                placeholder="Excerpt"
                value={form.excerpt || ""}
                onChange={(e) =>
                  setForm({ ...form, excerpt: e.target.value })
                }
              />

              {/* IMAGE UPLOAD */}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const preview = URL.createObjectURL(file);

                  setForm({
                    ...form,
                    imageFile: file,
                    image: preview,
                  });
                }}
              />

              {form.image && (
                <Image
                  src={form.image}
                  boxSize="120px"
                  borderRadius="md"
                />
              )}

              {/* CATEGORY */}
              <Select
                placeholder="Category"
                value={form.category || ""}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="fashion">Fashion</option>
                <option value="events">Events</option>
                <option value="tips">Tips</option>
              </Select>

              {/* CONTENT */}
              <Textarea
                placeholder="Write your content..."
                minH="200px"
                value={form.content || ""}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
              />

              {/* SAVE */}
              <Button colorScheme="yellow" onClick={handleSave}>
                {editing ? "Update Post" : "Publish Post"}
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};