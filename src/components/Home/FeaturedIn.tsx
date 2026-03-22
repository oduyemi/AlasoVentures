"use client";
import {
  Box,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const featuredLogos = [
  {
    name: "Style Afrique",
    src: "/images/featured/styleafrique.png",
    alt: "Style Afrique",
    link: "https://1styleafrique.wordpress.com/2024/03/05/nana-akua-addo-the-style-goddess-from-ghana-putting-african-fashion-on-the-map/",
  },
  {
    name: "BellaNaija Weddings",
    src: "/images/featured/bellanaijawedding.png",
    alt: "BellaNaija Weddings",
    link: "https://www.bellanaijaweddings.com/jewel-shot-it-yoruba-beauty-look/",
  },
  {
    name: "A million Styles",
    src: "/images/featured/mstyles.png",
    alt: "A Million Styles",
    link: "https://amillionstyles.com/latest-fashion-style/lookbook-bridal-photoshoot-inspiration-vol-2-2/amp/",
  },
  {
    name: "BellaNaija Style",
    src: "/images/featured/bellanaijastyles.png",
    alt: "BellaNaija Styles",
    link: "https://www.bellanaijastyle.com/abisola-akintunde-bridal-shower/",
  },
  {
    name: "Style Afrique",
    src: "/images/featured/styleafrique.png",
    alt: "Style Afrique",
    link: "https://1styleafrique.wordpress.com/2024/03/05/nana-akua-addo-the-style-goddess-from-ghana-putting-african-fashion-on-the-map/",
  },
  {
    name: "BellaNaija Weddings",
    src: "/images/featured/bellanaijawedding.png",
    alt: "BellaNaija Weddings",
    link: "https://www.bellanaijaweddings.com/jewel-shot-it-yoruba-beauty-look/",
  },
  {
    name: "A million Styles",
    src: "/images/featured/mstyles.png",
    alt: "A Million Styles",
    link: "https://amillionstyles.com/latest-fashion-style/lookbook-bridal-photoshoot-inspiration-vol-2-2/amp/",
  },
  {
    name: "BellaNaija Style",
    src: "/images/featured/bellanaijastyles.png",
    alt: "BellaNaija Styles",
    link: "https://www.bellanaijastyle.com/abisola-akintunde-bridal-shower/",
  },
];

export const FeaturedIn = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const loopedLogos = [...featuredLogos, ...featuredLogos];

  return (
    <Box
      maxW="6xl"
      mx="auto"
      py={{ base: 12, md: 14 }}
      px={{ base: 6, md: 8 }}
      borderTop="1px solid"
      borderColor="gray.100"
      position="relative"
      overflow="hidden"
    >
      {/* Header */}
      <Box textAlign="center" mb={8}>
        <Text
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="0.2em"
          color={textColor}
        >
          Featured In
        </Text>

        <Heading fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold">
          Trusted by leading fashion platforms
        </Heading>
      </Box>

      {/* Gradient fade edges */}
      <Box
        position="absolute"
        left="0"
        top="0"
        bottom="0"
        w="80px"
        bgGradient="linear(to-r, white, transparent)"
        zIndex={2}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        right="0"
        top="0"
        bottom="0"
        w="80px"
        bgGradient="linear(to-l, white, transparent)"
        zIndex={2}
        pointerEvents="none"
      />

      {/* Carousel */}
      <MotionBox
        display="flex"
        gap={{ base: 10, md: 16 }}
        alignItems="center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {loopedLogos.map((logo, index) => (
          <Box
            as="a"
            href={logo.link}
            target="_blank"
            key={index}
            flex="0 0 auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.08)",
            }}
          >
            <Image
              src={logo.src}
              alt={logo.name}
              maxH="34px"
              objectFit="contain"
              transition="all 0.3s ease"
              opacity={0.9}
              _hover={{
                opacity: 1,
                transform: "scale(1.08)",
              }}
            />
          </Box>
        ))}
      </MotionBox>
    </Box>
  );
};