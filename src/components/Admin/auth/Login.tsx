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
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";
import { useAuth, User } from "../../../app/context/auth.context";


type LoginResponse = {
  token: string;
  user: User;
};

export const AdminLogin = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const redirectTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimeout.current) {
        clearTimeout(redirectTimeout.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
  
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post<LoginResponse>(
        "/api/auth/login",
        { email, password },
        // { withCredentials: true }
      );
  
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
      if (user.role !== "admin") {
        setError("Access denied: Administrators only");
        return;
      }

      setUser(user);

      router.push("/admin");
  
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError("Access denied: Administrators only");
      } else {
        setError("Invalid credentials");
      }
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
      bg="#0D0D0D"
    >
      <Box
        w="400px"
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
            Admin Login
          </Heading>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Access the secure dashboard
          </Text>
        </VStack>

        <Divider mb={4} />

        {success && (
          <Alert status="success" mb={4} rounded="md">
            <AlertIcon />
            Login successful! Redirecting to dashboard shortly...
          </Alert>
        )}

        {error && (
          <Alert status="error" mb={4} rounded="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <VStack spacing={3}>
            <Input
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              isDisabled={success}
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              isDisabled={success}
            />
          </VStack>

          <Button
            mt={6}
            w="full"
            type="submit"
            isLoading={loading}
            loadingText="Logging in..."
            isDisabled={success}
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
            Sign In
          </Button>
        </form>
      </Box>
    </Box>
  );
};