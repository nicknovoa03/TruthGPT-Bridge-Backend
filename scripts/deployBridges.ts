import { ethers } from "hardhat";

async function main() {

  const tokenBsc = '';
  const tokenEth = ''

  const BridgeBsc = await ethers.getContractFactory("BridgeBsc");
  const bridgeBsc = await BridgeBsc.deploy(tokenBsc);

  await bridgeBsc.deployed();

  const BridgeEth = await ethers.getContractFactory("BridgeEth");
  const bridgeEth = await BridgeEth.deploy(tokenEth);

  await bridgeEth.deployed();

  console.log(
    `BridgeBSC deployed to ${bridgeBsc.address}
    BridgeEth deployed to ${bridgeEth.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
