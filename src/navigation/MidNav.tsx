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
// import { debounce } from "lodash";


export const MidNav: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <Flex bg="white" py={3} px={{ base: 4, xl: 5 }} display={{ base: "flex", lg: "flex" }}>
      {/* Logo Section */}
      <Box width="33.33%" className="d-md-block d-none">
        <Link href="/" textDecoration="none">
          <Image 
            src="/images/logo/trans_logo.png" 
            width={40} 
            height={40}
            alt="sitelogo" />
        </Link>
      </Box>

      {/* Search Bar */}
      <Box width="33.33%" className="shift" textAlign="left">
        <FormControl>
          <InputGroup>
            <Input
              placeholder="Search for products"
              bg="white"
              borderColor="gray.300"
              className="mt-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            //   onKeyPress={(e) => {
            //     if (e.key === "Enter") // handleSearch();
            //   }}
            />
            <InputRightElement
              bg="transparent"
              color="primary.500"
            //   onClick={handleSearch}
              cursor="pointer"
            >
              <Icon as={FaSearch} className="mt-2" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>

      {/* Customer Service Info */}
      <Box width="33.33%" textAlign="right">
        <Text m={0} fontWeight="bold" color="#C28840">Contact</Text>
        <Heading as="h5" size="xs" m={0}>
          +234 703 473 9950
        </Heading>
        <Heading as="h5" size="xs" m={0}>
          kofoworola.alasooke@gmail.com
        </Heading>
      </Box>
    </Flex>
  );
};
