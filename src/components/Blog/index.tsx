"use client";
import { useState, useEffect } from "react";
import { BlogDialog } from "@/dialogs/BlogDialog";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  LinkBox,
  Badge,
  Flex,
  useDisclosure,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  content?: string;
  category: string;
  date: string;
}

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionImage = motion(Image);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// animation variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const Blog = () => {
  const bg = "#fff";
  const textColor = "gray.700";
  const headingColor = "#0D0D0D";

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

        setPosts(normalized);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Box bg={bg} py={{ base: 12, md: 20 }}>
      <Container maxW="7xl">
        {/* Header */}
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
            color={headingColor}
            bgGradient="linear(to-r, #C28840, #0D0D0D)"
            bgClip="text"
          >
            The Kòfowórọlá Journal
          </Heading>

          <Divider borderColor="#C28840" w="70px" />

          <Text maxW="2xl" fontSize="lg" color={textColor}>
            Fashion, heritage, and stories told through cloth—discover the journey behind every thread.
          </Text>
        </MotionVStack>
        {loading ? (
          <Flex justify="center" py={20}>
            <Spinner size="lg" />
          </Flex>
        ) : posts.length === 0 ? (
          // 🟡 EMPTY STATE
          <Flex direction="column" align="center" py={20}>
            <Text fontSize="50px">📰</Text>
            <Text fontSize="lg" color="gray.600">
              There are no articles yet
            </Text>
            <Text fontSize="sm" color="gray.400">
              Check back later for new stories
            </Text>
          </Flex>
        ) : (
          // ✅ BLOG GRID
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={{ base: 8, md: 12 }}
            >
              {posts.map((post, idx) => (
                <MotionBox
                  key={post.id}
                  as={LinkBox}
                  rounded="2xl"
                  overflow="hidden"
                  shadow="lg"
                  variants={cardVariant}
                  whileHover={{
                    scale: 1.03,
                    y: -6,
                    boxShadow: "0 12px 45px rgba(194, 136, 64, 0.35)",
                  }}
                  cursor="pointer"
                  onClick={() => handleOpen(post)}
                  gridColumn={idx === 0 ? { base: "auto", lg: "span 2" } : "auto"}
                >
                  <Box position="relative" h={idx === 0 ? "320px" : "240px"}>
                    <MotionImage
                      src={post.image}
                      alt={post.title}
                      objectFit="cover"
                      h="full"
                      w="full"
                      whileHover={{ scale: 1.08 }}
                    />

                    <Box
                      position="absolute"
                      inset={0}
                      bgGradient="linear(to-t, rgba(0,0,0,0.65), rgba(0,0,0,0.1))"
                    />

                    <Badge
                      position="absolute"
                      top={4}
                      left={4}
                      bg="#C28840"
                      color="white"
                      rounded="full"
                    >
                      {post.category}
                    </Badge>
                  </Box>

                  <Box p={6}>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(post.date).toDateString()}
                    </Text>

                    <Heading
                      fontSize={idx === 0 ? "2xl" : "lg"}
                      mt={2}
                      noOfLines={2}
                    >
                      {post.title}
                    </Heading>

                    <Text mt={2} noOfLines={idx === 0 ? 4 : 3}>
                      {post.excerpt}
                    </Text>

                    <Text mt={3} color="#C28840" fontWeight="semibold">
                      Read more →
                    </Text>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>
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