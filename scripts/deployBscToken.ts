import { ethers } from "hardhat";

async function main() {
  const TokenBsc = await ethers.getContractFactory("TokenBsc");
  console.log("Deploying...")
  const tokenBsc = await TokenBsc.deploy();

  await tokenBsc.deployed();


  console.log(
    `TokenBSC deployed to ${tokenBsc.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
