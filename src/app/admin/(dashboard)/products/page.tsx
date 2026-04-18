"use client";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import { ProductsTable, Product } from "@/components/Admin/Products";
import { useState } from "react";

export default function ProductsPage() {
  const { user } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (product: Partial<Product>) => {
    if (product.id) {
      // update
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, ...product } as Product : p
        )
      );
    } else {
      // create
      const newProduct: Product = {
        id: Date.now().toString(),
        name: product.name || "",
        imageUrl: product.imageUrl || "",
        category: product.category || "custom",
        customType: product.customType || null,
        isFlashSales: product.isFlashSales || false,
        pricing: product.pricing,
        inventory: product.inventory,
        createdAt: new Date().toISOString(),
      };

      setProducts((prev) => [newProduct, ...prev]);
    }
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
            Enjoy managing your products in one place
          </Text>
        </Flex>
      </Box>

      <Box px={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }} mt={2}>
        <ProductsTable
          products={products}
          loading={loading}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      </Box>
    </Box>
  );
}