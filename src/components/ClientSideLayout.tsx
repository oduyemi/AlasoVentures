"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { TopHeader } from "@/navigation/TopHeader";
import { MidNav } from "@/navigation/MidNav";
import { MainMenu } from "@/navigation/MainMenu";
import { Footer } from "@/navigation/Footer";
import { WhatsAppChatButton } from "@/components/LiveChat";
import { CallButton } from "@/components/Call";

export const ClientSideLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    setMounted(true);

    if (isAdminRoute) {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin/login");
      }
    }
  }, [isAdminRoute, router]);

  if (!mounted) return null;

  return (
    <>
      {!isAdminRoute && (
        <>
          <TopHeader />
          <MidNav />
          <div className="mt-2">
            <MainMenu />
          </div>
        </>
      )}

      <Box flex="1" m={0} p={0}>
        {children}
      </Box>

      {!isAdminRoute && (
        <>
          <WhatsAppChatButton />
          <CallButton />
          <Box className="mt-5">
            <Footer />
          </Box>
        </>
      )}
    </>
  );
};