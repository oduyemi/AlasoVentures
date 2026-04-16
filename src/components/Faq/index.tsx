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
    question: "Do you offer fully custom designs?",
    answer:
      "Yes, we specialize in custom-woven aso-oke. You can request specific colors, patterns, and styles, or share your inspiration, and we’ll bring your vision to life.",
  },
  {
    question: "Can I provide my own design or color inspiration?",
    answer:
      "Absolutely. You can send us reference images, color palettes, or ideas, and we’ll work closely with you to create a unique design.",
  },
  {
    question: "How long does it take to complete a custom order?",
    answer:
      "Production timelines vary depending on the complexity and quantity of your order. On average, custom orders take 3–6 weeks. Larger or more intricate designs may take longer.",
  },
  {
    question: "Do you accept bulk or aso-ebi orders?",
    answer:
      "Yes, we handle both small and large group orders, including aso-ebi for weddings and events. Early booking is recommended for bulk requests",
  },
  {
    question: "Is there a minimum order quantity?",
    answer:
      "Minimum order requirements may apply depending on the design. Please contact us with your request for specific details.",
  },
  {
    question: "How many loom sets/bundles do I need for my outfit?",
    answer:
      "This depends on the styles and we’re happy to guide you based on your needs.",
  },
  {
    question: "How is pricing determined?",
    answer:
      `Prices are based on:

      Type of material (cotton, metallic, supernet etc.)
      Complexity of design
      Color combinations
      Quantity ordered
      
      Custom designs may cost more due to the level of detail involved.`,
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers and other secure payment options. A deposit is required before production begins."
  },
  {
    question: "Do you offer nationwide or international delivery?",
    answer: "Yes, we deliver across Nigeria and internationally. Shipping fees and timelines vary depending on location."
  },
  {
    question: "Can I request changes after placing my order?",
    answer: "Changes can only be made before production begins. Once weaving has started, modifications may not be possible."
  },
  {
    question: "Do you accept returns or exchanges?",
    answer: "Due to the custom nature of our products, we do not accept returns or exchanges unless there is an error on our part."
  },
  {
    question: "How do I care for my aso-oke?",
    answer: `Dry clean for best results
    Avoid harsh detergents
    Store in a cool, dry place
    Proper care will help maintain its quality and longevity.`
  },
  {
    question: "Can I see samples before placing an order?",
    answer: "Yes, we can provide photos, videos, or sample swatches upon request. Studio visits may also be arranged by appointment."
  },
  {
    question: "How do I get started?",
    answer: "Simply contact us via our website, WhatsApp, or social media with your ideas, and we’ll guide you through the process from design to delivery."
  }
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
                      whiteSpace="pre-line" 
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