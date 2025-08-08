import { ethers, JsonRpcSigner } from "ethers";
import { CONTRACT_ABI } from "../blockchainUtils/contractAbi";
import { getContractInfoForCurrentNetwork } from "../blockchainUtils/contractUtils";

export async function commitDocument(
  signer: JsonRpcSigner,
  owner: string,
  fileName: string,
  fileHash: string
) {
  const contractInfo = await getContractInfoForCurrentNetwork();

  const contract = new ethers.Contract(
    contractInfo.address,
    CONTRACT_ABI,
    signer
  );
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
