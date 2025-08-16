"use client";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
/*import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  chiliz,
} from "wagmi/chains";*/
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { chilizTestnet } from "./blockchainUtils/chilizTestnet";
import { holeskyTestnet } from "./blockchainUtils/ethHoleskyTestnet";
import { colors } from "./theme";

export default function WalletConnectProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains: [
      /*mainnet,
      polygon,
      optimism,
      arbitrum,
      base,
      chiliz,*/
      chilizTestnet,
      holeskyTestnet,
    ],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: colors.contrast,
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "large",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
