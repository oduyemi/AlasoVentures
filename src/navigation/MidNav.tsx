import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";

export const MidNav: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <Flex
      py={3}
      px={{ base: 4, xl: 5 }}
      bg={"#0D0D0D"}
      direction={{ base: "column", md: "row" }}
      align={{ base: "stretch", md: "center" }}
      justify="space-between"
      gap={{ base: 3, md: 0 }}
    >
      {/* Logo Section */}
      <Box
        width={{ base: "100%", md: "33.33%" }}
        mb={{ base: 2, md: 0 }}
        textAlign={{ base: "center", md: "left" }}
        display={{ base: "block", md: "block" }}
      >
        <Link href="/" textDecoration="none" display="inline-block">
          <Image
            src="/images/logo/logo.png"
            width={180}
            height={100}
            alt="sitelogo"
          />
        </Link>
      </Box>

      {/* Search Bar */}
      <Box
        width={{ base: "100%", md: "33.33%" }}
        textAlign="center"
      >
        <FormControl>
          <InputGroup maxW={{ base: "100%", md: "300px" }} mx="auto">
            <Input
              placeholder="Search for products"
              bg="white"
              borderColor="gray.300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="md"
            />
            <InputRightElement
              bg="transparent"
              color="primary.500"
              cursor="pointer"
              pointerEvents="auto"
              _hover={{ color: "primary.700" }}
            >
              <Icon as={FaSearch} />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>

      {/* Customer Service Info */}
      <Box
        width={{ base: "100%", md: "33.33%" }}
        mt={{ base: 3, md: 0 }}
        textAlign={{ base: "center", md: "right" }}
      >
        <Text fontWeight="bold" color="#C28840" mb={1}>
          Contact
        </Text>
        <Heading as="h5" color="#fff" size="xs" m={0} mb={1}>
           +234 915 580 3902
        </Heading>
        <Heading as="h5" color="#fff" size="xs" m={0}>
          kofoworola.alasooke@gmail.com
        </Heading>
      </Box>
    </Flex>
  );
};
