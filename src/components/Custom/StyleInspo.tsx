"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  AspectRatio,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";

const MotionBox = motion(chakra.div);

export const StyleInspoVideo = () => {
  const bg = useColorModeValue("#ffffff", "#0D0D0D");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      bg={bg}
      py={{ base: 16, md: 24 }}
      px={4}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-10%"
        right="-10%"
        w="50%"
        h="50%"
        bgGradient="radial(circle, rgba(194,136,64,0.12), transparent 70%)"
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <VStack spacing={6} textAlign="center" mb={14}>
          <Heading
            fontSize={{ base: "3xl", md: "5xl" }}
            lineHeight="shorter"
            bgGradient="linear(to-r, #C28840, #0D0D0D)"
            bgClip="text"
            letterSpacing="tight"
          >
            Style Inspiration
          </Heading>

          <Text maxW="3xl" color={textColor} fontSize="lg">
            Experience our finest bespoke creations in motion—from breathtaking bridal couture to timeless couple ensembles. Let each design inspire your next unforgettable look.
          </Text>
        </VStack>

        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          maxW="6xl"
          mx="auto"
          borderRadius="3xl"
          overflow="hidden"
          boxShadow="2xl"
          border="1px solid"
          borderColor="rgba(194,136,64,0.2)"
        >
          <AspectRatio ratio={16 / 9}>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Style Inspiration Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 0 }}
            />
          </AspectRatio>
        </MotionBox>
      </Container>
    </Box>
  );
};