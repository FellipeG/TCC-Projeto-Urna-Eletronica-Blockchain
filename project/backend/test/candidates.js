const Candidates = artifacts.require("Candidates");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Candidates", function (/* accounts */) {
  it("should assert true", async function () {
    await Candidates.deployed();
    return assert.isTrue(true);
  });
});
