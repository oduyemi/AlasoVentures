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
  const textColor = useColorModeValue("gray.700", "gray.300");
  const imageShadow = useColorModeValue("xl", "2xl");
  const imageMaxW = useBreakpointValue({ base: "100%", md: "420px" });
  const bgGradient = useColorModeValue(
    "linear(to-r, white, gray.50)",
    "linear(to-r, gray.800, gray.900)"
  );

  return (
    <Box as="section" py={{ base: 12, md: 24 }} px={{ base: 6, md: 16 }} bgGradient={bgGradient}>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        gap={{ base: 10, md: 16 }}
        maxW="7xl"
        mx="auto"
      >
        {/* Text Content */}
        <MotionBox
          flex="1"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="extrabold"
            mb={6}
            lineHeight="short"
            bgGradient="linear(to-r, #C28840, #0D0D0D)"
            bgClip="text"
          >
            Hi, we&apos;re Kòfowórọlá Alásọòkè.
          </Heading>

          <VStack align="start" spacing={5}>
            {[
              <>
                Founded by <strong>Kòfowórọlá Aró</strong>, our brand celebrates heritage,
                craftsmanship, and culture through timeless fashion and fabric artistry.
              </>,
              <>
                Kòfowórọlá Alásọòkè is a subsidiary of ElegancebyRholarglow, specializing in
                designing, weaving, and tailoring bespoke Asọ òkè for individuals and groups, at
                events both locally and internationally. Through EleganceRTW, we transform asooke
                into modern Ready-to-Wear pieces including dansiki, skirts, corset tops, and more.
              </>,
              <>
                We weave strictly on pre-orders, allowing customers to personalize their patterns,
                colors, and styles. With global delivery and years of impeccable service, we
                prioritize uniqueness and customer satisfaction.
              </>,
              <>
                Our mission is to design elegant, African-inspired clothing and textiles that tell
                stories, honor tradition, and inspire confidence—wrapping you in beauty and
                boldness, one stitch at a time.
              </>,
            ].map((para, index) => (
              <MotionText
                key={index}
                fontSize={{ base: "md", md: "lg" }}
                color={textColor}
                lineHeight="1.9"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {para}
              </MotionText>
            ))}
          </VStack>
        </MotionBox>

        {/* Image Section */}
        <MotionImage
          flex="1"
          borderRadius="2xl"
          boxShadow={imageShadow}
          src="/images/kofo.jpg"
          alt="Kofoworola Aro, CEO of Kòfowórọlá Alásọòkè"
          objectFit="cover"
          maxW={imageMaxW}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.05, boxShadow: "2xl" }}
        />
      </Flex>
    </Box>
  );
};
