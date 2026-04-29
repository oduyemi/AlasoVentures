"use client";
import {
  Box,
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
  Progress,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { motion, Variants, TargetAndTransition, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionFormControl = motion(FormControl);
const MotionButton = motion(Button);

const maleStyles = [
  "complete_agbada",
  "senator_wear",
  "top_trouser",
  "top_only",
  "trouser_only",
  "cap_only",
];

const femaleStyles = [
  "gown",
  "iro_buba",
  "skirt_blouse",
  "wrapper_only",
  "blouse_only",
];

const standardSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

const measurementFields: Record<string, string[]> = {
  complete_agbada: ["chest", "shoulder", "sleeve", "topLength", "waist", "trouserLength", "capSize"],
  senator_wear: ["chest", "shoulder", "sleeve", "topLength", "waist", "trouserLength"],
  top_trouser: ["chest", "shoulder", "sleeve", "topLength", "waist", "trouserLength"],
  top_only: ["chest", "shoulder", "sleeve", "topLength"],
  trouser_only: ["waist", "trouserLength", "hip"],
  cap_only: ["capSize"],
  gown: ["bust", "waist", "hip", "shoulder", "sleeve", "gownLength"],
  iro_buba: ["bust", "waist", "hip", "shoulder", "sleeve", "blouseLength", "wrapperLength"],
  skirt_blouse: ["bust", "waist", "hip", "shoulder", "sleeve", "blouseLength", "skirtLength"],
  wrapper_only: ["waist", "hip", "wrapperLength"],
  blouse_only: ["bust", "shoulder", "sleeve", "blouseLength"],
  couple_set: [],
};

type Category = "male" | "female" | "couple";
type SizeMode = "standard" | "custom";

interface Measurements {
  [key: string]: string;
}

interface FormData {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  category: Category;
  style: string;
  sizeMode: SizeMode;
  standardSize: string;
  measurements: Measurements;
  partnerStandardSize: string;
  partnerMeasurements: Measurements;
  fabricType: string;
  fabricColor: string;
  quantity: string;
  description: string;
  additionalInfo: string;
  imageUrls: string;
}

const initialFormData: FormData = {
  fname: "",
  lname: "",
  email: "",
  phone: "",
  category: "male",
  style: "",
  sizeMode: "standard",
  standardSize: "",
  measurements: {},
  partnerStandardSize: "",
  partnerMeasurements: {},
  fabricType: "",
  fabricColor: "",
  quantity: "1",
  description: "",
  additionalInfo: "",
  imageUrls: "",
};

export default function CustomOrderDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const totalSteps = 6;

  const availableStyles = useMemo(() => {
    if (formData.category === "male") return maleStyles;
    if (formData.category === "female") return femaleStyles;
    return ["couple_set"];
  }, [formData.category]);

  const currentMeasurementFields = useMemo(
    () => measurementFields[formData.style] || [],
    [formData.style]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMeasurementChange = (field: string, value: string, partner = false) => {
    if (partner) {
      setFormData((prev) => ({
        ...prev,
        partnerMeasurements: {
          ...prev.partnerMeasurements,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        measurements: {
          ...prev.measurements,
          [field]: value,
        },
      }));
    }
  };

  const nextStep = () => step < totalSteps && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const resetForm = () => {
    setFormData(initialFormData);
    setStep(1);
    onClose();
  };

  const handleSubmit = () => {
    toast({
      title: "Custom order submitted",
      description: "We'll review your request and contact you shortly.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    console.log(formData);
    resetForm();
  };

  const fieldVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number): TargetAndTransition => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.35,
        ease: "easeOut",
      },
    }),
  };

  const renderMeasurements = (partner = false) => (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} w="full">
      {currentMeasurementFields.map((field, i) => (
        <MotionFormControl
          key={`${partner ? "partner-" : ""}${field}`}
          variants={fieldVariant}
          initial="hidden"
          animate="visible"
          custom={i}
        >
          <FormLabel color="gray.300" textTransform="capitalize">
            {field.replace(/([A-Z])/g, " $1")}
          </FormLabel>
          <Input
            type="number"
            placeholder={`Enter ${field}`}
            value={
              partner
                ? formData.partnerMeasurements[field] || ""
                : formData.measurements[field] || ""
            }
            onChange={(e) => handleMeasurementChange(field, e.target.value, partner)}
            bg="gray.800"
            color="white"
            _focus={{
              borderColor: "#C28840",
              boxShadow: "0 0 0 1px #C28840",
            }}
          />
        </MotionFormControl>
      ))}
    </SimpleGrid>
  );

  const stepContent = () => {
    switch (step) {
      case 1:
        return (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {[
              ["fname", "First Name"],
              ["lname", "Last Name"],
              ["email", "Email"],
              ["phone", "Phone Number"],
            ].map(([name, label], i) => (
              <MotionFormControl
                key={name}
                isRequired
                variants={fieldVariant}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <FormLabel color="gray.300">{label}</FormLabel>
                <Input
                  name={name}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  bg="gray.800"
                  color="white"
                />
              </MotionFormControl>
            ))}
          </SimpleGrid>
        );

      case 2:
        return (
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel color="gray.300">Customer Category</FormLabel>
              <RadioGroup
                value={formData.category}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: value as Category,
                    style: "",
                  }))
                }
              >
                <Stack direction={{ base: "column", md: "row" }} spacing={6}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="couple">Couple</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.300">Style</FormLabel>
              <Select
                name="style"
                value={formData.style}
                onChange={handleChange}
                placeholder="Select style"
                bg="gray.800"
                color="white"
              >
                {availableStyles.map((style) => (
                  <option key={style} value={style} style={{ background: "#1A202C" }}>
                    {style.replace(/_/g, " ")}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        );

      case 3:
        return (
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel color="gray.300">Size Option</FormLabel>
              <RadioGroup
                value={formData.sizeMode}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, sizeMode: value as SizeMode }))
                }
              >
                <Stack direction="row" spacing={6}>
                  <Radio value="standard">Standard</Radio>
                  <Radio value="custom">Custom</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {formData.sizeMode === "standard" ? (
              <FormControl>
                <FormLabel color="gray.300">Standard Size</FormLabel>
                <Select
                  name="standardSize"
                  value={formData.standardSize}
                  onChange={handleChange}
                  placeholder="Select size"
                  bg="gray.800"
                  color="white"
                >
                  {standardSizes.map((size) => (
                    <option key={size} value={size} style={{ background: "#1A202C" }}>
                      {size}
                    </option>
                  ))}
                </Select>
              </FormControl>
            ) : (
              renderMeasurements()
            )}

            {formData.category === "couple" && (
              <Box pt={6} borderTop="1px solid rgba(255,255,255,0.1)">
                <Heading size="sm" color="#C28840" mb={4}>
                  Partner Size Details
                </Heading>
                {formData.sizeMode === "standard" ? (
                  <FormControl>
                    <FormLabel color="gray.300">Partner Standard Size</FormLabel>
                    <Select
                      name="partnerStandardSize"
                      value={formData.partnerStandardSize}
                      onChange={handleChange}
                      placeholder="Select size"
                      bg="gray.800"
                      color="white"
                    >
                      {standardSizes.map((size) => (
                        <option key={size} value={size} style={{ background: "#1A202C" }}>
                          {size}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  renderMeasurements(true)
                )}
              </Box>
            )}
          </VStack>
        );

      case 4:
        return (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {[
              ["fabricType", "Fabric Type"],
              ["fabricColor", "Fabric Color"],
              ["quantity", "Quantity"],
            ].map(([name, label], i) => (
              <MotionFormControl
                key={name}
                variants={fieldVariant}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <FormLabel color="gray.300">{label}</FormLabel>
                <Input
                  name={name}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  bg="gray.800"
                  color="white"
                />
              </MotionFormControl>
            ))}
          </SimpleGrid>
        );

      case 5:
        return (
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel color="gray.300">Order Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                bg="gray.800"
                color="white"
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.300">Additional Notes</FormLabel>
              <Textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={4}
                bg="gray.800"
                color="white"
              />
            </FormControl>
          </VStack>
        );

      case 6:
        return (
          <VStack spacing={5}>
            <FormControl>
              <FormLabel color="gray.300">Inspiration Image URLs</FormLabel>
              <Textarea
                name="imageUrls"
                value={formData.imageUrls}
                onChange={handleChange}
                placeholder="Paste one or multiple image links"
                rows={5}
                bg="gray.800"
                color="white"
              />
            </FormControl>

            <Checkbox colorScheme="yellow" defaultChecked>
              I confirm that my measurements and order details are accurate.
            </Checkbox>
          </VStack>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Button
        size="lg"
        bg="#C28840"
        color="white"
        borderRadius="full"
        px={8}
        _hover={{ bg: "#A66F2D", transform: "translateY(-2px)" }}
        onClick={onOpen}
      >
        Book a Custom Style
      </Button>

      <Modal isOpen={isOpen} onClose={resetForm} size="6xl" scrollBehavior="inside" isCentered>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(8px)" />
        <ModalContent bg="#111827" color="white" borderRadius="2xl" mx={4}>
          <ModalHeader pb={2}>
            <Heading
              fontSize={{ base: "2xl", md: "3xl" }}
              bgGradient="linear(to-r, #C28840, #F7E7CE)"
              bgClip="text"
            >
              Custom Aso-Oke Order
            </Heading>
            <Text mt={2} color="gray.400" fontSize="md" fontWeight="normal">
              Design your perfect traditional outfit with our guided order process.
            </Text>
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody pb={6}>
            <Progress
              value={(step / totalSteps) * 100}
              mb={8}
              colorScheme="yellow"
              rounded="full"
              size="sm"
            />

            <AnimatePresence mode="wait">
              <MotionBox
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                {stepContent()}
              </MotionBox>
            </AnimatePresence>
          </ModalBody>

          <ModalFooter>
            <HStack justify="space-between" w="full">
              <Button
                onClick={prevStep}
                isDisabled={step === 1}
                variant="outline"
                colorScheme="yellow"
              >
                Back
              </Button>

              {step < totalSteps ? (
                <MotionButton
                  onClick={nextStep}
                  bgGradient="linear(to-r, #C28840, #F7E7CE)"
                  color="black"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next Step
                </MotionButton>
              ) : (
                <MotionButton
                  onClick={handleSubmit}
                  bgGradient="linear(to-r, #C28840, #F7E7CE)"
                  color="black"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Custom Order
                </MotionButton>
              )}
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}