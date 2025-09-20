// eslint-disable-line @typescript-eslint/no-unused-vars
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
  Divider,
  Button,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { FaQuestionCircle, FaWhatsapp, FaEnvelope } from "react-icons/fa";
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

// Framer Motion wrappers
const MotionBox = motion(Box);
const MotionAccordionItem = motion(AccordionItem);

export const FAQ = () => {
  const bg = useColorModeValue("#fff", "#0D0D0D");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const accent = "#C28840";
  const border = useColorModeValue("gray.200", "gray.600");

  return (
    <Box bg={bg} py={{ base: 16, md: 28 }}>
      <Container maxW="6xl">
        {/* Section Header */}
        <VStack
          spacing={4}
          textAlign="center"
          mb={16}
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 } as any}
        >
          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="extrabold"
            bgGradient="linear(to-r, #C28840, #0D0D0D)"
            bgClip="text"
          >
            Frequently Asked Questions
          </Heading>
          <Divider
            borderColor={accent}
            borderWidth={1.5}
            w="70px"
            borderRadius="full"
          />
          <Text maxW="2xl" fontSize="lg" color={textColor}>
            Find answers to your most common questions below. Need further help?
            We&apos;re just a message away.
          </Text>
        </VStack>

        {/* FAQ Accordion */}
        <MotionBox
          shadow="2xl"
          rounded="2xl"
          px={{ base: 5, md: 10 }}
          py={{ base: 8, md: 12 }}
          maxW="4xl"
          mx="auto"
          border="1px solid"
          borderColor={border}
          bg={useColorModeValue("whiteAlpha.900", "blackAlpha.400")}
          backdropFilter="blur(10px)"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Accordion allowToggle>
            {faqs.map((faq, idx) => (
              <MotionAccordionItem
                key={idx}
                border="none"
                py={4}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 } as any}
              >
                {({ isExpanded }) => (
                  <Box
                    rounded="lg"
                    px={3}
                    py={2}
                    mb={2}
                    border="1px solid transparent"
                    _hover={{
                      borderColor: accent,
                      boxShadow: "0 0 10px rgba(194,136,64,0.3)",
                      transform: "translateY(-2px)",
                    }}
                    transition="all 0.3s ease"
                    bgGradient={
                      isExpanded
                        ? "linear(to-r, rgba(194,136,64,0.08), rgba(13,13,13,0.05))"
                        : "none"
                    }
                  >
                    <h2>
                      <AccordionButton
                        px={0}
                        _hover={{ bg: "transparent" }}
                        _expanded={{ color: accent }}
                      >
                        <Box
                          flex="1"
                          textAlign="left"
                          fontSize={{ base: "md", md: "lg" }}
                          fontWeight="semibold"
                          display="flex"
                          alignItems="center"
                          gap={2}
                          color={isExpanded ? accent : textColor}
                        >
                          <motion.div
                            animate={
                              isExpanded
                                ? { scale: [1, 1.2, 1] }
                                : { scale: 1 }
                            }
                            transition={{ duration: 0.6 } as any}
                          >
                            <Icon as={FaQuestionCircle} color={accent} />
                          </motion.div>
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
                          transition={{ duration: 0.4, ease: "easeInOut" }as any}
                        >
                          <AccordionPanel
                            px={1}
                            pt={3}
                            pb={2}
                            color={textColor}
                            fontSize={{ base: "sm", md: "md" }}
                            lineHeight="1.75"
                          >
                            {faq.answer}
                          </AccordionPanel>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                )}
              </MotionAccordionItem>
            ))}
          </Accordion>
        </MotionBox>

        {/* Support CTA */}
        <MotionBox
          mt={20}
          textAlign="center"
          p={10}
          rounded="2xl"
          border="1px solid transparent"
          bg={useColorModeValue("whiteAlpha.800", "blackAlpha.500")}
          backdropFilter="blur(14px)"
          // borderImage="linear-gradient(90deg, #C28840, #0D0D0D) 1"
          shadow="lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Heading fontSize="2xl" mb={4} color={accent}>
            Still need help?
          </Heading>
          <Text color={textColor} maxW="2xl" mx="auto" mb={6}>
            Our fashion consultants are available to assist you with any
            additional questions, styling advice, or custom requests.
          </Text>
          <HStack justify="center" spacing={5}>
            <Button
              as="a"
              href="https://wa.me/2348094217767"
              leftIcon={<FaWhatsapp />}
              colorScheme="green"
              size="lg"
              rounded="full"
              _hover={{ transform: "scale(1.05)" }}
              transition="all 0.3s ease"
            >
              Chat on WhatsApp
            </Button>
            <Button
              as="a"
              href="mailto:kofoworola.alasooke@gmail.com"
              leftIcon={<FaEnvelope />}
              size="lg"
              rounded="full"
              bg={accent}
              color="white"
              _hover={{ bg: "#a67333", transform: "scale(1.05)" }}
              transition="all 0.3s ease"
            >
              Email Us
            </Button>
          </HStack>
        </MotionBox>
      </Container>
    </Box>
  );
};
