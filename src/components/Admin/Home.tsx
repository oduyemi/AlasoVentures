"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Stack,
  Skeleton,
  Badge,
} from "@chakra-ui/react";

type Article = {
  _id: string;
  title: string;
  status: "draft" | "published";
  createdAt: string;
  image?: string;
};

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <Box className="bg-white border border-slate-200 rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-md">
      <Text className="text-sm text-slate-500">{title}</Text>

      <Text
        fontSize="2xl"
        fontWeight="700"
        mt={1}
        style={{ color }}
      >
        {value}
      </Text>
    </Box>
  );
}

export function DashboardHome() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await fetch("/api/blog");
        const json = await res.json();

        if (json.success) {
          setArticles(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const publishedCount = articles.filter(
    (a) => a.status === "published"
  ).length;

  const draftCount = articles.filter(
    (a) => a.status === "draft"
  ).length;

  const totalCount = articles.length;

  return (
    <Box className="w-full">
      {/* HEADER */}
      <Box className="w-full bg-white px-6 py-4 border-b border-slate-200">
        <Text fontSize="lg" fontWeight="700">
          Dashboard
        </Text>
        <Text className="text-sm text-slate-500">
          Overview of content and administrative activity
        </Text>
      </Box>

      {/* STATS */}
      <Box className="p-6 grid gap-4 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {loading ? (
          <>
            <Skeleton height="120px" />
            <Skeleton height="120px" />
            <Skeleton height="120px" />
          </>
        ) : (
          <>
            <StatCard
              title="Published Articles"
              value={publishedCount}
              color="#16a34a"
            />
            <StatCard
              title="Drafts"
              value={draftCount}
              color="#f59e0b"
            />
            <StatCard
              title="Total Articles"
              value={totalCount}
              color="#2563eb"
            />
          </>
        )}
      </Box>

      {/* RECENT ARTICLES */}
      <Box className="p-6">
        <Box className="bg-white border border-slate-200 rounded-2xl p-5">
          <Text fontWeight="600" mb={4}>
            Recent Articles
          </Text>

          <Stack spacing={4}>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} height="60px" />
                ))
              : articles.slice(0, 5).map((a) => (
                  <Box
                    key={a._id}
                    className="flex justify-between items-center gap-3"
                  >
                    {/* LEFT */}
                    <Box className="flex items-center gap-3">
                      {a.image && (
                        <Box
                          as="img"
                          src={a.image}
                          alt={a.title}
                          className="w-[60px] h-[45px] object-cover rounded-md border border-slate-200"
                        />
                      )}

                      <Box>
                        <Text fontWeight="600">
                          {a.title}
                        </Text>
                        <Text className="text-sm text-slate-500">
                          {new Date(
                            a.createdAt
                          ).toLocaleDateString()}
                        </Text>
                      </Box>
                    </Box>

                    {/* STATUS */}
                    <Badge
                      colorScheme={
                        a.status === "published"
                          ? "green"
                          : "gray"
                      }
                      variant="subtle"
                      px={2}
                      py={1}
                      borderRadius="md"
                    >
                      {a.status === "published"
                        ? "Published"
                        : "Draft"}
                    </Badge>
                  </Box>
                ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}