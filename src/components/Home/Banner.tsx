"use client";
import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
  chakra,
  shouldForwardProp,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




// Carousel items
const carouselItems = [
  {
    imgSrc: "/images/hero1.jpg",
    title: "Asooke Specials",
    description: `Look amazing on your big day`,
  },
  {
    imgSrc: "/images/hero2.jpg",
    title: "What's Trending?",
    description: "See how much you can do with your asooke fabrics",
  },
  {
    imgSrc: "/images/hero3.jpg",
    title: "Ready Made Wears",
    description: "Awesome ready-made asooke outfits to grace your occasion",
  },
];

// Motion Components
const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const MotionImage = chakra(motion.img, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const MotionHeading = chakra(motion.h1, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const MotionText = chakra(motion.p, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const Banner: React.FC = () => {
  const settings = {
    dots: true,
    loop: true,
    autoplay: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box maxW="100%" mb={10} mt={4} px={{ base: 2, md: 4 }}>
      <Flex direction={{ base: "column", lg: "row" }} gap={6}>
        {/* Carousel Section */}
        <Box flex="2" borderRadius="xl" overflow="hidden">
          <Slider {...settings}>
            {carouselItems.map((item) => (
              <MotionBox
                key={item.imgSrc}
                position="relative"
                height={{ base: "300px", md: "430px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="xl"
                overflow="hidden"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                transition={{ duration: 0.6, delay: 0.2 } as any}

              >
                <MotionImage
                  src={item.imgSrc}
                  alt={item.title}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  transition={{ duration: 0.6, delay: 0.2 } as any}
                  style={{ objectFit: "cover" }}
                />

                {/* Overlay */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bgGradient="linear(to-t, rgba(0,0,0,0.6), rgba(0,0,0,0.2))"
                  backdropBlur="4px"
                  zIndex={1}
                />

                {/* Captions */}
                <Flex
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  align="center"
                  justify="center"
                  direction="column"
                  textAlign="center"
                  zIndex={2}
                  px={6}
                >
                  <VStack spacing={3} maxW="700px">
                    <MotionHeading
                      fontSize={isMobile ? "2xl" : "4xl"}
                      bgGradient="linear(to-r, #C28840, #fff)"
                      bgClip="text"
                      fontWeight="extrabold"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      transition={{ duration: 0.6, delay: 0.2 } as any}
                    >
                      {item.title}
                    </MotionHeading>

                    <MotionText
                      fontSize={{ base: "sm", md: "md" }}
                      color="whiteAlpha.800"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      transition={{ duration: 0.6, delay: 0.4 } as any}
                    >
                      {item.description}
                    </MotionText>

                    <Link href="/shop">
                      <MotionBox
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          size="sm"
                          bg="#C28840"
                          color="white"
                          _hover={{ bg: "#A86B30" }}
                          boxShadow="lg"
                          mt={2}
                        >
                          Shop Now
                        </Button>
                      </MotionBox>
                    </Link>
                  </VStack>
                </Flex>
              </MotionBox>
            ))}
          </Slider>
        </Box>

        {/* Offer Section */}
        <Flex flex="1" direction="column" gap={6}>
          {["/images/etu.jpg", "/images/asooke.jpg"].map((offerImg, index) => (
            <MotionBox
              key={offerImg}
              height="200px"
              position="relative"
              borderRadius="xl"
              overflow="hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              transition={{ duration: 0.8, delay: index * 0.3 } as any}
            >
              <Image
                src={offerImg}
                alt={`Offer ${index + 1}`}
                width="100%"
                height="100%"
                objectFit="cover"
              />
              <Flex
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="rgba(0, 0, 0, 0.5)"
                color="white"
                direction="column"
                justify="center"
                align="center"
                p={4}
                textAlign="center"
              >
                <Text
                  fontSize="sm"
                  color="#C28840"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  {index === 0 ? "Buy Aṣọ òkè Fabrics" : "Book Appointment"}
                </Text>
                <Heading as="h3" size="sm" fontWeight="light" mb={2} maxW="90%">
                  {index === 0
                    ? "Check out our selection for unique or custom, handmade pieces."
                    : "Get expert styling, fashion advice & outfit recommendations."}
                </Heading>
                <Link href={index === 0 ? "/pre-order" : "/book-appointment"}>
                  <MotionBox whileHover={{ scale: 1.05 }}>
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor="white"
                      color="white"
                      _hover={{ bg: "#0D0D0D" }}
                      boxShadow="base"
                    >
                      {index === 0 ? "Pre Order" : "Book Now"}
                    </Button>
                  </MotionBox>
                </Link>
              </Flex>
            </MotionBox>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
