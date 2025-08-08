const fs = require("fs-extra");
const path = require("path");
const hre = require("hardhat");

async function main() {
  console.log("🔍 Network:", await hre.ethers.provider.getNetwork());
  console.log("🔍 Current block:", await hre.ethers.provider.getBlockNumber());
  const folderName = process.env.LEDGER_FOLDER;
  if (!folderName) {
    console.error("❌ Please set LEDGER_FOLDER environment variable");
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

  const provider = hre.ethers.provider; // Hardhat's provider for the configured network
  const wallet = new hre.ethers.Wallet(walletJson.privateKey, provider);

  const SealDocument = await hre.ethers.getContractFactory(
    "SealDocument",
    wallet
  );

  // 1. Deploy the implementation contract
  console.log("🚀 Deploying implementation...");
  const impl = await hre.upgrades.deployImplementation(SealDocument, {
    kind: "uups",
  });
  console.log(`Implementation deployed at: ${impl}`);

  // 2. Deploy the proxy
  console.log("🚀 Deploying proxy...");
  const proxy = await hre.upgrades.deployProxy(
    SealDocument,
    [walletJson.address],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );
  await proxy.waitForDeployment();
  console.log(`Proxy deployed at: ${await proxy.getAddress()}`);
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});
