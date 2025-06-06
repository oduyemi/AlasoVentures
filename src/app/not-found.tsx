"use client";

import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import "animate.css";
import "../styles/notFound.css";

export default function NotFound() {
  return (
    <Box
      className="not-found-container"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="44vh"
      bg="radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)"
      color="white"
      position="relative"
      overflow="hidden"
      fontFamily="mono"
    >
      <Heading
        as="h1"
        className="glitch animate__animated animate__pulse animate__infinite"
        data-text="404"
        fontSize={{ base: "7xl", md: "9xl" }}
        position="relative"
        zIndex="1"
      >
        404
      </Heading>
      <Text
        mt={1}
        fontSize="xl"
        className="animate__animated animate__fadeInUp"
        color="gray.300"
        zIndex="1"
      >
        The page you are looking for does not exist
      </Text>
      <Box className="stars" />
    </Box>
  );
}
