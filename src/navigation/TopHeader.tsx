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
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

export const TopHeader: React.FC = () => {
  return (
    <Box bg="black" px={{ base: 4, xl: 10 }} py={2}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        align={{ base: "center", lg: "center" }}
        justify="space-between"
      >
        {/* Left-side links */}
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

        {/* Right-side: My Account Dropdown & Icons */}
        <Flex
          align="center"
          justify={{ base: "center", lg: "flex-end" }}
          gap={4}
          mt={{ base: 2, lg: 0 }}
          width="100%"
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

          {/* Icons (visible on mobile only) */}
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
    </Box>
  );
};
