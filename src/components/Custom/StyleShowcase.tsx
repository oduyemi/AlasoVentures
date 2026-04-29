"use client";
import {
  Box,
  Container,
  Text,
  VStack,
  SimpleGrid,
  Image,
  useColorModeValue,
  Heading,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import CustomOrderDialog from "@/dialogs/CustomOrderDialog";

const MotionBox = motion(chakra.div);

type GalleryImage = {
  asset_id: string;
  public_id: string;
  secure_url: string;
};

export const StyleShowcase = () => {
  const bg = useColorModeValue("#ffffff", "#0D0D0D");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "/api/gallery?folder=kofoworola/custom"
        );
        const data = await response.json();
        setImages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch showcase images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const showcaseImages = useMemo(() => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }, [images]);

  return (
    <Box
      bg={bg}
      py={{ base: 16, md: 24 }}
      px={4}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-10%"
        left="-10%"
        w="50%"
        h="50%"
        bgGradient="radial(circle, rgba(194,136,64,0.12), transparent 70%)"
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <VStack spacing={6} textAlign="center" mb={14}>
          <Heading
            fontSize={{ base: "3xl", md: "5xl" }}
            lineHeight="shorter"
            bgGradient="linear(to-r, #C28840, #0D0D0D)"
            bgClip="text"
            letterSpacing="tight"
          >
            Signature Styles
          </Heading>

          <Text maxW="3xl" color={textColor} fontSize="lg">
            Discover our bespoke creations, thoughtfully crafted for weddings,
            celebrations, and unforgettable moments. Each piece is designed to
            inspire your next custom masterpiece.
          </Text>

          <Text fontSize="xl" fontWeight="semibold" color="#C28840">
            Custom styles starting from ₦350,000
          </Text>
        </VStack>

        {loading ? (
          <Center py={20}>
            <Spinner size="xl" color="#C28840" thickness="4px" />
          </Center>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {showcaseImages.map((image) => (
              <MotionBox
                key={image.asset_id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                bg={cardBg}
                borderRadius="3xl"
                overflow="hidden"
                boxShadow="xl"
              >
                <Box overflow="hidden">
                  <Image
                    src={image.secure_url}
                    alt="Custom fashion design"
                    w="100%"
                    h={{ base: "380px", md: "420px" }}
                    objectFit="cover"
                    transition="transform 0.5s ease"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        )}

        {!loading && showcaseImages.length === 0 && (
          <VStack py={20} spacing={4}>
            <Text fontSize="xl" color={textColor}>
              Our latest custom styles will be showcased here soon.
            </Text>
          </VStack>
        )}

        <Center mt={14}>
          <CustomOrderDialog />
        </Center>
      </Container>
    </Box>
  );
};