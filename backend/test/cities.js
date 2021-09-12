const Cities = artifacts.require("Cities");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Cities", function (/* accounts */) {
  it("should assert true", async function () {
    await Cities.deployed();
    return assert.isTrue(true);
  });
});
