"use client";
import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  VStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  HStack,
  Divider,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionStack = motion(Stack);

export const Contact: React.FC = () => {
  const bgColor = useColorModeValue("#fff", "#0D0D0D");
  const cardBg = useColorModeValue("#121212", "gray.700");
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast({
          title: "Message sent!",
          description: result.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFormData({ fullname: "", email: "", phone: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: result.error || "Submission failed.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch {
      toast({
        title: "Network Error",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box py={20} px={{ base: 4, md: 16 }} bg={bgColor}>
      <Stack spacing={2} textAlign="center" mb={16}>
        <Heading
          fontSize={{ base: "2xl", md: "4xl" }}
          bgGradient="linear(to-r, #C28840, #0D0D0D)"
          bgClip="text"
          fontWeight="extrabold"
        >
          We&apos;d Love to Hear From You
        </Heading>
        <Text fontSize="md" color="gray.600" maxW="xl" mx="auto">
          Whether it’s a custom attire, business inquiry, or creative
          collaboration — reach out and let’s make something beautiful together.
        </Text>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16}>
        {/* LEFT: Contact Info & Identity */}
        <MotionStack
          spacing={6}
          justify="center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box>
            <Heading
              size="lg"
              mb={2}
              bgGradient="linear(to-r, #0D0D0D, #C28840, #fff)"
              bgClip="text"
            >
              How to Reach Us
            </Heading>
            <Text color="gray.600">
              We’re open to business discussions, design requests, and friendly chats.
              Every message is important to us.
            </Text>
          </Box>

          <HStack align="start" spacing={4}>
            <Icon as={FaPhoneAlt} boxSize={5} color="#C28840" mt={1} />
            <Box>
              <Text fontWeight="bold" color="gray.500">Phone</Text>
              <Text color="gray.600">+234 901 801 5143</Text>
            </Box>
          </HStack>

          <HStack align="start" spacing={4}>
            <Icon as={FaEnvelope} boxSize={5} color="#C28840" mt={1} />
            <Box>
              <Text fontWeight="bold" color="gray.500">Email</Text>
              <Text color="gray.600">
                <Link href="mailto:kofoworola.alasooke@gmail.com">
                  kofoworola.alasooke@gmail.com
                </Link>
              </Text>
            </Box>
          </HStack>

          <HStack align="start" spacing={4}>
            <Icon as={FaMapMarkerAlt} boxSize={5} color="#C28840" mt={1} />
            <Box>
              <Text fontWeight="bold" color="gray.500">Location</Text>
              <Text color="gray.600"> off Atiku Abubakar Rd, Estate, Ilorin 240243, Kwara, Nigeria</Text>
            </Box>
          </HStack>

          <Divider borderColor="gray.600" />

          <Box>
            <Text
              fontWeight="semibold"
              mb={2}
              bgGradient="linear(to-r,#0D0D0D, #C28840)"
              bgClip="text"
              fontSize="lg"
            >
              Why Kòfowórọlá Alásọ Ventures?
            </Text>
            <Stack spacing={3}>
              <HStack>
                <Icon as={FaCheckCircle} color="yellow.400" />
                <Text color="gray.600" className="pt-3">Trusted tailoring & fashion service</Text>
              </HStack>
              <HStack>
                <Icon as={FaCheckCircle} color="yellow.400" />
                <Text color="gray.600" className="pt-3">Creative, elegant & custom designs</Text>
              </HStack>
              <HStack>
                <Icon as={FaCheckCircle} color="yellow.400" />
                <Text color="gray.600" className="pt-3">Fast, warm & professional response</Text>
              </HStack>
            </Stack>
          </Box>
        </MotionStack>

        {/* RIGHT: Contact Form */}
        <MotionBox
          bg={cardBg}
          borderRadius="xl"
          boxShadow="2xl"
          p={{ base: 6, md: 10 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel color="gray.400">Name</FormLabel>
                <Input
                  placeholder="Your full name"
                  name="name"
                  variant="filled"
                  focusBorderColor="#C28840"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.400">Email</FormLabel>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  variant="filled"
                  focusBorderColor="#C28840"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="gray.400">Phone</FormLabel>
                <Input
                  placeholder="Optional"
                  name="phone"
                  variant="filled"
                  focusBorderColor="#C28840"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.400">Message</FormLabel>
                <Textarea
                  placeholder="Tell us what you need..."
                  rows={5}
                  name="message"
                  variant="filled"
                  focusBorderColor="#C28840"
                  value={formData.message}
                  onChange={handleChange}
                />
              </FormControl>

              <Button
                type="submit"
                isLoading={loading}
                size="lg"
                w="full"
                bgGradient="linear(to-r, #C28840, #fff)"
                color="black"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Send Message
              </Button>
            </VStack>
          </form>
        </MotionBox>
      </SimpleGrid>
    </Box>
  );
};
