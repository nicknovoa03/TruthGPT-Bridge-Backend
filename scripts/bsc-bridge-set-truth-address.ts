const { ethers } = require('hardhat');

import EthToken from '../artifacts/contracts/BridgeEth.sol/BridgeEth.json'

async function main() {
    const [signer] = await ethers.getSigners();

    const truthAddress = '0x973689Bc975Fd6c6B364b151a16861639637b93C';
    const EthBridgeAddress = '0xc14F24cf3768a0997E39aE11F288Ea421485EF54';
    const tokenAbi = EthToken.abi;

    const EthBridgeContract = new ethers.Contract(EthBridgeAddress, tokenAbi, signer);

    await EthBridgeContract.setToken(truthAddress);


    console.log(`Complete`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
