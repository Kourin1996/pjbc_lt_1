import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();
require("hardhat-storage-layout");

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  networks: {
    edge: {
      url: process.env.JSON_RPC_URL ?? "",
      accounts: (process.env.PRIVATE_KEYS ?? "").split(","),
    },
  },
};

export default config;
