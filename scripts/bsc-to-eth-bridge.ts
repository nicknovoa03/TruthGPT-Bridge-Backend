import { ethers } from "hardhat";
import BridgeBsc from '../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json'
import BridgeEth from '../artifacts/contracts/BridgeEth.sol/BridgeEth.json'
import dotenv from 'dotenv';
dotenv.config();

// Set private key for EthBridge Admin
const EthBridgeAdminPrivateKey = process.env.ETH_PRIVATE_KEY

// Set Providers
const EthProvider = new ethers.provider.JsonRpcProvider('https://infura.io/v3/' + process.env.INFURA_API_KEY);
const BscProvider = new ethers.provider.WebSocketProvider('wss://testnet-dex.binance.org/api/');

// Set Contract Addresses
const TruthEthAddress = '0xB83cA21FED7054bAE76613cEd0215FaA06706361'
const TruthBscAddress = '0xB83cA21FED7054bAE76613cEd0215FaA06706361'

// Type interface
interface TokenBurn {
  from: string, to: string, amount: string, date: string, nonce: number, step: any
}

async function main() {
  // Get the signer's address
  const [signer] = await ethers.getSigners();
  console.log('Signer:', signer.address);

  // Load Bridge Contracts
  const bridgeEth = new ethers.Contract(
    TruthEthAddress,
    BridgeEth.abi,
    signer
  );

  const bridgeBsc = new ethers.Contract(
    TruthBscAddress,
    BridgeBsc.abi,
    BscProvider
  );

  // Create an event filter for the "Transfer" event
  const eventFilter = bridgeBsc.filters.Transfer();

  bridgeBsc.on(eventFilter, async ({ from, to, amount, date, nonce, step }: TokenBurn) => {

    const tx = await bridgeEth.tokenTransfer(to, amount, nonce);

    console.log(`Transaction hash: ${tx.hash}`);
    console.log(`
    Processed transfer:
    - from ${from} 
    - to ${to} 
    - amount ${amount} tokens
    - date ${date}
  `);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});