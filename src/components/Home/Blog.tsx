/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  Badge,
  useDisclosure,
  Flex,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { BlogDialog } from "@/dialogs/BlogDialog";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionImage = motion(Image);

interface Post {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  content?: string;
  category: string;
  date: string;
}

export const BlogPreview = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleOpen = (post: Post) => {
    setSelectedPost(post);
    onOpen();
  };

  // 🔥 FETCH BLOGS
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();

        const normalized = data.map((b: any) => ({
          id: b._id,
          title: b.title,
          excerpt: b.excerpt,
          image: b.image,
          content: b.content,
          category: b.category,
          date: b.createdAt,
        }));

        // take only first 3 for preview
        setPosts(normalized.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ❌ DO NOT RENDER IF NO BLOGS
  if (!loading && posts.length === 0) {
    return null;
  }

  return (
    <Box py={{ base: 16, md: 24 }} bg="#FAFAFA">
      <Container maxW="7xl">

        {/* Heading */}
        <MotionVStack
          spacing={4}
          textAlign="center"
          mb={14}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="extrabold"
            bgGradient="linear(to-r, #C28840, #0D0D0D)"
            bgClip="text"
          >
            From The Journal
          </Heading>

          <Text maxW="2xl" fontSize="lg" color="gray.600">
            Stories, craftsmanship, and culture woven into every design.
          </Text>
        </MotionVStack>

        {/* 🔄 LOADING */}
        {loading ? (
          <Flex justify="center" py={10}>
            <Spinner />
          </Flex>
        ) : (
          <>
            {/* Blog Cards */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {posts.map((post) => (
                <MotionBox
                  key={post.id}
                  rounded="2xl"
                  overflow="hidden"
                  bg="white"
                  shadow="md"
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Image */}
                  <Box position="relative" h="220px">
                    <MotionImage
                      src={post.image}
                      alt={post.title}
                      objectFit="cover"
                      w="full"
                      h="full"
                      whileHover={{ scale: 1.08 }}
                    />

                    <Badge
                      position="absolute"
                      top={4}
                      left={4}
                      bg="#C28840"
                      color="white"
                      rounded="full"
                      px={3}
                      py={1}
                      fontSize="xs"
                    >
                      {post.category}
                    </Badge>
                  </Box>

                  {/* Content */}
                  <Box p={6}>
                    <Text fontSize="xs" color="gray.500" mb={1}>
                      {new Date(post.date).toDateString()}
                    </Text>

                    <Heading fontSize="lg" mb={2} noOfLines={2}>
                      {post.title}
                    </Heading>

                    <Text fontSize="sm" color="gray.600" noOfLines={3}>
                      {post.excerpt}
                    </Text>

                    <Text
                      mt={4}
                      fontSize="sm"
                      color="#C28840"
                      fontWeight="semibold"
                      cursor="pointer"
                      onClick={() => handleOpen(post)}
                    >
                      Read more →
                    </Text>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>

            {/* CTA */}
            <Flex justify="center" mt={14}>
              <Link
                as={NextLink}
                href="/blog"
                fontWeight="bold"
                fontSize="md"
                color="#C28840"
                _hover={{ textDecoration: "underline" }}
              >
                View all articles →
              </Link>
            </Flex>
          </>
        )}
      </Container>

      {/* MODAL */}
      <BlogDialog
        isOpen={isOpen}
        onClose={onClose}
        post={selectedPost}
      />
    </Box>
  );
};