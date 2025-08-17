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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";

const MotionBox = motion(chakra.div);
const MotionVStack = motion(VStack);
const MotionText = motion(Text);
const MotionImage = motion(Image);

export const AboutUs = () => {
  const bg = "#0D0D0D";
  const textColor = "gray.400";
  const borderColor = useColorModeValue("gray.300", "gray.700");

  return (
    <Box bg={bg} py={{ base: 16, md: 28 }} px={4}>
      <Container maxW="6xl">
        <MotionVStack
          spacing={6}
          textAlign="center"
          mb={20}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="extrabold"
            lineHeight="shorter"
            bgGradient="linear(to-r, #C28840, #fff)"
            bgClip="text"
            letterSpacing="tight"
          >
            Woven with Heritage. Crafted for Today.
          </Heading>

          <MotionText
            maxW="3xl"
            fontSize={{ base: "md", md: "lg" }}
            color={textColor}
            fontWeight="medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            At the heart of our work lies a deep reverence for tradition, a bold love for fashion,
            and a commitment to telling cultural stories through every thread.
          </MotionText>

        </MotionVStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 12, md: 16 }} alignItems="center">
          <MotionBox
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <VStack align="start" spacing={6}>
              {[
                <>
                  <Text as="span" fontWeight="semibold" color="gray.300">
                    At Kòfowórọlá Alásọòkè
                  </Text>{" "}
                  is a subsidiary of ElegancebyRholarglow which specialize in designing, 
                  weaving, tailoring bespoke Aso oke individuals and group of people for 
                  all events both home and abroad. We also have a sister arm, EleganceRTW 
                  which specializes in using asooke for ReadyToWear pieces ranging from 
                  dansiki, skirts, shorts, pants, corset tops, dresses, sandals, ties, 
                  hair fascinators etc. We weave strictly based on pre-orders and all our 
                  customers can customize their asooke patterns, colors and general look 
                  to suite them. We deliver worldwide and we have impeccable customer 
                  service ratings over the years.
                </>,
                <>
                  We are dedicated to the art and tradition of African textile craftsmanship.
                  Our expertise lies in the weaving of Asooke, Kente, Saki, and Akwete —
                  producing high-quality fabrics that reflect both cultural heritage and refined elegance.
                </>,
                <>
                  In addition to weaving, we offer professional sourcing services for Asoebi fabrics —
                  ensuring our clients access exquisite materials for weddings, ceremonies,
                  and other distinguished events.
                </>,
                <>
                  With a commitment to authenticity and excellence, we take pride in providing fabrics
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
                  transition={{ duration: 0.6, delay: 0.2 * i }}
                >
                  {content}
                </MotionText>
              ))}
            </VStack>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Box
              borderRadius="2xl"
              overflow="hidden"
              shadow="dark-lg"
              transition="transform 0.3s ease"
              _hover={{ transform: "scale(1.03)" }}
              border="1px solid"
              borderColor={borderColor}
            >
              <MotionImage
                src="/images/abthero.jpg"
                alt="Weaving Aso-Oke fabric"
                objectFit="cover"
                w="full"
                h={{ base: "280px", md: "100%" }}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </Box>
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
