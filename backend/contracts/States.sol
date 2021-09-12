// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract States {
  struct State {
    string name;
  }

  mapping(string => State) states;

  constructor() public {
  }

  modifier unique(string stateName) {
    require(states[stateName] == '', "The state name must be unique");
    _;
  }

  function add(
    string stateName
  ) public unique(stateName) {
    states[stateName] = State(stateName);
  }

  function get(string name) 
    public
    view
    return (
      string name
    )
  {
    State memory state = states[name];
    require(state.name != '', "State not found");

    return(
      state.name
    );
  }
}
