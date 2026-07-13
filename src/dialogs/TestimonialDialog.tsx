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
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export const TestimonialDialog = ({ isOpen, onClose }: Props) => {
    const bg = useColorModeValue("white", "gray.900");
    const border = useColorModeValue("gray.100", "gray.700");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [form, setForm] = useState({
      fullname: "",
      email: "",
      who: "",
      testimony: "",
    });
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async () => {
      if (
        !form.fullname ||
        !form.email ||
        !form.who ||
        !form.testimony
      ) {
        toast({
          title: "Incomplete Form",
          description: "Please complete all fields.",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
    
        return;
      }
    
      try {
        setLoading(true);
    
        const response = await fetch("/api/testimonials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
    
        const data = await response.json();
    
        if (!data.success) {
          throw new Error(
            data.message || "Failed to submit testimony"
          );
        }
    
        toast({
          title: "Testimony Submitted",
          description:
            "Thank you for sharing your experience. Your testimony will be reviewed before publication.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
    
        setForm({
          fullname: "",
          email: "",
          who: "",
          testimony: "",
        });
    
        onClose();
      } catch (error: any) {
        toast({
          title: "Submission Failed",
          description:
            error.message || "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
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
                name="fullname"
                value={form.fullname}
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
                name="who"
                value={form.who}
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
                name="testimony"
                value={form.testimony}
                onChange={handleChange}
              />
              <Button
                bg="#C28840"
                color="white"
                _hover={{ opacity: 0.9 }}
                size="lg"
                onClick={handleSubmit}
                isLoading={loading}
                loadingText="Submitting..."
              >
                Submit Testimony
            </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
};