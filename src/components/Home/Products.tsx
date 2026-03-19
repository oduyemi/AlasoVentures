"use client";
import React from "react";
import {
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  Badge,
  Flex,
  Image,
  useColorModeValue,
  ButtonGroup,
  VStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  HStack,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface Product {
  id: number;
  name: string;
  image: string;
  category: "ready-made" | "fabrics" | "accessories";
  type: string;
}

const productItems: Product[] = [
  { id: 1, name: "Two Piece Asooke", image: "/images/asooke/h.jpg", category: "fabrics", type: "Asooke" },
  { id: 3, name: "Two Tone Dotted Asooke", image: "/images/asooke/i.jpg", category: "fabrics", type: "Asooke" },
  { id: 5, name: "Tonic Blend Asooke", image: "/images/asooke/a.jpg", category: "fabrics", type: "Asooke" },
  { id: 7, name: "Bridal Asooke Set", image: "/images/asooke/asooke2.jpg", category: "ready-made", type: "Ready to Wear" },
  { id: 11, name: "High Textured Asooke", image: "/images/asooke/k.jpg", category: "fabrics", type: "Asooke" },
];

const categoryPricing: Record<string, string> = {
  fabrics: "₦25,000 – ₦65,000",
  "ready-made": "₦55,000 – ₦100,000",
  accessories: "₦20,000 – ₦35,000",
};

export const Products: React.FC = () => {
  const [filter, setFilter] = React.useState<Product["category"]>("ready-made");
  const [cart, setCart] = React.useState<Product[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredProducts =
    filter === "ready-made"
      ? productItems
      : productItems.filter((product) => product.category === filter);

  const displayedProducts = filteredProducts.slice(0, 4);

  const toggleCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  const generateWhatsAppLink = () => {
    const phone = "2347034739950";
    const message = `Hello, I’d like to pre-order the following:%0A%0A${cart
      .map((item, i) => `${i + 1}. ${item.name} (${item.type})`)
      .join("%0A")}%0A%0APlease share pricing and availability.`;
    return `https://wa.me/${phone}?text=${message}`;
  };

  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box py={16} px={{ base: 5, md: 10 }} maxW="1200px" mx="auto">
      {/* Filter */}
      <Flex justify="center" mb={6}>
        <ButtonGroup borderRadius="full">
          {(["ready-made", "fabrics", "accessories"] as Product["category"][]).map((option) => (
            <Button
              key={option}
              onClick={() => setFilter(option)}
              size="sm"
              px={6}
              textTransform="capitalize"
              colorScheme={filter === option ? "yellow" : "gray"}
              variant={filter === option ? "solid" : "ghost"}
            >
              {option.replace("-", " ")}
            </Button>
          ))}
        </ButtonGroup>
      </Flex>

      {/* Price Range */}
      <Text textAlign="center" mb={10} fontSize="sm" color="gray.500">
        Price Range: {categoryPricing[filter]}
      </Text>

      {/* Grid */}
      <Grid templateColumns={{ base: "1fr", sm: "repeat(2,1fr)", md: "repeat(4,1fr)" }} gap={8}>
        {displayedProducts.map((product) => {
          const isSelected = cart.find((item) => item.id === product.id);

          return (
            <GridItem
              key={product.id}
              bg={cardBg}
              borderRadius="2xl"
              overflow="hidden"
              border="1px solid"
              borderColor={isSelected ? "yellow.400" : "gray.100"}
              shadow={isSelected ? "lg" : "sm"}
              cursor="pointer"
              onClick={() => toggleCart(product)}
              _hover={{ transform: "translateY(-6px)", shadow: "xl" }}
              transition="0.3s"
            >
              <Box position="relative" h="220px">
                <Image src={product.image} alt={product.name} w="100%" h="100%" objectFit="cover" />

                {isSelected && (
                  <Badge position="absolute" top={3} right={3} colorScheme="green" borderRadius="full" px={3}>
                    Selected
                  </Badge>
                )}
              </Box>

              <VStack p={4} spacing={2}>
                <Badge colorScheme="yellow">{product.type}</Badge>
                <Text fontWeight="semibold" textAlign="center">
                  {product.name}
                </Text>
              </VStack>
            </GridItem>
          );
        })}
      </Grid>

      {/* Floating CTA */}
      {cart.length > 0 && (
        <Button
          position="fixed"
          bottom="30px"
          right="30px"
          colorScheme="yellow"
          borderRadius="full"
          onClick={onOpen}
        >
          View Selection ({cart.length})
        </Button>
      )}

      {/* Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Your Selection ({cart.length})</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {cart.map((item) => (
                <Box key={item.id}>
                  <HStack justify="space-between">
                    <HStack>
                      <Image src={item.image} boxSize="50px" rounded="md" />
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
            <Button as="a" href={generateWhatsAppLink()} target="_blank" colorScheme="yellow" w="full">
              Send to WhatsApp
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* CTA */}
      <Flex justify="center" mt={14}>
        <Button
          as="a"
          href={`/shop?filter=${filter === "fabrics" ? "Asooke" : filter === "ready-made" ? "Ready to Wear" : "Off the Shelf"}`}
          size="lg"
          px={10}
          borderRadius="full"
          bg="#C28840"
          color="white"
          _hover={{ bg: "#a86d32", transform: "scale(1.05)" }}
        >
          Explore More
        </Button>
      </Flex>
    </Box>
  );
};