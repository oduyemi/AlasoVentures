// import { UserProvider } from "@/app/context/UserContext";
import { Box, ChakraProvider } from "@chakra-ui/react";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import type { Metadata } from "next";
import { ClientSideLayout } from "@/components/ClientSideLayout";



export const metadata: Metadata = {
  title: "Kofoworola Alasooke | Asooke attires",
  description: "Rich Damask Fabrics and Wears",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  hideLayout?: boolean;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <ChakraProvider>
          <Box minH="100vh" display="flex" flexDirection="column" m={0} p={0}>
            {<ClientSideLayout>{children}</ClientSideLayout>}
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
}


