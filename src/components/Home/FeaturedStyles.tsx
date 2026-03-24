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
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import NextLink from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

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

  /* -------- FETCH IMAGES -------- */
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

  /* -------- RANDOMIZE 4 -------- */
  const randomImages = useMemo(() => {
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [images]);

  /* -------- NAVIGATION -------- */
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
      {/* CONTAINER */}
      <Box
        bg={bg}
        backdropFilter="blur(24px)"
        borderRadius="3xl"
        p={{ base: 6, md: 10 }}
        boxShadow="0 30px 80px rgba(0,0,0,0.1)"
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
                onClick={() => !loading && setActiveIndex(i)}
              >
                {loading ? (
                  <Skeleton h="280px" borderRadius="2xl" />
                ) : (
                  <MotionBox whileHover={{ scale: 1.07 }}>
                    <Image
                      src={item.url}
                      alt="Custom style"
                      h="280px"
                      w="100%"
                      objectFit="cover"
                    />
                  </MotionBox>
                )}
              </Box>
            </Box>
          ))}
        </Flex>

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
          >
            Start Custom Order
          </Button>
        </Box>
      </Box>

      {/* -------- LIGHTBOX -------- */}
      <AnimatePresence>
        {activeIndex !== null && (() => {
          const current = randomImages[activeIndex];

          const [{ x, y, scale }, api] = useSpring(() => ({
            x: 0,
            y: 0,
            scale: 1,
          }));

          const bind = useGesture({
            onDrag: ({ down, movement: [mx, my], velocity, direction }) => {
              if (scale.get() > 1) {
                api.start({ x: mx, y: my });
                return;
              }
            
              if (!down) {
                if (Math.abs(mx) > 120 || Math.abs(velocity[0]) > 0.3) {
                  direction[0] > 0 ? handlePrev() : handleNext();
                }
                api.start({ x: 0 });
              } else {
                api.start({ x: mx });
              }
            },

            onPinch: ({ offset: [d] }) => {
              api.start({ scale: Math.min(Math.max(d / 200, 1), 3) });
            },

            onDoubleClick: () => {
              api.start({ scale: scale.get() > 1 ? 1 : 2 });
            },
          });

          return (
            <MotionBox
              position="fixed"
              inset={0}
              zIndex={9999}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="rgba(0,0,0,0.92)"
              backdropFilter="blur(12px)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* BACKGROUND */}
              <Box
                position="absolute"
                inset={0}
                bgImage={`url(${current.url})`}
                bgSize="cover"
                bgPosition="center"
                filter="blur(50px) brightness(0.4)"
                transform="scale(1.3)"
              />

              {/* COUNTER */}
              <Box
                position="absolute"
                top={6}
                left="50%"
                transform="translateX(-50%)"
                color="white"
                fontSize="sm"
                opacity={0.8}
              >
                {activeIndex + 1} / {randomImages.length}
              </Box>

              {/* CLOSE */}
              <IconButton
                icon={<FaTimes />}
                aria-label="Close"
                position="absolute"
                top={4}
                right={4}
                onClick={() => setActiveIndex(null)}
              />

              {/* NAV */}
              <IconButton
                icon={<FaArrowLeft />}
                aria-label="Prev"
                position="absolute"
                left={6}
                onClick={handlePrev}
              />
              <IconButton
                icon={<FaArrowRight />}
                aria-label="Next"
                position="absolute"
                right={6}
                onClick={handleNext}
              />

              {/* IMAGE */}
              <animated.div
                {...bind()}
                style={{
                  x,
                  y,
                  scale,
                  touchAction: "none",
                  cursor: scale.get() > 1 ? "grab" : "pointer",
                }}
              >
                <MotionBox
                  key={activeIndex}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  maxW="92vw"
                  maxH="92vh"
                >
                  <Image
                    src={current.url}
                    alt="Preview"
                    borderRadius="xl"
                    maxH="90vh"
                    boxShadow="0 30px 120px rgba(0,0,0,0.6)"
                  />
                </MotionBox>
              </animated.div>
            </MotionBox>
          );
        })()}
      </AnimatePresence>
    </Box>
  );
};