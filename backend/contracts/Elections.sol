// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.22 <0.9.0;

contract Elections {

  address owner;

  // structs

  struct Election {
    uint id;
    string title;
    string[] candidates;
    string[] votes;
    uint endDate;
    bool initialized;
  }

  struct Candidate {
    string fullName;
    string birthDate;
    string politicalParty;
    string state;
    string city;
    string electoralNumber;
    bool initialized;
  }

  struct City {
    string name;
    bool initialized;
  }

  struct PoliticalParty {
    string name;
    bool initialized;
  }

  struct Position {
    string name;
    bool initialized;
  }

  struct State {
    string name;
    bool initialized;
  }

  //lengths
  uint electionIndexLength;
  uint cityIndexLength;
  uint stateIndexLength;
  uint positionIndexLength;
  uint politicalPartyIndexLength;
  uint candidateIndexLength;

  //events
  event CreatedElectionEvent(
    string title,
    string[] candidates
  );

  event EditedElectionEvent(
    string title,
    uint endDate
  );

  event DestroyedElectionEvent(
    string title
  );

  event CreatedCandidateEvent(
    string fullName,
    string birthDate,
    string politicalParty,
    string state,
    string city,
    string electoralNumber
  );

  event EditedCandidateEvent(
    string fullName,
    string birthDate,
    string politicalParty,
    string state,
    string city,
    string electoralNumber
  );

  event DestroyedCandidateEvent(
    string fullName,
    string electoralNumber
  );

  event CreatedCityEvent(
    string name
  );

  event EditedCityEvent(
    string name
  );

  event DestroyedCityEvent(
    string name
  );

  event CreatedPoliticalPartyEvent(
    string name
  );

  event EditedPoliticalPartyEvent(
    string name
  );

  event DestroyedPoliticalPartyEvent(
    string name
  );

  event CreatedPositionEvent(
    string name
  );

  event EditedPositionEvent(
    string name
  );

  event DestroyedPositionEvent(
    string name
  );

  event CreatedStateEvent(
    string name
  );

  event EditedStateEvent(
    string name
  );

  event DestroyedStateEvent(
    string name
  );

  mapping(uint => Election) elections;
  mapping(uint => Candidate) candidates;
  mapping(uint => City) cities;
  mapping(uint => PoliticalParty) politicalParties;
  mapping(uint => Position) positions;
  mapping(uint => State) states;


  constructor() public {
    owner = msg.sender;
    electionIndexLength = 0;
    cityIndexLength = 0;
    stateIndexLength = 0;
    positionIndexLength = 0;
    politicalPartyIndexLength = 0;
    candidateIndexLength = 0;
  }

  modifier onlyOwner {
    require(owner == msg.sender, "Only the owner can update that information");
    _;
  }

  // Election methods

  function addElection(
    string memory title,
    string[] memory electionCandidates
  ) public onlyOwner
  {

    string[] memory votes;

    elections[electionIndexLength] = Election(
      electionIndexLength,
      title,
      electionCandidates,
      votes,
      1,
      true
    );
    electionIndexLength++;

    emit CreatedElectionEvent(
      title,
      electionCandidates
    );

  }

  function getElectionCount()
    public
    view
    returns(uint count)
  {
    return electionIndexLength;
  }

  function getElection(uint id) 
    public
    view
    returns (
      string memory title,
      string[] memory electionCandidates,
      string[] memory electionVotes,
      uint endDate
    )
  {

    Election memory election;
    bool found = false;

    for (uint i = 0; i < getElectionCount(); i++) {
      if (elections[i].id == id) {
        election = elections[i];
        found = true;
        break;
      }
    }

    require(found, "Election not found");

    return(
      election.title,
      election.candidates,
      election.votes,
      election.endDate
    );
    
  }

  function getElectionAtIndex(uint index)
    public
    view
    returns(
      string memory title,
      string[] memory electionCandidates,
      string[] memory electionVotes,
      uint endDate
  )
  {
    Election memory election = elections[index];

    require(election.initialized, "Election not found");

    return (
      election.title,
      election.candidates,
      election.votes,
      election.endDate
    );
  }

  function updateElection(
    uint id,
    string memory newTitle,
    uint newEndDate
  ) public
    returns (bool)
  {

    bool found = false;

    for (uint i = 0; i < getElectionCount(); i++) {
      if (elections[i].id == id) {
        elections[i].title = newTitle;
        elections[i].endDate = newEndDate;
        found = true;
        break;
      }
    }
  
    require(found, "Election not found");

    emit EditedElectionEvent(
      newTitle,
      newEndDate
    );

    return true;
  }

  function destroyElection(
    uint id
  ) public
    returns (bool)
  {

    // verificar se a posição não está sendo utilizada antes de deletar

    for (uint i = 0; i < getElectionCount(); i++) {
      if (elections[i].id == id) {

        emit DestroyedElectionEvent(
          elections[i].title
        );

        elections[i] = elections[getElectionCount() - 1];
        elections[i].id = id;

        delete elections[getElectionCount() - 1];
        electionIndexLength--;

        return true;

      }
    }
    return false;
  } 

  // Candidate methods

  function addCandidate(
    string memory fullName,
    string memory birthDate,
    string memory politicalParty,
    string memory state,
    string memory city,
    string memory electoralNumber
  ) public onlyOwner
  {

    for (uint i = 0; i < getCandidateCount(); i++) {
      require(!compareStrings(candidates[i].electoralNumber, electoralNumber), "The electoral number must be unique");
    }

    // Validations
    getPoliticalPartyValidation(politicalParty);
    getStateValidation(state);
    getCityValidation(city);

    candidates[candidateIndexLength] = Candidate(
      fullName,
      birthDate,
      politicalParty,
      state,
      city,
      electoralNumber,
      true
    );
    candidateIndexLength++;

    emit CreatedCandidateEvent(
      fullName,
      birthDate,
      politicalParty,
      state,
      city,
      electoralNumber
    );

  }

  function getCandidate(string memory number) 
    public
    view
    returns (
      string memory fullName,
      string memory birthDate,
      string memory politicalParty,
      string memory state,
      string memory city,
      string memory electoralNumber
    )
  {

    Candidate memory candidate;
    bool found = false;

    for (uint i = 0; i < getCandidateCount(); i++) {
      if (compareStrings(candidates[i].electoralNumber, number)) {
        candidate = candidates[i];
        found = true;
        break;
      }
    }

    require(found, "Candidate not found");

    return(
      candidate.fullName,
      candidate.birthDate,
      candidate.politicalParty,
      candidate.state,
      candidate.city,
      candidate.electoralNumber
    );
    
  }

  function getCandidateCount()
    public
    view
    returns(uint count)
  {
    return candidateIndexLength;
  }

  function getCandidateAtIndex(uint index)
    public
    view
    returns(
      string memory fullName,
      string memory birthDate,
      string memory politicalParty,
      string memory state,
      string memory city,
      string memory electoralNumber
  )
  {
    Candidate memory candidate = candidates[index];

    require(candidate.initialized, "Candidate not found");

    return (
      candidate.fullName,
      candidate.birthDate,
      candidate.politicalParty,
      candidate.state,
      candidate.city,
      candidate.electoralNumber
    );
  }

  function updateCandidate(
    string memory oldElectoralNumber,
    string memory newFullName,
    string memory newBirthDate,
    string memory newPoliticalParty,
    string memory newState,
    string memory newCity,
    string memory newElectoralNumber
  ) public
    returns (bool)
  {

    bool found = false;

    for (uint i = 0; i < getCandidateCount(); i++) {
      if (compareStrings(candidates[i].electoralNumber, oldElectoralNumber)) {
        candidates[i].fullName = newFullName;
        candidates[i].birthDate = newBirthDate;
        candidates[i].politicalParty = newPoliticalParty;
        candidates[i].state = newState;
        candidates[i].city = newCity;
        candidates[i].electoralNumber = newElectoralNumber;
        found = true;
        break;
      }
    }
  
    require(found, "Candidate not found");

    emit EditedCandidateEvent(
      newFullName,
      newBirthDate,
      newPoliticalParty,
      newState,
      newCity,
      newElectoralNumber
    );

    return true;
  }

  function destroyCandidate(
    string memory electoralNumber
  ) public
    returns (bool)
  {

    // verificar se a posição não está sendo utilizada antes de deletar

    for (uint i = 0; i < getCandidateCount(); i++) {
      if (compareStrings(candidates[i].electoralNumber, electoralNumber)) {

        emit DestroyedCandidateEvent(
          candidates[i].fullName,
          candidates[i].electoralNumber
        );

        candidates[i] = candidates[getCandidateCount() - 1];

        delete candidates[getCandidateCount() - 1];
        candidateIndexLength--;

        return true;

      }
    }
    return false;
  } 

  // City methods

  function addCity(
    string memory cityName
  ) public onlyOwner {

    for (uint i = 0; i < getCityCount(); i++) {
      require(!compareStrings(cities[i].name, cityName), "The city name must be unique");
    }

    cities[cityIndexLength] = City(cityName, true);
    cityIndexLength++;

    emit CreatedCityEvent(cityName);
  }

  function getCity(string memory cityName) 
    public
    view
    returns (
      string memory name
    )
  {

    City memory city;
    bool found = false;

    for (uint i = 0; i < getCityCount(); i++) {
      if (compareStrings(cities[i].name, cityName)) {
        city = cities[i];
        found = true;
        break;
      }
    }

    require(found, "City not found");

    return(
      city.name
    );

  }

  function getCityCount()
    public
    view
    returns(uint count)
  {
    return cityIndexLength;
  }

  function getCityAtIndex(uint index)
    public
    view
    returns(string memory cityAddress)
  {

    City memory city = cities[index];

    require(city.initialized, "Political party not found");

    return (
      city.name
    );
  }

  function updateCity(
    string memory oldCity,
    string memory newCity
  ) public
    returns (bool)
  {

    bool found = false;

    for (uint i = 0; i < getCityCount(); i++) {
      if (compareStrings(cities[i].name, oldCity)) {
        cities[i].name = newCity;
        found = true;
        break;
      }
    }
  
    require(found, "City not found");
    emit EditedCityEvent(newCity);
    return true;
  }

  function destroyCity(
    string memory city
  ) public
    returns (bool)
  {

    // verificar se a posição não está sendo utilizada antes de deletar

    for (uint i = 0; i < getCityCount(); i++) {
      if (compareStrings(cities[i].name, city)) {

        cities[i] = cities[getCityCount() - 1];
        delete cities[getCityCount() - 1];
        cityIndexLength--;
        //emit event
        emit DestroyedCityEvent(city);
        return true;

      }
    }
    return false;
  }

  // Political Party methods

  function addPoliticalParty(
    string memory name
  ) public onlyOwner {

    for (uint i = 0; i < politicalPartyIndexLength; i++) {
      require(!compareStrings(politicalParties[i].name, name), "The political party must be unique");
    }

    politicalParties[politicalPartyIndexLength] = PoliticalParty(name, true);
    politicalPartyIndexLength++;

    emit CreatedPoliticalPartyEvent(name);
  }

  function getPoliticalParty(string memory politicalPartyName) 
    public
    view
    returns (
      string memory name
    )
  {

    PoliticalParty memory politicalParty;
    bool found = false;

    for (uint i = 0; i < getPoliticalPartyCount(); i++) {
      if (compareStrings(politicalParties[i].name, politicalPartyName)) {
        politicalParty = politicalParties[i];
        found = true;
        break;
      }
    }

    require(found, "Political party not found");

    return(
      politicalParty.name
    );
  }

  function getPoliticalPartyCount()
    public
    view
    returns(uint count)
  {
    return politicalPartyIndexLength;
  }

  function getPoliticalPartyAtIndex(uint index)
    public
    view
    returns(string memory name)
  {
    PoliticalParty memory politicalParty = politicalParties[index];

    require(politicalParty.initialized, "Political party not found");

    return (
      politicalParty.name
    );
  }

  function updatePoliticalParty(
    string memory oldPoliticalParty,
    string memory newPoliticalParty
  ) public
    returns (bool)
  {

    bool found = false;

    for (uint i = 0; i < getPoliticalPartyCount(); i++) {
      if (compareStrings(politicalParties[i].name, oldPoliticalParty)) {
        politicalParties[i].name = newPoliticalParty;
        found = true;
        break;
      }
    }
  
    require(found, "Political party not found");
    emit EditedPoliticalPartyEvent(newPoliticalParty);
    return true;
  }

  function destroyPoliticalParty(
    string memory politicalParty
  ) public
    returns (bool)
  {

    // verificar se a posição não está sendo utilizada antes de deletar

    for (uint i = 0; i < getPoliticalPartyCount(); i++) {
      if (compareStrings(politicalParties[i].name, politicalParty)) {

        politicalParties[i] = politicalParties[getPoliticalPartyCount() - 1];
        delete politicalParties[getPoliticalPartyCount() - 1];
        politicalPartyIndexLength--;
        //emit event
        emit DestroyedPoliticalPartyEvent(politicalParty);
        return true;

      }
    }
    return false;
  }

  // Position methods

  function addPosition(
    string memory position
  ) public onlyOwner {

    for (uint i = 0; i < positionIndexLength; i++) {
      require(!compareStrings(positions[i].name, position), "The position must be unique");
    }

    positions[positionIndexLength] = Position(position, true);
    positionIndexLength++;

    emit CreatedPositionEvent(position);
  }

  function updatePosition(
    string memory oldPosition,
    string memory newPosition
  ) public
    returns (bool)
  {

    bool found = false;

    for (uint i = 0; i < getPositionCount(); i++) {
      if (compareStrings(positions[i].name, oldPosition)) {
        positions[i].name = newPosition;
        found = true;
        break;
      }
    }
  
    require(found, "Position not found");
    emit EditedPositionEvent(newPosition);
    return true;
  }

  function destroyPosition(
    string memory position
  ) public
    returns (bool)
  {

    // verificar se a posição não está sendo utilizada antes de deletar

    for (uint i = 0; i < positionIndexLength; i++) {
      if (compareStrings(positions[i].name, position)) {

        positions[i] = positions[positionIndexLength - 1];
        delete positions[positionIndexLength - 1];
        positionIndexLength--;
        //emit event
        emit DestroyedPositionEvent(position);
        return true;

      }
    }
    return false;
  }

  function getPosition(string memory positionName) 
    public
    view
    returns (
      string memory name
    )
  {
    Position memory position;
    bool found = false;

    for (uint i = 0; i < getPositionCount(); i++) {
      if (compareStrings(positions[i].name, positionName)) {
        position = positions[i];
        found = true;
        break;
      }
    }

    require(found, "Position not found");

    return(
      position.name
    );
  }

  function getPositionCount()
    public
    view
    returns(uint count)
  {
    return positionIndexLength;
  }

  function getPositionAtIndex(uint index)
    public
    view
    returns(string memory name)
  {
    Position memory position = positions[index];

    require(position.initialized, "Position not found");

    return (
      position.name
    );
  }

  // State methods

  function addState(
    string memory stateName
  ) public onlyOwner {

    for (uint i = 0; i < stateIndexLength; i++) {
      require(!compareStrings(states[i].name, stateName), "The state name must be unique");
    }

    states[stateIndexLength] = State(stateName, true);
    stateIndexLength++;

    emit CreatedStateEvent(stateName);

  }

  function getState(string memory stateName) 
    public
    view
    returns (
      string memory name
    )
  {

    State memory state;
    bool found = false;

    for (uint i = 0; i < getStateCount(); i++) {
      if (compareStrings(states[i].name, stateName)) {
        state = states[i];
        found = true;
        break;
      }
    }

    require(found, "State not found");

    return(
      state.name
    );

  }

  function getStateCount()
    public
    view
    returns(uint count)
  {
    return stateIndexLength;
  }

  function getStateAtIndex(uint index)
    public
    view
    returns(string memory name)
  {

    State memory state = states[index];

    require(state.initialized, "State not found");

    return (
      state.name
    );

  }

  function updateState(
    string memory oldState,
    string memory newState
  ) public
    returns (bool)
  {

    bool found = false;

    for (uint i = 0; i < getStateCount(); i++) {
      if (compareStrings(states[i].name, oldState)) {
        states[i].name = newState;
        found = true;
        break;
      }
    }
  
    require(found, "State not found");
    emit EditedStateEvent(newState);
    return true;
  }

  function destroyState(
    string memory state
  ) public
    returns (bool)
  {

    // verificar se a posição não está sendo utilizada antes de deletar

    for (uint i = 0; i < getStateCount(); i++) {
      if (compareStrings(states[i].name, state)) {

        states[i] = states[getStateCount() - 1];
        delete states[getStateCount() - 1];
        stateIndexLength--;
        //emit event
        emit DestroyedStateEvent(state);
        return true;

      }
    }
    return false;
  }

  /***************************
  * Helper validation methods*
  /***************************/
  function getPoliticalPartyValidation(
  string memory name) private returns (bool) {
    getPoliticalParty(name);
    return true;
  }

  function getPositionValidation(string memory name) private returns (bool) {
    //getPosition(name);
    return true;
  }

  function getStateValidation(string memory name) private returns (bool) {
    if (keccak256(bytes(name)) == keccak256('')) { return true; }
    getState(name);
    return true;
  }

  function getCityValidation(string memory name) private returns (bool) {
    if (keccak256(bytes(name)) == keccak256('')) { return true; }
    getCity(name);
    return true;
  }

  // utils
  function compareStrings (string memory a, string memory b) internal view returns (bool){
      return keccak256(bytes(a)) == keccak256(bytes(b));
  }
}
