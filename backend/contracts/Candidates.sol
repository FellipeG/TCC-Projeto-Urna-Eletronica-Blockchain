// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Candidates {

  struct Candidate {
    string fullName;
    string birthDate;
    string politicalParty;
    string position;
    string state;
    string city;
    string electoralNumber;
  }

  mapping(string => Candidate) candidates;

  modifier unique(string electoralNumber) {
    require(candidates[electoralNumber].fullName == '', "The electoral number must be unique");
    _;
  }

  constructor() public {
  }

  function add(
    string fullName,
    string birthDate,
    string politicalParty,
    string position,
    string state,
    string city,
    string electoralNumber;
  ) public unique(electoralNUmber)
  {

    // Validations
    getPoliticalParty(politicalParty);
    getPosition(position);
    getState(state);
    getCity(city);

    candidates[electoralNumber] = Candidate(
      fullName,
      birthDate,
      politicalParty,
      position,
      state,
      city,
      electoralNumber
    );
  }

  function get(string electoralNumber) 
    public
    view
    return (
      string fullName,
      string birthDate,
      string politicalParty,
      string position,
      string state,
      string city,
      string electoralNumber;
    )
  {
    Candidate memory candidate = candidates[electoralNumber];
    require(candidate.fullName != '', "Candidate not found");

    return(
      candidate.fullName,
      candidate.birthDate,
      candidate.politicalParty,
      candidate.position,
      candidate.state,
      candidate.city,
      candidate.electoralNumber;
    )
    );
    
  }

  // Helper validation methods
  function getPoliticalParty(string name) public returns (string) {
    if (name == '') { return ''; }

    PoliticalParties politicalParty = PoliticalParties.get(name);
    return politicalParty.name;
  }

  function getPosition(string name) public returns (string) {
    if (name == '') { return ''; }

    Positions position = Positions.get(name);
    return position.name;
  }

  function getState(string name) public returns (string) {
    if (name == '') { return ''; }

    States state = States.get(name);
    return state.name;
  }

  function getCity(string name) public returns (string) {
    if (name == '') { return ''; }

    Cities city = Cities.get(name);
    return city.name;
  }

}


// External interfaces to contract relationship
contract Cities {

  function add(
    string cityName
  ) public unique(cityName);

  function get(string name) 
    public
    view
    return (
      string name
    );

}

contract PoliticalParties {

  function add(
    string name,
  ) public unique(name);

  function get(string name) 
    public
    view
    return (
      string name
    );

}

contract Positions {

  function add(
    string position,
  ) public unique(position);

  function get(string name) 
    public
    view
    return (
      string name
    );

}

contract States {

  function add(
    string stateName
  ) public unique(stateName);

  function get(string name) 
    public
    view
    return (
      string name
    );

}
