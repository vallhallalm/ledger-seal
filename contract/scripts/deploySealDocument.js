const fs = require("fs-extra");
const path = require("path");
const hre = require("hardhat"); // <--- this gives you hre.upgrades

// ----------------- Config -----------------
const RPC_URL = "https://spicy-rpc.chiliz.com";
const CONTRACT_NAME = "SealDocument";
// ------------------------------------------

async function main() {
  const folderName = process.argv[2];
  if (!folderName) {
    console.error("❌ Usage: node scripts/deploySealDocument.js <folder>");
    process.exit(1);
  }

  const walletPath = path.join(
    __dirname,
    "..",
    "addresses",
    folderName,
    "wallet.json"
  );
  if (!fs.existsSync(walletPath)) {
    console.error(`❌ Wallet file not found at: ${walletPath}`);
    process.exit(1);
  }

  const walletJson = JSON.parse(fs.readFileSync(walletPath));
  const provider = new hre.ethers.JsonRpcProvider(RPC_URL);
  const wallet = new hre.ethers.Wallet(walletJson.privateKey, provider);

  const balance = await provider.getBalance(wallet.address);
  console.log(`📦 Deploying from: ${wallet.address}`);
  console.log(`💰 Balance: ${hre.ethers.formatEther(balance)} CHZ`);

  const factory = await hre.ethers.getContractFactory(CONTRACT_NAME, wallet);

  console.log(`🚀 Deploying ${CONTRACT_NAME} contract...`);
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log(`✅ Contract deployed at: ${contractAddress}`);

  const deployPath = path.join(
    __dirname,
    "..",
    "addresses",
    folderName,
    `deployment${CONTRACT_NAME}.json`
  );
  fs.writeFileSync(deployPath, JSON.stringify({ contractAddress }, null, 2));
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});
