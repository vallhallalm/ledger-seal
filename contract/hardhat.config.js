require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: "0.8.22",
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
  },
  networks: {
    chilizSpicy: {
      url: "https://spicy-rpc.chiliz.com/",
    },
    hoodiEthereum: {
      url: "https://ethereum-hoodi-rpc.publicnode.com",
    },
    holeskyEthereum: {
      url: "https://ethereum-holesky-rpc.publicnode.com",
    },
  },
};
