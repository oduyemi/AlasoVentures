"use client";
import { useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Progress,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

interface ChangePasswordCardProps {
  loading?: boolean;
  onSubmit: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void> | void;
}


interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  show: boolean;
  toggle: () => void;
  isInvalid?: boolean;
  errorMessage?: string;
}
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

const getStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return {
      value: 30,
      label: "Weak",
      color: "red",
    };
  }

  if (score <= 4) {
    return {
      value: 65,
      label: "Medium",
      color: "yellow",
    };
  }

  return {
    value: 100,
    label: "Strong",
    color: "green",
  };
};

export const ChangePasswordCard = ({
  loading = false,
  onSubmit,
}: ChangePasswordCardProps) => {
  const toast = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = useMemo(
    () => getStrength(newPassword),
    [newPassword]
  );

  const passwordsMatch =
    confirmPassword === "" ||
    newPassword === confirmPassword;

  const handleSubmit = async () => {
    const current = currentPassword.trim();
    const next = newPassword.trim();

    if (!current) {
      toast({
        title: "Current password is required.",
        status: "warning",
      });
      return;
    }

    if (!next) {
      toast({
        title: "New password is required.",
        status: "warning",
      });
      return;
    }

    if (current === next) {
      toast({
        title:
          "New password must be different from your current password.",
        status: "warning",
      });
      return;
    }

    if (!PASSWORD_REGEX.test(next)) {
      toast({
        title: "Weak password",
        description:
          "Password must contain an uppercase letter, lowercase letter, number and special character.",
        status: "warning",
      });
      return;
    }

    if (!passwordsMatch) {
      toast({
        title: "Passwords do not match.",
        status: "error",
      });
      return;
    }

    try {
      await onSubmit(current, next);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
    }
  };

  const PasswordField = ({
    label,
    value,
    onChange,
    show,
    toggle,
    isInvalid = false,
    errorMessage,
  }: PasswordFieldProps) => (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>

      <InputGroup>
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
        />

        <InputRightElement>
          <IconButton
            aria-label="Toggle password visibility"
            icon={
              show ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )
            }
            variant="ghost"
            size="sm"
            onClick={toggle}
          />
        </InputRightElement>
      </InputGroup>
      {errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );

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
          <HStack mb={2}>
            <LockKeyhole size={20} />

            <Text
              fontSize="xl"
              fontWeight="700"
            >
              Change Password
            </Text>
          </HStack>

          <Text
            color="gray.400"
            fontSize="sm"
          >
            Choose a strong password to keep your
            account secure.
          </Text>
        </Box>

        <PasswordField
          label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          show={showCurrent}
          toggle={() => setShowCurrent(!showCurrent)}
        />

        <FormControl
          isInvalid={
            newPassword.length > 0 &&
            !PASSWORD_REGEX.test(newPassword)
          }
        >
          <FormLabel>New Password</FormLabel>

          <InputGroup>
            <Input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
            />

            <InputRightElement>
              <IconButton
                aria-label="Toggle password visibility"
                icon={
                  showNew ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )
                }
                variant="ghost"
                size="sm"
                onClick={() =>
                  setShowNew(!showNew)
                }
              />
            </InputRightElement>
          </InputGroup>

          {newPassword && (
            <Box mt={3}>
              <Progress
                value={strength.value}
                colorScheme={strength.color}
                borderRadius="full"
              />

              <Text
                mt={2}
                fontSize="sm"
                color={`${strength.color}.300`}
              >
                Password strength:{" "}
                <strong>
                  {strength.label}
                </strong>
              </Text>
            </Box>
          )}

          <FormErrorMessage>
            Password must contain:
            <br />
            • At least 8 characters
            <br />
            • One uppercase letter
            <br />
            • One lowercase letter
            <br />
            • One number
            <br />
            • One special character
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!passwordsMatch}
        >
          <FormLabel>
            Confirm Password
          </FormLabel>

          <InputGroup>
            <Input
              type={
                showConfirm
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <InputRightElement>
              <IconButton
                aria-label="Toggle password visibility"
                icon={
                  showConfirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )
                }
                variant="ghost"
                size="sm"
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
              />
            </InputRightElement>
          </InputGroup>

          {!passwordsMatch && (
            <FormErrorMessage>
              Passwords do not match.
            </FormErrorMessage>
          )}
        </FormControl>

        <Button
          colorScheme="purple"
          alignSelf="flex-end"
          onClick={handleSubmit}
          isLoading={loading}
          isDisabled={
            !currentPassword.trim() ||
            !newPassword.trim() ||
            !confirmPassword.trim() ||
            !passwordsMatch ||
            currentPassword.trim() ===
              newPassword.trim() ||
            !PASSWORD_REGEX.test(newPassword)
          }
        >
          Update Password
        </Button>
      </Stack>
    </Box>
  );
}