import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import type { Metadata } from "next";
import { ClientSideLayout } from "@/components/ClientSideLayout";
import { Providers } from "@/components/Providers";
import { AuthProvider } from "./context/auth.context";
import { ColorModeScript } from "@chakra-ui/react";


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
}) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body suppressHydrationWarning>
    <ColorModeScript initialColorMode="light" />

    <Providers>
      <AuthProvider>
        <ClientSideLayout>{children}</ClientSideLayout>
      </AuthProvider>
    </Providers>
  </body>
</html>
  );
}

