import { ethers } from "ethers";
import { CONTRACT_ABI } from "../blockchainUtils/contractAbi";
const CONTRACT_ADDRESS = "0x97D2B71251989F5320AB1980579bEA9C57a7d436";

export async function getUserDocument(
  provider: ethers.Provider,
  userAddress: string
) {
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );

  const filter = contract.filters.SealedDocument(userAddress); // indexed param
  const logs = await contract.queryFilter(filter, 0, "latest");

  const results = await Promise.all(
    logs.map(async (log) => {
      const parsed = contract.interface.parseLog(log);
      const block = await provider.getBlock(log.blockNumber);
      return {
        txHash: log.transactionHash,
        blockNumber: log.blockNumber,
        timestamp: block?.timestamp || 0,
        date: block?.timestamp ? new Date(block?.timestamp * 1000) : null, // readable JS date
        fileName: parsed?.args.fileName,
        fileHash: parsed?.args.fileHash,
        owner: parsed?.args.owner,
      };
    })
  );

  // Sort by timestamp descending (most recent first)
  results.sort((a, b) => b?.timestamp - a?.timestamp);

  return results;
}
