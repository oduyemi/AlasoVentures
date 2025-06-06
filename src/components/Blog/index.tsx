"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionImage = motion(Image);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const blogPosts = [
  {
    id: 1,
    title: "The Legacy of Asọ Òkè: A Story Woven in Threads",
    excerpt:
      "Explore the rich history and cultural significance of Asọ Òkè in Yoruba heritage—and how we reimagine it for today's world.",
    image: "/images/ofi.jpg",
    date: "June 2, 2025",
    slug: "/blog/legacy-of-aso-oke",
  },
  {
    id: 2,
    title: "Bridal Elegance: The Yoruba Bride Reimagined",
    excerpt:
      "See how Kòfowórọlá Alásọ crafts modern bridal looks rooted in deep tradition and striking design.",
    image: "/images/hero4.jpg",
    date: "May 18, 2025",
    slug: "/blog/yoruba-bridal-style",
  },
  {
    id: 3,
    title: "Color, Symbolism & Style: What Your Asọ Òkè Says",
    excerpt:
      "Uncover the hidden meanings behind colors, patterns, and symbols woven into each Asọ Òkè masterpiece.",
    image: "/images/asosays.png",
    date: "April 10, 2025",
    slug: "/blog/aso-oke-symbolism",
  },
];

// Parent container with staggered children animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const Blog = () => {
  const bg = "#0D0D0D";
  const textColor = "gray.400";
  const headingColor = "white";

  return (
    <Box bg={bg} py={{ base: 12, md: 20 }}>
      <Container maxW="6xl">
        <MotionVStack
          spacing={4}
          textAlign="center"
          mb={10}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            color={headingColor}
            bgGradient="linear(to-r, #C28840, #fff)"
            bgClip="text"
          >
            The Kòfowórọlá Journal
          </Heading>
          <Text maxW="2xl" fontSize="lg" color={textColor}>
            Fashion, heritage, and stories told through cloth—discover the journey behind every thread.
          </Text>
        </MotionVStack>

        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {blogPosts.map((post) => (
              <MotionBox
                key={post.id}
                as={LinkBox}
                bg="gray.900"
                rounded="2xl"
                overflow="hidden"
                shadow="lg"
                variants={cardVariant}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(194, 136, 64, 0.6)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                cursor="pointer"
              >
                <MotionImage
                  src={post.image}
                  alt={post.title}
                  objectFit="cover"
                  h="200px"
                  w="full"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.07 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <Box p={6}>
                  <MotionText
                    fontSize="xs"
                    color="gray.500"
                    mb={1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {post.date}
                  </MotionText>
                  <MotionHeading
                    fontSize="lg"
                    mb={2}
                    color={headingColor}
                    whileHover={{ y: -3, color: "#C28840" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <LinkOverlay as={NextLink} href={post.slug}>
                      {post.title}
                    </LinkOverlay>
                  </MotionHeading>
                  <Text color={textColor} fontSize="md">
                    {post.excerpt}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
};
