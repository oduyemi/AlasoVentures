"use client";
import { useEffect, useState } from "react";
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import { HeroManager } from "@/components/Admin/HeroManager";

export default function Manager() {
  const { user } = useAuth();
  const toast = useToast();

  const [slides, setSlides] = useState<any[]>([]);
  const [ctas, setCtas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const normalize = (arr: any[]) =>
    arr.map((item) => ({
      ...item,
      id: item._id,
    }));

  const fetchData = async () => {
    try {
      setLoading(true);

      const [slidesRes, ctasRes] = await Promise.all([
        fetch("/api/hero/slides"),
        fetch("/api/hero/ctas"),
      ]);

      const slidesData = await slidesRes.json();
      const ctasData = await ctasRes.json();

      setSlides(normalize(slidesData.slides || []));
      setCtas(normalize(ctasData.ctas || []));
    } catch {
      toast({ title: "Failed to load hero data", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveSlide = async (data: any) => {
    try {
      await fetch(
        data.id ? `/api/hero/slides/${data.id}` : "/api/hero/slides",
        {
          method: data.id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            image: data.imgSrc,
            ctaText: data.ctaText,
            ctaLink: data.ctaLink,
          }),
        }
      );

      toast({ title: "Slide saved", status: "success" });
      fetchData();
    } catch {
      toast({ title: "Error saving slide", status: "error" });
    }
  };

  const handleDeleteSlide = async (id: string) => {
    await fetch(`/api/hero/slides/${id}`, { method: "DELETE" });
    toast({ title: "Slide deleted", status: "success" });
    fetchData();
  };

  const handleSaveCTA = async (data: any) => {
    await fetch(
      data.id ? `/api/hero/ctas/${data.id}` : "/api/hero/ctas",
      {
        method: data.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    toast({ title: "CTA saved", status: "success" });
    fetchData();
  };

  const handleDeleteCTA = async (id: string) => {
    await fetch(`/api/hero/ctas/${id}`, { method: "DELETE" });
    toast({ title: "CTA deleted", status: "success" });
    fetchData();
  };

  return (
    <Box>
      <Box px={6} py={5} bg="#111" borderBottom="1px solid #222">
        <Flex direction="column">
          <Text fontSize="2xl" fontWeight="bold">
            {user?.fname || "Admin"}
          </Text>
          <Text fontSize="sm" color="gray.400">
            Manage hero section content
          </Text>
        </Flex>
      </Box>

      <Box px={6} py={6}>
        <HeroManager
          slides={slides}
          ctas={ctas}
          onSaveSlide={handleSaveSlide}
          onDeleteSlide={handleDeleteSlide}
          onSaveCTA={handleSaveCTA}
          onDeleteCTA={handleDeleteCTA}
          loading={loading}
        />
      </Box>
    </Box>
  );
}