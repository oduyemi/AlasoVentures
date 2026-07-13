"use client";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Camera, Mail, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import type { User } from "@/app/context/auth.context";



interface ProfileCardProps {
  user: User;
  uploading?: boolean;
  onImageUpload?: (file: File) => void;
}

export const ProfileCard = ({
  user,
  uploading = false,
  onImageUpload,
}: ProfileCardProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !onImageUpload) return;

    onImageUpload(file);

    // Allow selecting the same file again later
    e.target.value = "";
  };

  return (
    <Box
      bg="#111"
      border="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="2xl"
      p={8}
      h="100%"
    >
      <VStack spacing={5}>
        <Box position="relative">
          <Avatar
            size="2xl"
            src={user.image || ""}
            name={`${user.fname} ${user.lname}`}
          />

          <Button
            size="sm"
            colorScheme="purple"
            rounded="full"
            position="absolute"
            bottom={0}
            right={0}
            p={0}
            w="38px"
            h="38px"
            onClick={handleSelectFile}
            isLoading={uploading}
          >
            <Icon as={Camera} boxSize={4} />
          </Button>

          <Input
            ref={fileRef}
            hidden
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Box>

        <VStack spacing={1}>
          <Text
            fontSize="xl"
            fontWeight="700"
            textAlign="center"
          >
            {user.fname} {user.lname}
          </Text>

          <HStack>
            <Badge colorScheme="purple">
              {user.role}
            </Badge>

            {!user.firstLogin && (
              <Badge colorScheme="green">
                Active
              </Badge>
            )}
          </HStack>
        </VStack>

        <Divider />

        <VStack
          spacing={4}
          align="stretch"
          w="100%"
        >
          <Flex align="center" gap={3}>
            <Icon
              as={Mail}
              color="gray.400"
              boxSize={4}
            />

            <Box>
              <Text
                fontSize="xs"
                color="gray.500"
                textTransform="uppercase"
              >
                Email
              </Text>

              <Text
                fontSize="sm"
                color="gray.200"
              >
                {user.email}
              </Text>
            </Box>
          </Flex>

          <Flex align="center" gap={3}>
            <Icon
              as={ShieldCheck}
              color="gray.400"
              boxSize={4}
            />

            <Box>
              <Text
                fontSize="xs"
                color="gray.500"
                textTransform="uppercase"
              >
                Account Type
              </Text>

              <Text
                fontSize="sm"
                color="gray.200"
                textTransform="capitalize"
              >
                {user.role}
              </Text>
            </Box>
          </Flex>
        </VStack>

        <Divider />

        <Text
          fontSize="xs"
          color="gray.500"
          textAlign="center"
        >
          Joined {new Date(user.createdAt).toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  );
};