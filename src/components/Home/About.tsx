"use client";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionText = motion(Text);

export const AboutSection = () => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const mutedText = useColorModeValue("gray.500", "gray.400");
  const imageMaxW = useBreakpointValue({ base: "100%", md: "440px" });

  return (
    <Box
      as="section"
      py={{ base: 16, md: 28 }}
      px={{ base: 6, md: 16 }}
      bg="white"
      position="relative"
      overflow="hidden"
    >
      {/* subtle background glow */}
      <Box
        position="absolute"
        top="-100px"
        right="-100px"
        w="300px"
        h="300px"
        bg="#C28840"
        opacity={0.08}
        filter="blur(120px)"
      />

      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={{ base: 12, md: 20 }}
        maxW="7xl"
        mx="auto"
      >
        {/* TEXT SIDE */}
        <MotionBox
          flex="1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Label */}
          <Text
            fontSize="xs"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color={mutedText}
            mb={4}
          >
            About Us
          </Text>

          {/* Heading */}
          <Heading
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="semibold"
            lineHeight="short"
          >
            Kòfowórọlá Alásọòkè
          </Heading>

          {/* gold accent */}
          <Box mt={4} w="60px" h="2px" bg="#C28840" mb={8} />

          <VStack align="start" spacing={6}>
            <MotionText
              fontSize="lg"
              color={textColor}
              lineHeight="tall"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Founded by{" "}
              <Text as="span" fontWeight="semibold" color="black">
                Kòfowórọlá Aró
              </Text>
              , our brand celebrates heritage, craftsmanship, and culture through
              timeless fashion and fabric artistry.
            </MotionText>

            <MotionText
              fontSize="md"
              color={textColor}
              lineHeight="tall"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              We specialize in bespoke Asọ òkè
              for individuals and groups—crafted for occasions both locally and
              internationally. Through EleganceRTW, we reinterpret tradition into
              modern silhouettes.
            </MotionText>

            <MotionText
              fontSize="md"
              color={textColor}
              lineHeight="tall"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Every piece is woven on pre-order, allowing full personalization of
              pattern, color, and style. This ensures each design is as unique as the
              individual wearing it.
            </MotionText>

            {/* signature line */}
            <MotionText
              fontSize="sm"
              color={mutedText}
              fontStyle="italic"
              pt={4}
              borderTop="1px solid"
              borderColor="blackAlpha.200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              “We don’t just create garments — we weave stories into every thread.”
            </MotionText>
          </VStack>
        </MotionBox>

        {/* IMAGE SIDE */}
        <MotionBox
          flex="1"
          position="relative"
          display="flex"
          justifyContent="center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* glow behind image */}
          <Box
            position="absolute"
            w="100%"
            h="100%"
            bg="#C28840"
            opacity={0.1}
            filter="blur(80px)"
            borderRadius="2xl"
          />

          <MotionImage
            src="/images/kofo.jpg"
            alt="Kofoworola Aro"
            borderRadius="2xl"
            objectFit="cover"
            maxW={imageMaxW}
            position="relative"
            zIndex={1}
            boxShadow="0 20px 60px rgba(0,0,0,0.15)"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
          />
        </MotionBox>
      </Flex>
    </Box>
  );
};