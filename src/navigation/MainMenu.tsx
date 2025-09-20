import React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Text,
  VStack,
  Badge,
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
} from '@chakra-ui/react';
import {
  FaBars,
  FaAngleDown,
  FaHeart,
  FaShoppingCart,
  FaTshirt,
  FaStore,
  FaGem,
  FaStar,
  FaTag,
} from 'react-icons/fa';
import { MdEventAvailable } from 'react-icons/md';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export const MainMenu = () =>{
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

  const linkColor = useColorModeValue('gray.700', 'white');
  const primaryNav = [
    { href: '/shop', label: 'Shop' },
    { href: '/services', label: 'Services' },
    { href: '/book-appointment', label: 'Book Appointment', icon: <MdEventAvailable /> },
  ];

  const fabrics = [
    { href: 'Asooke', label: 'Aṣọ òkè', icon: <FaStore /> },
    { href: 'Saki', label: 'Saki', icon: <FaStar /> },
    { href: 'Akwete', label: 'Akwete', icon: <FaGem /> },
    { href: 'Kente', label: 'Kente', icon: <FaTag /> },
    { href: 'Ready to Wear', label: 'Ready To Wear', icon: <FaTshirt /> },
    { href: 'Off the Shelf', label: 'Off The Shelf', icon: <FaStore /> },
  ];
  
  const pathname = usePathname();
  const isActive = (href: string) => {
  if (!pathname) return false;
  if (href === '/shop') return pathname.startsWith('/shop');
  return pathname === href;
};

  return (
    <Box px={{ base: 4, md: 6 }} py={3} bg={useColorModeValue('white', 'gray.800')} boxShadow="sm">
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
        {/* Left: Fabrics dropdown (desktop) */}
        <Box display={{ base: 'none', lg: 'block' }} position="relative" mr={4}>
          <Button
            onClick={onToggleCat}
            leftIcon={<FaBars />}
            rightIcon={<FaAngleDown />}
            bgGradient="linear(to-r,#C28840,#a8732f)"
            color="white"
            borderRadius="lg"
            _hover={{ filter: 'brightness(0.95)' }}
            px={6}
          >
            Fabrics
          </Button>

          <Collapse in={isCatOpen} animateOpacity>
            <MotionBox
              mt={3}
              pos="absolute"
              left={0}
              w="280px"
              bg="rgba(255,255,255,0.95)"
              backdropFilter="blur(10px)"
              borderRadius="lg"
              boxShadow="xl"
              py={2}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              zIndex={50}
            >
              <VStack spacing={0} align="stretch">
                {fabrics.map((item) => (
                  <Link
                    key={item.href}
                    as={NextLink}
                    href={`/shop?filter=${encodeURIComponent(item.href)}`}
                    px={4}
                    py={3}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    _hover={{ bg: 'gray.100', textDecoration: 'none' }}
                    onClick={onCloseCat}
                    color={linkColor}
                  >
                    {item.icon}
                    <Text fontSize="sm">{item.label}</Text>
                  </Link>
                ))}
              </VStack>
            </MotionBox>
          </Collapse>
        </Box>

        {/* Center: Desktop Nav */}
        <HStack as="nav" spacing={6} display={{ base: 'none', lg: 'flex' }} flex="1" justify="center">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              as={NextLink}
              href={item.href}
              px={2}
              py={1}
              fontWeight={isActive(item.href) ? 'bold' : 'medium'}
              borderBottom={isActive(item.href) ? '2px solid' : '2px solid transparent'}
              borderColor={isActive(item.href) ? '#C28840' : 'transparent'}
              _hover={{ color: '#C28840', textDecoration: 'none' }}
            >
              {item.icon ? (
                <HStack spacing={2}>
                  <Box as="span">{item.icon}</Box>
                  <Text as="span">{item.label}</Text>
                </HStack>
              ) : (
                item.label
              )}
            </Link>
          ))}
        </HStack>

        {/* Right: Icons + Mobile Menu Button */}
        <HStack spacing={4}>
          <HStack spacing={4} display={{ base: 'none', lg: 'flex' }}>
            <Link as={NextLink} href="/wishlist" position="relative" aria-label="Wishlist">
              <FaHeart size={18} />
              <Badge position="absolute" top="-1" right="-2" bg="red.500" color="white" borderRadius="full" fontSize="xs">
                0
              </Badge>
            </Link>

            <Link as={NextLink} href="/cart" position="relative" aria-label="Cart">
              <FaShoppingCart size={18} />
              <Badge position="absolute" top="-1" right="-2" bg="green.500" color="white" borderRadius="full" fontSize="xs">
                0
              </Badge>
            </Link>
          </HStack>

          <IconButton
            aria-label="Open menu"
            icon={<FaBars />}
            display={{ base: 'inline-flex', lg: 'none' }}
            onClick={onOpenMobile}
            variant="ghost"
          />
        </HStack>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isMobileOpen} placement="left" onClose={onCloseMobile}>
        <DrawerOverlay />
        <DrawerContent>\n          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={2}>
              {/* Fabrics section inside drawer */}
              <Button onClick={onToggleCat} justifyContent="space-between" rightIcon={<FaAngleDown />} variant="ghost">
                Fabrics
              </Button>

              <Collapse in={isCatOpen}>
                <VStack align="stretch" pl={2}>
                  {fabrics.map((item) => (
                    <Link key={item.href} as={NextLink} href={`/shop?filter=${encodeURIComponent(item.href)}`} py={2} onClick={onCloseMobile}>
                      <HStack>
                        {item.icon}
                        <Text>{item.label}</Text>
                      </HStack>
                    </Link>
                  ))}
                </VStack>
              </Collapse>

              <Box borderTop="1px solid" borderColor="gray.100" pt={3} mt={2}>
                {primaryNav.map((item) => (
                  <Link key={item.href} as={NextLink} href={item.href} py={3} onClick={onCloseMobile}>
                    <HStack>
                      {item.icon ? item.icon : null}
                      <Text>{item.label}</Text>
                    </HStack>
                  </Link>
                ))}
              </Box>

              <HStack spacing={4} pt={4}>
                <Link as={NextLink} href="/wishlist" onClick={onCloseMobile}>
                  <HStack>
                    <FaHeart /> <Text>Wishlist</Text>
                    <Badge ml={2}>0</Badge>
                  </HStack>
                </Link>

                <Link as={NextLink} href="/cart" onClick={onCloseMobile}>
                  <HStack>
                    <FaShoppingCart /> <Text>Cart</Text>
                    <Badge ml={2}>0</Badge>
                  </HStack>
                </Link>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}