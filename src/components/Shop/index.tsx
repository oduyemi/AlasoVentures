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
    "id": 1,
    "name": "Tonic Blend Asooke",
    "type": "Asooke",
    "price": "₦40,000",
    "image": "/images/asooke/a.jpg"
  },
  {
    "id": 2,
    "name": "Ivory & Gold Kente Wrap",
    "type": "Kente",
    "price": "₦48,000",
    "image": "/images/kente1.jpg"
  },
  {
    "id": 3,
    "name": "4-Color Textured Asooke",
    "type": "Asooke",
    "price": "₦35,000",
    "image": "/images/asooke/6.jpg"
  },
  {
    "id": 4,
    "name": "Blue Two Tone Asooke",
    "type": "Asooke",
    "price": "₦35,000",
    "image": "/images/asooke/7.jpg"
  },
  {
    "id": 5,
    "name": "Coffee Brown Glove",
    "type": "Asooke",
    "price": "₦30,000",
    "image": "/images/asooke/glove.jpg"
  },
  {
    "id": 6,
    "name": "Rich Lemon Asooke",
    "type": "Asooke",
    "price": "₦40,000",
    "image": "/images/asooke/d.jpg"
  },
  {
    "id": 7,
    "name": "Wine Red Textured Asooke",
    "type": "Asooke",
    "price": "₦30,000",
    "image": "/images/asooke/e.jpg"
  },
  {
    "id": 8,
    "name": "Dreamy Blue Bridal Asooke",
    "type": "Asooke",
    "price": "₦30,000",
    "image": "/images/asooke/f.jpg"
  },
  {
    "id": 9,
    "name": "Multi-color Linen Asooke",
    "type": "Asooke",
    "price": "₦30,000",
    "image": "/images/asooke/g.jpg"
  },
  {
    "id": 10,
    "name": "Two Piece Asooke",
    "type": "Asooke",
    "price": "₦30,000",
    "image": "/images/asooke/h.jpg"
  },
  {
    "id": 11,
    "name": "Lemon Green Glitter Asooke",
    "type": "Asooke",
    "price": "₦40,000",
    "image": "/images/asooke/1.jpg"
  },
  {
    "id": 12,
    "name": "Burgundy Glitter Asooke",
    "type": "Asooke",
    "price": "₦40,000",
    "image": "/images/asooke/2.jpg"
  },
  {
    "id": 13,
    "name": "Deep Green Glitter Asooke",
    "type": "Asooke",
    "price": "₦40,000",
    "image": "/images/asooke/3.jpg"
  },
  {
    "id": 14,
    "name": "Two Tone Dotted Asooke",
    "type": "Asooke",
    "price": "₦20,000",
    "image": "/images/asooke/i.jpg"
  },
  {
    "id": 15,
    "name": "High Textured Asooke",
    "type": "Asooke",
    "price": "₦40,000",
    "image": "/images/asooke/k.jpg"
  },
  {
    "id": 16,
    "name": "Two Tone Textured Asooke",
    "type": "Asooke",
    "price": "₦35,000",
    "image": "/images/asooke/4.jpg"
  },
  {
    "id": 17,
    "name": "Multi Color Sleek Asooke",
    "type": "Asooke",
    "price": "₦45,000",
    "image": "/images/asooke/5.jpg"
  },
  {
    "id": 18,
    "name": "Earth-Toned Saki Robe",
    "type": "Saki",
    "price": "₦52,500",
    "image": "/images/saki1.jpg"
  },
  {
    "id": 19,
    "name": "Crimson Akwete Statement Dress",
    "type": "Akwete",
    "price": "₦70,000",
    "image": "/images/akwete1.jpg"
  },
  {
    "id": 20,
    "name": "Baby Pink Ocean Weave Asooke",
    "type": "Asooke",
    "price": "₦40,000",
    "image": "/images/asooke/b.jpg"
  },
  {
    "id": 21,
    "name": "African Asooke Boubou Gown",
    "type": "Ready to Wear",
    "price": "₦55,000",
    "image": "/images/asooke2.jpg"
  },
  {
    "id": 22,
    "name": "Traditional Bridal Asooke Set",
    "type": "Ready to Wear",
    "price": "₦95,000",
    "image": "/images/asooke/asooke2.jpg"
  },
  {
    "id": 23,
    "name": "Zara Asooke Ensemble",
    "type": "Off the Shelf",
    "price": "₦32,000",
    "image": "/images/asooke/asooke2.jpg"
  },
  {
    "id": 24,
    "name": "Tai Turban & Wrapper",
    "type": "Off the Shelf",
    "price": "₦25,000",
    "image": "/images/asooke/asooke2.jpg"
  },
  {
    "id": 25,
    "name": "Two Tone Textured Asooke (Variant)",
    "type": "Asooke",
    "price": "₦40,000",
    "image": "/images/asooke/l.jpg"
  },
  {
    "id": 26,
    "name": "Multi Color Asooke",
    "type": "Asooke",
    "price": "₦35,000",
    "image": "/images/asooke/m.jpg"
  },
  {
    "id": 27,
    "name": "Multi-Color Sleek Asooke (Premium)",
    "type": "Asooke",
    "price": "₦65,000",
    "image": "/images/asooke/n.jpg"
  },
  {
    "id": 28,
    "name": "Dual Color Dotted Asooke",
    "type": "Asooke",
    "price": "₦25,000",
    "image": "/images/asooke/o.jpg"
  },
  {
    "id": 29,
    "name": "Textured Asooke",
    "type": "Asooke",
    "price": "₦40,000",
    "image": "/images/asooke/p.jpg"
  },
  {
    "id": 30,
    "name": "Textured Metallic Asooke",
    "type": "Asooke",
    "price": "₦55,000",
    "image": "/images/asooke/q.jpg"
  },
  {
    "id": 31,
    "name": "Asooke Handwoven Bag",
    "type": "Off the Shelf",
    "price": "₦20,000",
    "image": "/images/asooke2.jpg"
  },
  {
    "id": 32,
    "name": "Dual-Color Textured Asooke",
    "type": "Asooke",
    "price": "₦35,000",
    "image": "/images/asooke/r.jpg"
  },
  {
    "id": 33,
    "name": "Lilac Metallic Asooke",
    "type": "Asooke",
    "price": "₦65,000",
    "image": "/images/asooke/s.jpeg"
  },
  {
    "id": 34,
    "name": "Textured Asooke (Variant)",
    "type": "Asooke",
    "price": "₦40,000",
    "image": "/images/asooke/t.jpg"
  },
  {
    "id": 35,
    "name": "Multi-Color Linen Asooke",
    "type": "Asooke",
    "price": "₦25,000",
    "image": "/images/asooke/u.jpg"
  },
  {
    "id": 36,
    "name": "Metallic Textured Asooke",
    "type": "Asooke",
    "price": "₦40,000",
    "image": "/images/asooke/v.jpg"
  },
  {
    "id": 37,
    "name": "Navy Blue Textured Asooke",
    "type": "Asooke",
    "price": "₦45,000",
    "image": "/images/asooke/w.jpg"
  },
  {
    "id": 38,
    "name": "Sunset Yellow Textured Asooke",
    "type": "Asooke",
    "price": "₦40,000",
    "image": "/images/asooke/x.jpg"
  },
  {
    "id": 39,
    "name": "Gray Metallic Asooke",
    "type": "Asooke",
    "price": "₦42,000",
    "image": "/images/asooke/y.jpeg"
  },
  {
    "id": 40,
    "name": "3-Color Trado Asooke",
    "type": "Asooke",
    "price": "₦35,000",
    "image": "/images/asooke/z.jpg"
  }
]

