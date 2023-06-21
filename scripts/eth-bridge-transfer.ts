const { ethers } = require('hardhat');

import EthToken from '../artifacts/contracts/BridgeEth.sol/BridgeEth.json'

async function main() {
    const [signer] = await ethers.getSigners();
    console.log("signer address:", signer.address)

    const to = '0x06011c4039353b1427dc8d78f22fc0d692a2da7f';
    const amount = ethers.utils.parseEther("256373.482859045325136766")
    const nonce = 1003
    const bridgeAddress = '0xc14F24cf3768a0997E39aE11F288Ea421485EF54';
    const tokenAbi = EthToken.abi;

    console.log(amount)
    const EthBridgeContract = new ethers.Contract(bridgeAddress, tokenAbi, signer);

    await EthBridgeContract.tokenTransfer(to, amount, nonce);
    console.log(`Complete`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
