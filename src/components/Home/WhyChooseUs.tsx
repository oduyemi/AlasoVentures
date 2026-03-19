import {
  Box,
  Flex,
  Icon,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaShippingFast, FaStore, FaBoxOpen } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const features = [
  {
    icon: FaShippingFast,
    title: "Fast & Reliable Delivery",
    text: "Over 300+ orders delivered swiftly within 3–5 days, ensuring your fabrics arrive right on time.",
  },
  {
    icon: FaStore,
    title: "Convenient Store Pickup",
    text: "Flexible pickup options trusted by our Lagos-based clients for ease and convenience.",
  },
  {
    icon: FaBoxOpen,
    title: "Premium Packaging",
    text: "Carefully packaged to preserve fabric quality and deliver a luxury unboxing experience.",
  },
];

export const WhyChooseUs: React.FC = () => {
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box as="section" py={16} px={4}>
      {/* Section Heading */}
      <Box textAlign="center" mb={12}>
        <Heading
          fontSize={{ base: "2xl", md: "3xl" }}
          bgGradient="linear(to-r, #C28840, #0D0D0D)"
          bgClip="text"
        >
          Why Choose Us
        </Heading>
        <Text mt={3} color={textColor} maxW="2xl" mx="auto">
          We combine craftsmanship, reliability, and attention to detail to give you a seamless fashion experience.
        </Text>
      </Box>

      {/* Features Grid */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} maxW="6xl" mx="auto">
        {features.map((item, index) => (
          <MotionBox
            key={index}
            bg={bg}
            p={8}
            borderRadius="xl"
            boxShadow="md"
            textAlign="center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              y: -8,
              boxShadow: "xl",
            }}
          >
            <Flex justify="center" mb={4}>
              <Icon
                as={item.icon}
                boxSize={10}
                color="#C28840"
              />
            </Flex>

            <Heading size="md" mb={3}>
              {item.title}
            </Heading>

            <Text fontSize="sm" color={textColor}>
              {item.text}
            </Text>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
};