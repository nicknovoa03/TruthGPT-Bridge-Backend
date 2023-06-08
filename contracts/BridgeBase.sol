// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

import '../contracts/IToken.sol';

contract BridgeBase is Ownable, ReentrancyGuard {
  address public burnAddress = 0x000000000000000000000000000000000000dEaD;
  IToken public token;
  uint public nonce;
  mapping(uint => bool) public processedNonces;

  enum Step {
    Burn,
    Transfer
  }
  event Transfer(address from, address to, uint amount, uint date, uint nonce, Step indexed step);

  constructor(address _token) {
    token = IToken(_token);
  }

  function tokenBurn(address to, uint amount) external nonReentrant {
    require(token.balanceOf(msg.sender) >= amount, 'Insufficent Balance');
    bool success = token.transferFrom(msg.sender, burnAddress, amount);
    require(success, 'Token transfer from user failed');
    emit Transfer(msg.sender, to, amount, block.timestamp, nonce, Step.Burn);
    nonce++;
  }

  function tokenTransfer(address to, uint amount, uint otherChainNonce) external nonReentrant onlyOwner {
    require(processedNonces[otherChainNonce] == false, 'transfer already processed');
    processedNonces[otherChainNonce] = true;
    token.transfer(to, amount);
    emit Transfer(msg.sender, to, amount, block.timestamp, otherChainNonce, Step.Transfer);
  }
}
