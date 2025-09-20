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
        type: "spring",
        stiffness: 100,
      },
    }),
    hover: {
      scale: 1.03,
      boxShadow: "0 12px 24px rgba(194, 136, 64, 0.25)",
      transition: { type: "spring", stiffness: 200 },
    },
  };

  // Animation for modal content
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <Box py={{ base: 12, md: 20 }} bg="#fff" minH="100vh">
      <Container maxW="6xl">
        {/* Section Header */}
        <VStack spacing={4} textAlign="center" mb={12}>
          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            bgGradient="linear(to-r, #C28840, #0D0D0D)"
            bgClip="text"
          >
            Our Core Services
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" maxW="2xl">
            Rooted in tradition. Refined for today. Explore how Kòfowórọlá
            Alásọ Ventures can bring your cultural fashion dreams to life.
          </Text>
        </VStack>

        {/* Service Cards */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {services.map((service, index) => (
            <MotionStack
              key={service.title}
              bg="white"
              rounded="xl"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.200"
              shadow="md"
              spacing={0}
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
                  bgGradient="linear(to-r, #C28840, #0D0D0D)"
                  bgClip="text"
                >
                  {service.title}
                </Heading>
                <Text color="gray.600" mb={6}>
                  {service.description}
                </Text>
                <Button
                  size="sm"
                  onClick={() => handleBooking(service.title)}
                  variant="outline"
                  borderColor="#C28840"
                  color="#C28840"
                  _hover={{
                    bg: "#C28840",
                    color: "white",
                  }}
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
          bg="white"
          color="gray.800"
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          variants={modalVariants}
          transition={{ duration: 0.3 }}
          rounded="xl"
          shadow="xl"
        >
          <ModalHeader
            bgGradient="linear(to-r, #C28840, #0D0D0D)"
            bgClip="text"
            fontWeight="bold"
          >
            Book: {selectedService}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Your Name</FormLabel>
                <Input placeholder="Full Name" bg="gray.100" />
              </FormControl>
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input placeholder="you@example.com" bg="gray.100" />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="Phone Number" bg="gray.100" />
              </FormControl>
              <FormControl>
                <FormLabel>Details / Preferences</FormLabel>
                <Textarea
                  placeholder="Include fabric choices, color palette, date..."
                  bg="gray.100"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#C28840"
              color="white"
              _hover={{ bg: "#a06d34" }}
              mr={3}
            >
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
