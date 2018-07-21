pragma solidity ^0.4.23;

contract TheWritersBlock {
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

  function kill() public {
    if(msg.sender == owner) selfdestruct(owner);
  }

  function payWriter(uint amount, address receiver) public {
    if (balance[msg.sender] < amount){return;}
    balance[msg.sender] -= amount;
    balance[receiver] += amount;
  }
}
