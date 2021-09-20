const Elections = artifacts.require("Elections");

module.exports = function(_deployer) {
  _deployer.deploy(Elections)
};
