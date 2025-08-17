import React from 'react';
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
} from '@chakra-ui/react';
import { FaHeart, FaSearch, FaBalanceScale } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  label?: string;
  category: 'ready-made' | 'fabrics' | 'accessories';
}

const productItems: Product[] = [
  {
    id: 1,
    name: "Two Piece Asooke",
    price: 30000,
    image: "/images/asooke/h.jpg",
    label: 'New',
    category: 'fabrics'
  },
  {
    id: 2,
    name: 'Piqué Biker Jacket',
    price: 67.24,
    image: 'img/product/product-2.jpg',
    category: 'accessories'
  },
  {
    id: 3,
    name: "Two Tone Dotted Asooke",
    price: 20000,
    image: "/images/asooke/i.jpg",
    label: 'Sale',
    category: 'fabrics'
  },
  {
    id: 4,
    name: 'Diagonal Textured Cap',
    price: 60.9,
    image: 'img/product/product-4.jpg',
    category: 'accessories'
  },
  {
    id: 5,
    name: "Tonic Blend Asooke",
    price: 40000,
    image: "/images/asooke/a.jpg",
    category: 'fabrics'
  },
  {
    id: 6,
    name: 'Ankle Boots',
    price: 98.49,
    image: 'img/product/product-6.jpg',
    label: 'Sale',
    category: 'accessories'
  },
  {
    id: 7,
    name: 'Ankle Boots',
    price: 98.49,
    image: 'img/product/product-6.jpg',
    label: 'Sale',
    category: 'ready-made'
  },
  {
    id: 8,
    name: 'Ankle Boots',
    price: 98.49,
    image: 'img/product/product-6.jpg',
    label: 'Sale',
    category: 'accessories'
  },
  {
    id: 9,
    name: 'Ankle Boots',
    price: 98.49,
    image: 'img/product/product-6.jpg',
    label: 'Sale',
    category: 'ready-made'
  },
  {
    id: 10,
    name: 'Ankle Boots',
    price: 98.49,
    image: 'img/product/product-6.jpg',
    label: 'Sale',
    category: 'ready-made'
  },
  {
    id: 11,
    name: "High Textured Asooke",
    price: 40000,
    image: "/images/asooke/k.jpg",
    label: 'Sale',
    category: 'fabrics'
  },
  {
    id: 12,
    name: 'Ankle Boots',
    price: 98.49,
    image: 'img/product/product-6.jpg',
    label: 'Sale',
    category: 'ready-made'
  }
];


export const Products: React.FC = () => {
  const [filter, setFilter] = React.useState<'ready-made' | Product['category']>('ready-made');
  const filteredProducts =
    filter === 'ready-made' ? productItems : productItems.filter(product => product.category === filter);
    const categoryToPath: Record<Product['category'], string> = {
      'ready-made': '/shop?filter=Ready to Wear',
      fabrics: '/shop?filter=Asooke',
      accessories: '/shop?filter=Off The Shelf',
    };
    const ctaLink = categoryToPath[filter];
    const displayedProducts = filteredProducts.slice(0, 4)
    const bgColor = useColorModeValue('#0D0D0D', 'gray.400');

  return (
    <Box py={10} px={5} maxW="1200px" mx="auto">
      <Flex justify="center" mb={6} gap={4} wrap="wrap">
        {(['ready-made', 'fabrics', 'accessories'] as Product['category'][]).map(option => (
        <Button
            key={option}
            onClick={() => setFilter(option)}
            colorScheme={filter === option ? 'yellow' : 'orange'}
            variant={filter === option ? 'solid' : 'outline'}
            size="sm"
            textTransform="capitalize"
        >
            {option.replace('-', ' ')}
        </Button>
        ))}
      </Flex>

      <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={6}>
        {displayedProducts.map(product => (
          <GridItem
            key={product.id}
            bg={bgColor}
            borderRadius="lg"
            boxShadow="md"
            overflow="hidden"
            transition="transform 0.3s"
            _hover={{ transform: 'scale(1.03)' }}
            display="flex"
            flexDirection="column"
          >
            <Box position="relative" h="250px" w="100%"color="#fff" >
              {product.label && (
                <Badge position="absolute" top={2} left={2} colorScheme="red" px={2}>
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
              />
            </Box>

            <Flex justify="center" gap={4} mt={2}>
              <IconButton aria-label="Like" icon={<FaHeart />} color="#fff" variant="ghost" size="sm" />
              <IconButton aria-label="Compare" icon={<FaBalanceScale />} color="#fff" variant="ghost" size="sm" />
              <IconButton aria-label="Search" icon={<FaSearch />} color="#fff" variant="ghost" size="sm" />
            </Flex>

            <Box p={4} mt="auto">
              <Text fontWeight="bold" bgGradient="linear(to-l,#fff,  #C28840, #fff)" bgClip="text" mb={2}>
                {product.name}
              </Text>
              <Button size="md" bgColor="#fff" color="#0D0D0D" variant="solid" mb={3} w="full">
                Buy via WhatsApp
              </Button>
              <Text fontWeight="bold" color="#C28840" fontSize="lg">
                &#8358;{product.price.toFixed(2)}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>

      <Flex justify="center" mt={8}>
        <Button
          as="a"
          href={ctaLink}
          colorScheme="yellow"
          size="lg"
          px={8}
          borderRadius="full"
          fontWeight="semibold"
        >
          Shop All {filter.replace('-', ' ')}
        </Button>
      </Flex>
    </Box>
  );
};
