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
  Badge,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

interface Post {
  id: number;
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

const blogPosts = [
  {
    id: 1,
    title: "Metallic Aso Oke – The Contemporary Elegance",
    excerpt:
      "Metallic Aso Oke is a modern interpretation of the traditional fabric, distinguished by its subtle sheen and smooth, almost silky texture. Its sophisticated, lustrous finish has earned it wide acclaim, as it exudes elegance with minimal or no embellishment...",
    image: "/images/ofi.jpg",
    date: "June 2, 2025",
    category: "Tradition",
    content:
      "Metallic Aso Oke is a modern interpretation of the traditional fabric... (full article text here).",
  },
  {
    id: 2,
    title: "Bridal Elegance: The Yoruba Bride Reimagined",
    excerpt:
      "See how Kòfowórọlá Alásọ crafts modern bridal looks rooted in deep tradition and striking design.",
    image: "/images/bride.jpg",
    date: "May 18, 2025",
    category: "Bridal",
  },
  {
    id: 3,
    title: "Color, Symbolism & Style: What Your Asọ Òkè Says",
    excerpt:
      "Uncover the hidden meanings behind colors, patterns, and symbols woven into each Asọ Òkè masterpiece.",
    image: "/images/asosays.png",
    date: "April 10, 2025",
    category: "Culture",
  },
];

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
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleOpen = (post: Post) => {
    setSelectedPost(post);
    onOpen();
  };

  return (
    <Box bg={bg} py={{ base: 12, md: 20 }}>
      <Container maxW="7xl">
        {/* Section Heading */}
        <MotionVStack
          spacing={4}
          textAlign="center"
          mb={14}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
          <Divider
            borderColor="#C28840"
            borderWidth={1.5}
            w="70px"
            borderRadius="full"
          />
          <Text maxW="2xl" fontSize="lg" color={textColor}>
            Fashion, heritage, and stories told through cloth—discover the
            journey behind every thread.
          </Text>
        </MotionVStack>

        {/* Blog Cards */}
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 8, md: 12 }}>
            {blogPosts.map((post, idx) => (
              <MotionBox
                key={post.id}
                as={LinkBox}
                rounded="2xl"
                overflow="hidden"
                shadow="lg"
                bg="rgba(255,255,255,0.02)"
                backdropFilter="blur(12px)"
                border="1px solid rgba(255,255,255,0.08)"
                variants={cardVariant}
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  boxShadow: "0 12px 45px rgba(194, 136, 64, 0.35)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                cursor="pointer"
                onClick={() => handleOpen(post)}
                gridColumn={idx === 0 ? { base: "auto", lg: "span 2" } : "auto"} // featured
              >
                <Box position="relative" h={idx === 0 ? "320px" : "240px"}>
                  <MotionImage
                    src={post.image}
                    alt={post.title}
                    objectFit="cover"
                    h="full"
                    w="full"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgGradient="linear(to-t, rgba(0,0,0,0.65), rgba(0,0,0,0.1))"
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
                    textTransform="uppercase"
                    shadow="sm"
                  >
                    {post.category}
                  </Badge>
                </Box>

                <Box p={6}>
                  <MotionText fontSize="xs" color="gray.500" mb={1}>
                    {post.date}
                  </MotionText>
                  <MotionHeading
                    fontSize={idx === 0 ? "2xl" : "lg"}
                    mb={2}
                    color={headingColor}
                    noOfLines={2}
                  >
                    {post.title}
                  </MotionHeading>
                  <Text
                    color={textColor}
                    fontSize="md"
                    noOfLines={idx === 0 ? 4 : 3}
                  >
                    {post.excerpt}
                  </Text>
                  <Flex mt={3}>
                    <Text
                      fontSize="sm"
                      color="#C28840"
                      fontWeight="semibold"
                      _hover={{ textDecor: "underline" }}
                    >
                      Read more →
                    </Text>
                  </Flex>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionBox>
      </Container>

      {/* Dialog Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
        motionPreset="slideInBottom"
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          bg="gray.900"
          color="white"
          rounded="2xl"
          shadow="2xl"
          overflow="hidden"
        >
          {selectedPost && (
            <>
              <ModalHeader p={0} position="relative">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  w="full"
                  h="280px"
                  objectFit="cover"
                />
              </ModalHeader>
              <ModalCloseButton color="white" top={3} right={3} />
              <ModalBody p={8}>
                <Badge
                  bg="#C28840"
                  color="white"
                  mb={3}
                  rounded="full"
                  px={3}
                  py={1}
                  fontSize="xs"
                >
                  {selectedPost.category}
                </Badge>
                <Heading fontSize="2xl" mb={3}>
                  {selectedPost.title}
                </Heading>
                <Text fontSize="sm" color="gray.400" mb={6}>
                  {selectedPost.date}
                </Text>
                <Text fontSize="md" color="gray.200" lineHeight="tall" whiteSpace="pre-line">
                  {selectedPost.content ?? selectedPost.excerpt}
                </Text>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};
