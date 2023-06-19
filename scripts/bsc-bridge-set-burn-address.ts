const { ethers } = require('hardhat');

import EthToken from '../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json'

async function main() {
    const [signer] = await ethers.getSigners();

    const address = '0xAf6C5fF92c0a3F187b063500D47dd1DBf034dC45';
    const bridgeAddress = '0x9Af4010CCAFAd067ff8b961eC94371fc805823b5';
    const tokenAbi = EthToken.abi;

    const BscBridgeContract = new ethers.Contract(bridgeAddress, tokenAbi, signer);

    await BscBridgeContract.setBurnAddress(address);


    console.log(`Complete`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
