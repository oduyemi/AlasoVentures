"use client";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  VStack,
  Divider,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const AdminRegister = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await axios.post("/api/auth/register", form);

      setSuccess("Admin account created successfully");

      setTimeout(() => {
        router.push("/admin/login");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      display="grid"
      placeItems="center"
      px={4}
      bgGradient="linear(to-br, #eef2ff, #f8fafc, #ecfdf5)"
    >
      <Box
        w="420px"
        p={8}
        rounded="2xl"
        bg="whiteAlpha.900"
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor="gray.200"
        boxShadow="xl"
      >
        <VStack spacing={4} mb={6}>
          <Box
            w="54px"
            h="54px"
            rounded="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgGradient="linear(to-br, black, gray.400)"
            color="white"
            boxShadow="lg"
          >
            <LockIcon boxSize={5} />
          </Box>

          <Heading size="md" fontWeight="extrabold">
            Create Admin Account
          </Heading>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Secure access to the dashboard
          </Text>
        </VStack>

        <Divider mb={4} />

        {error && (
          <Alert status="error" mb={4} rounded="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {success && (
          <Alert status="success" mb={4} rounded="md">
            <AlertIcon />
            {success}
          </Alert>
        )}

        <VStack spacing={3}>
          <Input
            placeholder="First name"
            value={form.fname}
            onChange={(e) => handleChange("fname", e.target.value)}
          />

          <Input
            placeholder="Last name"
            value={form.lname}
            onChange={(e) => handleChange("lname", e.target.value)}
          />

          <Input
            placeholder="Email address"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <Input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </VStack>

        <Button
          mt={6}
          w="full"
          onClick={handleRegister}
          isLoading={loading}
          loadingText="Creating..."
          rounded="full"
          bgGradient="linear(to-r, yellow.600, yellow.400)"
          color="white"
          fontWeight="bold"
          letterSpacing="wide"
          textTransform="uppercase"
          _hover={{
            bgGradient: "linear(to-r, yellow.400, yellow.300)",
          }}
          boxShadow="lg"
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
};