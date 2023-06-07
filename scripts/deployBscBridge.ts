import { ethers } from "hardhat";

async function main() {

  const tokenBsc = '0xB83cA21FED7054bAE76613cEd0215FaA06706361';

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
