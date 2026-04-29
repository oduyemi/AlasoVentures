"use client";
import { useEffect, useState } from "react";
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import { ProductsTable, Product } from "@/components/Admin/Products";

export default function ProductsPage() {
  const { user } = useAuth();
  const toast = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * FETCH PRODUCTS
   */
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/products");
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      // Normalize _id -> id
      const formatted = data.products.map((p: any) => ({
        ...p,
        id: p._id,
      }));

      setProducts(formatted);
    } catch (err: any) {
      toast({
        title: "Failed to load products",
        description: err.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const handleDelete = async (id: string) => {
    try {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      toast({
        title: "Product deleted",
        status: "success",
      });
    } catch (err: any) {
      toast({
        title: "Delete failed",
        description: err.message,
        status: "error",
      });

      fetchProducts(); 
    }
  };

  const handleSave = async (product: any) => {
    try {
      let imageUrl = product.imageUrl;
      if (product.imageFile) {
        const formData = new FormData();
        formData.append("file", product.imageFile);

        const uploadRes = await fetch("/api/products/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadData.success) throw new Error(uploadData.message);
        imageUrl = uploadData.url;
      }

      const payload = {
        name: product.name,
        imageUrl,

        category: product.category,
        subcategory: product.subcategory,
        customType: product.customType,

        isFlashSales: product.isFlashSales,

        pricing: product.pricing,
        inventory: product.inventory,
        sales: product.sales,
      };

      if (product.id) {
        const res = await fetch(`/api/products/${product.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.message);

        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id
              ? { ...data.product, id: data.product._id }
              : p
          )
        );

        toast({
          title: "Product updated",
          status: "success",
        });
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.message);

        setProducts((prev) => [
          { ...data.product, id: data.product._id },
          ...prev,
        ]);

        toast({
          title: "Product created",
          status: "success",
        });
      }
    } catch (err: any) {
      toast({
        title: "Save failed",
        description: err.message,
        status: "error",
      });
    }
  };

  return (
    <Box>
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
            Manage your products efficiently
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