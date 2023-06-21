const { ethers } = require('hardhat');

import EthToken from '../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json'

async function main() {
    const [signer] = await ethers.getSigners();
    console.log("signer address:", signer.address)

    const address = '0xAf6C5fF92c0a3F187b063500D47dd1DBf034dC45';
    const bridgeAddress = '0xE12D1a1Abbc5f3a9FF0CdEeD2Bb238d86D6620A5';
    const tokenAbi = EthToken.abi;

    const BscBridgeContract = new ethers.Contract(bridgeAddress, tokenAbi, signer);

    //await BscBridgeContract.withdrawTruth(address, ethers.utils.parseEther('.001'));

    await BscBridgeContract.withdraw(address);
    console.log(`Complete`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
