import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

export const AboutSection = () => {
  const textColor = useColorModeValue('gray.200', 'gray.400');
  const imageShadow = useColorModeValue('xl', '2xl');
  const imageMaxW = useBreakpointValue({ base: '100%', md: '400px' });

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      align="center"
      justify="center"
      px={{ base: 6, md: 20 }}
      py={{ base: 12, md: 24 }}
      gap={{ base: 12, md: 16 }}
      bg={useColorModeValue('#0D0D0D', 'gray.900')}
    >
      {/* Text Content */}
      <MotionBox
        flex="1"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading
          as="h2"
          fontSize={{ base: '3xl', md: '4xl' }}
          fontWeight="extrabold"
          mb={6}
          bgGradient="linear(to-r, #C28840, #fff)"
          bgClip="text"
        >
          Hi, we&apos;re Kòfowórọlá Alásọ Ventures.
        </Heading>

        <Text fontSize="lg" color={textColor} mb={4} lineHeight="1.8">
          Founded by <strong>Kòfowórọlá Aró</strong>, our brand celebrates heritage, craftsmanship, and culture through timeless fashion and fabric artistry.
        </Text>

        <Text fontSize="lg" color={textColor} lineHeight="1.8">
          At Kòfowórọlá Alásọ Ventures, we design elegant, African-inspired clothing and textiles that tell stories, honor tradition, and inspire confidence. Our mission is to wrap you in beauty and boldness—one stitch at a time.
        </Text>
      </MotionBox>

      {/* Image Section */}
      <MotionImage
        borderRadius="2xl"
        boxShadow={imageShadow}
        src="/images/kofo.jpg"
        alt="Kofoworola Aro, CEO of Kòfowórọlá Alásọ Ventures"
        objectFit="cover"
        maxW={imageMaxW}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
      />
    </Flex>
  );
};
