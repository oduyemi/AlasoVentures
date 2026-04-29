"use client";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import { BlogTable, Blog } from "@/components/Admin/Blog";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch("/api/blog");
    const data = await res.json();

    const normalized = data.map((b: any) => ({
      ...b,
      id: b._id,
      date: b.createdAt,
    }));

    setBlogs(normalized);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
    const interval = setInterval(fetchBlogs, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = async (form: any, editing?: Blog | null) => {
    let blogId = editing?.id;

    const res = await fetch(
      editing ? `/api/blog/${editing.id}` : `/api/blog`,
      {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const blog = await res.json();
    blogId = blog._id;
    if (form.imageFile && blogId) {
      const fd = new FormData();
      fd.append("file", form.imageFile);
      fd.append("blogId", blogId);
    
      const upload = await fetch("/api/blog/uploads", {
        method: "POST",
        body: fd,
      });
    
      const img = await upload.json();
    
      await fetch(`/api/blog/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: img.secure_url }),
      });
    }

    fetchBlogs();
  };

  // DELETE
  const handleDelete = async (id: string) => {
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <Box>
      <Box px={6} py={5} borderBottom="1px solid" borderColor="whiteAlpha.200">
        <Flex direction="column">
          <Text fontSize="2xl" fontWeight="bold">
            {user?.fname || "Admin"}
          </Text>
          <Text fontSize="sm" color="gray.400">
            Manage your blog articles here.
          </Text>
        </Flex>
      </Box>

      <Box px={6} mt={2}>
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