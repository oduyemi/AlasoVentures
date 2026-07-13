"use client";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Box, Flex, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { useAuth, User } from "@/app/context/auth.context";
import axios from "@/utils/axios";


import {
  ProfileForm,
  ProfileFormValues,
} from "@/components/Admin/profile/Form";
import { ProfileCard } from "@/components/Admin/profile/Card";
import { SecurityCard } from "@/components/Admin/profile/SecurityCard";
import { ChangePasswordCard } from "@/components/Admin/profile/ChangePasswordCard";

interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user: User;
}

export default function AdminProfile() {
  const { user, setUser } = useAuth();

  const toast = useToast();

  const [changingPassword, setChangingPassword] =
    useState(false);

  const [savingProfile, setSavingProfile] =
    useState(false);

  if (!user) {
    return (
      <Flex
        h="60vh"
        align="center"
        justify="center"
      >
        <Spinner
          size="lg"
          color="purple.400"
        />
      </Flex>
    );
  }

  const handleProfileSave = async (
    values: ProfileFormValues
  ) => {
    try {
      setSavingProfile(true);

      const { data } =
        await axios.patch<UpdateProfileResponse>(
          "/api/admin/profile",
          values
        );

      // Update AuthContext
      setUser(data.user);

      toast({
        title: "Profile updated",
        description: data.message,
        status: "success",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description:
          error.response?.data?.message ??
          error.message,
        status: "error",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      setChangingPassword(true);

      const { data } =
        await axios.patch<UpdatePasswordResponse>(
          "/api/admin/update-password",
          {
            currentPassword,
            newPassword,
          }
        );

      toast({
        title: "Password updated",
        description: data.message,
        status: "success",
      });
    } catch (error: any) {
      toast({
        title: "Failed to update password",
        description:
          error.response?.data?.message ??
          error.message,
        status: "error",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        px={{ base: 4, md: 6 }}
        py={{ base: 4, md: 5 }}
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
        bg="#111"
      >
        <Flex
          direction="column"
          gap={1}
        >
          <Text
            fontSize={{
              base: "xl",
              md: "2xl",
            }}
            fontWeight="bold"
          >
            {user.fname}
          </Text>

          <Text
            fontSize="sm"
            color="gray.400"
          >
            Manage your profile,
            account security and
            password.
          </Text>
        </Flex>
      </Box>

      {/* Content */}
      <Box
        px={{ base: 4, md: 6 }}
        py={6}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            xl: "380px 1fr",
          }}
          gap={6}
        >
          {/* Left */}
          <GridItem>
            <Flex
              direction="column"
              gap={6}
            >
              <ProfileCard user={user} />

              <ProfileForm
                user={{
                  fname: user.fname,
                  lname: user.lname,
                  email: user.email,
                }}
                loading={savingProfile}
                onSave={handleProfileSave}
              />
            </Flex>
          </GridItem>

          {/* Right */}
          <GridItem>
            <Flex
              direction="column"
              gap={6}
            >
              <ChangePasswordCard
                loading={
                  changingPassword
                }
                onSubmit={
                  handlePasswordChange
                }
              />

              <SecurityCard
                user={user}
              />
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}