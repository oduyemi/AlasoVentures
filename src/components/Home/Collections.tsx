"use client";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const HomeCollections = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const items = [
    { title: "Custom Asọòkè", image: "/images/custom.jpeg", link: "#" },
    { title: "Off the Shelf", image: "/images/shelf.jpeg", link: "#" },
    { title: "Ready to Wear", image: "/images/agbada.jpeg", link: "#" },
    { title: "Made to Fit", image: "/images/fit.png", link: "#" },
  ];

  // ✅ Precompute hook values before render/map
  const bg = useColorModeValue("#0D0D0D", "gray.200");
  const textColor = useColorModeValue("gray.200", "gray.300");
  const headingColor = useColorModeValue("gray.300", "white");
  const cardBg = useColorModeValue("gray.30", "gray.300");
  const hoverLinkColor = useColorModeValue("#fff", "white");
  const dividerColor = useColorModeValue("gray.200", "gray.400");

  return (
    <Box w="full" py={{ base: 12, md: 20 }} px={{ base: 6, md: 16 }} bg={bg}>
      <Heading
        fontSize={{ base: "3xl", md: "4xl" }}
        textAlign="center"
        mb={2}
        bgGradient="linear(to-r, #C28840, #fff)"
        bgClip="text"
      >
        Our Collections
      </Heading>

      <Text textAlign="center" fontSize="md" color={textColor} mb={10}>
        Discover our latest range of stylish and quality products.
      </Text>

      <Divider mb={12} borderColor={dividerColor} />

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={10}
        alignItems="stretch"
      >
        {items.map((item) => (
          <MotionBox
            key={item.title}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            h="100%"
          >
            <Box
              h="100%"
              p={{ base: 4, md: 6 }}
              bg={cardBg}
              borderRadius="xl"
              boxShadow="none"
              transition="box-shadow 0.3s ease"
              _hover={{ boxShadow: "none" }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Grid
                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={6}
                h="100%"
              >
                <GridItem>
                  <Image
                    src={item.image}
                    alt={item.title}
                    borderRadius="xl"
                    w="full"
                    h="100%"
                    objectFit="cover"
                    transition="all 0.4s ease"
                    _hover={{
                      transform: "scale(1.04)",
                      filter: "brightness(1.05)",
                    }}
                  />
                </GridItem>
                <GridItem>
                  <Stack spacing={4} h="100%" justify="center">
                    <Heading fontSize={{ base: "2xl", md: "3xl" }} color={headingColor}>
                      {item.title}
                    </Heading>
                    <Link
                      href={item.link}
                      fontWeight="medium"
                      fontSize="md"
                      color={textColor}
                      _hover={{
                        color: hoverLinkColor,
                        textDecoration: "underline",
                      }}
                      transition="color 0.3s ease"
                    >
                      Shop Now →
                    </Link>
                  </Stack>
                </GridItem>
              </Grid>
            </Box>
          </MotionBox>
        ))}
      </Grid>
    </Box>
  );
};
