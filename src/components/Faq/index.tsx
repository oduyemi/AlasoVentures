"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We specialize in bespoke tailoring, premium Asọ Òkè craftsmanship, traditional Yoruba attire, fashion styling for weddings and ceremonies, and style consulting for individuals and groups.",
  },
  {
    question: "Do you take urgent or express orders?",
    answer:
      "Yes, we accommodate express orders depending on availability. An express fee may apply. Contact us directly for confirmation.",
  },
  {
    question: "How long does it take to finish an outfit?",
    answer:
      "Tailoring time depends on the design complexity. Standard completion ranges from 5–10 business days. Bridal or group orders may take longer.",
  },
  {
    question: "Can I book a fashion consultation?",
    answer:
      "Absolutely. We offer both in-person and virtual consultations to discuss your needs, recommend fabrics, and curate your perfect outfit.",
  },
  {
    question: "Do you deliver outside Ilorin or Ibadan?",
    answer:
      "Yes. We deliver across Nigeria through trusted courier services. Nationwide shipping is available upon order completion.",
  },
  {
    question: "Are matching accessories available?",
    answer:
      "Yes, we provide accessories such as Gele, Fila, Ipele, jewelry, and coordinated footwear on request.",
  },
  {
    question: "How do I pay for an order?",
    answer:
      "Payments can be made via secure bank transfer, POS, or USSD. You will receive account details once your order is confirmed.",
  },
];

// Framer Motion wrapper for Chakra
const MotionBox = motion(Box);

export const FAQ = () => {
  const bg = "#0D0D0D";
  const cardBg = "#0a0a0a";
  const textColor = "gray.400";
  const accent = "yellow.400";
  const borderColor = "gray.700";

  return (
    <Box bg={bg} py={{ base: 14, md: 24 }}>
      <Container maxW="6xl">
        <VStack
          spacing={3}
          textAlign="center"
          mb={12}
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition="duration: 0.8, ease: 'easeInOut'" 
        >
          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, #C28840, #fff)"
            bgClip="text"
          >
            Frequently Asked Questions
          </Heading>

          <Text maxW="2xl" fontSize="lg" color={textColor}>
            Find answers to your most common questions below. Need further help? We're just a message away.
          </Text>
        </VStack>

        <MotionBox
          bg={cardBg}
          shadow="lg"
          rounded="2xl"
          px={{ base: 5, md: 10 }}
          py={{ base: 8, md: 12 }}
          maxW="4xl"
          mx="auto"
          border="1px solid"
          borderColor={borderColor}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Accordion allowToggle defaultIndex={[0]}>
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4, ease: "easeInOut" }}
              >
                <AccordionItem border="none" py={4}>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton
                          px={0}
                          _hover={{ bg: "transparent" }}
                          _expanded={{ color: accent }}
                          transition="color 0.3s ease"
                        >
                          <Box
                            flex="1"
                            textAlign="left"
                            fontSize="lg"
                            fontWeight="semibold"
                            color={isExpanded ? accent : textColor}
                            bgGradient="linear(to-r,#fff, #C28840)"
                            bgClip="text"
                            display="flex"
                            alignItems="center"
                          >
                            <Icon
                              as={FaQuestionCircle}
                              mr={3}
                              color={accent}
                              transition="transform 0.3s ease"
                              // Rotate icon on expand
                              transform={isExpanded ? "rotate(15deg)" : "rotate(0deg)"}
                            />
                            {faq.question}
                          </Box>
                          <AccordionIcon
                            transition="transform 0.3s ease"
                            transform={isExpanded ? "rotate(180deg)" : "rotate(0deg)"}
                          />
                        </AccordionButton>
                      </h2>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          >
                            <AccordionPanel
                              px={0}
                              pt={4}
                              pb={2}
                              color={textColor}
                              fontSize="md"
                              lineHeight="1.75"
                            >
                              {faq.answer}
                            </AccordionPanel>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </MotionBox>
      </Container>
    </Box>
  );
};
