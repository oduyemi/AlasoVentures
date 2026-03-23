"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  HStack,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

/* ------------------ ROOTS ------------------ */
const ROOTS = {
  Custom: "kofoworola/custom",
  Cotton: "kofoworola/asooke/cotton",
  Metallic: "kofoworola/asooke/metallic",
  Supernet: "kofoworola/asooke/supernet",
  Saki: "kofoworola/saki",
  Kente: "kofoworola/kente",
  Akwete: "kofoworola/akwete",
  Accessories: "kofoworola/accessories",
};

/* ------------------ CHIP ------------------ */
const FilterChip = ({ label, active, onClick }: any) => (
  <Box
    px={4}
    py={1.5}
    borderRadius="full"
    fontSize="sm"
    cursor="pointer"
    onClick={onClick}
    bg={active ? "#C28840" : "transparent"}
    color={active ? "white" : "gray.600"}
    border="1px solid"
    borderColor={active ? "#C28840" : "gray.200"}
  >
    {label}
  </Box>
);

export const LuxuryGallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mainTab, setMainTab] = useState("custom");
  const [fabricTab, setFabricTab] = useState("asooke");
  const [asoOkeTab, setAsoOkeTab] = useState("cotton");
  const bg = useColorModeValue("gray.50", "gray.900");

  const getSubHeading = () => {
    if (mainTab === "custom") return "Prices range from ₦80,000 upwards";
    if (mainTab === "accessories") return "Prices range from ₦20,000 upwards";

    if (fabricTab === "asooke") {
      if (asoOkeTab === "cotton") return "Prices range from ₦40,000 upwards";
      if (asoOkeTab === "metallic") return "Prices range from ₦50,000 upwards";
      if (asoOkeTab === "supernet") return "Prices range from ₦35,000 upwards";
    }

    if (fabricTab === "saki") return "Prices range from ₦45,000 upwards";
    if (fabricTab === "kente") return "Prices range from ₦40,000 upwards";
    if (fabricTab === "akwete") return "Prices range from ₦38,000 upwards";

    return "";
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev! === mappedImages.length - 1 ? 0 : prev! + 1
    );
  };
  
  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev! === 0 ? mappedImages.length - 1 : prev! - 1
    );
  };

  

  const getFolder = () => {
    if (mainTab === "custom") return ROOTS.Custom;
    if (mainTab === "accessories") return ROOTS.Accessories;

    if (mainTab === "fabrics") {
      if (fabricTab === "asooke") {
        if (asoOkeTab === "cotton") return ROOTS.Cotton;
        if (asoOkeTab === "metallic") return ROOTS.Metallic;
        if (asoOkeTab === "supernet") return ROOTS.Supernet;
      }
      if (fabricTab === "saki") return ROOTS.Saki;
      if (fabricTab === "kente") return ROOTS.Kente;
      if (fabricTab === "akwete") return ROOTS.Akwete;
    }

    return null;
  };

  useEffect(() => {
    const fetchImages = async () => {
      const folder = getFolder();
      if (!folder) return;

      setLoading(true);
      setImages([]);

      try {
        const res = await fetch(`/api/gallery?folder=${folder}`);
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [mainTab, fabricTab, asoOkeTab]);

  const mappedImages = images.map((img: any) => ({
    img: img.secure_url.replace("/upload/", "/upload/w_800,q_auto,f_auto/"),
  }));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
  
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
  
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, mappedImages.length]);

  const renderGrid = (items: any[]) => {
    if (loading) {
      return (
        <Flex justify="center" py={20}>
          <Text>Loading...</Text>
        </Flex>
      );
    }

    return (
      <MotionBox>
        <Flex wrap="wrap" gap={6}>
          {items.map((item, i) => (
            <Box
              key={i}
              w={{ base: "100%", md: "48%", lg: "31%" }}
              cursor="pointer"
              onClick={() => setSelectedIndex(i)}
            >
              <Box overflow="hidden" borderRadius="2xl">
                <MotionBox whileHover={{ scale: 1.05 }}>
                  <Image
                    src={item.img}
                    h="320px"
                    w="100%"
                    objectFit="cover"
                  />
                </MotionBox>
              </Box>
            </Box>
          ))}
        </Flex>
      </MotionBox>
    );
  };

  return (
    <Box maxW="1200px" mx="auto" py={10} px={6} bg={bg} borderRadius="2xl">
      {/* TABS */}
      <HStack spacing={3} mb={4}>
        {[
          { key: "custom", label: "Custom Styles" },
          { key: "fabrics", label: "Fabrics" },
          { key: "accessories", label: "Accessories" },
        ].map((tab) => (
          <FilterChip
            key={tab.key}
            label={tab.label}
            active={mainTab === tab.key}
            onClick={() => setMainTab(tab.key)}
          />
        ))}
      </HStack>

      {/* ✅ SUBHEADING */}
      <Text mb={6} color="gray.500" fontSize="sm">
        {getSubHeading()}
      </Text>

      <AnimatePresence mode="wait">
        {mainTab === "custom" && renderGrid(mappedImages)}
        {mainTab === "accessories" && renderGrid(mappedImages)}

        {mainTab === "fabrics" && (
          <MotionBox>
            <HStack spacing={3} mb={6}>
              {["asooke", "saki", "kente", "akwete"].map((tab) => (
                <FilterChip
                  key={tab}
                  label={tab}
                  active={fabricTab === tab}
                  onClick={() => setFabricTab(tab)}
                />
              ))}
            </HStack>

            {fabricTab === "asooke" && (
              <HStack spacing={3} mb={8}>
                {["cotton", "metallic", "supernet"].map((t) => (
                  <FilterChip
                    key={t}
                    label={t}
                    active={asoOkeTab === t}
                    onClick={() => setAsoOkeTab(t)}
                  />
                ))}
              </HStack>
            )}

            {renderGrid(mappedImages)}
          </MotionBox>
        )}
      </AnimatePresence>

      {/* ✅ MODAL */}
      <Modal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        size="full"
        >
        <ModalOverlay
            backdropFilter="blur(10px)"
            bg="rgba(0,0,0,0.85)"
        />

        <ModalContent bg="transparent" boxShadow="none">
            <ModalCloseButton color="white" size="lg" zIndex={3} />

            <ModalBody
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            p={0}
            >
            {/* PREV */}
            <Box
                position="absolute"
                left={{ base: "10px", md: "30px" }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={3}
                cursor="pointer"
                onClick={handlePrev}
                bg="rgba(255,255,255,0.08)"
                backdropFilter="blur(6px)"
                p={4}
                borderRadius="full"
                transition="all 0.3s"
                _hover={{
                bg: "rgba(255,255,255,0.2)",
                transform: "translateY(-50%) scale(1.1)",
                }}
            >
                <Text color="white" fontSize="2xl">‹</Text>
            </Box>

            {/* IMAGE */}
            {selectedIndex !== null && (
                <MotionBox
                key={mappedImages[selectedIndex].img}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                maxW="92vw"
                maxH="92vh"
                >
                <Image
                    src={mappedImages[selectedIndex].img}
                    maxH="92vh"
                    maxW="92vw"
                    objectFit="contain"
                    borderRadius="xl"
                    boxShadow="0 20px 60px rgba(0,0,0,0.6)"
                />
                </MotionBox>
            )}

            {/* NEXT */}
            <Box
                position="absolute"
                right={{ base: "10px", md: "30px" }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={3}
                cursor="pointer"
                onClick={handleNext}
                bg="rgba(255,255,255,0.08)"
                backdropFilter="blur(6px)"
                p={4}
                borderRadius="full"
                transition="all 0.3s"
                _hover={{
                bg: "rgba(255,255,255,0.2)",
                transform: "translateY(-50%) scale(1.1)",
                }}
            >
                <Text color="white" fontSize="2xl">›</Text>
            </Box>

            {/* COUNTER */}
            {selectedIndex !== null && (
                <Text
                position="absolute"
                bottom="25px"
                color="white"
                fontSize="sm"
                opacity={0.8}
                >
                {selectedIndex + 1} / {mappedImages.length}
                </Text>
            )}
            </ModalBody>
        </ModalContent>
        </Modal>
    </Box>
  );
};