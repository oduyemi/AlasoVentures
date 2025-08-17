import { Box, Heading, Image, SimpleGrid, VStack, Link } from "@chakra-ui/react";

const featuredLogos = [
  {
    name: "Style Afrique",
    src: "/images/featured/styleafrique.png",
    alt: "Style Afrique",
    link:"https://1styleafrique.wordpress.com/2024/03/05/nana-akua-addo-the-style-goddess-from-ghana-putting-african-fashion-on-the-map/"
  },
  {
    name: "BellaNaija Weddings",
    src: "/images/featured/bellanaijawedding.png",
    alt: "BellaNaija Weddings",
    link: "https://www.bellanaijaweddings.com/jewel-shot-it-yoruba-beauty-look/"
  },
  {
    name: "A million Styles",
    src: "/images/featured/mstyles.png",
    alt: "A Million Styles",
    link: "https://amillionstyles.com/latest-fashion-style/lookbook-bridal-photoshoot-inspiration-vol-2-2/amp/"
  },
  {
    name: "BellaNaija Style",
    src: "/images/featured/bellanaijastyles.png",
    alt: "BellaNaija Styles",
    link: "https://www.bellanaijastyle.com/abisola-akintunde-bridal-shower/"
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
      bgGradient="linear(to-b, #fff5ec, #ffe6f0, #e6f3ff)"
      borderTop="1px solid #e2e8f0"
      borderBottom="1px solid #e2e8f0"
      position="relative"
      overflow="hidden"
    >
      {/* Subtle moving gradient overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="radial(circle at 20% 30%, rgba(255,126,95,0.15), transparent 60%), 
                    radial(circle at 80% 70%, rgba(106,130,251,0.15), transparent 60%)"
        animation="gradientMove 10s ease-in-out infinite alternate"
        zIndex={0}
      />

      <Heading
        as="h2"
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="extrabold"
        mb={16}
        bgGradient="linear(to-r, #ff7e5f, #feb47b, #6a82fb, #fc5c7d)"
        bgClip="text"
        letterSpacing="wide"
        position="relative"
        zIndex={1}
      >
        Featured In
      </Heading>

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
              border="2px solid transparent"
              bg="whiteAlpha.700"
              bgClip="padding-box"
              boxShadow="0 6px 20px rgba(0,0,0,0.1)"
              transition="all 0.4s ease"
              _hover={{
                transform: "translateY(-10px) scale(1.07) rotate(-1deg)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                borderImage: "linear-gradient(90deg, #ff7e5f, #feb47b, #6a82fb, #fc5c7d) 1",
              }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width="180px"
                maxH="70px"
                objectFit="contain"
                transition="all 0.4s ease"
                _hover={{
                  filter: "drop-shadow(0px 0px 12px rgba(255,126,95,0.6))",
                }}
              />
            </VStack>
          </Link>
        ))}
      </SimpleGrid>

      {/* CSS Keyframes for background movement */}
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
