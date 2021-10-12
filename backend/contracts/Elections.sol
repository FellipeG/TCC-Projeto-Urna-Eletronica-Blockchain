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

  struct ElectoralTitleData {
    string electoralNumber;
    string fullName;
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

  //arrays
  string[] cityIndex;
  string[] stateIndex;

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

  event CreatedElectoralTitleDataEvent(
    string electoralNumber,
    string fullName
  );

  event CreatedPoliticalPartyEvent(
    string name
  );

  event CreatedPositionEvent(
    string name
  );

  event CreatedStateEvent(
    string name
  );

  mapping(string => Candidate) candidates;
  mapping(string => City) cities;
  mapping(string => ElectoralTitleData) electoralTitles;
  mapping(string => PoliticalParty) politicalParties;
  mapping(string => Position) positions;
  mapping(string => State) states;


  constructor() public {
    owner = msg.sender;
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

  // Electoral Title methods

  function addElectoralTitle(
    string memory electoralNumber,
    string memory fullName
  ) public onlyOwner {

    require(!electoralTitles[electoralNumber].initialized, "Electoral number must be unique");
    electoralTitles[electoralNumber] = ElectoralTitleData(electoralNumber, fullName, true);
    emit CreatedElectoralTitleDataEvent(electoralNumber, fullName);
  }

  function getElectoralTitle(string memory number) 
    public
    view
    returns (
      string memory electoralNumber,
      string memory fullName
    )
  {
    ElectoralTitleData memory electoralTitle = electoralTitles[number];
    require(electoralTitle.initialized, "Electoral title not found");

    return(
      electoralTitle.electoralNumber,
      electoralTitle.fullName
    );
  }

  // Political Party methods

  function addPoliticalParty(
    string memory name
  ) public onlyOwner {
  
    require(!politicalParties[name].initialized, "The political party must be unique");
    politicalParties[name] = PoliticalParty(name, true);
    emit CreatedPoliticalPartyEvent(name);
  }

  function getPoliticalParty(string memory politicalPartyName) 
    public
    view
    returns (
      string memory name
    )
  {
    PoliticalParty memory politicalParty = politicalParties[politicalPartyName];
    require(politicalParty.initialized, "Political party not found");

    return(
      politicalParty.name
    );
  }

  // Position methods

  function addPosition(
    string memory position
  ) public onlyOwner {

    require(!positions[position].initialized, "The position must be unique");
    positions[position] = Position(position, true);
    emit CreatedPositionEvent(position);
  }

  function getPosition(string memory positionName) 
    public
    view
    returns (
      string memory name
    )
  {
    Position memory position = positions[positionName];
    require(position.initialized, "Position not found");

    return(
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
    getPosition(name);
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
}
