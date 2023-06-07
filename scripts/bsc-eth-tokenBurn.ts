import { ethers } from 'hardhat';
import BscBridge from '../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json';

async function main() {
  // Connect to the deployed contract instance

  // Get the signer's address
  const [signer] = await ethers.getSigners();
  console.log('Signer:', signer.address);

  // Load contract
  const contractAddress = '0x8B263fB06dD0e97F6c75992B92f4D2b95e247C9D';
  const TruthGptBridge = new ethers.Contract(contractAddress, BscBridge.abi, signer);

  // Set Amount to burn of BscTruth
  const amount = ethers.utils.parseEther('1')

  // Call the contract function to write to the contract
  const tx = await TruthGptBridge.burnToken(amount);

  //Wait for the transaction to be mined
  await tx.wait();
}

// Run the main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
