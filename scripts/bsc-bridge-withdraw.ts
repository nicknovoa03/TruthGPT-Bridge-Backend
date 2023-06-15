const { ethers } = require('hardhat');

import EthToken from '../artifacts/contracts/BridgeEth.sol/BridgeEth.json'

async function main() {
    const address = '0xAf6C5fF92c0a3F187b063500D47dd1DBf034dC45';
    const bridgeAddress = '0x22fd64d9b62Dfa12a902E30f8E5231ff0b9C604B';
    const tokenAbi = EthToken.abi;

    const provider = ethers.provider;
    const EthBridgeContract = new ethers.Contract(bridgeAddress, tokenAbi, provider);

    const balance = await EthBridgeContract.withdrawTruth(address, ethers.utils.formatUnits('.01'));
    console.log(`Token balance for address ${address}: ${balance}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
