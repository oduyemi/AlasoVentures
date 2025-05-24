import React, { useContext, useEffect } from 'react';
// import { UserContext } from "../usercontext";
// import { useCart } from "./Cart/CartContext";
// import { useWishlist } from '../WishlistContext';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FaBars, FaAngleDown, FaHeart, FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';
// import { LogOut } from './Logout';

export const MainMenu: React.FC = () => {
//   const { user } = useContext(UserContext);
//   const { cartCount } = useCart();
//   const { wishlist } = useWishlist(); // Using wishlist from the useWishlist hook
//   const wishlistCount = wishlist.length; // Count of items in the wishlist
  const { isOpen, onToggle } = useDisclosure();

//   const cartColor = cartCount > 0 ? '#C28840' : 'white';
//   const wishlistColor = wishlistCount > 0 ? "#C28840" : "#fff";

//   useEffect(() => {
//     console.log('Wishlist updated in NavMenu:', wishlist); // Log to ensure updates
//   }, [wishlist]); // Will log whenever wishlist changes  

  return (
    <Box className="container-fluid mb-30" bgColor="#000">
      <Flex px={{ base: 4, xl: 5 }} flexDirection={{ base: 'column', lg: 'row' }}>
        <Box className="col-lg-3 d-none d-lg-block">
          <Box
            as="button"
            onClick={onToggle}
            width="100%"
            height="65px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            className="orange text-light"
            bg="#C28840"
            color="white"
            px={4}
            borderRadius="md"
          >
            <HStack>
              <FaBars />
              <Text m={0}>Products</Text>
            </HStack>
            <FaAngleDown />
          </Box>
          {isOpen && (
            <Box
              mt={2}
              bg="gray.100"
              boxShadow="md"
              borderRadius="md"
              position="absolute"
              zIndex={1}
              width="24%"
              className="navbar-light"
            >
              <VStack spacing={0} align="stretch" pl={4}>
                <Link className="dropdown-item" href="/fabrics">Custom Aṣọ òkè</Link>
                <Link className="dropdown-item" href="/bridals">Made To Fit</Link>
                <Link className="dropdown-item" href="/bridals">Off The Shelve</Link>
                <Link className="dropdown-item" href="/ready-to-wear">Ready To Wear</Link>
              </VStack>
            </Box>
          )}
        </Box>

        <Box className="col-lg-9">
          <Flex as="nav" className="navbar navbar-expand-lg navbar-dark py-3 py-lg-0 px-0">
            <Link className="text-decoration-none d-block d-lg-none" href="/">
                <Image 
                  src="/images/logo/logo_transparent.png" 
                  width={40} 
                  height={40}
                  alt="sitelogo" 
                />
            </Link>
            <IconButton
              variant="outline"
              aria-label="Toggle Navigation"
              icon={<FaAngleDown />}
              onClick={onToggle}
              className="navbar-toggler"
            />
            <Flex justifyContent="space-between" className={`navbar-collapse miniMenu ${isOpen ? '' : 'collapse'}`}>
              <Flex justifyContent="space-between" className="navbar-nav mr-auto py-0 mt-2" color="#fff">
                <Link href="/shop" className="nav-item nav-link">Shop</Link>
                <Link href="/services" className="nav-item nav-link">Services</Link>
                <Link href="/dashboard" className="nav-item nav-link">Dashboard</Link>
              </Flex>
              <HStack spacing={4} className="navbar-nav ml-auto py-0 d-none d-lg-block">
                <Flex justifyContent="space-between">
                  <Link className="btn px-0" href="/wishlist">
                    <FaHeart 
                        className="text-white"
                        style={{ color: "#ccc"}} 
                        // style={{ color: cartColor }} 
                    />
                    <span className="badge text-white border border-secondary rounded-circle" style={{ paddingBottom: '2px' }}>
                      {/* {wishlistCount} */}
                    </span>
                  </Link>
                  <Link className="btn px-0 ml-3" href="/cart">
                    <FaShoppingCart 
                      style={{ color: "#ccc"}}
                    // style={{ color: cartColor }} 
                    />
                    <span
                      className="badge border border-secondary rounded-circle"
                      style={{
                        paddingBottom: '2px',
                        // color: cartColor,
                        // borderColor: cartColor,
                      }}
                    >
                      {/* {cartCount} */}
                    </span>
                  </Link>
                  {/* {user ? (
                    <HStack spacing={3} align="center">
                      <Text className="d-inline">Hi {user.firstName}</Text>
                      <Link href="/profile">
                        <FaUserCircle color="#ffffff" height="20px" width="20px" />
                      </Link>
                      <LogOut />
                    </HStack>
                  ) : (
                    <></>
                  )} */}
                </Flex>
              </HStack>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
