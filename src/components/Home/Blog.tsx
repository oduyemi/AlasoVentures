"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  Badge,
  Flex,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionImage = motion(Image);

const blogPreview = [
  {
    id: 1,
    title: "Metallic Aso Oke – The Contemporary Elegance",
    excerpt:
      "A modern interpretation of tradition with a refined metallic sheen and timeless sophistication.",
    image: "/images/ofi.jpg",
    date: "June 2, 2025",
    category: "Tradition",
  },
  {
    id: 2,
    title: "Bridal Elegance: The Yoruba Bride Reimagined",
    excerpt:
      "Modern bridal expression rooted in heritage, elegance, and bold cultural identity.",
    image: "/images/bride.jpg",
    date: "May 18, 2025",
    category: "Bridal",
  },
  {
    id: 3,
    title: "Color, Symbolism & Style",
    excerpt:
      "Discover the meaning behind every thread, color, and woven identity.",
    image: "/images/asosays.png",
    date: "April 10, 2025",
    category: "Culture",
  },
];

export const BlogPreview = () => {
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

        {/* Blog Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {blogPreview.map((post, idx) => (
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
              transition={{ duration: 0.3 }}
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
                  transition={{ duration: 0.4 }}
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
                  {post.date}
                </Text>

                <Heading fontSize="lg" mb={2} noOfLines={2}>
                  {post.title}
                </Heading>

                <Text fontSize="sm" color="gray.600" noOfLines={3}>
                  {post.excerpt}
                </Text>

                <Link
                  as={NextLink}
                  href="/blog"
                  mt={4}
                  display="inline-block"
                  fontSize="sm"
                  color="#C28840"
                  fontWeight="semibold"
                >
                  Read more →
                </Link>
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
      </Container>
    </Box>
  );
};