"use client";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(chakra.div);

export const OurStory = () => {
  const bg = useColorModeValue("white", "#111111");
  const text = useColorModeValue("gray.700", "gray.300");
  const muted = useColorModeValue("gray.500", "gray.400");
  const cardBg = useColorModeValue("gray.50", "whiteAlpha.50");

  return (
    <Box
      py={{ base: 20, lg: 28 }}
      bg={bg}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="7xl">
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 16, lg: 20 }}
          align="center"
        >
          {/* Image */}
          <MotionBox
            flex="0.95"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Box
              overflow="hidden"
              rounded="3xl"
              shadow="2xl"
              position="relative"
            >
              <Image
                src="/images/about-story.jpg"
                alt="Traditional African weaving"
                w="100%"
                h={{ base: "420px", lg: "650px" }}
                objectFit="cover"
              />

              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-t, rgba(0,0,0,.45), transparent)"
              />
            </Box>
          </MotionBox>

          {/* Content */}
          <MotionBox
            flex="1"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <VStack align="start" spacing={7}>
              <Text
                color="#C28840"
                fontWeight="700"
                letterSpacing="0.25em"
                textTransform="uppercase"
                fontSize="sm"
              >
                Our Story
              </Text>

              <Heading
                fontSize={{
                  base: "3xl",
                  md: "4xl",
                  lg: "5xl",
                }}
                // lineHeight="1.1"
                lineHeight="shorter"
                bgGradient="linear(to-r, #C28840, #0D0D0D)"
                bgClip="text"
                letterSpacing="tight"
              >
                Where Heritage Meets
                <br />
                Contemporary Elegance
              </Heading>

              <Divider
                w="90px"
                borderColor="#C28840"
                borderWidth="2px"
              />

              <Text
                color={text}
                fontSize="lg"
                lineHeight="tall"
              >
                Founded by <strong>Kòfowórọlá Aró</strong>, Kòfowórọlá Alásọ
                was born from a passion for preserving the rich textile
                traditions of Nigeria and West Africa while making them
                accessible to today's generation.
              </Text>

              <Text
                color={text}
                fontSize="lg"
                lineHeight="tall"
              >
                Our journey is rooted in a deep appreciation for the artistry,
                symbolism, and cultural significance woven into every thread.
                By working directly with skilled artisans, we help sustain
                traditional weaving techniques, promote ethical craftsmanship,
                and ensure generations of knowledge continue to flourish.
              </Text>

              <Text
                color={text}
                fontSize="lg"
                lineHeight="tall"
              >
                Every fabric we offer tells a story—not only of remarkable
                craftsmanship but also of the communities whose creativity and
                dedication have shaped these timeless traditions for centuries.
              </Text>

              {/* Founder Card */}
              <Box
                bg={cardBg}
                borderLeft="5px solid"
                borderColor="#C28840"
                rounded="xl"
                p={6}
                mt={4}
                w="full"
              >
                <Stack spacing={3}>
                  <Text
                    fontSize="xl"
                    fontWeight="600"
                    fontStyle="italic"
                    color={text}
                  >
                    "We believe every woven fabric carries the spirit of its
                    maker, the richness of our culture, and a legacy worth
                    preserving."
                  </Text>

                  <Box>
                    <Text
                      fontWeight="bold"
                      color="#C28840"
                    >
                      Kòfowórọlá Aró
                    </Text>

                    <Text
                      fontSize="sm"
                      color={muted}
                    >
                      Founder, Kòfowórọlá Alásọ
                    </Text>
                  </Box>
                </Stack>
              </Box>
            </VStack>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
};