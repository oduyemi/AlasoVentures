import {
    Box,
    Heading,
    Text,
    Image,
    Button,
    Progress,
    Flex,
    Stack,
    useColorModeValue,
    HStack,
    Badge,
  } from "@chakra-ui/react";
  import { motion } from "framer-motion";
  import { useEffect, useState } from "react";
  
  const MotionBox = motion.create(Box);
  
  interface FlashItem {
    id: number;
    name: string;
    image: string;
    price: string;
    originalPrice: string;
    stock: number;
    totalStock: number;
    endTime: string;
  }
  
  const flashSales: FlashItem[] = [
    {
      id: 1,
      name: "Premium Aṣọ Òkè",
      image: "/images/fabrics.png",
      price: "₦45,000",
      originalPrice: "₦65,000",
      stock: 3,
      totalStock: 10,
      endTime: "2026-03-25T23:59:59",
    },
    {
      id: 2,
      name: "Luxury Ready-to-Wear",
      image: "/images/custom.jpg",
      price: "₦30,000",
      originalPrice: "₦50,000",
      stock: 5,
      totalStock: 12,
      endTime: "2026-03-25T23:59:59",
    },
    {
      id: 3,
      name: "The Cultured Lady Cap",
      image: "/images/accessory.jpg",
      price: "₦50,000",
      originalPrice: "₦70,000",
      stock: 2,
      totalStock: 12,
      endTime: "2026-03-30T23:59:59",
    },
  ];
  
  const getTimeLeft = (endTime: string) => {
    const diff = new Date(endTime).getTime() - new Date().getTime();
    if (diff <= 0) return null;
  
    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  
  export const FlashSales = () => {
    const [timeLeft, setTimeLeft] = useState<any>({});
  
    useEffect(() => {
      const interval = setInterval(() => {
        const updated: any = {};
        flashSales.forEach((item) => {
          updated[item.id] = getTimeLeft(item.endTime);
        });
        setTimeLeft(updated);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const cardBg = useColorModeValue("#ffffff", "#1a202c");
  
    const validSales = flashSales
      .filter((item) => {
        const timer = getTimeLeft(item.endTime);
        return timer && item.stock > 0;
      })
      .slice(0, 3);
  
    return (
      <Box py={28} px={4} bg="#fff">
        {/* Header */}
        <Box textAlign="center" mb={16}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl" }}
            bgGradient="linear(to-r, #C28840, #000)"
            bgClip="text"
          >
            Flash Sales 🔥
          </Heading>
  
          <Text mt={4} color="gray.500">
            Limited pieces. Once sold out, they’re gone forever.
          </Text>
        </Box>
  
        {/* Items */}
        <Flex justify="center" gap={10} wrap="wrap">
          {validSales.map((item) => {
            const remaining = item.stock;
            const percent = (remaining / item.totalStock) * 100;
            const timer = timeLeft[item.id];
  
            if (!timer) return null;
  
            return (
              <MotionBox
                key={item.id}
                bg={cardBg}
                borderRadius="3xl"
                overflow="hidden"
                maxW="360px"
                boxShadow="xl"
                border="1px solid"
                borderColor="gray.100"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {/* Image */}
                <Box position="relative" overflow="hidden">
                  <MotionBox whileHover={{ scale: 1.08 }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      h="240px"
                      w="100%"
                      objectFit="cover"
                    />
                  </MotionBox>
  
                  <Box
                    position="absolute"
                    inset="0"
                    bgGradient="linear(to-t, rgba(0,0,0,0.6), transparent)"
                  />
  
                  <Badge
                    position="absolute"
                    top="4"
                    left="4"
                    bg="green.500"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                  >
                    FLASH
                  </Badge>
  
                  {/* Timer */}
                  <Box
                    position="absolute"
                    bottom="4"
                    left="4"
                    bg="blackAlpha.700"
                    backdropFilter="blur(6px)"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                  >
                    {timer.hours}h {timer.minutes}m {timer.seconds}s
                  </Box>
                </Box>
  
                {/* Content */}
                <Box p={6}>
                  <Stack spacing={4}>
                    <Text fontWeight="semibold" fontSize="lg">
                      {item.name}
                    </Text>
  
                    <HStack spacing={3}>
                      <Text fontWeight="bold" color="green.500" fontSize="xl">
                        {item.price}
                      </Text>
                      <Text
                        fontSize="sm"
                        textDecoration="line-through"
                        color="gray.400"
                      >
                        {item.originalPrice}
                      </Text>
                    </HStack>
  
                    {/* Stock */}
                    <Box>
                      <Progress
                        value={percent}
                        size="sm"
                        borderRadius="full"
                        sx={{
                          "& > div": {
                            background:
                              "linear-gradient(to right, #ff4d4f, #ff7a45)",
                          },
                        }}
                      />
                      <Text fontSize="xs" mt={1} color="gray.500">
                        ⚡ Only {remaining} left
                      </Text>
                    </Box>
  
                    <Button
                      borderRadius="full"
                      bg="#C28840"
                      color="white"
                      size="md"
                      _hover={{
                        bg: "#a86d32",
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      onClick={() =>
                        window.open(
                          `https://wa.me/2348094217767?text=Hi, I'm interested in ${item.name}`,
                          "_blank"
                        )
                      }
                    >
                      Order on WhatsApp
                    </Button>
                  </Stack>
                </Box>
              </MotionBox>
            );
          })}
        </Flex>
      </Box>
    );
  };