"use client";
import {
  Badge,
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
import { motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";

const MotionBox = motion(chakra.div);
const MotionImage = motion(Image);

export const AboutHero = () => {
  const bg = useColorModeValue("#FCFBF8", "#0D0D0D");
  const text = useColorModeValue("gray.700", "gray.300");
  const muted = useColorModeValue("gray.500", "gray.400");

  return (
    <Box
      bg={bg}
      pt={{ base: 28, md: 36 }}
      pb={{ base: 20, md: 28 }}
      position="relative"
      overflow="hidden"
    >
      {/* Background glow */}
      <Box
        position="absolute"
        top="-180px"
        left="-180px"
        w="420px"
        h="420px"
        rounded="full"
        bg="#C28840"
        opacity={0.08}
        filter="blur(120px)"
      />

      <Box
        position="absolute"
        bottom="-180px"
        right="-180px"
        w="420px"
        h="420px"
        rounded="full"
        bg="#0D0D0D"
        opacity={0.08}
        filter="blur(120px)"
      />

      <Container maxW="7xl" position="relative">
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          gap={{ base: 14, lg: 20 }}
        >
          {/* Left */}
          <MotionBox
            flex="1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <VStack align="start" spacing={6}>
              <Badge
                px={4}
                py={2}
                rounded="full"
                bg="#C28840"
                color="white"
                fontWeight="600"
                fontSize="sm"
                letterSpacing="wide"
              >
                OUR HERITAGE
              </Badge>

              <Heading
                fontSize={{
                  base: "4xl",
                  md: "5xl",
                  xl: "6xl",
                }}
                lineHeight="1.05"
                fontWeight="extrabold"
                letterSpacing="-0.03em"
                maxW="700px"
              >
                Celebrating the Rich Textile Heritage of{" "}
                <Text
                  as="span"
                  color="#C28840"
                >
                  Nigeria & West Africa
                </Text>
              </Heading>

              <Divider
                borderColor="#C28840"
                borderWidth="2px"
                w="90px"
              />

              <Text
                fontSize={{
                  base: "lg",
                  md: "xl",
                }}
                color={text}
                lineHeight="tall"
                maxW="650px"
              >
                Kòfowórọlá Alásọ celebrates the enduring textile traditions of
                Nigeria and West Africa through authentic handwoven fabrics.
                Every piece is thoughtfully crafted by skilled artisans,
                preserving generations of weaving knowledge while offering
                timeless textiles for fashion, special occasions, and refined
                interior spaces.
              </Text>

              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={8}
                pt={4}
              >
                <Box>
                  <Text
                    fontWeight="bold"
                    color="#C28840"
                    fontSize="3xl"
                  >
                    4
                  </Text>

                  <Text color={muted}>
                    Heritage
                    <br />
                    Textile Collections
                  </Text>
                </Box>

                <Box>
                  <Text
                    fontWeight="bold"
                    color="#C28840"
                    fontSize="3xl"
                  >
                    100%
                  </Text>

                  <Text color={muted}>
                    Authentic
                    <br />
                    Handwoven Fabrics
                  </Text>
                </Box>

                <Box>
                  <Text
                    fontWeight="bold"
                    color="#C28840"
                    fontSize="3xl"
                  >
                    Direct
                  </Text>

                  <Text color={muted}>
                    Artisan
                    <br />
                    Partnerships
                  </Text>
                </Box>
              </Stack>
            </VStack>
          </MotionBox>

          {/* Right */}
          <MotionBox
            flex="1"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Box
              position="relative"
              rounded="3xl"
              overflow="hidden"
              shadow="2xl"
            >
              <MotionImage
                src="/images/abthero.JPG"
                alt="Authentic African handwoven fabrics"
                w="100%"
                h={{
                  base: "420px",
                  md: "600px",
                }}
                objectFit="cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />

              {/* Dark gradient */}
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-t, rgba(0,0,0,.55), transparent 45%)"
              />

              {/* Floating card */}
              <Box
                position="absolute"
                bottom={8}
                left={8}
                bg="rgba(255,255,255,.95)"
                backdropFilter="blur(18px)"
                rounded="2xl"
                px={6}
                py={5}
                maxW="320px"
                shadow="xl"
              >
                <Text
                  fontWeight="bold"
                  color="#C28840"
                  mb={2}
                >
                  Preserving Tradition
                </Text>

                <Text
                  fontSize="sm"
                  color="gray.700"
                  lineHeight="1.8"
                >
                  Every woven textile reflects generations of craftsmanship,
                  cultural identity, and artistry—carefully created to honour
                  Africa's rich weaving heritage.
                </Text>
              </Box>
            </Box>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
};