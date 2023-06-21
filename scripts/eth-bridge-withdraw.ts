const { ethers } = require('hardhat');

import EthToken from '../artifacts/contracts/BridgeEth.sol/BridgeEth.json'

async function main() {
    const [signer] = await ethers.getSigners();
    console.log("signer address:", signer.address)

    const address = '0xfc4d77396c573639ac94616ed2d14f4d37365576';
    const bridgeAddress = '0xc14F24cf3768a0997E39aE11F288Ea421485EF54';
    const tokenAbi = EthToken.abi;

    const EthBridgeContract = new ethers.Contract(bridgeAddress, tokenAbi, signer);

    await EthBridgeContract.withdrawTruth(address, ethers.utils.parseEther('.001'));
    console.log(`Complete`);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
