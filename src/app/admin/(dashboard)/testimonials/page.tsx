"use client";
import { useEffect, useState } from "react";
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import { TestimonialsTable, Testimonial } from "@/components/Admin/Testimonials";

export default function TestimonyWa() {
  const { user } = useAuth();
  const toast = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      const formatted = data.testimonials.map((t: any) => ({
        ...t,
        id: t._id,
      }));

      setTestimonials(formatted);
    } catch (err: any) {
      toast({
        title: "Failed to load testimonials",
        description: err.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  
  const handleUpdateStatus = async (
    id: string,
    status: "approved" | "disapproved"
  ) => {
    try {
      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status } : t
        )
      );

      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast({
        title: "Status updated",
        status: "success",
      });
    } catch (err: any) {
      toast({
        title: "Update failed",
        description: err.message,
        status: "error",
      });

      fetchTestimonials(); 
    }
  };

  /**
   * DELETE (optional improvement — your API supports it)
   */
//   const handleDelete = async (id: string) => {
//     try {
//       setTestimonials((prev) =>
//         prev.filter((t) => t.id !== id)
//       );

//       const res = await fetch(`/api/testimonials/${id}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();

//       if (!data.success) throw new Error(data.message);

//       toast({
//         title: "Deleted successfully",
//         status: "success",
//       });
//     } catch (err: any) {
//       toast({
//         title: "Delete failed",
//         description: err.message,
//         status: "error",
//       });

//       fetchTestimonials();
//     }
//   };

  return (
    <Box>
      {/* Header */}
      <Box px={6} py={5} bg="#111" borderBottom="1px solid #222">
        <Flex direction="column">
          <Text fontSize="2xl" fontWeight="bold">
            {user?.fname || "Admin"}
          </Text>
          <Text fontSize="sm" color="gray.400">
            Manage user testimonials
          </Text>
        </Flex>
      </Box>

      {/* Table */}
      <Box px={6} py={6}>
        <TestimonialsTable
          testimonials={testimonials}
          loading={loading}
          onUpdateStatus={handleUpdateStatus}
          // onDelete={handleDelete}
        />
      </Box>
    </Box>
  );
}