const fabricFilters = [
  "All",
  "Asooke",
  "Kente",
  "Saki",
  "Akwete",
  "Off the Shelf",
  "Ready to Wear",
];

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
    <Box py={{ base: 12, md: 20 }} minH="100vh" bg="gray.50">
      <Container maxW="7xl">
        {/* Section Header */}
        <VStack spacing={4} textAlign="center" mb={10}>
          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            bgGradient="linear(to-r, #C28840, #0D0D0D)"
            bgClip="text"
            as={motion.h2}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 } as any}
          >
            Shop Our Collection
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
            maxW="2xl"
            as={motion.p}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 } as any}
          >
            Discover timeless craftsmanship and culturally rooted fashion
            pieces.
          </Text>
        </VStack>

        {/* Filters */}
        <HStack spacing={3} justify="center" mb={12} flexWrap="wrap">
          {fabricFilters.map((filter) => (
            <MotionButton
              key={filter}
              variant={activeFilter === filter ? "solid" : "outline"}
              colorScheme="yellow"
              borderRadius="full"
              size="sm"
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {filter}
            </MotionButton>
          ))}
        </HStack>

        {/* Product Grid */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          spacing={{ base: 6, md: 10 }}
          position="relative"
          minH="500px"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <MotionBox
                key={product.id}
                bg="white"
                rounded="2xl"
                overflow="hidden"
                border="1px solid"
                borderColor="gray.200"
                shadow="sm"
                cursor="pointer"
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                _hover={{
                  shadow: "xl",
                  transform: "translateY(-6px)",
                }}
              >
                {/* Product Image */}
                <Box overflow="hidden" h="250px">
                  <Image
                    src={product.image}
                    alt={product.name}
                    objectFit="cover"
                    h="full"
                    w="full"
                    fallbackSrc="/images/asooke/placeholder.png"
                    transition="transform 0.4s ease"
                    _groupHover={{ transform: "scale(1.05)" }}
                  />
                </Box>

                {/* Product Details */}
                <Stack p={5} spacing={3}>
                  <HStack justify="space-between">
                    <Badge
                      px={2}
                      py={1}
                      rounded="full"
                      fontSize="0.7rem"
                      bg="yellow.100"
                      color="yellow.800"
                    >
                      {product.type}
                    </Badge>
                    <Text fontWeight="bold" color="gray.800">
                      {product.price}
                    </Text>
                  </HStack>
                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    bgGradient="linear(to-r, #0D0D0D, #C28840)"
                    bgClip="text"
                    noOfLines={2}
                  >
                    {product.name}
                  </Text>
                  <Button
                    size="sm"
                    mt={2}
                    colorScheme="yellow"
                    variant="outline"
                    borderRadius="full"
                    _hover={{
                      bg: "#C28840",
                      color: "white",
                      borderColor: "#C28840",
                    }}
                  >
                    View Details
                  </Button>
                </Stack>
              </MotionBox>
            ))}
          </AnimatePresence>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
