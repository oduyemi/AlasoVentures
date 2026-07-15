"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  HandCoins,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const MotionBox = motion(chakra.div);

const reasons = [
  {
    icon: BadgeCheck,
    title: "Authentic Heritage Fabrics",
    description:
      "Carefully curated handwoven textiles sourced directly from skilled artisans across West Africa.",
  },
  {
    icon: HandCoins,
    title: "Ethically Sourced",
    description:
      "Every purchase helps support local weavers, traditional cooperatives, and sustainable livelihoods.",
  },
  {
    icon: Sparkles,
    title: "Expert Guidance",
    description:
      "Whether you're a bride, designer, collector, or stylist, we'll help you choose fabrics that perfectly match your vision.",
  },
  {
    icon: Globe2,
    title: "Worldwide Delivery",
    description:
      "Exceptional African craftsmanship delivered safely to customers around the world.",
  },
];

export const WhyUs = () => {
  const bg = useColorModeValue("#111111", "#090909");
  const card = useColorModeValue("whiteAlpha.100", "whiteAlpha.50");

  return (
    <Box
      bg={bg}
      color="white"
      py={{ base: 20, lg: 28 }}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative Glow */}
      <Box
        position="absolute"
        top="-150px"
        right="-120px"
        w="420px"
        h="420px"
        rounded="full"
        bg="#C28840"
        opacity={0.12}
        filter="blur(120px)"
      />

      <Container maxW="7xl">
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 16, lg: 20 }}
          align="center"
        >
          {/* Left */}
          <MotionBox
            flex={1}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <VStack
              align="start"
              spacing={6}
            >
              <Text
                color="#C28840"
                textTransform="uppercase"
                letterSpacing="0.25em"
                fontWeight="700"
                fontSize="sm"
              >
                Why Choose Us
              </Text>

              <Heading
                fontSize={{
                  base: "3xl",
                  md: "4xl",
                  lg: "5xl",
                }}
                lineHeight="1.1"
              >
                More Than Beautiful Fabrics—
                <br />
                A Commitment to Heritage.
              </Heading>

              <Text
                fontSize="lg"
                color="gray.300"
                lineHeight="tall"
              >
                Kòfowórọlá Alásọ offers carefully curated, authentic woven
                fabrics backed by transparent sourcing and a deep commitment to
                artisan wellbeing.
              </Text>

              <Text
                color="gray.400"
                lineHeight="tall"
              >
                Every textile represents generations of craftsmanship,
                preserving cultural traditions while providing modern customers
                with exceptional fabrics for weddings, fashion, interiors, and
                meaningful celebrations.
              </Text>

              <Button
                as={Link}
                href="/shop"
                mt={4}
                bg="#C28840"
                color="white"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
                _hover={{
                  bg: "#a56f32",
                }}
              >
                Explore Our Collections
              </Button>
            </VStack>
          </MotionBox>

          {/* Right */}
          <MotionBox
            flex={1}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Stack spacing={6}>
              {reasons.map((reason) => (
                <Flex
                  key={reason.title}
                  bg={card}
                  backdropFilter="blur(12px)"
                  rounded="2xl"
                  p={6}
                  gap={5}
                  align="flex-start"
                  transition="0.3s"
                  _hover={{
                    bg: "rgba(255,255,255,.10)",
                    transform: "translateX(8px)",
                  }}
                >
                  <Flex
                    w="60px"
                    h="60px"
                    rounded="2xl"
                    bg="rgba(194,136,64,.18)"
                    align="center"
                    justify="center"
                    flexShrink={0}
                  >
                    <Icon
                      as={reason.icon}
                      boxSize={7}
                      color="#C28840"
                    />
                  </Flex>

                  <Box>
                    <Heading
                      size="md"
                      mb={2}
                    >
                      {reason.title}
                    </Heading>

                    <Text
                      color="gray.300"
                      lineHeight="1.8"
                    >
                      {reason.description}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Stack>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
};