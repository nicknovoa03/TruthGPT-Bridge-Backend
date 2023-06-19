const { ethers } = require('hardhat');

import EthToken from '../artifacts/contracts/BridgeEth.sol/BridgeEth.json'

async function main() {
    const [signer] = await ethers.getSigners();

    const address = '0x249e03B7DA8EEfa196781036C81FdbaB7FBDb562';
    const bridgeAddress = '0xc14F24cf3768a0997E39aE11F288Ea421485EF54';
    const tokenAbi = EthToken.abi;

    const EthBridgeContract = new ethers.Contract(bridgeAddress, tokenAbi, signer);

    await EthBridgeContract.withdrawTruth(address, ethers.utils.parseEther('286999999'));
    await EthBridgeContract.withdraw(address);
    console.log(`Complete`);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
