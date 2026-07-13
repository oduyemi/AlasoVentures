"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

export interface ProfileFormValues {
  fname: string;
  lname: string;
  email: string;
}

interface ProfileFormProps {
  user: ProfileFormValues;
  loading?: boolean;
  onSave: (values: ProfileFormValues) => void;
}

export const ProfileForm = ({
  user,
  loading = false,
  onSave,
}: ProfileFormProps) => {
  const [form, setForm] = useState<ProfileFormValues>(user);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (
    field: keyof ProfileFormValues,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box
      bg="#111"
      border="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="2xl"
      p={6}
    >
      <Stack spacing={6}>
        <Box>
          <Text fontSize="xl" fontWeight="700">
            Personal Information
          </Text>

          <Text
            mt={1}
            fontSize="sm"
            color="gray.400"
          >
            Update your account information.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          <FormControl>
            <FormLabel>First Name</FormLabel>

            <Input
              value={form.fname}
              onChange={(e) =>
                handleChange("fname", e.target.value)
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last Name</FormLabel>

            <Input
              value={form.lname}
              onChange={(e) =>
                handleChange("lname", e.target.value)
              }
            />
          </FormControl>
        </SimpleGrid>

        <FormControl>
          <FormLabel>Email Address</FormLabel>

          <Input
            type="email"
            value={form.email}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
          />
        </FormControl>

        <Button
          alignSelf="flex-end"
          colorScheme="purple"
          onClick={() => onSave(form)}
          isLoading={loading}
        >
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
};