import { ethers } from "hardhat";

async function main() {

  const tokenEth = '0xB83cA21FED7054bAE76613cEd0215FaA06706361'

  const BridgeEth = await ethers.getContractFactory("BridgeEth");
  const bridgeEth = await BridgeEth.deploy(tokenEth);

  await bridgeEth.deployed();

  console.log(
    `BridgeEth deployed to ${bridgeEth.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
