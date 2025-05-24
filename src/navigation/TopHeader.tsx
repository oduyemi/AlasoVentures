import React from 'react';
import {
  Box,
  Flex,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Icon,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

export const TopHeader: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="black" px={{ base: 4, xl: 10 }} py={2}>
      <Flex
        direction={{ base: "row", lg: "row" }}
        align="center"
        justify="space-between"
      >
        {/* Hamburger Icon for Mobile */}
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          color="white"
          display={{ base: "flex", lg: "none" }}
          onClick={onOpen}
        />

        {/* Left-side links (desktop only) */}
        <Flex
          display={{ base: "none", lg: "flex" }}
          align="center"
          gap={4}
        >
          <Link color="gray.100" href="/">Home</Link>
          <Link color="gray.100" href="/about">About</Link>
          <Link color="gray.100" href="/faqs">FAQs</Link>
          <Link color="gray.100" href="/blog">Blog</Link>
          <Link color="gray.100" href="/contact">Contact</Link>
        </Flex>

        {/* Right-side: My Account & Mobile Icons */}
        <Flex
          align="center"
          gap={4}
        >
          {/* My Account Dropdown */}
          <Menu>
            <MenuButton
              as={Button}
              size="sm"
              bg="gray.100"
              color="black"
              _hover={{ bg: "gray.200" }}
              rightIcon={<ChevronDownIcon />}
            >
              My Account
            </MenuButton>
            <MenuList>
              <MenuItem as="a" href="/login">Login</MenuItem>
              <MenuItem as="a" href="/register">Register</MenuItem>
            </MenuList>
          </Menu>

          {/* Icons (only on mobile) */}
          <Flex display={{ base: "flex", lg: "none" }} align="center" gap={4}>
            <Box position="relative">
              <Icon as={FaHeart} fontSize="20px" color="gray.200" />
              <Badge
                position="absolute"
                top="-1"
                right="-2"
                fontSize="0.7em"
                colorScheme="red"
                borderRadius="full"
              >
                0
              </Badge>
            </Box>

            <Box position="relative">
              <Icon as={FaShoppingCart} fontSize="20px" color="gray.200" />
              <Badge
                position="absolute"
                top="-1"
                right="-2"
                fontSize="0.7em"
                colorScheme="green"
                borderRadius="full"
              >
                0
              </Badge>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="black" color="white">
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Flex direction="column" gap={4}>
              <Link href="/" onClick={onClose}>Home</Link>
              <Link href="/about" onClick={onClose}>About</Link>
              <Link href="/faqs" onClick={onClose}>FAQs</Link>
              <Link href="/blog" onClick={onClose}>Blog</Link>
              <Link href="/contact" onClick={onClose}>Contact</Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
