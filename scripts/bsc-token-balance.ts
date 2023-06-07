const { ethers } = require('hardhat');

import BscToken from '../artifacts/contracts/TokenBsc.sol/TokenBsc.json'

async function main() {
    const address = '0xYOUR_ADDRESS';
    const tokenAddress = '0xTOKEN_ADDRESS';
    const tokenAbi = BscToken.abi;

    const provider = ethers.provider;
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

    const balance = await tokenContract.balanceOf(address);
    console.log(`Token balance for address ${address}: ${balance}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
