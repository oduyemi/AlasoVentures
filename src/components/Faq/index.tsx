"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Icon,
  Button,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { FaQuestionCircle, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionAccordionItem = motion.create(AccordionItem);

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

export const FAQ = () => {
  const bg = useColorModeValue("#fff", "#0D0D0D");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accent = "#C28840";
  const border = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg={bg} py={{ base: 14, md: 20 }}>
      <Container maxW="5xl">
        {/* Header */}
        <VStack
          spacing={4}
          textAlign="center"
          mb={16}
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8} }}
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

        {/* Accordion */}
        <MotionBox
          rounded="xl"
          border="1px solid"
          borderColor={border}
          overflow="hidden"
        >
          <Accordion allowToggle>
            {faqs.map((faq, idx) => (
              <MotionAccordionItem
                key={idx}
                border="none"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: idx * 0.05 },
                }}
              >
                {({ isExpanded }) => (
                  <Box
                    borderBottom="1px solid"
                    borderColor={border}
                    px={{ base: 4, md: 6 }}
                    py={4}
                    position="relative"
                    bg={isExpanded ? "blackAlpha.50" : "transparent"}
                  >
                    {/* Accent line */}
                    {isExpanded && (
                      <Box
                        position="absolute"
                        left="0"
                        top="0"
                        bottom="0"
                        w="3px"
                        bg={accent}
                        borderRadius="full"
                      />
                    )}

                    <AccordionButton
                      px={0}
                      _hover={{ bg: "transparent" }}
                    >
                      <HStack spacing={3} flex="1" align="start">
                        <Icon
                          as={FaQuestionCircle}
                          color={accent}
                          mt="2px"
                        />

                        <Box
                          textAlign="left"
                          fontWeight="medium"
                          fontSize="md"
                          color={isExpanded ? "black" : textColor}
                        >
                          {faq.question}
                        </Box>
                      </HStack>

                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel
                      px={0}
                      pt={2}
                      pb={2}
                      color={textColor}
                      fontSize="sm"
                      lineHeight="1.7"
                    >
                      {faq.answer}
                    </AccordionPanel>
                  </Box>
                )}
              </MotionAccordionItem>
            ))}
          </Accordion>
        </MotionBox>

        {/* CTA */}
        <MotionBox
          mt={14}
          textAlign="center"
          p={8}
          rounded="xl"
          border="1px solid"
          borderColor={border}
        >
          <Heading fontSize="lg" mb={3}>
            Still have questions?
          </Heading>

          <Text color="gray.500" mb={6}>
            Our team is available to guide you through your order.
          </Text>

          <HStack justify="center" spacing={4}>
            <Button
              as="a"
              href="https://wa.me/2348094217767"
              leftIcon={<FaWhatsapp />}
              bg="green.500"
              color="white"
              rounded="full"
              px={6}
              _hover={{ bg: "green.600" }}
            >
              WhatsApp
            </Button>

            <Button
              as="a"
              href="mailto:kofoworola.alasooke@gmail.com"
              leftIcon={<FaEnvelope />}
              variant="outline"
              rounded="full"
              px={6}
            >
              Email
            </Button>
          </HStack>
        </MotionBox>
      </Container>
    </Box>
  );
};