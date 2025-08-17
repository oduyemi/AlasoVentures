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
  Divider,
  Checkbox,
  HStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { motion, Variants, TargetAndTransition } from "framer-motion";
import { FiShoppingBag, FiPhone, FiUser, FiMail, FiMessageCircle } from "react-icons/fi";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionFormControl = motion(FormControl);
const MotionButton = motion(Button);

type FormState = {
  fullname: string;
  email: string;
  phone: string; // user’s number (WhatsApp preferred)
  productType: string;
  otherProduct: string;
  productName: string;
  quantity: string;
  size: string;
  color: string;
  deliveryLocation: string;
  instructions: string;
  terms: boolean;
};

const initialState: FormState = {
  fullname: "",
  email: "",
  phone: "",
  productType: "",
  otherProduct: "",
  productName: "",
  quantity: "",
  size: "",
  color: "",
  deliveryLocation: "",
  instructions: "",
  terms: false,
};

// >>> Put your business WhatsApp number here in international format, no plus sign.
const WHATSAPP_NUMBER = "2348094217767";

export default function PreOrder() {
  const toast = useToast();
  const [formData, setFormData] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((s) => ({ ...s, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((s) => ({ ...s, [name]: value }));
    }
  };

  // Helpful phone normalizer: “080…” => “23480…”, strips non-digits
  const normalizeToIntl = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return "";
    // If already starts with country code (e.g., 234...), keep it.
    if (digits.startsWith("234")) return digits;
    // If starts with leading 0 (e.g., 080...), convert to 23480...
    if (digits.startsWith("0")) return `234${digits.slice(1)}`;
    // Fallback: return as-is (user may be intl)
    return digits;
  };

  const fieldVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number): TargetAndTransition => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.35, ease: "easeOut" },
    }),
  };

  const isOthers = formData.productType === "Others";

  // Basic validation flags
  const errors = useMemo(() => {
    return {
      fullname: !formData.fullname.trim(),
      email: !formData.email.trim(),
      productType: !formData.productType.trim(),
      otherProduct: isOthers && !formData.otherProduct.trim(),
      quantity: !formData.quantity.trim(),
      terms: !formData.terms,
    };
  }, [formData, isOthers]);

  const anyErrors =
    errors.fullname ||
    errors.email ||
    errors.productType ||
    errors.otherProduct ||
    errors.quantity ||
    errors.terms;

  const handleSubmit = () => {
    if (anyErrors) {
      toast({
        title: "Missing information",
        description:
          "Please complete the required fields (Name, Email, Product Type, Quantity, and Terms).",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setSubmitting(true);

    // Build final product line
    const finalProduct =
      formData.productType === "Others"
        ? `Others: ${formData.otherProduct}`
        : formData.productType;

    const userNumberIntl = normalizeToIntl(formData.phone);

    const message = `Hello, I just placed a preorder on your site.%0A%0A` +
      `Name: ${encodeURIComponent(formData.fullname)}%0A` +
      `Email: ${encodeURIComponent(formData.email)}%0A` +
      `Phone (WhatsApp): ${encodeURIComponent(formData.phone)}%0A%0A` +
      `Product Type: ${encodeURIComponent(finalProduct)}%0A` +
      (formData.productName ? `Product Name/Design: ${encodeURIComponent(formData.productName)}%0A` : "") +
      `Quantity: ${encodeURIComponent(formData.quantity)}%0A` +
      (formData.size ? `Size/Measurement: ${encodeURIComponent(formData.size)}%0A` : "") +
      (formData.color ? `Preferred Color(s): ${encodeURIComponent(formData.color)}%0A` : "") +
      (formData.deliveryLocation ? `Delivery Location: ${encodeURIComponent(formData.deliveryLocation)}%0A` : "") +
      (formData.instructions ? `%0ANotes:%0A${encodeURIComponent(formData.instructions)}%0A` : "") +
      (userNumberIntl ? `%0AContact back on WhatsApp: wa.me/${userNumberIntl}` : "");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    // Optional: toast before redirect
    toast({
      title: "Preorder ready to send",
      description: "We’re opening WhatsApp so you can confirm your request.",
      status: "success",
      duration: 2500,
      isClosable: true,
    });

    // Open WhatsApp in new tab
    window.open(url, "_blank");

    // Reset form after
    setSubmitting(false);
    setFormData(initialState);
  };

  return (
    <Box minH="100vh" py={{ base: 10, md: 20 }} bg="#0D0D0D">
      <Container maxW="2xl">
        <MotionVStack
          spacing={4}
          textAlign="center"
          mb={10}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <HStack justify="center" spacing={3} color="white">
            <FiShoppingBag />
            <Heading
              color="white"
              fontSize={{ base: "2xl", md: "3xl" }}
              bgGradient="linear(to-r, #C28840, #fff)"
              bgClip="text"
            >
              Pre-Order Now
            </Heading>
          </HStack>
          <Text color="gray.400">
            Secure your favorite fabrics and styles. We’ll follow up on WhatsApp to finalize your order.
          </Text>
        </MotionVStack>

        <MotionBox
          bg="gray.900"
          p={8}
          rounded="xl"
          shadow="lg"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <VStack spacing={7} align="stretch">
            {/* Customer Info */}
            <Heading size="md" color="white">
              Your Information
            </Heading>
            <Divider borderColor="gray.700" />

            {/* Full Name */}
            <MotionFormControl
              isRequired
              isInvalid={errors.fullname}
              variants={fieldVariant}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <FormLabel color="gray.300">
                <HStack spacing={2}><FiUser /><span>Full Name</span></HStack>
              </FormLabel>
              <Input
                name="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Your name"
                bg="gray.800"
                color="gray.100"
              />
              {errors.fullname && <FormErrorMessage>Full name is required.</FormErrorMessage>}
            </MotionFormControl>

            {/* Email */}
            <MotionFormControl
              isRequired
              isInvalid={errors.email}
              variants={fieldVariant}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <FormLabel color="gray.300">
                <HStack spacing={2}><FiMail /><span>Email</span></HStack>
              </FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                bg="gray.800"
                color="gray.100"
              />
              {errors.email && <FormErrorMessage>Email is required.</FormErrorMessage>}
            </MotionFormControl>

            {/* Phone */}
            <MotionFormControl
              variants={fieldVariant}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <FormLabel color="gray.300">
                <HStack spacing={2}><FiPhone /><span>Phone (WhatsApp preferred)</span></HStack>
              </FormLabel>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 08012345678"
                bg="gray.800"
                color="gray.100"
              />
            </MotionFormControl>

            {/* Product Details */}
            <Heading size="md" color="white" mt={2}>
              Product Details
            </Heading>
            <Divider borderColor="gray.700" />

            {/* Product Type */}
            <MotionFormControl
              isRequired
              isInvalid={errors.productType}
              variants={fieldVariant}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <FormLabel color="gray.300">Product Type</FormLabel>
              <Select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                placeholder="Select product type"
                bg="gray.800"
                color="gray.100"
              >
                <option value="Aso-Oke" style={{ background: "#1A202C" }}>Aso-Oke</option>
                <option value="Kente" style={{ background: "#1A202C" }}>Kente</option>
                <option value="Saki" style={{ background: "#1A202C" }}>Saki</option>
                <option value="Akwete" style={{ background: "#1A202C" }}>Akwete</option>
                <option value="Ready-to-Wear" style={{ background: "#1A202C" }}>Ready-to-Wear</option>
                <option value="Off the Shelf" style={{ background: "#1A202C" }}>Off the Shelf</option>
                <option value="Others" style={{ background: "#1A202C" }}>Others</option>
              </Select>
              {errors.productType && <FormErrorMessage>Product type is required.</FormErrorMessage>}
            </MotionFormControl>

            {/* Others specify */}
            {isOthers && (
              <MotionFormControl
                isRequired
                isInvalid={errors.otherProduct}
                variants={fieldVariant}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                <FormLabel color="gray.300">Please specify</FormLabel>
                <Input
                  name="otherProduct"
                  type="text"
                  value={formData.otherProduct}
                  onChange={handleChange}
                  placeholder="What are you looking for?"
                  bg="gray.800"
                  color="gray.100"
                />
                {errors.otherProduct && <FormErrorMessage>Please tell us what you need.</FormErrorMessage>}
              </MotionFormControl>
            )}

            {/* Product Name */}
            <MotionFormControl variants={fieldVariant} initial="hidden" animate="visible" custom={5}>
              <FormLabel color="gray.300">Product Name / Design</FormLabel>
              <Input
                name="productName"
                type="text"
                value={formData.productName}
                onChange={handleChange}
                placeholder="e.g. Metallic Aso-Oke (Duotone)"
                bg="gray.800"
                color="gray.100"
              />
            </MotionFormControl>

            {/* Quantity */}
            <MotionFormControl
              isRequired
              isInvalid={errors.quantity}
              variants={fieldVariant}
              initial="hidden"
              animate="visible"
              custom={6}
            >
              <FormLabel color="gray.300">Quantity</FormLabel>
              <Input
                name="quantity"
                type="number"
                min={1}
                value={formData.quantity}
                onChange={handleChange}
                placeholder="How many pieces?"
                bg="gray.800"
                color="gray.100"
              />
              {errors.quantity && <FormErrorMessage>Quantity is required.</FormErrorMessage>}
            </MotionFormControl>

            {/* Size / Color / Delivery */}
            <MotionFormControl variants={fieldVariant} initial="hidden" animate="visible" custom={7}>
              <FormLabel color="gray.300">Size / Measurement</FormLabel>
              <Input
                name="size"
                type="text"
                value={formData.size}
                onChange={handleChange}
                placeholder="Your preferred size or measurement"
                bg="gray.800"
                color="gray.100"
              />
            </MotionFormControl>

            <MotionFormControl variants={fieldVariant} initial="hidden" animate="visible" custom={8}>
              <FormLabel color="gray.300">Preferred Color(s)</FormLabel>
              <Input
                name="color"
                type="text"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g. Blue & Gold"
                bg="gray.800"
                color="gray.100"
              />
            </MotionFormControl>

            <MotionFormControl variants={fieldVariant} initial="hidden" animate="visible" custom={9}>
              <FormLabel color="gray.300">Delivery Location</FormLabel>
              <Input
                name="deliveryLocation"
                type="text"
                value={formData.deliveryLocation}
                onChange={handleChange}
                placeholder="City / Address"
                bg="gray.800"
                color="gray.100"
              />
            </MotionFormControl>

            {/* Notes */}
            <MotionFormControl variants={fieldVariant} initial="hidden" animate="visible" custom={10}>
              <FormLabel color="gray.300">Additional Notes</FormLabel>
              <Textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Describe your idea, colors, or any special request"
                bg="gray.800"
                color="gray.100"
              />
            </MotionFormControl>

            {/* Terms */}
            <FormControl isRequired isInvalid={errors.terms}>
              <Checkbox
                name="terms"
                isChecked={formData.terms}
                onChange={handleChange}
                colorScheme="yellow"
              >
                I understand this is a preorder and delivery may take 2–4 weeks.
              </Checkbox>
              {errors.terms && <FormErrorMessage>You must accept the preorder terms.</FormErrorMessage>}
            </FormControl>

            {/* Submit */}
            <MotionButton
              leftIcon={<FiMessageCircle />}
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
              Submit & Continue on WhatsApp
            </MotionButton>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}
