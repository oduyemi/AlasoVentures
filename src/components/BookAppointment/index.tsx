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
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Add actual API call here if needed
    toast({
      title: "Appointment booked.",
      description: "We'll contact you shortly to confirm.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      service: "",
      message: "",
    });
  };

  // Variants for form fields animation
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
    <Box minH="100vh" py={{ base: 10, md: 20 }} bg="#0D0D0D">
      <Container maxW="2xl">
        <MotionVStack
          spacing={6}
          textAlign="center"
          mb={10}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading
            color="white"
            fontSize={{ base: "2xl", md: "3xl" }}
            bgGradient="linear(to-r, #C28840, #fff)"
            bgClip="text"
          >
            Book an Appointment
          </Heading>
          <Text color="gray.400">
            Ready to create your signature piece? Let’s start your journey with
            a personalized appointment.
          </Text>
        </MotionVStack>

        <MotionBox
          bg="gray.900"
          p={8}
          rounded="xl"
          shadow="lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <VStack spacing={5}>
            {[
              {
                label: "Full Name",
                name: "name",
                type: "text",
                required: true,
                placeholder: "Your name",
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
                required: false,
                placeholder: "+234...",
              },
              {
                label: "Appointment Date",
                name: "date",
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
                />
              </MotionFormControl>
            ))}

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
              >
                <option style={{ background: "#1A202C" }}>Custom Aso-Oke</option>
                <option style={{ background: "#1A202C" }}>Made to Fit</option>
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
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your idea, colors, or any special request"
                bg="gray.800"
                color="gray.100"
              />
            </MotionFormControl>

            <MotionButton
              colorScheme="yellow"
              size="lg"
              width="full"
              mt={4}
              onClick={handleSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              variants={fieldVariant}
              initial="hidden"
              animate="visible"
              custom={6}
              bgGradient="linear(to-r, #C28840, #fff)"
                color="black"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
            >
              Submit Appointment
            </MotionButton>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};
