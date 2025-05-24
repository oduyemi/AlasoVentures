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
    image: '/images/clothing.png',
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
    // Start fade out
    setIsVisible(false);

    // After fade out duration, switch deal and fade in
    setTimeout(() => {
      setIndex(newIndex);
      setIsVisible(true);
    }, 300); // fade duration (ms), adjust to match <Fade> duration
  };

  const deal = randomizedDeals[index];

  return (
    <Box py={12} px={6} maxW="7xl" mx="auto">
      <Fade in={isVisible} unmountOnExit>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          gap={10}
          bg="gray.900"
          color="white"
          p={8}
          borderRadius="xl"
          boxShadow="xl"
        >
          <VStack align="start" spacing={4} flex={1}>
            <Text fontSize="xl" fontWeight="medium">
              {deal.subtitle}
            </Text>
            <Heading size="2xl" lineHeight="short">
              <Text as="span" color="#C28840">
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
              border="2px solid white"
              color="white"
              variant="outline"
              _hover={{ bg: 'white', color: 'black' }}
            >
              Explore {deal.title}
            </Button>
          </VStack>

          <Box flex={1} maxW="400px">
            <Image
              src={deal.image}
              alt={deal.product}
              borderRadius="lg"
              objectFit="cover"
              w="100%"
              h={{ base: 'auto', md: '400px' }}
            />
            <Box
              mt={4}
              bg="white"
              color="black"
              py={2}
              px={4}
              borderRadius="full"
              fontWeight="semibold"
              textAlign="center"
            >
              {deal.price}
            </Box>
          </Box>
        </Flex>
      </Fade>

      <HStack justify="center" mt={8} spacing={6}>
        <Button
          onClick={() =>
            changeDeal((index - 1 + randomizedDeals.length) % randomizedDeals.length)
          }
          size="sm"
          variant="ghost"
          colorScheme="whiteAlpha"
          isDisabled={!isVisible} // prevent spamming while fading
        >
          Previous
        </Button>
        <Button
          onClick={() => changeDeal((index + 1) % randomizedDeals.length)}
          size="sm"
          variant="ghost"
          colorScheme="whiteAlpha"
          isDisabled={!isVisible}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};