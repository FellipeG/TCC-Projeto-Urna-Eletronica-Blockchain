// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ElectoralTitles {

  struct ElectoralTitleData {
    string electoralNumber;
    string fullName;
  }

  mapping(string => ElectoralTitleData) electoralTitles;

  modifier unique(string electoralNumber) {
    require(electoralTitles[electoralNumber].fullName == 0, "Electoral number must be unique");
    _;
  }

  constructor() public {
  }

  function add(string electoralNumber, string fullName) public unique(electoralNumber) {
    electoralTitles[electoralNumber] = ElectoralTitleData(electoralNumber, fullName);
  }

  function get(string electoralNumber) 
    public
    view
    return (
      string electoralNumber,
      string fullName
    )
  {
    ElectoralTitleData memory electoralTitle = electoralTitles[electoralNumber];
    require(electoralTitle.electoralNumber != 0, "Electoral title not found");
    return(electoralTitle.electoralNumber, electoralTitle.fullName);
  }
}
