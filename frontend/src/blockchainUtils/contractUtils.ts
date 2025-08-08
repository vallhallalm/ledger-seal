import { ethers } from "ethers";

const contractAbisAndDeploymentBlockByChainId: Record<
  number,
  { address: string; deploymentBlock: number }
> = {
  17000: {
    address: "0x6e17391f2E460f4A66841Eb79D4B22002f37791b",
    deploymentBlock: 4303555,
  }, // Holesky Testnet
  88882: {
    address: "0x97D2B71251989F5320AB1980579bEA9C57a7d436",
    deploymentBlock: 26812948,
  }, // Chiliz Spicy Testnet
  // Add more chains & their contract addresses here
};

export async function getContractInfoForCurrentNetwork() {
  const web3Provider = new ethers.BrowserProvider(window.ethereum);
  if (!web3Provider) {
    throw new Error(
      "No Web3 provider found. Please install MetaMask or another wallet."
    );
  }
  const network = await web3Provider.getNetwork();
  const contractInfo =
    contractAbisAndDeploymentBlockByChainId[Number(network.chainId)];
  if (!contractInfo)
    throw new Error(`Unsupported network with chainId ${network.chainId}`);

  return contractInfo;
}
