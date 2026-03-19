import {
    Box,
    Heading,
    Text,
    Flex,
    Avatar,
    Button,
    useColorModeValue,
    Stack,
  } from "@chakra-ui/react";
  import { motion, AnimatePresence } from "framer-motion";
  import { useEffect, useState } from "react";
  import { useRouter } from "next/navigation";
  import { TestimonialDialog } from "../dialogs/TestimonialDialog";
  
  const MotionBox = motion(Box);
  
  type Testimonial = {
    name: string;
    quote: string;
  };
  
  const testimonials: Testimonial[] = [
    {
      name: "Amina O.",
      quote:
        "The craftsmanship is exceptional. Every detail feels intentional and premium.",
    },
    {
      name: "Chioma K.",
      quote:
        "Absolutely stunning work. I get compliments every time I wear their pieces.",
    },
    {
      name: "Tolu A.",
      quote:
        "Reliable, stylish, and very professional. I trust them completely.",
    },
  ];
  
  export const Testimonials = () => {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
  
    const router = useRouter();
  
    const bg = useColorModeValue("#ffffff", "#0f172a");
    const cardBg = useColorModeValue("#ffffff", "#1a202c");
    const textColor = useColorModeValue("gray.600", "gray.400");
  
    // Auto-rotate with pause on hover
    useEffect(() => {
      if (isPaused) return;
  
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
  
      return () => clearInterval(interval);
    }, [isPaused]);
  
    const current = testimonials[index];
  
    return (
      <Box as="section" py={28} px={4} bg={bg}>
        {/* Header */}
        <Box textAlign="center" mb={20}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, #C28840, #000)"
            bgClip="text"
          >
            Trusted by Clients Who Value Excellence
          </Heading>
  
          <Text mt={4} color={textColor} maxW="2xl" mx="auto">
            Real stories from customers who love what we create.
          </Text>
        </Box>
  
        {/* Carousel */}
        <Box
          maxW="4xl"
          mx="auto"
          mb={20}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <MotionBox
              key={index}
              bg={cardBg}
              p={12}
              borderRadius="3xl"
              textAlign="center"
              boxShadow="2xl"
              border="1px solid"
              borderColor="gray.100"
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -40 }}
              transition={{ duration: 0.6 }}
            >
              <Stack spacing={6} align="center">
                <Avatar name={current.name} size="xl" boxShadow="md" />
  
                <Text
                  fontSize="lg"
                  fontStyle="italic"
                  lineHeight="1.7"
                  color={textColor}
                >
                  “{current.quote}”
                </Text>
  
                <Text fontWeight="bold">{current.name}</Text>
              </Stack>
            </MotionBox>
          </AnimatePresence>
        </Box>
  
        {/* CTA */}
        <Flex direction="column" align="center" gap={4}>
          <Button
            size="lg"
            bg="#C28840"
            color="white"
            px={10}
            py={6}
            borderRadius="full"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={() => router.push("/testimonies")}
          >
            View All Testimonies
          </Button>
  
          <Text
            fontSize="sm"
            color="gray.500"
            cursor="pointer"
            _hover={{ color: "#C28840" }}
            onClick={() => setIsOpen(true)}
          >
            ✨ Share your experience
          </Text>
        </Flex>
  
        <TestimonialDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </Box>
    );
  };