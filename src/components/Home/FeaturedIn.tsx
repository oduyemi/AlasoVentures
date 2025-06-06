import { Box, Heading, Image, SimpleGrid, VStack } from "@chakra-ui/react";

const featuredLogos = [
  {
    name: "Peach Essence",
    src: "/images/fashionEvents/a.png",
    alt: "Peach Essence Logo",
  },
  {
    name: "BellaNaija Weddings",
    src: "/images/fashionEvents/b.png",
    alt: "BellaNaija Weddings Logo",
  },
  {
    name: "Hitched 1",
    src: "/images/fashionEvents/c.png",
    alt: "Hitched Logo",
  },
  {
    name: "Hitched 2",
    src: "/images/fashionEvents/d.png",
    alt: "Hitched Logo",
  },
];

export const FeaturedIn = () => {
  return (
    <Box
      maxW="7xl"
      mx="auto"
      py={{ base: 16, md: 28 }}
      px={{ base: 6, md: 12 }}
      textAlign="center"
    //   bgGradient="linear(to-b, #0D0D0D, #1A1A1A)"
      borderTop="1px solid #1e1e1e"
      borderBottom="1px solid #1e1e1e"
    >
      <Heading
        as="h2"
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="extrabold"
        mb={16}
        bgGradient="linear(to-r, #ffffff, #C28840)"
        bgClip="text"
        letterSpacing="wider"
      >
        Featured In
      </Heading>

      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 4 }}
        spacing={{ base: 8, md: 12 }}
        justifyItems="center"
        alignItems="center"
      >
        {featuredLogos.map((logo) => (
          <VStack
            key={logo.name}
            bg="rgba(255, 255, 255, 0.02)"
            p={5}
            borderRadius="2xl"
            backdropFilter="blur(6px)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            // boxShadow="0 4px 20px rgba(0,0,0,0.3)"
            transition="all 0.4s ease"
            _hover={{
              transform: "scale(1.07)",
              boxShadow: "0 6px 30px rgba(194, 136, 64, 0.4)",
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width="200px"
              maxH="60px"
              objectFit="contain"
              opacity={0.6}
              transition="all 0.3s"
              filter="grayscale(100%)"
              _hover={{
                opacity: 1,
                filter: "grayscale(0%)",
              }}
            />
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};
