// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenBase is ERC20, Ownable {
  address public admin;

  constructor(string memory name, string memory symbol) ERC20(name, symbol) {
    admin = msg.sender;
    _mint(msg.sender, 1000 * 10 ** decimals());
  }
}
