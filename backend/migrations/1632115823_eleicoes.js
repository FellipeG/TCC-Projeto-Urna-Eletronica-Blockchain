const Elections = artifacts.require("Elections");

module.exports = function(_deployer) {
  deployer.deploy(Elections)
};
