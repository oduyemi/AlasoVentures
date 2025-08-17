import React from 'react';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Link,
  VStack,
  HStack,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { 
  // FaFacebookF, 
  // FaInstagram, 
  // FaLinkedin, 
  FaTiktok, 
  FaWhatsapp 
} from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

export const Footer: React.FC = () => { 
  return (
    <Box className="site-footer" py={10} bg="#111111">
        <Box width="100%">
          <Container maxW="container.xl">
            <Grid templateColumns={{ base: '1fr', lg: '3fr 2fr' }} gap={8}>
              <GridItem>
                <VStack align="start" spacing={6}>
                  <Box>
                    <Heading size="md" fontWeight="bold" color="#C28840">
                      About
                    </Heading>
                    <Text color="#fff" sx={{ width: {md:"70%"} }}>
                    We redefine Aso-Oke fashion, preserving its 
                    cultural significance while adapting to 
                    contemporary styles. We blend vintage Yoruba 
                    aesthetics with contemporary fashion, offering 
                    both custom and ready-to-wear pieces. Our designs 
                    are prominently featured in traditional Nigerian 
                    ceremonies, such as weddings, where Aso-Oke 
                    attire is customary.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="md" fontWeight="bold" color="#C28840">
                      Connect with us
                    </Heading>
                    <HStack spacing={4} className="whitie">
                      {/* <Link href="" aria-label="Facebook" isExternal>
                        <Icon as={FaFacebookF} boxSize={6} _hover={{ color: "#C28840" }} />
                      </Link> */}
                      <Link href="" aria-label="Twitter" isExternal>
                        <Icon as={FaX} boxSize={6} _hover={{ color: "#C28840" }} />
                      </Link>
                      {/* <Link href="" aria-label="Instagram" isExternal>
                        <Icon as={FaInstagram} boxSize={6} _hover={{ color: "#C28840" }} />
                      </Link> */}
                      {/* <Link href="" aria-label="LinkedIn" isExternal>
                        <Icon as={FaLinkedin} boxSize={6} _hover={{ color: "#C28840" }} />
                      </Link> */}
                      <Link href="" aria-label="Twitter" isExternal>
                        <Icon as={FaTiktok} boxSize={6} _hover={{ color: "#C28840" }} />
                      </Link>
                      <Link href="" aria-label="Twitter" isExternal>
                        <Icon as={FaWhatsapp} boxSize={6} _hover={{ color: "#C28840" }} />
                      </Link>
                    </HStack>
                  </Box>
                </VStack>
              </GridItem>

              <GridItem>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
                  <GridItem>
                    <Heading size="md" fontWeight="bold" color="#C28840">
                      Quick Links
                    </Heading>
                  </GridItem>
                  <GridItem>
                    <VStack align="start" spacing={2} style={{ marginTop: "20%" }} className="whitie">
                      <Link href="/" _hover={{ color: "#C28840" }}>Home</Link>
                      <Link href="/about" _hover={{ color: "#C28840" }}>About Us</Link>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack align="start" spacing={2} style={{ marginTop: "20%" }} className="whitie">
                      <Link href="/services" _hover={{ color: "#C28840" }}>Services</Link>
                      <Link href="/contact" _hover={{ color: "#C28840" }}>Contact</Link>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack align="start" spacing={2} style={{ marginTop: "-50%" }} className="whitie">
                      <Link href="/shop" _hover={{ color: "#C28840" }}>Shop</Link>
                      <Link href="#" _hover={{ color: "#C28840" }}>Privacy Policy</Link>
                    </VStack>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>

            <Divider my={8} borderColor="gray.700" />

            <Flex justify="center" textAlign="center">
              <Text color="gray.400">
                Copyright &copy; {new Date().getFullYear()} Kòfowórọlá Alásọòkè | All Rights Reserved.
              </Text>
            </Flex>
          </Container>
        </Box>
      </Box>
  );
};

