import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  Flex,
  Fade,
} from '@chakra-ui/react';
import { CountdownTimer } from '../CountdownTimer';

const deals = [
  {
    id: 1,
    title: 'Aso Oke',
    subtitle: 'Made To Fit',
    category: 'fabrics',
    image: '/images/sewing.jpg',
    price: '₦29,999',
    product: 'Multi-pocket Chest Bag Black',
    cta: '/shop/asooke',
    targetDate: '2025-06-01T00:00:00',
  },
  {
    id: 2,
    title: 'Ready To Wear',
    subtitle: 'Classic Looks',
    category: 'ready-made',
    image: '/images/cloth.jpg',
    price: '₦94,500',
    product: 'Tailored Couple Wears',
    cta: '/shop/ready-to-wear',
    targetDate: '2025-06-05T12:00:00',
  },
  {
    id: 3,
    title: 'Off The Shelf',
    subtitle: 'Accessories',
    category: 'accessories',
    image: '/images/accessory.jpeg',
    price: '₦12,000',
    product: 'The Cultured Lady Cap',
    cta: '/shop/off-the-shelf',
    targetDate: '2025-06-10T08:00:00',
  },
];

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const Deals: React.FC = () => {
  const randomizedDeals = useMemo(() => shuffleArray(deals), []);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const changeDeal = (newIndex: number) => {
    setIsVisible(false);
    setTimeout(() => {
      setIndex(newIndex);
      setIsVisible(true);
    }, 300);
  };

  const deal = randomizedDeals[index];

  return (
    <Box py={16} px={6} maxW="7xl" mx="auto">
      <Fade in={isVisible} unmountOnExit>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          gap={10}
          bgGradient="linear(to-r, rgba(13,13,13,0.95), rgba(40,40,40,0.85))"
          backdropFilter="blur(12px)"
          color="white"
          p={{ base: 6, md: 12 }}
          borderRadius="2xl"
          boxShadow="2xl"
          overflow="hidden"
        >
          {/* Left Section */}
          <VStack align="start" spacing={5} flex={1}>
            <Text fontSize="xl" color="gray.400" fontWeight="medium">
              {deal.subtitle}
            </Text>
            <Heading
              size="2xl"
              lineHeight="short"
              letterSpacing="tight"
              fontWeight="extrabold"
            >
              <Text as="span" bgGradient="linear(to-r, #C28840, #fff)" bgClip="text">
                {deal.title}
              </Text>
            </Heading>
            <Text fontSize="lg" color="gray.300">
              Deal of the Week
            </Text>
            <Heading size="md" mt={2}>
              {deal.product}
            </Heading>

            <CountdownTimer targetDate={deal.targetDate} />

            <Button
              as="a"
              href={deal.cta}
              mt={6}
              size="lg"
              border="2px solid #C28840"
              color="#C28840"
              variant="outline"
              borderRadius="full"
              px={8}
              _hover={{
                bg: '#C28840',
                color: 'white',
                transform: 'scale(1.05)',
              }}
              transition="all 0.3s ease"
            >
              Explore {deal.title}
            </Button>
          </VStack>

          {/* Right Section */}
          <Box flex={1} maxW="420px" position="relative">
            <Image
              src={deal.image}
              alt={deal.product}
              borderRadius="xl"
              objectFit="cover"
              w="100%"
              h={{ base: 'auto', md: '420px' }}
              transition="all 0.5s ease"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
              }}
            />
            <Box
              position="absolute"
              bottom={4}
              right={4}
              bg="white"
              color="#0D0D0D"
              py={2}
              px={6}
              borderRadius="full"
              fontWeight="bold"
              fontSize="lg"
              boxShadow="lg"
            >
              {deal.price}
            </Box>
          </Box>
        </Flex>
      </Fade>

      {/* Navigation Controls */}
      <HStack justify="center" mt={10} spacing={6}>
        <Button
          onClick={() =>
            changeDeal((index - 1 + randomizedDeals.length) % randomizedDeals.length)
          }
          size="sm"
          borderRadius="full"
          bg="transparent"
          border="1px solid #C28840"
          color="#C28840"
          _hover={{ bg: '#C28840', color: 'white' }}
          isDisabled={!isVisible}
        >
          Previous
        </Button>
        <Button
          onClick={() => changeDeal((index + 1) % randomizedDeals.length)}
          size="sm"
          borderRadius="full"
          bg="transparent"
          border="1px solid #C28840"
          color="#C28840"
          _hover={{ bg: '#C28840', color: 'white' }}
          isDisabled={!isVisible}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};
