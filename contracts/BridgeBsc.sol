// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './BridgeBase.sol';

contract BridgeBsc is BridgeBase {
  address public burnAddress = 0x28fD43425999De0607A443d64fE21c54230911Bd;
  bool public bridgeActive = false;

  constructor(address token) BridgeBase(token) {}

  function setBurnAddress(address _burnAddress) external onlyOwner {
    burnAddress = _burnAddress;
  }

  function setBridgeActive() external onlyOwner {
    bridgeActive = !bridgeActive;
  }

  function tokenBurn(address to, uint256 amount) external payable nonReentrant {
    require(bridgeActive, 'Bridge is not currently active');
    require(token.balanceOf(msg.sender) >= amount, 'Insufficent Balance');
    bool success = token.transferFrom(msg.sender, burnAddress, amount);
    require(success, 'Token transfer from user failed');
    emit Transfer(msg.sender, to, amount, block.timestamp, nonce, Step.Burn);
    nonce++;
  }
}
