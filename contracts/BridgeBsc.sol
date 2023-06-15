// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './BridgeBase.sol';

contract BridgeBsc is BridgeBase {
  address public burnAddress = 0x000000000000000000000000000000000000dEaD;

  constructor(address token) BridgeBase(token) {}

  function tokenBurn(address to, uint amount) external payable nonReentrant {
    require(token.balanceOf(msg.sender) >= amount, 'Insufficent Balance');
    bool success = token.transferFrom(msg.sender, burnAddress, amount);
    require(success, 'Token transfer from user failed');
    emit Transfer(msg.sender, to, amount, block.timestamp, nonce, Step.Burn);
    nonce++;
  }
}
