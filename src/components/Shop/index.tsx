"use client";
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Image,
  Stack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Royal Blue Bridal Asooke",
    type: "Asooke",
    price: "₦65,000",
    image: "/images/asooke1.jpg",
  },
  {
    id: 2,
    name: "Ivory & Gold Kente Wrap",
    type: "Kente",
    price: "₦48,000",
    image: "/images/kente1.jpg",
  },
  {
    id: 3,
    name: "Earth-Toned Saki Robe",
    type: "Saki",
    price: "₦52,500",
    image: "/images/saki1.jpg",
  },
  {
    id: 4,
    name: "Crimson Akwete Statement Dress",
    type: "Akwete",
    price: "₦70,000",
    image: "/images/akwete1.jpg",
  },
  {
    id: 5,
    name: "Ocean Weave Asooke Set",
    type: "Asooke",
    price: "₦60,000",
    image: "/images/asooke2.jpg",
  },
  {
    id: 6,
    name: "Asooke Danshiki Jacket",
    type: "Ready to Wear",
    price: "₦45,000",
    image: "/images/asooke2.jpg",
  },
  {
    id: 7,
    name: "African Asooke Boubou Gown",
    type: "Ready to Wear",
    price: "₦55,000",
    image: "/images/asooke2.jpg",
  },
  {
    id: 8,
    name: "Traditional Bridal Asooke Set",
    type: "Ready to Wear",
    price: "₦95,000",
    image: "/images/asooke2.jpg",
  },
  {
    id: 9,
    name: "Zara Asooke Ensemble",
    type: "Off the Shelf",
    price: "₦32,000",
    image: "/images/asooke2.jpg",
  },
  {
    id: 10,
    name: "Tai Turban & Wrapper",
    type: "Off the Shelf",
    price: "₦25,000",
    image: "/images/asooke2.jpg",
  },
  {
    id: 11,
    name: "Asooke Handwoven Bag",
    type: "Off the Shelf",
    price: "₦20,000",
    image: "/images/asooke2.jpg",
  },
];

const fabricFilters = [
  "All",
  "Asooke",
  "Kente",
  "Saki",
  "Akwete",
  "Off the Shelf",
  "Ready to Wear",
];

// Motion wrappers
const MotionBox = motion(Box);
const MotionButton = motion(Button);

export const Shop = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.type === activeFilter);

  return (
    <Box py={{ base: 10, md: 20 }} minH="100vh" bg="#0D0D0D">
      <Container maxW="7xl">
        <VStack spacing={6} textAlign="center" mb={10}>
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            color="white"
            bgGradient="linear(to-r, #C28840, #fff)"
            bgClip="text"
            as={motion.h2}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition= "duration: 0.6"
          >
            Shop Our Collection
          </Heading>
          <Text
            fontSize="lg"
            color="gray.400"
            maxW="2xl"
            as={motion.p}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition="delay: 0.3, duration: 0.6"
          >
            Discover timeless craftsmanship and culturally rooted fashion pieces.
          </Text>
        </VStack>

        <HStack spacing={4} justify="center" mb={10} wrap="wrap">
          {fabricFilters.map((filter) => (
            <MotionButton
              key={filter}
              variant={activeFilter === filter ? "solid" : "outline"}
              colorScheme="yellow"
              onClick={() => setActiveFilter(filter)}
              size="sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={activeFilter === filter}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {filter}
            </MotionButton>
          ))}
        </HStack>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10} position="relative" minH="500px">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <MotionBox
                key={product.id}
                bg="gray.900"
                rounded="xl"
                overflow="hidden"
                shadow="lg"
                cursor="pointer"
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                _hover={{ shadow: "xl", transform: "translateY(-8px)" }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  objectFit="cover"
                  h="250px"
                  w="full"
                  fallbackSrc="/images/placeholder.png"
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.05)" }}
                />
                <Stack p={5} spacing={2}>
                  <HStack justify="space-between">
                    <Badge colorScheme="yellow">{product.type}</Badge>
                    <Text fontWeight="medium" color="white">
                      {product.price}
                    </Text>
                  </HStack>
                  <Text
                    fontSize="lg"
                    color="gray.300"
                    fontWeight="semibold"
                    bgGradient="linear(to-r, #fff, #C28840)"
                    bgClip="text"
                  >
                    {product.name}
                  </Text>
                </Stack>
              </MotionBox>
            ))}
          </AnimatePresence>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
