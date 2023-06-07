import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';
dotenv.config();

const BscPrivateKey = process.env.BSC_PRIVATE_KEY!
const EthPrivateKey = process.env.ETH_PRIVATE_KEY!

const BscTestnetProvider = "https://data-seed-prebsc-1-s1.binance.org:8545"
const EthTestnetProvider = "https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY


const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    bsc_testnet: {
      url: BscTestnetProvider,
      accounts: [BscPrivateKey]
    },
    sepolia: {
      url: EthTestnetProvider,
      accounts: [EthPrivateKey]
    },
  }
};

export default config;
