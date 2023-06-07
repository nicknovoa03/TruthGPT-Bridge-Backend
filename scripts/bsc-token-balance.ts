const { ethers } = require('hardhat');

import BscToken from '../artifacts/contracts/TokenBsc.sol/TokenBsc.json'

async function main() {
    const address = '0xAf6C5fF92c0a3F187b063500D47dd1DBf034dC45';
    const tokenAddress = '0xB83cA21FED7054bAE76613cEd0215FaA06706361';
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
