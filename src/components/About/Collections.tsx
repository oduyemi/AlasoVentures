"use client";
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const MotionBox = motion(chakra.div);

const collections = [
  {
    title: "Asooke",
    subtitle: "Ceremonial Heritage",
    image: "/images/asooke.jpg",
    href: "/shop?filter=Asooke",
    description:
      "Luxurious handwoven ceremonial cloths featuring bold patterns, vibrant colours, and metallic threads. A timeless choice for weddings, celebrations, and prestigious occasions.",
  },
  {
    title: "Akwete",
    subtitle: "Hand Weaving Tradition",
    image: "/images/akwete.webp",
    href: "/shop?filter=Akwete",
    description:
      "Distinctive woven textiles renowned for geometric motifs, intricate craftsmanship, and rich textures that beautifully complement garments and interior décor.",
  },
  {
    title: "Saki",
    subtitle: "Everyday Elegance",
    image: "/images/saki.jpeg",
    href: "/shop?filter=Saki",
    description:
      "Lightweight, versatile woven fabrics offering comfort, sophistication, and endless styling possibilities for fashion pieces and creative design projects.",
  },
  {
    title: "Kente",
    subtitle: "Akan Heritage",
    image: "/images/kente.webp",
    href: "/shop?filter=Kente",
    description:
      "Iconic colourful handwoven strips originating from the Akan tradition of Ghana, celebrated for their symbolism and striking visual appeal.",
  },
];

export const FabricCollections = () => {
  const bg = useColorModeValue("#FCFBF8", "#0D0D0D");
  const cardBg = useColorModeValue("white", "gray.900");
  const text = useColorModeValue("gray.700", "gray.300");
  const muted = useColorModeValue("gray.500", "gray.400");

  return (
    <Box py={{ base: 20, lg: 28 }} bg={bg}>
      <Container maxW="7xl">
        <VStack spacing={5} mb={16} textAlign="center">
          <Text
            color="#C28840"
            fontWeight="700"
            letterSpacing="0.25em"
            textTransform="uppercase"
            fontSize="sm"
          >
            Our Collections
          </Text>

          <Heading
            maxW="700px"
            fontSize={{
              base: "3xl",
              md: "4xl",
              lg: "5xl",
            }}
          >
            Four Timeless Textile Traditions
          </Heading>

          <Text
            maxW="760px"
            color={text}
            fontSize="lg"
            lineHeight="tall"
          >
            Every collection reflects generations of craftsmanship,
            cultural identity, and artistic excellence. Carefully sourced
            from skilled artisans, our fabrics celebrate Africa's rich
            weaving heritage while inspiring modern fashion and interiors.
          </Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={10}
        >
          {collections.map((item, index) => (
            <MotionBox
              key={item.title}
              bg={cardBg}
              rounded="3xl"
              overflow="hidden"
              shadow="lg"
              border="1px solid"
              borderColor="blackAlpha.100"
              whileHover={{
                y: -8,
              }}
              transition={{
                duration: 0.3,
              }}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
            >
              <Box overflow="hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  h="320px"
                  w="full"
                  objectFit="cover"
                  transition="0.6s"
                  _groupHover={{
                    transform: "scale(1.08)",
                  }}
                />
              </Box>

              <Stack p={8} spacing={5}>
                <Badge
                  alignSelf="flex-start"
                  colorScheme="yellow"
                  px={3}
                  py={1}
                  rounded="full"
                >
                  {item.subtitle}
                </Badge>

                <Heading size="lg">
                  {item.title}
                </Heading>

                <Text
                  color={text}
                  lineHeight="tall"
                >
                  {item.description}
                </Text>

                <Button
                  as={Link}
                  href={item.href}
                  alignSelf="flex-start"
                  variant="ghost"
                  color="#C28840"
                  rightIcon={<ArrowRight size={18} />}
                  _hover={{
                    bg: "transparent",
                    color: "#8B5E2C",
                  }}
                >
                  Explore Collection
                </Button>
              </Stack>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};