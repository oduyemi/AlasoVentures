/* eslint-disable */ 
"use client";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Skeleton,
  useColorModeValue,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import NextLink from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const MotionBox = motion(Box);
const ROOT = { Custom: "kofoworola/custom" };

export const CustomStylesPreview = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const bg = useColorModeValue(
    "rgba(255,255,255,0.8)",
    "rgba(20,20,20,0.6)"
  );

  const textColor = useColorModeValue("gray.600", "gray.300");

  /* -------- FETCH -------- */
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/gallery?folder=${ROOT.Custom}`);
        const data = await res.json();
        setImages(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  /*  RANDOM  */
  const randomImages = useMemo(() => {
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [images]);

  /*  NAV  */
  const handleNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === randomImages.length - 1 ? 0 : (prev ?? 0) + 1
    );
  };

  const handlePrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === 0 ? randomImages.length - 1 : (prev ?? 0) - 1
    );
  };

  /* -------- KEYBOARD -------- */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  return (
    <Box maxW="1200px" mx="auto" py={16} px={{ base: 4, md: 6 }}>
      {/* GLASS CONTAINER */}
      <MotionBox
        bg={bg}
        backdropFilter="blur(24px)"
        borderRadius="3xl"
        p={{ base: 6, md: 10 }}
        boxShadow="0 30px 80px rgba(0,0,0,0.1)"
        border="1px solid rgba(255,255,255,0.2)"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* HEADER */}
        <Heading
          textAlign="center"
          mb={4}
          bgGradient="linear(to-r, #C28840, #0D0D0D)"
          bgClip="text"
        >
          Our Custom Styles
        </Heading>

        <Text textAlign="center" color={textColor} mb={12}>
          Tailored elegance designed for distinction.
        </Text>

        {/* GRID */}
        <Flex gap={6} wrap="wrap">
          {(loading ? [1, 2, 3, 4] : randomImages).map((item, i) => (
            <Box
              key={i}
              flex={{ base: "1 1 100%", sm: "1 1 48%", lg: "1 1 22%" }}
            >
              <Box
                borderRadius="2xl"
                overflow="hidden"
                position="relative"
                cursor="pointer"
                role="group"
                onClick={() => !loading && setActiveIndex(i)}
              >
                {loading ? (
                  <Skeleton h="280px" borderRadius="2xl" />
                ) : (
                  <MotionBox
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={item.url}
                      alt="Custom style"
                      h="280px"
                      w="100%"
                      objectFit="cover"
                      loading="lazy"
                    />
                  </MotionBox>
                )}

                {/* HOVER GLOW */}
                {!loading && (
                  <Box
                    position="absolute"
                    inset={0}
                    bg="linear-gradient(to top, rgba(0,0,0,0.55), transparent)"
                    opacity={0}
                    transition="0.3s"
                    _groupHover={{ opacity: 1 }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Flex>

        {/* DOT NAV */}
        {!loading && (
          <HStack justify="center" mt={6}>
            {randomImages.map((_, i) => (
              <Box
                key={i}
                w={activeIndex === i ? "20px" : "8px"}
                h="8px"
                borderRadius="full"
                bg={activeIndex === i ? "#C28840" : "gray.400"}
                transition="0.3s"
                cursor="pointer"
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </HStack>
        )}

        {/* CTA */}
        <Box mt={14} textAlign="center">
          <Button
            as={NextLink}
            href="/custom-orders"
            bgGradient="linear(to-r,#C28840,#a8732f)"
            color="white"
            borderRadius="full"
            px={10}
            size="lg"
            _hover={{ transform: "translateY(-2px)" }}
            transition="0.3s"
          >
            Start Custom Order
          </Button>
        </Box>
      </MotionBox>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {activeIndex !== null && (
          <MotionBox
            position="fixed"
            inset={0}
            bg="rgba(0,0,0,0.92)"
            backdropFilter="blur(10px)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={9999}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CLOSE */}
            <IconButton
              icon={<FaTimes />}
              aria-label="Close"
              position="absolute"
              top={4}
              right={4}
              onClick={() => setActiveIndex(null)}
            />

            {/* PREV */}
            <IconButton
              icon={<FaArrowLeft />}
              aria-label="Previous"
              position="absolute"
              left={6}
              onClick={handlePrev}
            />

            {/* NEXT */}
            <IconButton
              icon={<FaArrowRight />}
              aria-label="Next"
              position="absolute"
              right={6}
              onClick={handleNext}
            />

            {/* IMAGE */}
            <MotionBox
              key={activeIndex}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35 }}
              maxW="92%"
              maxH="92%"
            >
              <Image
                src={randomImages[activeIndex].url}
                alt="Preview"
                borderRadius="lg"
                maxH="90vh"
                mx="auto"
              />
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};