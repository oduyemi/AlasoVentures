"use client";

import {
  ChakraProvider,
  PortalManager,
  ColorModeScript,
} from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import { emotionCache } from "@/lib/emotion-cache";
import { theme } from "@/lib/theme";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <CacheProvider value={emotionCache}>
      <ColorModeScript initialColorMode="light" />
      <ChakraProvider theme={theme}>
        <PortalManager>{children}</PortalManager>
      </ChakraProvider>
    </CacheProvider>
  );
}