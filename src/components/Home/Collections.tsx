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
  Button,
} from "@chakra-ui/react";
import { cubicBezier, motion } from "framer-motion";

const MotionBox = motion(Box);
const customEase = cubicBezier(0.42, 0, 0.58, 1);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2, ease: customEase },
  }),
};

export const HomeCollections = () => {
  const items = [
    { title: "Custom Asọòkè", image: "/images/customasooke.jpg", link: "#" },
    { title: "Off the Shelf", image: "/images/shelf.jpeg", link: "#" },
    { title: "Ready to Wear", image: "/images/cstm.jpg", link: "#" },
    { title: "Made to Fit", image: "/images/fit.jpg", link: "#" },
  ];

  const bg = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("#0D0D0D", "white");
  const cardBg = useColorModeValue("gray.50", "gray.800");
  const dividerColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box as="section" py={{ base: 12, md: 20 }} px={{ base: 6, md: 16 }} bg={bg}>
      {/* Section Heading */}
      <Heading
        fontSize={{ base: "3xl", md: "4xl" }}
        textAlign="center"
        mb={4}
        bgGradient="linear(to-r, #C28840, #0D0D0D)"
        bgClip="text"
      >
        Our Collections
      </Heading>

      <Text
        textAlign="center"
        fontSize={{ base: "md", md: "lg" }}
        color={textColor}
        maxW="2xl"
        mx="auto"
        mb={10}
      >
        Discover our latest range of stylish and quality products crafted to make you stand out.
      </Text>

      <Divider mb={12} borderColor={dividerColor} maxW="5xl" mx="auto" />

      {/* Collections Grid */}
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={10}
        maxW="6xl"
        mx="auto"
      >
        {items.map((item, index) => (
          <MotionBox
            key={item.title}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            custom={index}
            viewport={{ once: true, amount: 0.3 }}
            h="100%"
          >
            <Box
              h="100%"
              p={{ base: 4, md: 6 }}
              bg={cardBg}
              borderRadius="2xl"
              boxShadow="none"
              transition="all 0.3s ease"
              _hover={{ transform: "translateY(-6px)", boxShadow: "sm" }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Grid
                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={6}
                alignItems="center"
              >
                {/* Image */}
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

                {/* Text + CTA */}
                <GridItem>
                  <Stack spacing={4}>
                    <Heading
                      fontSize={{ base: "2xl", md: "3xl" }}
                      color={headingColor}
                      fontWeight="bold"
                    >
                      {item.title}
                    </Heading>
                    <Link href={item.link} _hover={{ textDecoration: "none" }}>
                      <Button
                        size="sm"
                        w="fit-content"
                        bg="#C28840"
                        color="white"
                        _hover={{ bg: "#A86B30" }}
                        borderRadius="full"
                        boxShadow="sm"
                      >
                        Shop Now →
                      </Button>
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
