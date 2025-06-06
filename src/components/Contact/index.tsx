"use client";
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

export const Contact = () => {
  const bgColor = useColorModeValue("#0D0D0D", "gray.400");
  const cardBg = useColorModeValue("#121212", "gray.700");

  return (
    <Box py={20} px={{ base: 4, md: 16 }} bg={bgColor}>
      <Stack spacing={2} textAlign="center" mb={16}>
        <Heading
          fontSize={{ base: "2xl", md: "4xl" }}
          bgGradient="linear(to-r, #C28840, #fff)"
          bgClip="text"
          fontWeight="extrabold"
        >
          We&apos;d Love to Hear From You
        </Heading>
        <Text fontSize="md" color="gray.400" maxW="xl" mx="auto">
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
              bgGradient="linear(to-r, #fff, #C28840, #fff)"
              bgClip="text"
            >
              How to Reach Us
            </Heading>
            <Text color="gray.400">
              We’re open to business discussions, design requests, and friendly chats.
              Every message is important to us.
            </Text>
          </Box>

          <HStack align="start" spacing={4}>
            <Icon as={FaPhoneAlt} boxSize={5} color="#C28840" mt={1} />
            <Box>
              <Text fontWeight="bold" color="gray.300">Phone</Text>
              <Text color="gray.400">+234 703 473 9950</Text>
            </Box>
          </HStack>

          <HStack align="start" spacing={4}>
            <Icon as={FaEnvelope} boxSize={5} color="#C28840" mt={1} />
            <Box>
              <Text fontWeight="bold" color="gray.300">Email</Text>
              <Text color="gray.400">
                <Link href="mailto:kofoworola.alasooke@gmail.com">
                  kofoworola.alasooke@gmail.com
                </Link>
              </Text>
            </Box>
          </HStack>

          <HStack align="start" spacing={4}>
            <Icon as={FaMapMarkerAlt} boxSize={5} color="#C28840" mt={1} />
            <Box>
              <Text fontWeight="bold" color="gray.300">Locations</Text>
              <Text color="gray.400">Ilọrin, Kwara State</Text>
              <Text color="gray.400">Ìbàdàn, Oyo State</Text>
            </Box>
          </HStack>

          <Divider borderColor="gray.600" />

          <Box>
            <Text
              fontWeight="semibold"
              mb={2}
              bgGradient="linear(to-r,#fff, #C28840)"
              bgClip="text"
              fontSize="lg"
            >
              Why Kòfowórọlá Alásọ Ventures?
            </Text>
            <Stack spacing={3}>
              <HStack>
                <Icon as={FaCheckCircle} color="yellow.400" />
                <Text color="gray.400">Trusted tailoring & fashion service</Text>
              </HStack>
              <HStack>
                <Icon as={FaCheckCircle} color="yellow.400" />
                <Text color="gray.400">Creative, elegant & custom designs</Text>
              </HStack>
              <HStack>
                <Icon as={FaCheckCircle} color="yellow.400" />
                <Text color="gray.400">Fast, warm & professional response</Text>
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
          <form>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel color="gray.400">Name</FormLabel>
                <Input
                  placeholder="Your full name"
                  name="name"
                  variant="filled"
                  focusBorderColor="#C28840"
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
                />
              </FormControl>

              <FormControl>
                <FormLabel color="gray.400">Phone</FormLabel>
                <Input
                  placeholder="Optional"
                  name="phone"
                  variant="filled"
                  focusBorderColor="#C28840"
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
                />
              </FormControl>

              <Button
                type="submit"
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
