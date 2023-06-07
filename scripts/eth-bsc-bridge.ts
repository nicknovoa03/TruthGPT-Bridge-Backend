import { ethers } from "hardhat";
import BridgeBsc from '../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json'
import BridgeEth from '../artifacts/contracts/BridgeEth.sol/BridgeEth.json'

// Set Providers
const EthProvider = new ethers.providers.JsonRpcProvider('https://infura.io/v3/YOUR_INFURA_PROJECT_ID');
const BscProvider = new ethers.providers.WebSocketProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
// Set Contract Addresses
const TruthEthAddress = ''
const TruthBscAddress = ''

// Type interface
interface TokenBurn {
  from: string, to: string, amount: string, date: string, nonce: number, step: any
}

async function main() {
  // Get the signer's address
  const [signer] = await ethers.getSigners();
  console.log('Signer:', signer.address);

  // Load Contract
  const bridgeEth = new ethers.Contract(
    TruthEthAddress,
    BridgeEth.abi,
    signer
  );

  const bridgeBsc = new ethers.Contract(
    TruthBscAddress,
    BridgeBsc.abi,
    signer
  );

  // Create an event filter for the "Transfer" event
  const eventFilter = bridgeBsc.filters.Transfer();

  bridgeBsc.events.Transfer(
    { fromBlock: 0, step: 0 }
  )
    .on(eventFilter, async ({ from, to, amount, date, nonce, step }: TokenBurn) => {

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