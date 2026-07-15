"use client";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

const MotionBox = motion(chakra.div);

export const AboutCTA = () => {
  const bg = useColorModeValue("#FCFBF8", "#0D0D0D");
  const cardBg = useColorModeValue("white", "gray.900");
  const text = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      bg={bg}
      py={{ base: 20, md: 28 }}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative Glow */}
      <Box
        position="absolute"
        top="-120px"
        left="-120px"
        w="320px"
        h="320px"
        rounded="full"
        bg="#C28840"
        opacity={0.08}
        filter="blur(100px)"
      />

      <Container maxW="6xl">
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          bg={cardBg}
          rounded="3xl"
          shadow="2xl"
          border="1px solid"
          borderColor="blackAlpha.100"
          px={{ base: 8, md: 16 }}
          py={{ base: 12, md: 20 }}
          position="relative"
          overflow="hidden"
        >
          {/* Decorative Accent */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            h="5px"
            bgGradient="linear(to-r, #C28840, #D7A760, #C28840)"
          />

          <VStack spacing={7} textAlign="center">
            <Text
              color="#C28840"
              textTransform="uppercase"
              letterSpacing="0.3em"
              fontWeight="700"
              fontSize="sm"
            >
              Get in Touch
            </Text>

            <Heading
              maxW="750px"
              lineHeight="1.15"
              fontSize={{
                base: "3xl",
                md: "4xl",
                lg: "5xl",
              }}
            >
              Let's Help You Find the
              <Text
                as="span"
                color="#C28840"
              >
                {" "}
                Perfect Fabric
              </Text>
            </Heading>

            <Text
              maxW="700px"
              color={text}
              fontSize={{ base: "lg", md: "xl" }}
              lineHeight="tall"
            >
              Whether you're planning a wedding, designing your next
              collection, sourcing fabrics for a special event, or looking for
              authentic African handwoven textiles, our team is here to guide
              you with expert advice and exceptional service.
            </Text>

            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={5}
              pt={4}
            >
              <Button
                as={Link}
                href="/shop"
                size="lg"
                bg="#C28840"
                color="white"
                px={8}
                rightIcon={<ArrowRight size={18} />}
                _hover={{
                  bg: "#A56F32",
                }}
              >
                Browse Collection
              </Button>

              <Button
                as={Link}
                href="/contact"
                size="lg"
                variant="outline"
                borderColor="#C28840"
                color="#C28840"
                px={8}
                leftIcon={<MessageCircle size={18} />}
                _hover={{
                  bg: "#C2884010",
                }}
              >
                Contact Us
              </Button>
            </Stack>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};