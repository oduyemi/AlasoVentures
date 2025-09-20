import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  VStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

const featuredLogos = [
  {
    name: "Style Afrique",
    src: "/images/featured/styleafrique.png",
    alt: "Style Afrique",
    link: "https://1styleafrique.wordpress.com/2024/03/05/nana-akua-addo-the-style-goddess-from-ghana-putting-african-fashion-on-the-map/",
  },
  {
    name: "BellaNaija Weddings",
    src: "/images/featured/bellanaijawedding.png",
    alt: "BellaNaija Weddings",
    link: "https://www.bellanaijaweddings.com/jewel-shot-it-yoruba-beauty-look/",
  },
  {
    name: "A million Styles",
    src: "/images/featured/mstyles.png",
    alt: "A Million Styles",
    link: "https://amillionstyles.com/latest-fashion-style/lookbook-bridal-photoshoot-inspiration-vol-2-2/amp/",
  },
  {
    name: "BellaNaija Style",
    src: "/images/featured/bellanaijastyles.png",
    alt: "BellaNaija Styles",
    link: "https://www.bellanaijastyle.com/abisola-akintunde-bridal-shower/",
  },
];

export const FeaturedIn = () => {
  const cardBg = useColorModeValue("whiteAlpha.700", "blackAlpha.400");
  const textGradient = "linear(to-r, #C28840, #0D0D0D)";

  return (
    <Box
      maxW="7xl"
      mx="auto"
      py={{ base: 16, md: 24 }}
      px={{ base: 6, md: 12 }}
      textAlign="center"
      bgGradient="linear(to-b, #f9fafb, #fff5f5, #f0f9ff)"
      borderTop="1px solid #e2e8f0"
      borderBottom="1px solid #e2e8f0"
      position="relative"
      overflow="hidden"
    >
      {/* Animated gradient background overlay */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(circle at 25% 30%, rgba(194,136,64,0.12), transparent 60%), 
                    radial(circle at 75% 70%, rgba(13,13,13,0.08), transparent 60%)"
        animation="gradientMove 12s ease-in-out infinite alternate"
        zIndex={0}
      />

      {/* Section Heading */}
      <Heading
        as="h2"
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="extrabold"
        mb={14}
        bgGradient={textGradient}
        bgClip="text"
        letterSpacing="wide"
        position="relative"
        zIndex={1}
      >
        Featured In
      </Heading>

      {/* Logos Grid */}
      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 4 }}
        spacing={{ base: 8, md: 12 }}
        justifyItems="center"
        alignItems="center"
        position="relative"
        zIndex={1}
      >
        {featuredLogos.map((logo) => (
          <Link
            key={logo.name}
            href={logo.link}
            isExternal
            _hover={{ textDecoration: "none" }}
          >
            <VStack
              p={5}
              borderRadius="2xl"
              backdropFilter="blur(14px)"
              bg={cardBg}
              border="1px solid rgba(255,255,255,0.4)"
              boxShadow="0 6px 18px rgba(0,0,0,0.08)"
              transition="all 0.35s ease"
              _hover={{
                transform: "translateY(-6px) scale(1.05)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
              }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={{ base: "120px", md: "160px" }}
                maxH="60px"
                objectFit="contain"
                transition="all 0.35s ease"
                _hover={{
                  filter:
                    "drop-shadow(0px 2px 10px rgba(194,136,64,0.5)) brightness(1.05)",
                }}
              />
            </VStack>
          </Link>
        ))}
      </SimpleGrid>

      {/* CSS Keyframes */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}
      </style>
    </Box>
  );
};
