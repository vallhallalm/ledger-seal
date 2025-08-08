// holeskyTestnet.ts

export const holeskyTestnet = {
  id: 17000,
  name: "Ethereum Holesky Testnet",
  network: "holesky",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://ethereum-holesky-rpc.publicnode.com"], // replace with official or preferred RPC if different
    },
    public: {
      http: ["https://ethereum-holesky-rpc.publicnode.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Holesky Explorer",
      url: "https://holesky.etherscan.io",
    },
  },
  testnet: true,
} as const;
