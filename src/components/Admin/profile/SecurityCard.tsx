"use client";
import {
  Badge,
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CalendarDays, Clock3, ShieldCheck, UserCheck } from "lucide-react";
import type { User } from "@/app/context/auth.context";


interface SecurityCardProps {
  user: User;
}

export const SecurityCard = ({
  user,
}: SecurityCardProps) => {
  const formatDate = (
    value?: string | Date | null
  ) => {
    if (!value) return "Never";

    return new Date(value).toLocaleString();
  };

  return (
    <Box
      bg="#111"
      border="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="2xl"
      p={6}
    >
      <VStack
        spacing={6}
        align="stretch"
      >
        <Box>
          <Text
            fontSize="xl"
            fontWeight="700"
          >
            Security
          </Text>

          <Text
            mt={1}
            fontSize="sm"
            color="gray.400"
          >
            Information about your account and login activity.
          </Text>
        </Box>

        <Divider />

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={5}
        >
          <HStack align="start" spacing={4}>
            <Icon
              as={ShieldCheck}
              boxSize={5}
              color="purple.300"
            />

            <Box>
              <Text
                fontSize="xs"
                color="gray.500"
                textTransform="uppercase"
              >
                Role
              </Text>

              <Badge
                mt={1}
                colorScheme="purple"
                textTransform="capitalize"
              >
                Administrator
              </Badge>
            </Box>
          </HStack>

          <HStack align="start" spacing={4}>
            <Icon
              as={UserCheck}
              boxSize={5}
              color="green.300"
            />

            <Box>
              <Text
                fontSize="xs"
                color="gray.500"
                textTransform="uppercase"
              >
                Account Status
              </Text>

              <Badge
                mt={1}
                colorScheme={
                  user.firstLogin ? "green" : "orange"
                }
              >
                {user.firstLogin ? "Active" : "Pending"}
              </Badge>
            </Box>
          </HStack>

          <HStack align="start" spacing={4}>
            <Icon
              as={Clock3}
              boxSize={5}
              color="blue.300"
            />

            <Box>
              <Text
                fontSize="xs"
                color="gray.500"
                textTransform="uppercase"
              >
                Last Login
              </Text>

              <Text
                mt={1}
                color="gray.200"
                fontSize="sm"
              >
                {formatDate(user.lastLogin)}
              </Text>
            </Box>
          </HStack>

          <HStack align="start" spacing={4}>
            <Icon
              as={CalendarDays}
              boxSize={5}
              color="orange.300"
            />

            <Box>
              <Text
                fontSize="xs"
                color="gray.500"
                textTransform="uppercase"
              >
                Member Since
              </Text>

              <Text
                mt={1}
                color="gray.200"
                fontSize="sm"
              >
                {formatDate(user.createdAt)}
              </Text>
            </Box>
          </HStack>
        </SimpleGrid>

        {user.updatedAt && (
          <>
            <Divider />

            <Flex
              justify="space-between"
              align="center"
              wrap="wrap"
              gap={2}
            >
              <Text
                color="gray.500"
                fontSize="sm"
              >
                Last profile update
              </Text>

              <Text
                color="gray.300"
                fontSize="sm"
              >
                {formatDate(user.updatedAt)}
              </Text>
            </Flex>
          </>
        )}
      </VStack>
    </Box>
  );
};