import { ethers } from "ethers";
import { CONTRACT_ABI } from "../blockchainUtils/contractAbi";
import { getContractInfoForCurrentNetwork } from "../blockchainUtils/contractUtils";

export async function getUserDocument(
  provider: ethers.Provider,
  userAddress: string
) {
  const contractInfo = await getContractInfoForCurrentNetwork();
  const contract = new ethers.Contract(
    contractInfo.address,
    CONTRACT_ABI,
    provider
  );

  const filter = contract.filters.SealedDocument(userAddress);

  const latestBlock = await provider.getBlockNumber();
  const fromBlock = contractInfo.deploymentBlock;
  const step = 50000;

  let allLogs: (ethers.EventLog | ethers.Log)[] = [];

  for (let start = fromBlock; start <= latestBlock; start += step) {
    const end = Math.min(start + step - 1, latestBlock);
    const logs = await contract.queryFilter(filter, start, end);
    allLogs = allLogs.concat(logs);
  }

  const results = await Promise.all(
    allLogs.map(async (log) => {
      const parsed = contract.interface.parseLog(log);
      const block = await provider.getBlock(log.blockNumber);
      return {
        txHash: log.transactionHash,
        blockNumber: log.blockNumber,
        timestamp: block?.timestamp || 0,
        date: block?.timestamp ? new Date(block.timestamp * 1000) : null,
        fileName: parsed?.args.fileName,
        fileHash: parsed?.args.fileHash,
        owner: parsed?.args.owner,
      };
    })
  );

  results.sort((a, b) => b.timestamp - a.timestamp);

  return results;
}
