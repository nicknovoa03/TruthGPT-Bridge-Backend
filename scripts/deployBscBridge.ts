import { ethers } from "hardhat";

async function main() {

  const tokenBsc = '0x2abDB5903171071ac29cC0779d7EFDF0FaF14228';

  const BridgeBsc = await ethers.getContractFactory("BridgeBsc");
  const bridgeBsc = await BridgeBsc.deploy(tokenBsc);

  await bridgeBsc.deployed();

  console.log(
    `BridgeBSC deployed to ${bridgeBsc.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
