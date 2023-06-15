const { ethers } = require('hardhat');

import EthToken from '../artifacts/contracts/BridgeEth.sol/BridgeEth.json'

async function main() {
    const [signer] = await ethers.getSigners();

    const address = '0xAf6C5fF92c0a3F187b063500D47dd1DBf034dC45';
    const bridgeAddress = '0xE12D1a1Abbc5f3a9FF0CdEeD2Bb238d86D6620A5';
    const tokenAbi = EthToken.abi;

    const EthBridgeContract = new ethers.Contract(bridgeAddress, tokenAbi, signer);

    await EthBridgeContract.withdrawTruth(address, ethers.utils.parseEther('.001'));

    await EthBridgeContract.withdraw(address);
    console.log(`Complete`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
