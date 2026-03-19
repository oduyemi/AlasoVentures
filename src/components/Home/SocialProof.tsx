import {
    Box,
    Text,
    Heading,
    Flex,
    SimpleGrid,
    Avatar,
  } from "@chakra-ui/react";
  import { motion, AnimatePresence } from "framer-motion";
  import { useEffect, useState } from "react";
  
  const MotionBox = motion(Box);
  
  const testimonials = [
    {
      name: "Amina O.",
      role: "Client",
      text: "The quality is unmatched. The fabric feels premium and the delivery was faster than expected.",
    },
    {
      name: "Chioma K.",
      role: "Returning Customer",
      text: "Every order feels like a luxury experience. The packaging alone is top-tier.",
    },
    {
      name: "Tolu A.",
      role: "Fashion Enthusiast",
      text: "Their attention to detail is incredible. Easily one of the best I've worked with.",
    },
  ];
  
  export const SocialProof: React.FC = () => {
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }, 7000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <Box bg="white" pt={0} pb={{ base: 24, md: 32 }} px={6} position="relative">
        {/* 🔥 FLOATING CONTAINER (overlaps hero) */}
        <Box
          maxW="7xl"
          mx="auto"
          mt="-120px"
          position="relative"
          zIndex={2}
        >
          {/* 🔥 BACKGROUND GLOW */}
          <Box
            position="absolute"
            inset={0}
            borderRadius="3xl"
            bg="white"
            boxShadow="0 40px 120px rgba(0,0,0,0.12)"
          />
  
          {/* color glow */}
          <Box
            position="absolute"
            top="-80px"
            left="10%"
            w="300px"
            h="300px"
            bg="purple.300"
            filter="blur(120px)"
            opacity={0.4}
          />
          <Box
            position="absolute"
            bottom="-80px"
            right="10%"
            w="300px"
            h="300px"
            bg="orange.200"
            filter="blur(120px)"
            opacity={0.4}
          />
  
          {/* CONTENT */}
          <Box position="relative" p={{ base: 6, md: 12 }}>
            {/* 🔥 STATS FIRST (IMMEDIATE IMPACT) */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={20}>
              {[
                { value: "500+", label: "Happy Clients", color: "purple.500" },
                { value: "1,000+", label: "Orders Delivered", color: "orange.400" },
                { value: "4.9★", label: "Customer Rating", color: "green.400" },
              ].map((stat, i) => (
                <MotionBox
                  key={i}
                  p={8}
                  borderRadius="2xl"
                  bg="white"
                  boxShadow="0 15px 40px rgba(0,0,0,0.06)"
                  textAlign="center"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Text
                    fontSize="4xl"
                    fontWeight="bold"
                    color={stat.color}
                  >
                    {stat.value}
                  </Text>
  
                  <Text mt={2} fontSize="sm" color="gray.600">
                    {stat.label}
                  </Text>
                </MotionBox>
              ))}
            </SimpleGrid>
  
            {/* 🔥 TESTIMONIAL */}
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: 10, md: 20 }}
              align="center"
            >
              {/* LEFT */}
              <Box flex={1} position="relative">
                <Text
                  position="absolute"
                  top="-40px"
                  left="-10px"
                  fontSize="140px"
                  color="blackAlpha.100"
                  fontFamily="serif"
                >
                  “
                </Text>
  
                <AnimatePresence mode="wait">
                  <MotionBox
                    key={index}
                    p={10}
                    borderRadius="2xl"
                    bg="rgba(255,255,255,0.7)"
                    backdropFilter="blur(16px)"
                    boxShadow="0 30px 80px rgba(0,0,0,0.08)"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Text fontSize={{ base: "lg", md: "2xl" }}>
                      {testimonials[index].text}
                    </Text>
                  </MotionBox>
                </AnimatePresence>
  
                {/* progress */}
                <Box mt={8} h="3px" bg="gray.200" borderRadius="full">
                  <MotionBox
                    key={index}
                    h="100%"
                    borderRadius="full"
                    bgGradient="linear(to-r, purple.400, orange.400)"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 7, ease: "linear" }}
                  />
                </Box>
              </Box>
  
              {/* RIGHT */}
              <Box flex={0.4}>
                <AnimatePresence mode="wait">
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Flex
                      p={6}
                      borderRadius="xl"
                      bg="white"
                      boxShadow="0 10px 30px rgba(0,0,0,0.05)"
                      align="center"
                      gap={4}
                    >
                      <Avatar name={testimonials[index].name} />
  
                      <Box>
                        <Text fontWeight="bold">
                          {testimonials[index].name}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {testimonials[index].role}
                        </Text>
                      </Box>
                    </Flex>
                  </MotionBox>
                </AnimatePresence>
  
                {/* dots */}
                <Flex mt={8} gap={2}>
                  {testimonials.map((_, i) => (
                    <Box
                      key={i}
                      onClick={() => setIndex(i)}
                      cursor="pointer"
                      w={index === i ? "20px" : "6px"}
                      h="6px"
                      borderRadius="full"
                      bg={index === i ? "purple.500" : "gray.300"}
                      transition="all 0.3s ease"
                    />
                  ))}
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    );
  };