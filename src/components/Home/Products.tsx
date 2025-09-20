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
  IconButton,
  useColorModeValue,
  ButtonGroup,
} from "@chakra-ui/react";
import { FaHeart, FaSearch, FaBalanceScale } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  label?: string;
  category: "ready-made" | "fabrics" | "accessories";
}

const productItems: Product[] = [
  {
    id: 1,
    name: "Two Piece Asooke",
    price: 30000,
    image: "/images/asooke/h.jpg",
    label: "New",
    category: "fabrics",
  },
  {
    id: 2,
    name: "Piqué Biker Jacket",
    price: 67.24,
    image: "img/product/product-2.jpg",
    category: "accessories",
  },
  {
    id: 3,
    name: "Two Tone Dotted Asooke",
    price: 20000,
    image: "/images/asooke/i.jpg",
    label: "Sale",
    category: "fabrics",
  },
  {
    id: 4,
    name: "Diagonal Textured Cap",
    price: 60.9,
    image: "img/product/product-4.jpg",
    category: "accessories",
  },
  {
    id: 5,
    name: "Tonic Blend Asooke",
    price: 40000,
    image: "/images/asooke/a.jpg",
    category: "fabrics",
  },
  {
    id: 6,
    name: "Ankle Boots",
    price: 98.49,
    image: "img/product/product-6.jpg",
    label: "Sale",
    category: "accessories",
  },
  {
    id: 7,
    name: "Ankle Boots",
    price: 98.49,
    image: "img/product/product-6.jpg",
    label: "Sale",
    category: "ready-made",
  },
  {
    id: 11,
    name: "High Textured Asooke",
    price: 40000,
    image: "/images/asooke/k.jpg",
    label: "Sale",
    category: "fabrics",
  },
];

export const Products: React.FC = () => {
  const [filter, setFilter] = React.useState<Product["category"]>("ready-made");

  const filteredProducts =
    filter === "ready-made"
      ? productItems
      : productItems.filter((product) => product.category === filter);

  const categoryToPath: Record<Product["category"], string> = {
    "ready-made": "/shop?filter=Ready to Wear",
    fabrics: "/shop?filter=Asooke",
    accessories: "/shop?filter=Off The Shelf",
  };

  const ctaLink = categoryToPath[filter];
  const displayedProducts = filteredProducts.slice(0, 4);

  const cardBg = useColorModeValue("whiteAlpha.900", "gray.800");
  const textColor = useColorModeValue("#0D0D0D", "gray.100");

  return (
    <Box py={14} px={{ base: 5, md: 10 }} maxW="1200px" mx="auto">
      {/* Category Filter */}
      <Flex justify="center" mb={10}>
        <ButtonGroup
          isAttached
          variant="outline"
          borderRadius="full"
          overflow="hidden"
        >
          {(["ready-made", "fabrics", "accessories"] as Product["category"][]).map(
            (option) => (
              <Button
                key={option}
                onClick={() => setFilter(option)}
                size="sm"
                px={6}
                textTransform="capitalize"
                fontWeight="semibold"
                colorScheme={filter === option ? "yellow" : "gray"}
                variant={filter === option ? "solid" : "ghost"}
              >
                {option.replace("-", " ")}
              </Button>
            )
          )}
        </ButtonGroup>
      </Flex>

      {/* Product Grid */}
      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap={8}
      >
        {displayedProducts.map((product) => (
          <GridItem
            key={product.id}
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="md"
            overflow="hidden"
            transition="all 0.35s ease"
            _hover={{ transform: "translateY(-6px)", boxShadow: "xl" }}
            display="flex"
            flexDirection="column"
          >
            {/* Product Image */}
            <Box position="relative" h="250px" w="100%">
              {product.label && (
                <Badge
                  position="absolute"
                  top={3}
                  left={3}
                  colorScheme="yellow"
                  px={2}
                  py={1}
                  borderRadius="md"
                  fontSize="xs"
                >
                  {product.label}
                </Badge>
              )}
              <Image
                src={product.image}
                loading="lazy"
                alt={product.name}
                w="100%"
                h="100%"
                objectFit="cover"
                transition="transform 0.4s ease"
                _hover={{ transform: "scale(1.05)" }}
              />
            </Box>

            {/* Icons */}
            <Flex justify="center" gap={3} mt={3}>
              <IconButton
                aria-label="Like"
                icon={<FaHeart />}
                color={textColor}
                variant="ghost"
                size="sm"
                _hover={{ color: "#C28840" }}
              />
              <IconButton
                aria-label="Compare"
                icon={<FaBalanceScale />}
                color={textColor}
                variant="ghost"
                size="sm"
                _hover={{ color: "#C28840" }}
              />
              <IconButton
                aria-label="Search"
                icon={<FaSearch />}
                color={textColor}
                variant="ghost"
                size="sm"
                _hover={{ color: "#C28840" }}
              />
            </Flex>

            {/* Product Info */}
            <Box p={4} mt="auto" textAlign="center">
              <Text
                fontWeight="bold"
                fontSize="md"
                bgGradient="linear(to-r, #C28840, #0D0D0D)"
                bgClip="text"
                mb={2}
              >
                {product.name}
              </Text>
              <Text fontWeight="bold" color="#C28840" fontSize="lg" mb={3}>
                ₦{product.price.toFixed(2)}
              </Text>
              <Button
                size="md"
                w="full"
                borderRadius="full"
                variant="outline"
                borderColor="#C28840"
                color="#C28840"
                _hover={{
                  bg: "#C28840",
                  color: "white",
                  transform: "scale(1.02)",
                }}
                transition="all 0.3s ease"
              >
                Buy via WhatsApp
              </Button>

            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* CTA */}
      <Flex justify="center" mt={12}>
        <Button
          as="a"
          href={ctaLink}
          size="lg"
          px={10}
          borderRadius="full"
          fontWeight="bold"
          bg="#C28840"
          color="white"
          _hover={{
            bg: "#a86d32", // slightly darker shade of #C28840
            transform: "scale(1.05)",
          }}
          transition="all 0.3s ease"
        >
          Shop All {filter.replace("-", " ")}
        </Button>
      </Flex>
    </Box>
  );
};
