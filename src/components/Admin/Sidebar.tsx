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
  FiShoppingBag,
  FiShoppingCart,
  FiPackage,
  FiEdit3,
  FiImage,
  FiUsers,
  FiUser,
  FiMenu,
  FiLogOut,
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

  // 🔥 Clean semantic grouping
  const contentMenu = [
    { label: "Dashboard", path: "/admin", icon: FiHome },
    { label: "Products", path: "/admin/products", icon: FiPackage },
    { label: "Flash Sales", path: "/admin/sales", icon: FiShoppingBag },
    { label: "Custom Orders", path: "/admin/custom-orders", icon: FiShoppingBag },
    { label: "Pre-orders", path: "/admin/pre-orders", icon: FiShoppingCart },
    { label: "Blog", path: "/admin/blog", icon: FiEdit3 },
    { label: "Carousel", path: "/admin/carousel", icon: FiImage },
  ];

  const systemMenu = [
    { label: "Administrators", path: "/admin/administrators", icon: FiUser },
    { label: "My Profile", path: "/admin/profile", icon: FiUser },
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
    >
      {/* Header */}
      <Flex align="center" justify="space-between" mb={8}>
        <Link href="/">
          <Image
            src="/images/logo/logo.png"
            width={160}
            height={80}
            alt="logo"
          />
        </Link>

        {isMobile && <DrawerCloseButton position="relative" />}
      </Flex>

      {/* CONTENT SECTION */}
      <Text fontSize="xs" color="gray.500" mb={2}>
        CONTENT
      </Text>

      <Stack spacing={1} mb={6}>
        {contentMenu.map((item) => {
          const Icon = item.icon;

          return (
            <Button
              key={item.path}
              leftIcon={<Icon />}
              onClick={() => {
                router.push(item.path);
                if (isMobile) onClose();
              }}
              justifyContent="flex-start"
              variant="ghost"
              fontWeight="medium"
              borderRadius="lg"
              px={3}
              py={5}
              fontSize="sm"
              transition="all 0.2s"
              borderLeft={
                isActive(item.path) ? "3px solid #3b82f6" : "3px solid transparent"
              }
              bg={isActive(item.path) ? "whiteAlpha.100" : "transparent"}
              _hover={{
                bg: "whiteAlpha.100",
                transform: "translateX(2px)",
              }}
              color={isActive(item.path) ? "white" : "gray.400"}
            >
              {item.label}
            </Button>
          );
        })}
      </Stack>

      <Divider borderColor="whiteAlpha.200" mb={4} />

      {/* SYSTEM SECTION */}
      <Text fontSize="xs" color="gray.500" mb={2}>
        SYSTEM
      </Text>

      <Stack spacing={1}>
        {systemMenu.map((item) => {
          const Icon = item.icon;

          return (
            <Button
              key={item.path}
              leftIcon={<Icon />}
              onClick={() => {
                router.push(item.path);
                if (isMobile) onClose();
              }}
              justifyContent="flex-start"
              variant="ghost"
              fontWeight="medium"
              borderRadius="lg"
              px={3}
              py={5}
              fontSize="sm"
              transition="all 0.2s"
              borderLeft={
                isActive(item.path) ? "3px solid #8b5cf6" : "3px solid transparent"
              }
              bg={isActive(item.path) ? "whiteAlpha.100" : "transparent"}
              _hover={{
                bg: "whiteAlpha.100",
                transform: "translateX(2px)",
              }}
              color={isActive(item.path) ? "white" : "gray.400"}
            >
              {item.label}
            </Button>
          );
        })}
      </Stack>

      <Box flex="1" />

      {/* Logout */}
      <Button
        leftIcon={<FiLogOut />}
        variant="outline"
        colorScheme="red"
        onClick={logoutAdmin}
        mt={6}
      >
        Logout
      </Button>
    </Box>
  );

  // Mobile Drawer
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

  return (
    <Box position="fixed" left={0} top={0}>
      <SidebarContent />
    </Box>
  );
}