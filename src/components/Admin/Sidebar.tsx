"use client";
import {
  Box,
  Text,
  Stack,
  Button,
  Divider,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiFileText,
  FiCalendar,
  FiSettings,
  FiUser,
  FiMenu,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link"; 

interface SidebarProps {
  logoutAdmin: () => Promise<void>;
}

export function Sidebar({ logoutAdmin }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const isActive = (path: string) => pathname.startsWith(path);

  const menu = [
    { label: "Dashboard", path: "/admin", icon: <FiHome /> },
    { label: "Blog", path: "/admin/blog", icon: <FiFileText /> },
    { label: "Bookings", path: "/admin/bookings", icon: <FiCalendar /> },
    { label: "Admins", path: "/admin/create-admin", icon: <FiSettings /> },
    {
      label: "Administrators",
      path: "/admin/administrators",
      icon: <FiSettings />,
    },
    { label: "My Profile", path: "/admin/profile", icon: <FiUser /> },
  ];

  const SidebarContent = () => (
    <Box
      w={{ base: "full", md: "260px" }}
      h="100vh"
      bg="#0D0D0D"
      color="white"
      p={5}
      display="flex"
      flexDirection="column"
      boxShadow="lg"
    >
      {/* Header */}
      <Flex align="center" justify="space-between" mb={6}>
        <Link href="/" textDecoration="none" display="inline-block">
          <Image
            src="/images/logo/logo.png"
            width={180}
            height={100}
            alt="sitelogo"
          />
        </Link>
        {isMobile && (
          <DrawerCloseButton position="relative" top={0} right={0} />
        )}
      </Flex>

      {/* Menu */}
      <Stack spacing={2}>
        {menu.map((item) => (
          <Button
            key={item.path}
            leftIcon={item.icon}
            onClick={() => {
              router.push(item.path);
              if (isMobile) onClose();
            }}
            justifyContent="flex-start"
            variant="ghost"
            fontWeight="medium"
            borderRadius="lg"
            px={3}
            py={2}
            _hover={{ bg: "#1f2937" }}
            bg={isActive(item.path) ? "#1f2937" : "transparent"}
            color={isActive(item.path) ? "white" : "gray.400"}
          >
            {item.label}
          </Button>
        ))}
      </Stack>

      <Box flex="1" />

      <Divider borderColor="whiteAlpha.300" my={4} />

      {/* Logout */}
      <Button
        variant="outline"
        colorScheme="red"
        onClick={logoutAdmin}
        mb={2}
      >
        Logout
      </Button>
    </Box>
  );

  // Mobile: Drawer
  if (isMobile) {
    return (
      <>
        <IconButton
          icon={<FiMenu />}
          aria-label="Open Menu"
          position="fixed"
          top={4}
          left={4}
          zIndex={1000}
          onClick={onOpen}
        />

        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="#0D0D0D">
            <SidebarContent />
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  // Desktop: Fixed sidebar
  return (
    <Box position="fixed" left={0} top={0}>
      <SidebarContent />
    </Box>
  );
}
