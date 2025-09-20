import { Box, Flex, Icon, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { FaShippingFast, FaStore, FaBoxOpen } from "react-icons/fa";

export const Features: React.FC = () => (
  <Box as="section" id="company-services" py={10} mt={-14}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} maxW="6xl" mx="auto">
      <Flex
        direction="column"
        align="center"
        borderTop="2px"
        borderBottom="2px"
        borderColor="gray.700"
        p={6}
      >
        <Icon as={FaShippingFast} boxSize={10} color="#0D0D0D" mb={4}  />
        <Heading as="h3" size="md" mb={2}  bgGradient="linear(to-r, #C28840, #0D0D0D)" bgClip="text">
          Quick delivery
        </Heading>
        <Text color="#0D0D0D">Inside City delivery within 5 days</Text>
      </Flex>

      <Flex
        direction="column"
        align="center"
        borderTop="2px"
        borderBottom="2px"
        borderColor="gray.700"
        p={6}
      >
        <Icon as={FaStore} boxSize={10} color="#0D0D0D" mb={4} />
        <Heading as="h3" size="md" mb={2} bgGradient="linear(to-r, #C28840, #0D0D0D)" bgClip="text">
          Pick up in store
        </Heading>
        <Text color="#0D0D0D">We have option of pick up in store.</Text>
      </Flex>

      <Flex
        direction="column"
        align="center"
        borderTop="2px"
        borderBottom="2px"
        borderColor="gray.700"
        p={6}
      >
        <Icon as={FaBoxOpen} boxSize={10} color="#0D0D0D" mb={4} />
        <Heading as="h3" size="md" mb={2} bgGradient="linear(to-r, #C28840, #0D0D0D)" bgClip="text">
          Special packaging
        </Heading>
        <Text color="#0D0D0D">Our packaging is best for products.</Text>
      </Flex>
    </SimpleGrid>
  </Box>
);
