"use client";
import { useEffect, useState } from "react";
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import {
  FlashSalesTable,
  FlashSaleProduct,
} from "@/components/Admin/ActiveFlashSale";
import { ExpiredFlashSales } from "@/components/Admin/PastFlashSale";

export default function FlashSalesPage() {
  const { user } = useAuth();
  const toast = useToast();
  const [products, setProducts] = useState<FlashSaleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const normalize = (sales: any[]): FlashSaleProduct[] => {
    return sales.map((s) => ({
      id: s._id,
      name: s.productName,
      imageUrl: s.images?.[0] || "",
      pricing: {
        originalPrice: s.originalPrice,
        salePrice: s.salePrice,
      },
      inventory: {
        quantity: s.quantity,
      },
      sales: {
        expiryDate: s.endDate,
      },
    }));
  };

  const fetchSales = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/sale");
      const data = await res.json();

      setProducts(normalize(data.sales || []));
    } catch (err) {
      toast({
        title: "Failed to load flash sales",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // ✅ SPLIT ACTIVE / EXPIRED
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

  // 🔥 ACTIONS

  const handleEndSale = async (id: string) => {
    try {
      await fetch(`/api/sale/end/${id}`, {
        method: "PATCH",
      });

      toast({ title: "Sale ended", status: "success" });
      fetchSales();
    } catch {
      toast({ title: "Failed to end sale", status: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/sale/${id}`, {
        method: "DELETE",
      });

      toast({ title: "Deleted", status: "success" });
      fetchSales();
    } catch {
      toast({ title: "Delete failed", status: "error" });
    }
  };

  const handleEdit = (p: FlashSaleProduct) => {
    console.log("edit modal here", p);
  };

  const handleRestart = async (id: string) => {
    try {
      await fetch(`/api/sale/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "active",
          endDate: new Date(Date.now() + 86400000), // +1 day
        }),
      });

      toast({ title: "Sale restarted", status: "success" });
      fetchSales();
    } catch {
      toast({ title: "Restart failed", status: "error" });
    }
  };

  return (
    <Box>
      {/* HEADER */}
      <Box px={6} py={5} bg="#111" borderBottom="1px solid #222">
        <Flex direction="column">
          <Text fontSize="2xl" fontWeight="bold">
            {user?.fname || "Admin"}
          </Text>
          <Text fontSize="sm" color="gray.400">
            What's life without sales every now and then?
          </Text>
        </Flex>
      </Box>

      {/* ACTIVE */}
      <Box px={6} py={6}>
        <FlashSalesTable
          products={active}
          loading={loading}
          onEdit={handleEdit}
          onEndSale={handleEndSale}
          onDelete={handleDelete}
        />
      </Box>

      {/* EXPIRED */}
      <Box px={6} pb={6}>
        <ExpiredFlashSales
          products={expired}
          loading={loading}
          onRestart={handleRestart}
        />
      </Box>
    </Box>
  );
}