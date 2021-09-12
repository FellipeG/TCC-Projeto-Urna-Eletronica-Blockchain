// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Cities {

  struct City {
    string name;
  }

  mapping(string => City) cities;

  constructor() public {
  }

  modifier unique(string cityName) {
    require(cities[cityName] == 0, "The city name must be unique");
    _;
  }

  function add(
    string cityName
  ) public unique(cityName) {
    cities[cityName] = City(cityName);
  }

  function get(string name) 
    public
    view
    return (
      string name
    )
  {
    City memory city = cities[name];
    require(city.name != 0, "City not found");
    return(city.name);
  }
}
