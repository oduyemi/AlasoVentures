"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Divider,
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

  return (
    <Box bg={bg} py={{ base: 20, md: 28 }} px={4}>
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
            fontWeight="bold"
            lineHeight="shorter"
            bgGradient="linear(to-r, #C28840, #FFF)"
            bgClip="text"
            letterSpacing="tight"
          >
            Woven with Heritage. Crafted for Today
          </Heading>

          <MotionText
            maxW="3xl"
            fontSize="lg"
            color={textColor}
            fontWeight="medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            At the heart of our work lies a deep reverence for tradition, a bold love for fashion,
            and a commitment to telling cultural stories through every thread.
          </MotionText>

          <Divider borderColor="gray.700" w="60%" />
        </MotionVStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16} alignItems="center">
          <MotionBox
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <VStack align="start" spacing={8}>
              {[
                <>
                  <Text as="span" fontWeight="semibold" color="gray.100">
                    Kòfowórọlá Alásọ Ventures
                  </Text>{" "}
                  is a fashion house rooted in the rich cultural legacy of the Yoruba people.
                  Founded by visionary designer{" "}
                  <Text as="span" fontWeight="semibold" color="gray.100">
                    Kòfowórọlá Aró
                  </Text>
                  , the brand is devoted to preserving and redefining the beauty of{" "}
                  <em>Asọ Òkè</em>.
                </>,
                <>
                  At Kòfowórọlá Alásọ, we believe tradition is not static. Through thoughtful design
                  and craftsmanship, we transform vintage Yoruba styles into modern-day
                  masterpieces.
                </>,
                <>
                  Whether you&apos;re walking down the aisle or making a statement, our pieces are more
                  than fashion—they&apos;re living stories.
                </>,
              ].map((content, i) => (
                <MotionText
                  key={i}
                  fontSize="lg"
                  color={textColor}
                  lineHeight="2"
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
              _hover={{ transform: "scale(1.02)" }}
              border="1px solid"
              borderColor="gray.700"
            >
              <MotionImage
                src="/images/weave.jpg"
                alt="Weaving Aso-Oke fabric"
                objectFit="cover"
                w="full"
                h={{ base: "300px", md: "100%" }}
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
