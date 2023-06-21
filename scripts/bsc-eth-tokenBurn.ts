import { ethers } from 'hardhat';
import BscBridge from '../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json';
import BscTruthToken from '../artifacts/contracts/TokenBsc.sol/TokenBsc.json'

async function main() {
  // Connect to the deployed contract instance

  // Get the signer's address
  const [signer] = await ethers.getSigners();
  console.log('Signer:', signer.address);

  //Get the recievers address
  const to = await signer.getAddress()

  // Load Bsc Truth Token
  const bscTruthTokenAddress = '0x2abDB5903171071ac29cC0779d7EFDF0FaF14228'
  const BscTruthTokenContract = new ethers.Contract(bscTruthTokenAddress, BscTruthToken.abi, signer)

  // Load Bsc Bridge contract
  const bscBrigdeContractAddress = '0x9Af4010CCAFAd067ff8b961eC94371fc805823b5';
  const TruthGptBridgeContract = new ethers.Contract(bscBrigdeContractAddress, BscBridge.abi, signer);

  // Set Amount to burn of BscTruth
  const amount = ethers.utils.parseEther(".001")
  console.log("amount to burn:", ethers.utils.formatEther(amount))

  console.log('Approving')
  // Approve Bsc Bridge to spend callers Truth
  const approveTx = await BscTruthTokenContract.approve(bscBrigdeContractAddress, amount)
  //Wait for the transaction to be mined
  await approveTx.wait();
  console.log('Burning')
  // Call the contract function to write to the contract
  const tx = await TruthGptBridgeContract.tokenBurn(to, amount, {
    value: ethers.utils.parseEther('.001'),
  });
  //Wait for the transaction to be mined
  await tx.wait();
}

// Run the main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
