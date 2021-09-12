// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PoliticalParties {
  struct PoliticalParty {
    string name;
  }

  mapping(string => PoliticalParty) politicalParties;

  constructor() public {
  }

  modifier unique(string name) {
    require(politicalParties[name] == '', "The political party must be unique");
    _;
  }

  function add(
    string name,
  ) public unique(name) {
    politicalParties[name] = PoliticalParty(name);
  }

  function get(string name) 
    public
    view
    return (
      string name
    )
  {
    PoliticalParty memory politicalParty = politicalParties[name];
    require(politicalParty.name != '', "Political party not found");

    return(
      politicalParty.name
    );
  }
}
