/* eslint-disable */ 
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { CloseIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

const products = [
  {
    "id": 1,
    "name": "Tonic Blend Asooke",
    "type": "Asooke",
    "image": "/images/asooke/a.jpg"
  },
  {
    "id": 2,
    "name": "Ivory & Gold Kente Wrap",
    "type": "Kente",
    "image": "/images/kente1.jpg"
  },
  {
    "id": 3,
    "name": "4-Color Textured Asooke",
    "type": "Asooke",
    "image": "/images/asooke/6.jpg"
  },
  {
    "id": 4,
    "name": "Blue Two Tone Asooke",
    "type": "Asooke",
    "image": "/images/asooke/7.jpg"
  },
  {
    "id": 5,
    "name": "Coffee Brown Glove",
    "type": "Asooke",
    "image": "/images/asooke/glove.jpg"
  },
  {
    "id": 6,
    "name": "Rich Lemon Asooke",
    "type": "Asooke",
    "image": "/images/asooke/d.jpg"
  },
  {
    "id": 7,
    "name": "Wine Red Textured Asooke",
    "type": "Asooke",
    "image": "/images/asooke/e.jpg"
  },
  {
    "id": 8,
    "name": "Dreamy Blue Bridal Asooke",
    "type": "Asooke",
    "image": "/images/asooke/f.jpg"
  },
  {
    "id": 9,
    "name": "Multi-color Linen Asooke",
    "type": "Asooke",
    "image": "/images/asooke/g.jpg"
  },
  {
    "id": 10,
    "name": "Two Piece Asooke",
    "type": "Asooke",
    "image": "/images/asooke/h.jpg"
  },
  {
    "id": 11,
    "name": "Lemon Green Glitter Asooke",
    "type": "Asooke",
    "image": "/images/asooke/1.jpg"
  },
  {
    "id": 12,
    "name": "Burgundy Glitter Asooke",
    "type": "Asooke",
    "image": "/images/asooke/2.jpg"
  },
  {
    "id": 13,
    "name": "Deep Green Glitter Asooke",
    "type": "Asooke",
    "image": "/images/asooke/3.jpg"
  },
  {
    "id": 14,
    "name": "Two Tone Dotted Asooke",
    "type": "Asooke",
    "image": "/images/asooke/i.jpg"
  },
  {
    "id": 15,
    "name": "High Textured Asooke",
    "type": "Asooke",
    "image": "/images/asooke/k.jpg"
  },
  {
    "id": 16,
    "name": "Two Tone Textured Asooke",
    "type": "Asooke",
    "image": "/images/asooke/4.jpg"
  },
  {
    "id": 17,
    "name": "Multi Color Sleek Asooke",
    "type": "Asooke",
    "image": "/images/asooke/5.jpg"
  },
  {
    "id": 18,
    "name": "Earth-Toned Saki Robe",
    "type": "Saki",
    "image": "/images/saki1.jpg"
  },
  {
    "id": 19,
    "name": "Crimson Akwete Statement Dress",
    "type": "Akwete",
    "image": "/images/akwete1.jpg"
  },
  {
    "id": 20,
    "name": "Baby Pink Ocean Weave Asooke",
    "type": "Asooke",
    "image": "/images/asooke/b.jpg"
  },
  {
    "id": 21,
    "name": "African Asooke Boubou Gown",
    "type": "Ready to Wear",
    "image": "/images/asooke2.jpg"
  },
  {
    "id": 22,
    "name": "Traditional Bridal Asooke Set",
    "type": "Ready to Wear",
    "image": "/images/asooke/asooke2.jpg"
  },
  {
    "id": 23,
    "name": "Zara Asooke Ensemble",
    "type": "Off the Shelf",
    "image": "/images/asooke/asooke2.jpg"
  },
  {
    "id": 24,
    "name": "Tai Turban & Wrapper",
    "type": "Off the Shelf",
    "image": "/images/asooke/asooke2.jpg"
  },
  {
    "id": 25,
    "name": "Two Tone Textured Asooke (Variant)",
    "type": "Asooke",
    "image": "/images/asooke/l.jpg"
  },
  {
    "id": 26,
    "name": "Multi Color Asooke",
    "type": "Asooke",
    "image": "/images/asooke/m.jpg"
  },
  {
    "id": 27,
    "name": "Multi-Color Sleek Asooke (Premium)",
    "type": "Asooke",
    "image": "/images/asooke/n.DNG"
  },
  {
    "id": 28,
    "name": "Dual Color Dotted Asooke",
    "type": "Asooke",
    "image": "/images/asooke/o.jpg"
  },
  {
    "id": 29,
    "name": "Textured Asooke",
    "type": "Asooke",
    "image": "/images/asooke/p.jpg"
  },
  {
    "id": 30,
    "name": "Textured Metallic Asooke",
    "type": "Asooke",
    "image": "/images/asooke/q.dng"
  },
  {
    "id": 31,
    "name": "Asooke Handwoven Bag",
    "type": "Off the Shelf",
    "image": "/images/asooke2.jpg"
  },
  {
    "id": 32,
    "name": "Dual-Color Textured Asooke",
    "type": "Asooke",
    "image": "/images/asooke/r.jpg"
  },
  // {
  //   "id": 33,
  //   "name": "Lilac Metallic Asooke",
  //   "type": "Asooke",
  //   "image": "/images/asooke/s.JPEG"
  // },
  {
    "id": 33,
    "name": "Textured Asooke (Variant)",
    "type": "Asooke",
    "image": "/images/asooke/t.jpg"
  },
  {
    "id": 34,
    "name": "Multi-Color Linen Asooke",
    "type": "Asooke",
    "image": "/images/asooke/u.jpg"
  },
  {
    "id": 35,
    "name": "Metallic Textured Asooke",
    "type": "Asooke",
    "image": "/images/asooke/v.jpg"
  },
  {
    "id": 36,
    "name": "Navy Blue Textured Asooke",
    "type": "Asooke",
    "image": "/images/asooke/w.jpg"
  },
  {
    "id": 37,
    "name": "Sunset Yellow Textured Asooke",
    "type": "Asooke",
    "image": "/images/asooke/x.jpg"
  },
  {
    "id": 38,
    "name": "Gray Metallic Asooke",
    "type": "Asooke",
    "image": "/images/asooke/y.jpeg"
  },
  {
    "id": 39,
    "name": "3-Color Trado Asooke",
    "type": "Asooke",
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

const categoryPricing: Record<string, string> = {
  Asooke: "₦25,000 – ₦65,000",
  Kente: "₦40,000 – ₦50,000",
  Saki: "₦50,000 – ₦60,000",
  Akwete: "₦65,000 – ₦80,000",
  "Off the Shelf": "₦20,000 – ₦35,000",
  "Ready to Wear": "₦55,000 – ₦100,000",
};

export const Shop = () => {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const toggleCart = (product: any) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  const generateWhatsAppLink = () => {
    const phone = "2347034739950";

    const message = `Hello, I’d like to pre-order the following items:%0A%0A${cart
      .map((item, i) => `${i + 1}. ${item.name} (${item.type})`)
      .join("%0A")}%0A%0APlease share pricing, availability, and customization options.`;

    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <Box py={{ base: 12, md: 20 }} minH="100vh" bg="gray.50">
      <Container maxW="7xl">
        {/* Header */}
        <VStack spacing={4} textAlign="center" mb={12}>
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            bgGradient="linear(to-r, #C28840, #0D0D0D)"
            bgClip="text"
          >
            Explore Our Fabrics
          </Heading>
          <Text color="gray.600" maxW="2xl">
            Tap to select styles you love and send your selection via WhatsApp for pricing and customization.
          </Text>
        </VStack>

        {/* Filters */}
        <HStack spacing={3} justify="center" mb={6} flexWrap="wrap">
          {fabricFilters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "solid" : "ghost"}
              colorScheme="yellow"
              borderRadius="full"
              size="sm"
              px={5}
              _hover={{ transform: "scale(1.05)" }}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </HStack>

        {/* Price Range */}
        {activeFilter !== "All" && (
          <Text textAlign="center" mb={10} color="gray.500" fontSize="sm">
            Price Range: {categoryPricing[activeFilter]}
          </Text>
        )}

        {/* Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {filteredProducts.map((product) => {
            const isSelected = cart.find((item) => item.id === product.id);

            return (
              <MotionBox
                key={product.id}
                bg="white"
                rounded="2xl"
                overflow="hidden"
                border="1px solid"
                borderColor={isSelected ? "yellow.400" : "gray.100"}
                shadow={isSelected ? "lg" : "sm"}
                cursor="pointer"
                onClick={() => toggleCart(product)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <Box position="relative" h="240px" overflow="hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    objectFit="cover"
                    h="full"
                    w="full"
                    transition="0.4s"
                    _hover={{ transform: "scale(1.08)" }}
                  />

                  {isSelected && (
                    <Badge
                      position="absolute"
                      top={3}
                      right={3}
                      colorScheme="green"
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      Selected
                    </Badge>
                  )}
                </Box>

                <Stack p={4} spacing={2}>
                  <Badge w="fit-content" colorScheme="yellow">
                    {product.type}
                  </Badge>
                  <Text fontWeight="semibold" fontSize="md">
                    {product.name}
                  </Text>
                </Stack>
              </MotionBox>
            );
          })}
        </SimpleGrid>

        {/* Floating Button */}
        {cart.length > 0 && (
          <Button
            position="fixed"
            bottom="30px"
            right="12%"
            colorScheme="yellow"
            borderRadius="full"
            px={6}
            py={6}
            shadow="xl"
            onClick={onOpen}
          >
            View Selection ({cart.length})
          </Button>
        )}

        {/* Drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              Your Selection ({cart.length})
            </DrawerHeader>

            <DrawerBody>
              <VStack spacing={4} align="stretch">
                {cart.map((item) => (
                  <Box key={item.id}>
                    <HStack justify="space-between">
                      <HStack>
                        <Image
                          src={item.image}
                          boxSize="50px"
                          objectFit="cover"
                          rounded="md"
                        />
                        <Text fontSize="sm">{item.name}</Text>
                      </HStack>
                      <IconButton
                        aria-label="remove"
                        icon={<CloseIcon />}
                        size="xs"
                        onClick={() => toggleCart(item)}
                      />
                    </HStack>
                    <Divider mt={3} />
                  </Box>
                ))}
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              <Button
                as="a"
                href={generateWhatsAppLink()}
                target="_blank"
                colorScheme="yellow"
                w="full"
                size="lg"
              >
                Send to WhatsApp
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Container>
    </Box>
  );
};