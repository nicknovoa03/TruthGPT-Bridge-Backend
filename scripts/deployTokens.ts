import { ethers } from "hardhat";

async function main() {
  const TokenBsc = await ethers.getContractFactory("TokenBsc");
  const tokenBsc = await TokenBsc.deploy();

  await tokenBsc.deployed();

  const TokenEth = await ethers.getContractFactory("TokenEth");
  const tokenEth = await TokenEth.deploy();

  await tokenEth.deployed();

  console.log(
    `TokenBSC deployed to ${tokenBsc.address}
    TokenEth deployed to ${tokenEth.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
