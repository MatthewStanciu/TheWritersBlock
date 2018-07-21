pragma solidity ^0.4.23;

contract TheWritersBlock {
  address public owner;
  mapping (address => uint256) public balance;

  constructor() public {
    owner = msg.sender;
  }

  function kill() public {
    if(msg.sender == owner) selfdestruct(owner);
  }

  function payWriter(uint amount, address receiver) public returns (bool success) {
    if (balance[msg.sender] < amount) throw;
    balance[msg.sender] -= amount;
    receiver.transfer(amount);

    return true;
  }
}
