const { ethers } = require('hardhat');

import BscToken from '../artifacts/contracts/TokenBsc.sol/TokenBsc.json'

async function main() {
    const address = '0x5Fc2ae171FA324b2E2a7c4e4EA5c0E6aA2c190A9';
    const tokenAddress = '0x2abDB5903171071ac29cC0779d7EFDF0FaF14228';
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
