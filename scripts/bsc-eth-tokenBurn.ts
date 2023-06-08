import { ethers } from 'hardhat';
import BscBridge from '../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json';
import BscTruthToken from '../artifacts/contracts/TokenBsc.sol/TokenBsc.json'

async function main() {
  // Connect to the deployed contract instance

  // Get the signer's address
  const [signer] = await ethers.getSigners();
  console.log('Signer:', signer.address);

  //Get the recievers address
  const to = '0xAf6C5fF92c0a3F187b063500D47dd1DBf034dC45'

  // Load Bsc Truth Token
  const bscTruthTokenAddress = '0xB83cA21FED7054bAE76613cEd0215FaA06706361'
  const BscTruthTokenContract = new ethers.Contract(bscTruthTokenAddress, BscTruthToken.abi, signer)

  // Load Bsc Bridge contract
  const bscBrigdeContractAddress = '0xaA090c176DBcA6D8b46246fB21950D6E1f53351A';
  const TruthGptBridgeContract = new ethers.Contract(bscBrigdeContractAddress, BscBridge.abi, signer);

  // Set Amount to burn of BscTruth
  const amount = ethers.utils.parseUnits('1')
  console.log("amount to burn:", amount)

  console.log('Approving')
  // Approve Bsc Bridge to spend callers Truth
  const approveTx = await BscTruthTokenContract.approve(bscBrigdeContractAddress, amount)
  //Wait for the transaction to be mined
  await approveTx.wait();
  console.log('Burning')
  // Call the contract function to write to the contract
  const tx = await TruthGptBridgeContract.tokenBurn(to, amount);
  //Wait for the transaction to be mined
  await tx.wait();
}

// Run the main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
