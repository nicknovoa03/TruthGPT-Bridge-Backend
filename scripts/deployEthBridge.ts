import { ethers } from "hardhat";

async function main() {

  const tokenEth = '0xEaaDA2523091827bF1318A2E80c3176d9305d07A'

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
