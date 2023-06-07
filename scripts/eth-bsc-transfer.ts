import { ethers } from 'hardhat';
import TruthBSC from '../artifacts/contracts/TokenBsc.sol/TokenBsc.json';

async function main() {
  // Connect to the deployed contract instance

  // Get the signer's address
  const [signer] = await ethers.getSigners();
  console.log('Signer:', signer.address);

  // Load contract
  const contractAddress = '0x853806fCa5Ee8a6Ac99Dc84a8e3596A4F6541796';
  const TruthGptBridge = new ethers.Contract(contractAddress, TruthBSC.abi, signer);

  // Set Amount 
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
