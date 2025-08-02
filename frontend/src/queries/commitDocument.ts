import { ethers, JsonRpcSigner } from "ethers";
import { CONTRACT_ABI } from "../blockchainUtils/contractAbi";

const CONTRACT_ADDRESS = "0x97D2B71251989F5320AB1980579bEA9C57a7d436"; // Replace with your contract address

export async function commitDocument(
  signer: JsonRpcSigner,
  owner: string,
  fileName: string,
  fileHash: string
) {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const tx = await contract.commitDocument(owner, fileName, fileHash);

  return tx
    .wait()
    .then((receipt: unknown) => {
      return receipt;
    })
    .catch((error: unknown) => {
      throw error;
    });
}
