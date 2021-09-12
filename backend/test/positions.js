const Positions = artifacts.require("Positions");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Positions", function (/* accounts */) {
  it("should assert true", async function () {
    await Positions.deployed();
    return assert.isTrue(true);
  });
});
