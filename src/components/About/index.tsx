"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";

const MotionBox = motion(chakra.div);
const MotionVStack = motion(VStack);
const MotionText = motion(Text);
const MotionImage = motion(Image);

export const AboutUs = () => {
  const bg = useColorModeValue("#fff", "#0D0D0D");
  const textColor = useColorModeValue("#0D0D0D", "gray.200");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box
      bg={bg}
      py={{ base: 16, md: 28 }}
      px={4}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative background glow */}
      <Box
        position="absolute"
        top="-10%"
        left="-10%"
        w="60%"
        h="60%"
        bgGradient="radial(circle at top left, rgba(194,136,64,0.15), transparent 70%)"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-10%"
        right="-10%"
        w="60%"
        h="60%"
        bgGradient="radial(circle at bottom right, rgba(13,13,13,0.15), transparent 70%)"
        zIndex={0}
      />

      <Container maxW="6xl" position="relative" zIndex={1}>
        {/* Section Header */}
        <MotionVStack
          spacing={6}
          textAlign="center"
          mb={16}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="extrabold"
            lineHeight="shorter"
            bgGradient="linear(to-r, #C28840, #0D0D0D)"
            bgClip="text"
            letterSpacing="tight"
          >
            Woven with Heritage. Crafted for Today.
          </Heading>
          <Divider borderColor={borderColor} w="80px" mx="auto" borderWidth={1.5} />
          <MotionText
            maxW="3xl"
            fontSize={{ base: "md", md: "lg" }}
            color={textColor}
            fontWeight="medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            At the heart of our work lies a deep reverence for tradition, a bold
            love for fashion, and a commitment to telling cultural stories
            through every thread.
          </MotionText>
        </MotionVStack>

        {/* Content Section */}
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 12, md: 16 }}
          alignItems="center"
        >
          {/* Text Column */}
          <MotionBox
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <VStack align="start" spacing={6}>
              {[
                <>
                  <Text as="span" fontWeight="semibold" color="#C28840">
                    At Kòfowórọlá Alásọòkè
                  </Text>{" "}
                  is a subsidiary of ElegancebyRholarglow which specializes in
                  designing, weaving, and tailoring bespoke Aso Oke for both
                  individuals and groups. We also have a sister arm,
                  EleganceRTW, bringing Asooke into ReadyToWear pieces ranging
                  from dansiki, skirts, pants, corsets, sandals, and more. Each
                  client can customize their Asooke pattern, colors, and look to
                  suit their taste — and we deliver worldwide with impeccable
                  service.
                </>,
                <>
                  We are dedicated to the art and tradition of African textile
                  craftsmanship. Our expertise lies in weaving Asooke, Kente,
                  Saki, and Akwete — producing high-quality fabrics that reflect
                  both heritage and refined elegance.
                </>,
                <>
                  Beyond weaving, we also provide sourcing services for Asoebi
                  fabrics — ensuring clients access exquisite materials for
                  weddings, ceremonies, and other prestigious events.
                </>,
                <>
                  With authenticity and excellence at our core, we craft fabrics
                  that elevate the beauty and significance of every occasion.
                </>,
              ].map((content, i) => (
                <MotionText
                  key={i}
                  fontSize={{ base: "md", md: "lg" }}
                  color={textColor}
                  lineHeight="tall"
                  fontWeight="light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 * i }}
                >
                  {content}
                </MotionText>
              ))}
            </VStack>
          </MotionBox>

          {/* Image Column */}
          <MotionBox
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Box
              borderRadius="2xl"
              overflow="hidden"
              shadow="2xl"
              position="relative"
              _hover={{ transform: "translateY(-6px)" }}
              transition="all 0.4s ease"
            >
              <MotionImage
                src="/images/abthero.jpg"
                alt="Weaving Aso-Oke fabric"
                objectFit="cover"
                w="full"
                h={{ base: "280px", md: "100%" }}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 180 }}
              />
              {/* Glow border */}
              <Box
                position="absolute"
                inset={0}
                border="2px solid transparent"
                borderRadius="2xl"
                _hover={{
                  borderImage: "linear-gradient(90deg, #C28840, #0D0D0D) 1",
                }}
              />
            </Box>
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
