import { Box, Heading, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const WhatsAppCTA = () => {
  return (
    <MotionBox
      py={16}
      px={4}
      bg="#C28840"
      textAlign="center"
      color="white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Heading fontSize="3xl" mb={4}>
        Ready to Order?
      </Heading>

      <Text mb={6}>
        We are just a click away! Send us a message directly on WhatsApp and place your preorder instantly.
      </Text>

      <Button
        size="lg"
        bg="white"
        color="#C28840"
        _hover={{ opacity: 0.9 }}
        onClick={() =>
          window.open(
            "https://wa.me/2348094217767",
            "_blank"
          )
        }
      >
        🟢 Message Us on WhatsApp
      </Button>
    </MotionBox>
  );
};