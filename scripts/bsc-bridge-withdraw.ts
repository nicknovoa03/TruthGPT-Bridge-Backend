const { ethers } = require('hardhat');

import EthToken from '../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json'

async function main() {
    const [signer] = await ethers.getSigners();

    const address = '0xAf6C5fF92c0a3F187b063500D47dd1DBf034dC45';
    const bridgeAddress = '0xeDE1Be7b36878D1Aa0C7Fe3fDbfC2F8241b9FA7A';
    const tokenAbi = EthToken.abi;

    const BscBridgeContract = new ethers.Contract(bridgeAddress, tokenAbi, signer);

    //await EthBridgeContract.withdrawTruth(address, ethers.utils.parseEther('.001'));

    await BscBridgeContract.withdraw(address, { gasLimit: 30000 });
    console.log(`Complete`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
