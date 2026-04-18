"use client";
import { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import {
  FlashSalesTable,
  FlashSaleProduct,
} from "@/components/Admin/ActiveFlashSale";
import { ExpiredFlashSales } from "@/components/Admin/PastFlashSale";

export default function ProductsPage() {
  const { user } = useAuth();

  const [products, setProducts] = useState<FlashSaleProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // mock data
    const mock: FlashSaleProduct[] = [
      {
        id: "1",
        name: "Aso-Oke Premium",
        imageUrl: "https://via.placeholder.com/40",
        pricing: { originalPrice: 50000, salePrice: 35000 },
        inventory: { quantity: 10 },
        sales: {
          expiryDate: new Date(Date.now() + 86400000), // tomorrow
        },
      },
      {
        id: "2",
        name: "Kente Deluxe",
        imageUrl: "https://via.placeholder.com/40",
        pricing: { originalPrice: 40000, salePrice: 25000 },
        inventory: { quantity: 5 },
        sales: {
          expiryDate: new Date(Date.now() - 86400000), // yesterday
        },
      },
    ];

    setTimeout(() => {
      setProducts(mock);
      setLoading(false);
    }, 1000);
  }, []);

  // split active vs expired
  const active = products.filter(
    (p) =>
      p.sales?.expiryDate &&
      new Date(p.sales.expiryDate) >= new Date()
  );

  const expired = products.filter(
    (p) =>
      p.sales?.expiryDate &&
      new Date(p.sales.expiryDate) < new Date()
  );

  // handlers
  const handleEdit = (p: FlashSaleProduct) => {
    console.log("edit", p);
  };

  const handleEndSale = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              sales: { ...p.sales, expiryDate: new Date() },
            }
          : p
      )
    );
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleRestart = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              sales: {
                expiryDate: new Date(Date.now() + 86400000),
              },
            }
          : p
      )
    );
  };

  return (
    <Box>
      {/* Header */}
      <Box
        px={{ base: 4, md: 6 }}
        py={{ base: 4, md: 5 }}
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
        bg="#111"
      >
        <Flex direction="column" gap={1}>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            {user?.fname || "Admin"}
          </Text>

          <Text fontSize="sm" color="gray.400">
            What's life without sales every now and then?
          </Text>
        </Flex>
      </Box>

      {/* Active */}
      <Box px={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }} mt={2}>
        <FlashSalesTable
          products={active}
          loading={loading}
          onEdit={handleEdit}
          onEndSale={handleEndSale}
          onDelete={handleDelete}
        />
      </Box>

      {/* Expired */}
      <Box px={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }}>
        <ExpiredFlashSales
          products={expired}
          loading={loading}
          onRestart={handleRestart}
        />
      </Box>
    </Box>
  );
}