// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Elections {

  address owner;

  // structs
  struct Candidate {
    string fullName;
    string birthDate;
    string politicalParty;
    string position;
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
  uint cityIndexLength;
  uint stateIndexLength;
  uint positionIndexLength;
  uint politicalPartyIndexLength;
  uint candidateIndexLength;

  //arrays
  string[] cityIndex;
  string[] stateIndex;
  string[] candidateIndex;

  //events
  event CreatedCandidateEvent(
    string fullName,
    string birthDate,
    string politicalParty,
    string position,
    string state,
    string city,
    string electoralNumber
  );

  event CreatedCityEvent(
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

  mapping(string => Candidate) candidates;
  mapping(string => City) cities;
  mapping(uint => PoliticalParty) politicalParties;
  mapping(uint => Position) positions;
  mapping(string => State) states;


  constructor() public {
    owner = msg.sender;
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

  // Candidate methods

  function addCandidate(
    string memory fullName,
    string memory birthDate,
    string memory politicalParty,
    string memory position,
    string memory state,
    string memory city,
    string memory electoralNumber
  ) public onlyOwner
  {

    require(!candidates[electoralNumber].initialized, "The electoral number must be unique");

    // Validations
    getPoliticalPartyValidation(politicalParty);
    getPositionValidation(position);
    getStateValidation(state);
    getCityValidation(city);

    candidates[electoralNumber] = Candidate(
      fullName,
      birthDate,
      politicalParty,
      position,
      state,
      city,
      electoralNumber,
      true
    );

    candidateIndex.push(electoralNumber);

    emit CreatedCandidateEvent(
      fullName,
      birthDate,
      politicalParty,
      position,
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
      string memory position,
      string memory state,
      string memory city,
      string memory electoralNumber
    )
  {
    Candidate memory candidate = candidates[number];
    require(candidate.initialized, "Candidate not found");

    return(
      candidate.fullName,
      candidate.birthDate,
      candidate.politicalParty,
      candidate.position,
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
    return candidateIndex.length;
  }

  function getCandidateAtIndex(uint index)
    public
    view
    returns(string memory candidateAddress)
  {
    return candidateIndex[index];
  }

  // City methods

  function addCity(
    string memory cityName
  ) public onlyOwner {

    require(!cities[cityName].initialized, "The city name must be unique");
    cities[cityName] = City(cityName, true);
    cityIndex.push(cityName);
    emit CreatedCityEvent(cityName);
  }

  function getCity(string memory cityName) 
    public
    view
    returns (
      string memory name
    )
  {
    City memory city = cities[cityName];
    require(city.initialized, "City not found");

    return(
      city.name
    );

  }

  function getCityCount()
    public
    view
    returns(uint count)
  {
    return cityIndex.length;
  }

  function getCityAtIndex(uint index)
    public
    view
    returns(string memory cityAddress)
  {
    return cityIndex[index];
  }

  // Political Party methods

  function addPoliticalParty(
    string memory name
  ) public onlyOwner {

    for (uint i = 0; i < politicalPartyIndexLength; i++) {
      require(!compareStrings(politicalParties[i].name, name), "The political party must be unique");
    }

    politicalParties[positionIndexLength] = PoliticalParty(name, true);
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
    returns(string memory politicalPartyAddress)
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

    require(!states[stateName].initialized, "The state name must be unique");
    states[stateName] = State(stateName, true);
    stateIndex.push(stateName);
    emit CreatedStateEvent(stateName);
  }

  function getState(string memory stateName) 
    public
    view
    returns (
      string memory name
    )
  {
    State memory state = states[stateName];
    require(state.initialized, "State not found");

    return(
      state.name
    );
  }

  function getStateCount()
    public
    view
    returns(uint count)
  {
    return stateIndex.length;
  }

  function getStateAtIndex(uint index)
    public
    view
    returns(string memory stateAddress)
  {
    return stateIndex[index];
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
