import { ethers } from "ethers";

const rpcUrlsByChainId: Record<number, string> = {
  17000: "https://ethereum-holesky-rpc.publicnode.com",
  88882: "https://spicy-rpc.chiliz.com",
  // Add more chains & their RPC URLs here
};

export async function getJsonRpcProviderForCurrentNetwork() {
  const web3Provider = new ethers.BrowserProvider(window.ethereum);
  if (!web3Provider) {
    throw new Error(
      "No Web3 provider found. Please install MetaMask or another wallet."
    );
  }
  const network = await web3Provider.getNetwork();
  const rpcUrl = rpcUrlsByChainId[Number(network.chainId)];
  if (!rpcUrl)
    throw new Error(`Unsupported network with chainId ${network.chainId}`);

  return new ethers.JsonRpcProvider(rpcUrl);
}
