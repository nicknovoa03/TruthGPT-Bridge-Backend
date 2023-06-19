// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './BridgeBase.sol';

contract BridgeBsc is BridgeBase {
  address public burnAddress = 0x000000000000000000000000000000000000dEaD;
  bool public bridgeActive = false;

  constructor(address token) BridgeBase(token) {}

  function setBurnAddress(address _burnAddress) external onlyOwner {
    burnAddress = _burnAddress;
  }

  function setBridgeActive() external onlyOwner {
    bridgeActive = !bridgeActive;
  }

  function tokenBurn(address to, uint amount) external payable nonReentrant {
    require(bridgeActive, 'Bridge is not currently active');
    require(token.balanceOf(msg.sender) >= amount, 'Insufficent Balance');
    bool success = token.transferFrom(msg.sender, burnAddress, amount);
    require(success, 'Token transfer from user failed');
    emit Transfer(msg.sender, to, amount, block.timestamp, nonce, Step.Burn);
    nonce++;
  }
}
