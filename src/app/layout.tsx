"use client";
// import { UserProvider } from "@/app/context/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { usePathname } from "next/navigation"; 
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import { TopHeader } from "@/navigation/TopHeader";
import { MidNav } from "@/navigation/MidNav";
import { MainMenu } from "@/navigation/MainMenu";
import { Footer } from "@/navigation/Footer";
import { WhatsAppChatButton } from "@/components/LiveChat";


export default function RootLayout({
  children,
  hideLayout = false,  
}: {
  children: React.ReactNode;
  hideLayout?: boolean;  
}) {
  return (
    <>
    {/* </><UserProvider> */}
      <html lang="en">
        <Head>
          <title>Kofoworola Alasooke | Asooke attires</title>
          <meta name="description" content="Rich Damask Fabrics and Wears" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* Favicon & Icons */}
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="shortcut icon" href="/favicon.ico" />

          {/* Android Icons */}
          <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        </Head>
        <body style={{ margin: 0, padding: 0 }}>
          <ChakraProvider>
            <Box minH="100vh" display="flex" flexDirection="column" m={0} p={0}>
              {!hideLayout && <ClientSideLayout>{children}</ClientSideLayout>}
              {hideLayout && children} 
            </Box>
          </ChakraProvider>
        </body>
      </html>
    {/* </UserProvider> */}
    </>
  );
}

const ClientSideLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); 
  const router = useRouter(); 
  const isAdminRoute = pathname?.startsWith("/admin") ?? false; 

  useEffect(() => {
    if (isAdminRoute) {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin/login");
      }
    }
  }, [isAdminRoute, router]);

  return (
    <>
      {!isAdminRoute && (
        <>
          <TopHeader />
          <MidNav />
          <MainMenu />
        </>
      )}

      <Box flex="1" m={0} p={0}>
        {children}
      </Box>

      {!isAdminRoute && (
        <>
          <WhatsAppChatButton />
        <Box className="mt-5">

          <Footer />
        </Box>
        </>
      )}
    </>
  );
};