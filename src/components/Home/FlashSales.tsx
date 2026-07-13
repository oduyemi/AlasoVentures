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
  
  interface FlashSale {
    _id: string;
    productName: string;
    desc: string;
    originalPrice: number;
    salePrice: number;
    images: string[];
    quantity: number;
    startDate: string;
    endDate: string;
    status: string;
  }

  const MotionBox = motion.create(Box);
  
  
  
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
    const [sales, setSales] = useState<FlashSale[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState<Record<string, any>>({});
  
    useEffect(() => {
      const fetchSales = async () => {
        try {
          const res = await fetch("/api/sale");
          const data = await res.json();
          if (data.success) {
            setSales(data.sales);
          }
        } catch (error) {
          console.error("Failed to fetch flash sales", error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchSales();
    }, []);
    
    useEffect(() => {
      const interval = setInterval(() => {
        const updated: any = {};
        sales.forEach((sale) => {
          updated[sale._id] = getTimeLeft(sale.endDate);
        });
        setTimeLeft(updated);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const cardBg = useColorModeValue("#ffffff", "#1a202c");
  
    const validSales = sales.filter((sale) => {
      const timer = getTimeLeft(sale.endDate);
    
      return (
        sale.status === "active" &&
        sale.quantity > 0 &&
        timer
      );
    });

    if (loading) {
      return (
        <Box py={28} textAlign="center">
          <Text color="gray.500">
            Loading flash sales...
          </Text>
        </Box>
      );
    }
  
    return (
      <Box py={28} px={4} bg="#fff">
        {/* Header */}
        <Box textAlign="center" mb={16} id="flashsales">
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
        {validSales.length > 0 ? (
          <Flex justify="center" gap={10} wrap="wrap">
            {validSales.map((item) => {
              const remaining = item.quantity;
              const percent = Math.min(
                (remaining / remaining) * 100,
                100
              );
              const timer = timeLeft[item._id];

              if (!timer) return null;

              return (
                <MotionBox
                  key={item._id}
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
                  <Box position="relative" overflow="hidden">
                    <MotionBox whileHover={{ scale: 1.08 }}>
                      <Image
                        src={item.images?.[0]}
                        alt={item.productName}
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

                  <Box p={6}>
                    <Stack spacing={4}>
                      <Text fontWeight="semibold" fontSize="lg">
                        {item.productName}
                      </Text>

                      <HStack spacing={3}>
                        <Text fontWeight="bold" color="green.500" fontSize="xl">
                          ₦{Number(item.salePrice).toLocaleString()}
                        </Text>
                        <Text
                          fontSize="sm"
                          textDecoration="line-through"
                          color="gray.400"
                        >
                          ₦{Number(item.originalPrice).toLocaleString()}
                        </Text>
                      </HStack>

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
                            `https://wa.me/2348094217767?text=Hi, I'm interested in ${item.productName}`,
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
        ) : (
          <MotionBox
            maxW="700px"
            mx="auto"
            p={{ base: 8, md: 12 }}
            bg="white"
            borderRadius="3xl"
            border="1px solid"
            borderColor="gray.100"
            boxShadow="none"
            textAlign="center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Text fontSize="5xl" mb={4}>
              🔥
            </Text>

            <Heading
              size="lg"
              mb={3}
              bgGradient="linear(to-r, #C28840, #000)"
              bgClip="text"
            >
              No Flash Sales Right Now
            </Heading>

            <Text
              color="gray.600"
              maxW="500px"
              mx="auto"
              lineHeight="tall"
            >
              We don't have any active flash sales at the moment. New exclusive
              offers and limited-time deals are announced regularly, so check back
              later and don't miss out on your next great find.
            </Text>
          </MotionBox>
        )}
      </Box>
    );
  };