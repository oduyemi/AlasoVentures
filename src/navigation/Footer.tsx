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
  FaGoogle,
  FaInstagram,
  // FaFacebookF, 
  // FaInstagram, 
  // FaLinkedin, 
  FaTiktok, 
  FaWhatsapp, 
  FaYoutube
} from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

export const Footer: React.FC = () => { 
  return (
    <Box className="site-footer" py={10} bg="gray.800" color="white">
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
                      <Link href="https://www.youtube.com/@K%C3%B2fow%C3%B3r%E1%BB%8Dl%C3%A1Al%C3%A1s%E1%BB%8D%C3%B2k%C3%A8" aria-label="YouTube" isExternal>
                        <Icon as={FaYoutube} boxSize={6} _hover={{ color: "#C28840" }} />
                      </Link>
                      <Link href="https://x.com/kofoworolaalaso?s=11" aria-label="Twitter" isExternal>
                        <Icon as={FaX} boxSize={6} _hover={{ color: "#C28840" }} />
                      </Link>
                      <Link href="https://www.instagram.com/kofoworolaasookebrand?igsh=YzJ5anVyMnlxOTd2&utm_source=qr" aria-label="Instagram" isExternal>
                        <Icon as={FaInstagram} boxSize={6} _hover={{ color: "#C28840" }} />
                      </Link>
                      <Link href="https://share.google/jAPtiWVqxobOnUIiA" aria-label="Google Store" isExternal>
                        <Icon as={FaGoogle} boxSize={6} _hover={{ color: "#C28840" }} />
                      </Link>
                      <Link href="https://www.tiktok.com/@kofoworola.alasooke?_t=ZS-8yjG4VGilIf&_r=1" aria-label="TikTok" isExternal>
                        <Icon as={FaTiktok} boxSize={6} _hover={{ color: "#C28840" }} />
                      </Link>
                      <Link href="http://wa.me/2348094217767" aria-label="WhatsApp" isExternal>
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

