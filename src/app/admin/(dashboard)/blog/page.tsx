"use client";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import { BlogTable, Blog } from "@/components/Admin/Blog";
import { useState } from "react";

export default function BlogPage() {
  const { user } = useAuth();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = (id: string) => {
    // TODO: API call
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const handleSave = (blog: Partial<Blog>) => {
    // TODO: API call

    if (blog.id) {
      // update
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, ...blog } as Blog : b))
      );
    } else {
      // create
      const newBlog: Blog = {
        id: Date.now().toString(),
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        image: blog.image || "",
        category: blog.category || "",
        content: blog.content || "",
        date: new Date().toISOString(),
      };

      setBlogs((prev) => [newBlog, ...prev]);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        px={{ base: 4, md: 6 }}
        py={{ base: 4, md: 5 }}
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
        bg="#111"
      >
        <Flex direction="column" gap={1}>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            Hello {user?.fname || "Admin"}
          </Text>

          <Text fontSize="sm" color="gray.400">
            Overview of your store performance and activities
          </Text>
        </Flex>
      </Box>

      <Box px={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }} mt={2}>
        <BlogTable
          blogs={blogs}
          loading={loading}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      </Box>
    </Box>
  );
}