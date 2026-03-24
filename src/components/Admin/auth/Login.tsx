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
import { useAdmin } from "../../../app/context/admin.context";

export const AdminLogin = () => {
  const router = useRouter();
  const { refreshAdmin } = useAdmin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      await refreshAdmin();
      router.push("/admin");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
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

        {error && (
          <Alert status="error" mb={4} rounded="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <VStack spacing={3}>
          <Input
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </VStack>

        <Button
          mt={6}
          w="full"
          onClick={handleLogin}
          isLoading={loading}
          loadingText="Logging in..."
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
      </Box>
    </Box>
  );
};