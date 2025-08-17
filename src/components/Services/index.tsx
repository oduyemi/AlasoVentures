"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Stack,
  Button,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion, Variants } from "framer-motion";

const MotionStack = motion(Stack);
const MotionModalContent = motion(ModalContent);

const services = [
  {
    title: "Custom Aso-Oke",
    image: "/images/custom.jpg",
    description:
      "Design your own Aso-Oke with unique color combinations, motifs, and weaves. Perfect for individuals and couples looking for personalized elegance.",
  },
  {
    title: "Made to Fit",
    image: "/images/made.jpg",
    description:
      "Experience bespoke tailoring crafted to your measurements and taste. Whether it's traditional or contemporary, our design team brings your vision to life.",
  },
];

export const Services = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = useState("");

  const handleBooking = (service: string) => {
    setSelectedService(service);
    onOpen();
  };

  // Animation variants for cards
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        type: "spring" as const,
        stiffness: 100,
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(194, 136, 64, 0.6)",
      transition: {
        type: "spring" as const,
        stiffness: 200,
      },
    },
  };
  // Animation for modal content
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <Box py={{ base: 10, md: 20 }} minH="100vh">
      <Container maxW="6xl">
        <VStack spacing={6} textAlign="center" mb={12}>
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            color="white"
            bgGradient="linear(to-r, #C28840, #fff)"
            bgClip="text"
          >
            Our Core Services
          </Heading>
          <Text fontSize="lg" color="gray.400" maxW="2xl">
            Rooted in tradition. Refined for today. Explore how Kòfowórọlá Alásọ
            Ventures can bring your cultural fashion dreams to life.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {services.map((service, index) => (
            <MotionStack
              key={service.title}
              bg="gray.900"
              rounded="xl"
              overflow="hidden"
              spacing={0}
              shadow="lg"
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Image
                src={service.image}
                alt={service.title}
                objectFit="cover"
                w="full"
                h="250px"
              />
              <Box p={6}>
                <Heading
                  fontSize="xl"
                  mb={3}
                  bgGradient="linear(to-r,#fff, #C28840)"
                  bgClip="text"
                >
                  {service.title}
                </Heading>
                <Text color="gray.400" mb={6}>
                  {service.description}
                </Text>
                <Button
                  colorScheme="yellow"
                  size="sm"
                  onClick={() => handleBooking(service.title)}
                >
                  Book Now
                </Button>
              </Box>
            </MotionStack>
          ))}
        </SimpleGrid>
      </Container>

      {/* Booking Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <MotionModalContent
          bg="gray.900"
          color="gray.100"
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          variants={modalVariants}
          transition={{ duration: 0.3 }}
        >
          <ModalHeader
            bgGradient="linear(to-r, #fff, #C28840, #fff)"
            bgClip="text"
          >
            Book: {selectedService}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Your Name</FormLabel>
                <Input placeholder="Full Name" bg="gray.800" />
              </FormControl>
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input placeholder="you@example.com" bg="gray.800" />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="Phone Number" bg="gray.800" />
              </FormControl>
              <FormControl>
                <FormLabel>Details / Preferences</FormLabel>
                <Textarea
                  placeholder="Include fabric choices, color palette, date..."
                  bg="gray.800"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="yellow" mr={3}>
              Submit Request
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </MotionModalContent>
      </Modal>
    </Box>
  );
};
