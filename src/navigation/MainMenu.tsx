"use client";
import React from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Collapse,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaBars, FaAngleDown } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

type FabricItem = {
  label: string;
  href?: string;
  children?: FabricItem[];
};

const MenuItem = ({
  item,
  depth = 0,
  onClose,
}: {
  item: FabricItem;
  depth?: number;
  onClose?: () => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const hasChildren = !!item.children;

  return (
    <Box>
      {/* ITEM HEADER */}
      <Flex
        px={4}
        py={2}
        pl={4 + depth * 12}
        justify="space-between"
        align="center"
        cursor={hasChildren ? "pointer" : "default"}
        _hover={{ bg: "gray.50" }}
        onClick={() => hasChildren && setOpen(!open)}
      >
        {item.href ? (
          <Link
            as={NextLink}
            href={`/shop?filter=${encodeURIComponent(item.href)}`}
            onClick={onClose}
            _hover={{ textDecoration: "none" }}
            flex="1"
          >
            <Text fontSize="sm">{item.label}</Text>
          </Link>
        ) : (
          <Text fontSize="sm" fontWeight="medium">
            {item.label}
          </Text>
        )}

        {hasChildren && (
          <Box
            transition="0.25s"
            transform={open ? "rotate(180deg)" : "rotate(0deg)"}
          >
            <FaAngleDown size={12} />
          </Box>
        )}
      </Flex>

      {/* CHILDREN */}
      {hasChildren && (
        <Collapse in={open} animateOpacity>
          <VStack align="stretch" spacing={0}>
            {item.children!.map((child) => (
              <MenuItem
                key={child.label}
                item={child}
                depth={depth + 1}
                onClose={onClose}
              />
            ))}
          </VStack>
        </Collapse>
      )}
    </Box>
  );
};

export const MainMenu = () => {
  const {
    isOpen: isCatOpen,
    onToggle: onToggleCat,
    onClose: onCloseCat,
  } = useDisclosure();

  const {
    isOpen: isMobileOpen,
    onOpen: onOpenMobile,
    onClose: onCloseMobile,
  } = useDisclosure();

  const primaryNav = [
    { href: "/shop", label: "Shop" },
    { href: "/custom-orders", label: "Custom Orders" },
    { href: "/#flashsales", label: "Flash Sales 🔥" },
    { href: "/book-appointment", label: "Book Appointment" },
  ];

  const fabrics: FabricItem[] = [
    {
      label: "Aṣọ òkè",
      children: [
        { label: "Cotton Aso Oke", href: "Cotton Aso Oke" },
        {
          label: "Metallic Aso Oke",
          children: [
            { label: "Monotone", href: "Metallic Monotone" },
            { label: "Two-Tone", href: "Metallic Two Tone" },
          ],
        },
        { label: "Super Net Aso Oke", href: "Super Net Aso Oke" },
      ],
    },
    { label: "Saki", href: "Saki" },
    { label: "Kente", href: "Kente" },
    { label: "Akwete", href: "Akwete" },
    { label: "Ready To Wear", href: "Ready to Wear" },
    { label: "Off The Shelf", href: "Off the Shelf" },
  ];

  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/shop") return pathname.startsWith("/shop");
    return pathname === href;
  };

  return (
    <Box
      px={{ base: 4, md: 6 }}
      py={3}
      bg={useColorModeValue("yellow.500", "gray.800")}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
        {/* LEFT: PRODUCTS */}
        <Box display={{ base: "none", lg: "block" }} position="relative" mr={4}>
          <Button
            onClick={onToggleCat}
            leftIcon={<FaBars />}
            rightIcon={<FaAngleDown />}
            bgGradient="linear(to-r,#C28840,#a8732f)"
            color="white"
            borderRadius="lg"
            _hover={{ filter: "brightness(0.95)" }}
            px={6}
          >
            Products
          </Button>

          <Collapse in={isCatOpen} animateOpacity>
            <MotionBox
              mt={3}
              pos="absolute"
              left={0}
              w="300px"
              bg="rgba(255,255,255,0.95)"
              backdropFilter="blur(12px)"
              borderRadius="xl"
              boxShadow="2xl"
              py={2}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              zIndex={50}
            >
              <VStack spacing={0} align="stretch">
                {fabrics.map((item) => (
                  <MenuItem
                    key={item.label}
                    item={item}
                    onClose={onCloseCat}
                  />
                ))}
              </VStack>
            </MotionBox>
          </Collapse>
        </Box>

        {/* CENTER NAV */}
        <HStack
          as="nav"
          spacing={6}
          display={{ base: "none", lg: "flex" }}
          flex="1"
          justify="center"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              as={NextLink}
              href={item.href}
              px={2}
              py={1}
              fontWeight={isActive(item.href) ? "bold" : "medium"}
              borderBottom={
                isActive(item.href)
                  ? "2px solid"
                  : "2px solid transparent"
              }
              borderColor={isActive(item.href) ? "#C28840" : "transparent"}
              _hover={{ color: "#C28840", textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ))}
        </HStack>

        {/* RIGHT */}
        <HStack spacing={4}>
          <HStack spacing={4} display={{ base: "none", lg: "flex" }}>
            <Link as={NextLink} href="/gallery">
              <Button
                bg="black"
                color="white"
                size="md"
                borderRadius="full"
                _hover={{ bg: "yellow.800" }}
              >
                View Gallery
              </Button>
            </Link>
          </HStack>

          <IconButton
            aria-label="Open menu"
            icon={<FaBars />}
            display={{ base: "inline-flex", lg: "none" }}
            onClick={onOpenMobile}
            variant="ghost"
          />
        </HStack>
      </Flex>

      {/* MOBILE DRAWER */}
      <Drawer isOpen={isMobileOpen} placement="left" onClose={onCloseMobile}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={2}>
              <Button
                onClick={onToggleCat}
                justifyContent="space-between"
                rightIcon={<FaAngleDown />}
                variant="ghost"
              >
                Fabrics
              </Button>

              <Collapse in={isCatOpen}>
                <VStack align="stretch" pl={2}>
                  {fabrics.map((item) => (
                    <MenuItem
                      key={item.label}
                      item={item}
                      onClose={onCloseMobile}
                    />
                  ))}
                </VStack>
              </Collapse>

              <Box borderTop="1px solid" borderColor="gray.100" pt={3} mt={2}>
                {primaryNav.map((item) => (
                  <Link
                    key={item.href}
                    as={NextLink}
                    href={item.href}
                    py={3}
                    onClick={onCloseMobile}
                  >
                    <HStack>
                      <Text>{item.label}</Text>
                    </HStack>
                  </Link>
                ))}
              </Box>

              <HStack spacing={4} pt={4}>
                <Link as={NextLink} href="/gallery" onClick={onCloseMobile}>
                  <Button
                    bg="black"
                    color="white"
                    size="sm"
                    borderRadius="full"
                    _hover={{ bg: "yellow.800" }}
                  >
                    View Gallery
                  </Button>
                </Link>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};