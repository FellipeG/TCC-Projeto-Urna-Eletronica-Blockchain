// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Positions {
  struct Position {
    string name;
  }

  mapping(string => Position) positions;

  constructor() public {
  }

  modifier unique(string position) {
    require(states[stateName] == 0, "The position must be unique");
    _;
  }

  function add(
    string position,
  ) public unique(position) {
    positions[position] = Position(position);
  }

  function get(string name) 
    public
    view
    return (
      string name
    )
  {
    Position memory position = posaitions[name];
    require(position.name != 0, "Position not found");
    return(position.name);
  }
}
