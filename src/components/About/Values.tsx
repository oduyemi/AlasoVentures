"use client";
import {
  Box,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  Landmark,
} from "lucide-react";

const MotionBox = motion(chakra.div);

const values = [
  {
    icon: ShieldCheck,
    title: "Authenticity",
    description:
      "We prioritize genuine handwoven textiles crafted by recognized artisans, preserving the integrity and heritage of every fabric.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "Every piece is carefully selected for exceptional craftsmanship, lasting durability, and timeless beauty worthy of every special occasion.",
  },
  {
    icon: HeartHandshake,
    title: "Ethical Sourcing",
    description:
      "By partnering directly with weavers and cooperatives, we help sustain fair incomes while supporting local communities and traditional craftsmanship.",
  },
  {
    icon: Landmark,
    title: "Cultural Respect",
    description:
      "Every textile carries history and symbolism. We honour the stories, traditions, and identities woven into every pattern and colour.",
  },
];

export const OurValues = () => {
  const bg = useColorModeValue("white", "#111111");
  const cardBg = useColorModeValue("white", "gray.900");
  const text = useColorModeValue("gray.700", "gray.300");
  const muted = useColorModeValue("gray.500", "gray.400");
  const border = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Box
      py={{ base: 20, lg: 28 }}
      bg={bg}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative Glow */}
      <Box
        position="absolute"
        right="-120px"
        top="15%"
        w="280px"
        h="280px"
        rounded="full"
        bg="#C28840"
        opacity={0.08}
        filter="blur(120px)"
      />

      <Container maxW="7xl">
        <VStack spacing={5} textAlign="center" mb={16}>
          <Text
            color="#C28840"
            fontWeight="700"
            letterSpacing="0.25em"
            textTransform="uppercase"
            fontSize="sm"
          >
            Our Values
          </Text>

          <Heading
            fontSize={{
              base: "3xl",
              md: "4xl",
              lg: "5xl",
            }}
            maxW="700px"
          >
            Built on Heritage, Guided by Integrity
          </Heading>

          <Text
            maxW="760px"
            fontSize="lg"
            color={text}
            lineHeight="tall"
          >
            Every fabric we offer represents more than exceptional
            craftsmanship—it reflects our commitment to authenticity,
            ethical partnerships, cultural preservation, and uncompromising
            quality.
          </Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={8}
        >
          {values.map((value, index) => (
            <MotionBox
              key={value.title}
              bg={cardBg}
              border="1px solid"
              borderColor={border}
              rounded="3xl"
              p={8}
              position="relative"
              overflow="hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -8,
              }}
            >
              {/* Number */}
              <Text
                position="absolute"
                top={5}
                right={6}
                fontSize="5xl"
                fontWeight="900"
                color="#C28840"
                opacity={0.08}
                lineHeight={1}
              >
                0{index + 1}
              </Text>

              <Stack spacing={6}>
                <Box
                  w="68px"
                  h="68px"
                  rounded="2xl"
                  bg="rgba(194,136,64,.12)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon
                    as={value.icon}
                    boxSize={8}
                    color="#C28840"
                  />
                </Box>

                <Heading size="md">
                  {value.title}
                </Heading>

                <Text
                  color={muted}
                  lineHeight="tall"
                >
                  {value.description}
                </Text>
              </Stack>

              {/* Bottom Accent */}
              <Box
                mt={8}
                w="70px"
                h="4px"
                rounded="full"
                bg="#C28840"
              />
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};