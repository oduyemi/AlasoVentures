"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion, Variants, TargetAndTransition } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionFormControl = motion(FormControl);
const MotionButton = motion(Button);

export const BookAppointment = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    proposedDate: "",
    service: "",
    additionalNotes: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault();
  
    setLoading(true);
  
    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Failed to book appointment");
      }
  
      toast({
        title: "Appointment Booked",
        description: result.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        proposedDate: "",
        service: "",
        additionalNotes: "",
      });
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // animation for staggered fields
  const fieldVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number): TargetAndTransition => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Box minH="100vh" py={{ base: 12, md: 20 }} bg="#fff">
      <Container maxW="5xl">
        {/* Heading */}
        <MotionVStack
          spacing={4}
          textAlign="center"
          mb={12}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, #C28840, #0D0D0D)"
            bgClip="text"
          >
            Book an Appointment
          </Heading>
          <Text color="gray.600" fontSize="lg" maxW="2xl">
            Ready to create your signature piece? Let’s begin your journey with
            a personalized appointment.
          </Text>
        </MotionVStack>

        {/* Form Card */}
        <MotionBox
          bg="rgba(26, 32, 44, 0.9)" // glassy dark
          border="1px solid rgba(194,136,64,0.4)"
          backdropFilter="blur(12px)"
          p={{ base: 6, md: 10 }}
          rounded="2xl"
          shadow="2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {/* Left column - personal info */}
              <VStack spacing={5}>
              {[
                {
                  label: "Full Name",
                  name: "fullname",
                  type: "text",
                  required: true,
                  placeholder: "Your full name",
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  required: true,
                  placeholder: "you@example.com",
                },
                {
                  label: "Phone Number",
                  name: "phone",
                  type: "tel",
                  required: true,
                  placeholder: "+234...",
                },
                {
                  label: "Proposed Appointment Date",
                  name: "proposedDate",
                  type: "date",
                  required: true,
                  placeholder: "",
                },
              ].map((field, i) => (
                <MotionFormControl
                  key={field.name}
                  isRequired={field.required}
                  variants={fieldVariant}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  w="full"
                >
                  <FormLabel color="gray.300">{field.label}</FormLabel>

                  <Input
                    name={field.name}
                    type={field.type}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    bg="gray.800"
                    color="gray.100"
                    _focus={{
                      borderColor: "#C28840",
                      boxShadow: "0 0 0 1px #C28840",
                    }}
                  />
                </MotionFormControl>
              ))}
                            
              </VStack>

              {/* Right column - service + notes */}
              <VStack spacing={5}>
                <MotionFormControl
                  isRequired
                  variants={fieldVariant}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                  w="full"
                >
                  <FormLabel color="gray.300">Service</FormLabel>
                  <Select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder="Select a service"
                    bg="gray.800"
                    color="gray.100"
                    _focus={{
                      borderColor: "#C28840",
                      boxShadow: "0 0 0 1px #C28840",
                    }}
                  >
                    <option style={{ background: "#1A202C" }}>Custom Fabrics</option>
                    <option style={{ background: "#1A202C" }}>Custom Styles (Made to Fit)</option>
                    <option style={{ background: "#1A202C" }}>Others</option>
                  </Select>
                </MotionFormControl>

                <MotionFormControl
                  variants={fieldVariant}
                  initial="hidden"
                  animate="visible"
                  custom={5}
                  w="full"
                >
                  <FormLabel color="gray.300">Additional Notes</FormLabel>
                  <Textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    placeholder="Describe your idea, colors, or any special request"
                    bg="gray.800"
                    color="gray.100"
                    rows={6}
                    _focus={{
                      borderColor: "#C28840",
                      boxShadow: "0 0 0 1px #C28840",
                    }}
                  />
                </MotionFormControl>
              </VStack>
            </SimpleGrid>
            <MotionButton
              size="lg"
              type="submit"
              isLoading={loading}
              loadingText="Booking..."
              isDisabled={loading}
              width="full"
              mt={8}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              variants={fieldVariant}
              initial="hidden"
              animate="visible"
              custom={6}
              bgGradient="linear(to-r, #C28840, #fff)"
              color="black"
              fontWeight="semibold"
              rounded="xl"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(194,136,64,0.5)",
              }}
            >
              Submit Appointment
            </MotionButton>
          </form>
        </MotionBox>
      </Container>
    </Box>
  );
};
