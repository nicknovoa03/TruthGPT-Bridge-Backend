const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('BridgeBase', function () {
  let bridgeBase;
  let owner;
  let receiver;
  let tokenAddress = "0xB83cA21FED7054bAE76613cEd0215FaA06706361"

  before(async function () {
    const BridgeBase = await ethers.getContractFactory('BridgeBase');
    [owner, receiver] = await ethers.getSigners();

    bridgeBase = await BridgeBase.deploy(tokenAddress);
    await bridgeBase.deployed();

    // Send ETH to the contract
    const value = ethers.utils.parseEther('100'); // Amount of ETH to send
    await owner.sendTransaction({
      to: bridgeBase.address,
      value: value,
    });
  });

  it('should withdraw ETH to the specified address', async function () {
    
    const balanceBefore = await ethers.provider.getBalance(receiver.address);
    console.log(balanceBefore)

    // Call the withdraw function
     await bridgeBase.connect(owner).withdraw(owner.address);

    // Calculate the balance after the transaction
    const balanceAfter = await ethers.provider.getBalance(receiver.address);

    console.log(balanceAfter)
    // Check the balance difference
    expect(balanceAfter).to.equal(
      balanceBefore,
      'Invalid balance after withdrawal'
    );
  });
});
