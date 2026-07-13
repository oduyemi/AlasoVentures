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
  import { TestimonialDialog } from "../../dialogs/TestimonialDialog";
  
  const MotionBox = motion(Box);
  
  type Testimonial = {
    _id: string;
    fullname: string;
    email: string;
    who: string;
    testimony: string;
    status: "pending" | "approved" | "disapproved";
  };
  
  // const testimonials: Testimonial[] = [
  //   {
  //     name: "Amina O.",
  //     quote:
  //       "The craftsmanship is exceptional. Every detail feels intentional and premium.",
  //   },
  //   {
  //     name: "Chioma K.",
  //     quote:
  //       "Absolutely stunning work. I get compliments every time I wear their pieces.",
  //   },
  //   {
  //     name: "Tolu A.",
  //     quote:
  //       "Reliable, stylish, and very professional. I trust them completely.",
  //   },
  // ];
  
  export const Testimonials = () => {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const bg = useColorModeValue("#ffffff", "#0f172a");
    const cardBg = useColorModeValue("#ffffff", "#1a202c");
    const textColor = useColorModeValue("gray.600", "gray.400");
  
    useEffect(() => {
      const fetchTestimonials = async () => {
        try {
          const res = await fetch("/api/testimonials/approved");
          const data = await res.json();
    
          if (data.success) {
            const approved = data.testimonials.filter(
              (item: Testimonial) => item.status === "approved"
            );
    
            setTestimonials(approved);
          }
        } catch (error) {
          console.error("Failed to fetch testimonials", error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchTestimonials();
    }, []);
    
    // Auto-rotate with pause on hover
    useEffect(() => {
      if (isPaused || testimonials.length <= 1) return;
    
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    
      return () => clearInterval(interval);
    }, [isPaused, testimonials.length]);
  
    const current = testimonials[index] || null;
  
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
          {loading ? (
            <MotionBox
              bg={cardBg}
              p={12}
              borderRadius="3xl"
              textAlign="center"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
            >
              <Text color={textColor}>
                Loading testimonials...
              </Text>
            </MotionBox>
          ) : testimonials.length === 0 ? (
            <MotionBox
              bg={cardBg}
              p={12}
              borderRadius="3xl"
              textAlign="center"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Text fontSize="5xl" mb={4}>
                💬
              </Text>

              <Heading
                size="md"
                mb={3}
                bgGradient="linear(to-r, #C28840, #000)"
                bgClip="text"
              >
                No Testimonials Yet
              </Heading>

              <Text color={textColor} maxW="500px" mx="auto">
                We're building a legacy of excellence. Be among the first to
                share your experience with Kòfowórọlá Alásọ Ventures.
              </Text>
            </MotionBox>
          ) : (
            <AnimatePresence mode="wait">
              <MotionBox
                key={current?._id}
                bg={cardBg}
                p={12}
                borderRadius="3xl"
                textAlign="center"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.100"
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -40 }}
                transition={{ duration: 0.6 }}
              >
                <Stack spacing={6} align="center">
                  <Avatar
                    name={current?.fullname}
                    size="xl"
                    boxShadow="md"
                  />

                  <Text
                    fontSize="lg"
                    fontStyle="italic"
                    lineHeight="1.7"
                    color={textColor}
                  >
                    “{current?.testimony}”
                  </Text>

                  <Box>
                    <Text fontWeight="bold">
                      {current?.fullname}
                    </Text>

                    <Text
                      fontSize="sm"
                      color="gray.500"
                    >
                      {current?.who}
                    </Text>
                  </Box>
                </Stack>
              </MotionBox>
            </AnimatePresence>
          )}
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
            onClick={() => setIsOpen(true)}
          >
            Share Your Experience
          </Button>
        </Flex>
  
        <TestimonialDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </Box>
    );
  };