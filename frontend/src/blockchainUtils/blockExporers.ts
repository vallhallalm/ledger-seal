import { ethers } from "ethers";
import { holeskyTestnet } from "./ethHoleskyTestnet";
import { chilizTestnet } from "./chilizTestnet";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  chiliz,
} from "wagmi/chains";

const customNetworks = [
  holeskyTestnet,
  chilizTestnet,
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  chiliz,
];

export async function getExplorerUrl() {
  const web3Provider = new ethers.BrowserProvider(window.ethereum);
  if (!web3Provider) {
    throw new Error(
      "No Web3 provider found. Please install MetaMask or another wallet."
    );
  }
  const network = await web3Provider.getNetwork();
  const networkSettings = customNetworks.find(
    (net) => net.id === Number(network.chainId)
  );
  return networkSettings?.blockExplorers?.default?.url ?? null;
}
