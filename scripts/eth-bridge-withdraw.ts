const { ethers } = require('hardhat');

import EthToken from '../artifacts/contracts/BridgeEth.sol/BridgeEth.json'

async function main() {
    const [signer] = await ethers.getSigners();

    const address = '0xAf6C5fF92c0a3F187b063500D47dd1DBf034dC45';
    const bridgeAddress = '0x0aaFfD6fb69cfc591e775c6A4D10Ab43b32bEBd1';
    const tokenAbi = EthToken.abi;

    const EthBridgeContract = new ethers.Contract(bridgeAddress, tokenAbi, signer);

    await EthBridgeContract.withdrawTruth(address, ethers.utils.parseEther('.001'));

    await EthBridgeContract.withdraw(address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
