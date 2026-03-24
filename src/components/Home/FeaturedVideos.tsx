import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  AspectRatio,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useYouTubeVideos } from "../../hooks/useYouTubeVideos";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
};

const MotionBox = motion(Box);

export const FeaturedVideos = () => {
  const videos = useYouTubeVideos() as Video[];
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const bg = useColorModeValue("#ffffff", "#0f172a");
  const textColor = useColorModeValue("gray.600", "gray.300");

  // 🔹 Loading state (better UX than returning null)
  if (!videos) {
    return (
      <Box py={20} px={4}>
        <Skeleton height="300px" mb={6} />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} height="200px" />
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (!videos.length) return null;

  const featured = videos[0];

  return (
    <Box as="section" py={20} px={4} bg={bg}>
      {/* Header */}
      <Box textAlign="center" mb={12}>
        <Heading fontSize="3xl">From Our YouTube</Heading>
        <Text mt={3} color={textColor}>
          See our latest creations, behind-the-scenes, and client showcases.
        </Text>
      </Box>

      {/* Featured Video */}
      <MotionBox
        maxW="4xl"
        mx="auto"
        mb={12}
        borderRadius="2xl"
        overflow="hidden"
        whileHover={{ scale: 1.02 }}
      >
        <AspectRatio ratio={16 / 9}>
          {activeVideo === featured.id ? (
            <iframe
              src={`https://www.youtube.com/embed/${featured.id}?autoplay=1`}
              title={featured.title}
              allowFullScreen
            />
          ) : (
            <Box
              as="button"
              onClick={() => setActiveVideo(featured.id)}
              bgImage={`url(${featured.thumbnail})`}
              bgSize="cover"
              bgPosition="center"
              w="100%"
              h="100%"
            />
          )}
        </AspectRatio>
      </MotionBox>

      {/* Grid */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} maxW="6xl" mx="auto">
        {videos.slice(1).map((video) => (
          <MotionBox
            key={video.id}
            borderRadius="xl"
            overflow="hidden"
            whileHover={{ y: -6 }}
          >
            <AspectRatio ratio={16 / 9}>
              {activeVideo === video.id ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                  title={video.title}
                  allowFullScreen
                />
              ) : (
                <Box
                  as="button"
                  onClick={() => setActiveVideo(video.id)}
                  bgImage={`url(${video.thumbnail})`}
                  bgSize="cover"
                  bgPosition="center"
                  w="100%"
                  h="100%"
                />
              )}
            </AspectRatio>

            <Box p={3}>
              <Text fontSize="sm" fontWeight="semibold" noOfLines={2}>
                {video.title}
              </Text>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
};