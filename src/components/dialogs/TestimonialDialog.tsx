import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading,
    Input,
    Textarea,
    Button,
    Select,
    Stack,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export const TestimonialDialog = ({ isOpen, onClose }: Props) => {
    const bg = useColorModeValue("white", "gray.900");
    const border = useColorModeValue("gray.100", "gray.700");
  
    const [form, setForm] = useState({
      name: "",
      email: "",
      role: "",
      message: "",
    });
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = () => {
      console.log("Submitting:", form);
  
      // 🔥 Hook to backend here
      // await fetch('/api/testimonials', { method: 'POST', body: JSON.stringify(form) })
  
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay backdropFilter="blur(6px)" />
  
        <ModalContent
          bg={bg}
          borderRadius="2xl"
          border="1px solid"
          borderColor={border}
          boxShadow="2xl"
          p={6}
        >
          <ModalBody>
            <Heading fontSize="xl" mb={6}>
              Share Your Experience
            </Heading>
  
            <Stack spacing={4}>
              <Input
                placeholder="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
  
              <Input
                placeholder="Email Address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
  
              <Select
                placeholder="Who are you?"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option>Returning Customer</option>
                <option>Client</option>
                <option>Fashion Enthusiast</option>
                <option>New Visitor</option>
              </Select>
  
              <Textarea
                placeholder="Tell us your experience..."
                rows={4}
                name="message"
                value={form.message}
                onChange={handleChange}
              />
  
              <Button
                bg="#C28840"
                color="white"
                _hover={{ opacity: 0.9 }}
                size="lg"
                onClick={handleSubmit}
              >
                Submit Testimony
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
};