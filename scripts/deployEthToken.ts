import { ethers } from "hardhat";

async function main() {
  const TokenEth = await ethers.getContractFactory("TokenEth");
  console.log("Deploying...")
  const tokenEth = await TokenEth.deploy();

  await tokenEth.deployed();

  console.log(
    `TokenEth deployed to ${tokenEth.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
