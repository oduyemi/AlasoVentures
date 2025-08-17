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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

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
      "Metallic Aso Oke is a modern interpretation of the traditional fabric, distinguished by its subtle sheen and smooth, almost silky texture. Its sophisticated, lustrous finish has earned it wide acclaim, as it exudes elegance with minimal or no embellishment. This makes it an excellent choice for brides and guests who desire a refined, stylish appearance while maintaining simplicity and reducing the need for additional decorative details.\n\nTypes of Metallic Aso Oke\n\n1. Monotone\n\nMonotone Metallic Aso Oke is woven using a single color of metallic thread, resulting in a smooth, uniform silky sheen rather than a contrasting tone. It delivers a refined, single-tone shine that highlights the fabric’s luxurious texture. Whether duotone or monotone, the signature ultra-silky shimmer of Metallic Aso Oke remains unmistakable, making it a timeless choice for elegant occasions.\n\n2. Duotone\n\nDuotone Metallic Aso Oke is created by weaving two different metallic thread colors together on the loom. The contrasting colors produce a striking two-tone effect that reflects light beautifully, giving a mirror-like shimmer—especially when styled as a headwrap (known as gele in Yoruba culture). This is considered the premium form of Metallic Aso Oke, offering 100% sheen. For the best tone contrast, colors positioned farther apart on the color wheel (such as green and deep blue) create a more vibrant “tone-pop” compared to closer shades like purple and lilac.",
    image: "/images/ofi.jpg",
    date: "June 2, 2025",
    category: "Tradition",
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
  visible: {
    transition: { staggerChildren: 0.15 },
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const handleOpen = (post: any) => {
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
          mb={12}
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
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={12}>
            {blogPosts.map((post, idx) => (
              <MotionBox
                key={post.id}
                as={LinkBox}
                bg="gray.900"
                rounded="2xl"
                overflow="hidden"
                shadow="lg"
                variants={cardVariant}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 12px 40px rgba(194, 136, 64, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                cursor="pointer"
                onClick={() => handleOpen(post)}
                gridColumn={idx === 0 ? { base: "auto", lg: "span 2" } : "auto"} // Featured
              >
                <Box position="relative" h={idx === 0 ? "300px" : "220px"}>
                  <MotionImage
                    src={post.image}
                    alt={post.title}
                    objectFit="cover"
                    h="full"
                    w="full"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.07 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgGradient="linear(to-t, rgba(0,0,0,0.6), rgba(0,0,0,0))"
                  />
                  <Badge
                    position="absolute"
                    top={4}
                    left={4}
                    colorScheme="orange"
                    rounded="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    textTransform="uppercase"
                  >
                    {post.category}
                  </Badge>
                </Box>

                <Box p={6}>
                  <MotionText fontSize="xs" color="gray.500" mb={1}>
                    {post.date}
                  </MotionText>
                  <MotionHeading fontSize={idx === 0 ? "2xl" : "lg"} mb={2} color={headingColor}>
                    {post.title}
                  </MotionHeading>
                  <Text color={textColor} fontSize="md" noOfLines={idx === 0 ? 4 : 3}>
                    {post.excerpt}
                  </Text>
                  <Flex mt={3}>
                    <Text fontSize="sm" color="#C28840" fontWeight="semibold">
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
      <Modal isOpen={isOpen} onClose={onClose} size="3xl" motionPreset="slideInBottom" isCentered>
        <ModalOverlay />
        <ModalContent bg="gray.900" color="white" rounded="2xl" shadow="2xl" overflow="hidden">
          {selectedPost && (
            <>
              <ModalHeader p={0}>
                <Image src={selectedPost.image} alt={selectedPost.title} w="full" h="250px" objectFit="cover" />
              </ModalHeader>
              <ModalCloseButton color="white" />
              <ModalBody p={6}>
                <Badge colorScheme="orange" mb={2} rounded="full" px={3} py={1} fontSize="xs">
                  {selectedPost.category}
                </Badge>
                <Heading fontSize="2xl" mb={2}>
                  {selectedPost.title}
                </Heading>
                <Text fontSize="sm" color="gray.400" mb={4}>
                  {selectedPost.date}
                </Text>
                <Text fontSize="md" color="gray.300" whiteSpace="pre-line">
                  {selectedPost.excerpt}
                </Text>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};
