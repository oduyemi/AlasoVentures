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
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Tonic Blend Asooke",
    type: "Asooke",
    price: "₦40,000",
    image: "/images/asooke/a.jpg",
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
    name: "4-Color Textured Asooke",
    type: "Asooke",
    price: "₦35,000",
    image: "/images/asooke/6.jpg",
  },
  {
    id: 4,
    name: "Blue Two Tone Asooke",
    type: "Asooke",
    price: "₦35,000",
    image: "/images/asooke/7.jpg",
  },
  {
    id: 5,
    name: "Coffee Brown Glove",
    type: "Asooke",
    price: "₦30,000",
    image: "/images/asooke/glove.jpg",
  },
  {
    id: 6,
    name: "Rich Lemon Asooke",
    type: "Asooke",
    price: "₦40,000",
    image: "/images/asooke/d.jpg",
  },
  {
    id: 7,
    name: "Wine Red Textured Asooke",
    type: "Asooke",
    price: "₦30,000",
    image: "/images/asooke/e.jpg",
  },
  {
    id: 8,
    name: "Dreamy Blue Bridal Asooke",
    type: "Asooke",
    price: "₦30,000",
    image: "/images/asooke/f.jpg",
  },
  {
    id: 9,
    name: "Multi-color Linen Asooke",
    type: "Asooke",
    price: "₦30,000",
    image: "/images/asooke/g.jpg",
  },
  {
    id: 10,
    name: "Two Piece Asooke",
    type: "Asooke",
    price: "₦30,000",
    image: "/images/asooke/h.jpg",
  },
  {
    id: 11,
    name: "Lemon Green Glitter Asooke",
    type: "Asooke",
    price: "₦40,000",
    image: "/images/asooke/1.jpg",
  },
  {
    id: 12,
    name: "Burgundy Glitter Asooke",
    type: "Asooke",
    price: "₦40,000",
    image: "/images/asooke/2.jpg",
  },
  {
    id: 13,
    name: "Deep Green Glitter Asooke",
    type: "Asooke",
    price: "₦40,000",
    image: "/images/asooke/3.jpg",
  },
  {
    id: 14,
    name: "Two Tone Dotted Asooke",
    type: "Asooke",
    price: "₦20,000",
    image: "/images/asooke/i.jpg",
  },
  {
    id: 15,
    name: "High Textured Asooke",
    type: "Asooke",
    price: "₦40,000",
    image: "/images/asooke/k.jpg",
  },
  {
    id: 16,
    name: "Two Tone Textured Asooke",
    type: "Asooke",
    price: "₦35,000",
    image: "/images/asooke/4.jpg",
  },
  {
    id: 17,
    name: "Multi Color Sleek Asooke",
    type: "Asooke",
    price: "₦45,000",
    image: "/images/asooke/5.jpg",
  },
  {
    id: 18,
    name: "Earth-Toned Saki Robe",
    type: "Saki",
    price: "₦52,500",
    image: "/images/saki1.jpg",
  },
  {
    id: 19,
    name: "Crimson Akwete Statement Dress",
    type: "Akwete",
    price: "₦70,000",
    image: "/images//akwete1.jpg",
  },
  {
    id: 20,
    name: "Baby Pink Ocean Weave Asooke",
    type: "Asooke",
    price: "₦40,000",
    image: "/images/asooke/b.jpg",
  },
  {
    id: 21,
    name: "African Asooke Boubou Gown",
    type: "Ready to Wear",
    price: "₦55,000",
    image: "/images/asooke2.jpg",
  },
  {
    id: 22,
    name: "Traditional Bridal Asooke Set",
    type: "Ready to Wear",
    price: "₦95,000",
    image: "/images/asooke/asooke2.jpg",
  },
  {
    id: 23,
    name: "Zara Asooke Ensemble",
    type: "Off the Shelf",
    price: "₦32,000",
    image: "/images/asooke/asooke2.jpg",
  },
  {
    id: 24,
    name: "Tai Turban & Wrapper",
    type: "Off the Shelf",
    price: "₦25,000",
    image: "/images/asooke/asooke2.jpg",
  },
  {
    id: 25,
    name: "Two Tone Textured Asooke",
    type: "Asooke",
    price: "₦40,000",
    image: "/images/asooke/l.jpg",
  },
  {
    id: 26,
    name: "Multi Color Asooke",
    type: "Asooke",
    price: "₦35,000",
    image: "/images/asooke/m.jpg",
  },
  {
    id: 27,
    name: "Multi-Color Sleek Asooke",
    type: "Asooke",
    price: "₦65,000",
    image: "/images/asooke/n.dng",
  },
  {
    id: 28,
    name: "Dual Color Dotted Asooke",
    type: "Asooke",
    price: "₦25,000",
    image: "/images/asooke/o.jpg",
  },
  {
    id: 29,
    name: "Textured Asooke",
    type: "Asooke",
    price: "₦40,000",
    image: "/images/asooke/p.jpg",
  },
  {
    id: 30,
    name: "Textured Metallic Asooke",
    type: "Asooke",
    price: "₦55,000",
    image: "/images/asooke/q.dng",
  },
  {
    id: 31,
    name: "Asooke Handwoven Bag",
    type: "Off the Shelf",
    price: "₦20,000",
    image: "/images/asooke2.jpg",
  },
  {
    id: 32,
    name: "Dual-Color Textured Asooke",
    type: "Asooke",
    price: "₦35,000",
    image: "/images/asooke/r.jpg",
  },
  {
    id: 33,
    name: "Lilac Metallic Asooke",
    type: "Asooke",
    price: "₦65,000",
    image: "/images/asooke/s.jpeg",
  },
  {
    id: 34,
    name: "Textured Asooke",
    type: "Asooke",
    price: "₦40,000",
    image: "/images/asooke/t.jpg",
  },
  {
    id: 35,
    name: "Multi-Color Linen Asooke",
    type: "Asooke",
    price: "₦25,000",
    image: "/images/asooke/u.jpg",
  },
  {
    id: 36,
    name: "Metallic Textured Asooke",
    type: "Asooke",
    price: "₦40,000",
    image: "/images/asooke/v.jpg",
  },
  {
    id: 37,
    name: "Navy Blue Textured Asooke",
    type: "Asooke",
    price: "₦45,000",
    image: "/images/asooke/w.dng",
  },
  {
    id: 38,
    name: "Sunset Yellow Textured Asooke",
    type: "Asooke",
    price: "₦40,000",
    image: "/images/asooke/x.jpg",
  },
  {
    id: 39,
    name: "Gray Metallic Asooke",
    type: "Asooke",
    price: "₦42,000",
    image: "/images/asooke/y.jpeg",
  },
  {
    id: 40,
    name: "3-Color Trado Asooke",
    type: "Asooke",
    price: "₦35,000",
    image: "/images/asooke/z.jpg",
  },
  // {
  //   id: 43,
  //   name: "Royal Blue Bridal Asooke",
  //   type: "Asooke",
  //   price: "₦65,000",
  //   image: "/images/asooke/7.jpg",
  // },
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
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const filterFromUrl = searchParams.get("filter");
    if (filterFromUrl && fabricFilters.includes(filterFromUrl)) {
      setActiveFilter(filterFromUrl);
    }
  }, [searchParams]);

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
                  fallbackSrc="/images/asooke/placeholder.png"
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
