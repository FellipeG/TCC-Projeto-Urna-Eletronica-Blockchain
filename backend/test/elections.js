const Elections = artifacts.require("Elections");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Elections", accounts => {

  describe('Cidades', () => {
    const name = 'Rio de Janeiro';

    it('1. A cidade não deve ser cadastrada por um usuário não autorizado', () => {
        return Elections.deployed()
        .then((instance) => {
          return instance.addCity(name, { from: accounts[1] });
        })
        .then(assert.fail)
        .catch((e) => {
          assert(e.message.indexOf('Only the owner can update that information') !== -1);
        })
    });

    it('2. A cidade deve ser cadastrada', async() => {

      const instance = await Elections.deployed();
      await instance.addCity(name, { from: accounts[0] });

      const city = await instance.getCity(name);
      assert.equal(city, name);
    });

    it('3. A cidade não deve ser cadastrada por ser duplicada', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addCity(name, { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('The city name must be unique') !== -1);
      })
    });

    it('4. Deve ocorrer erro ao buscar por uma cidade não existente', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.getCity('Mato Grosso', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('City not found') !== -1);
      })
    });

    it('5. Deve retornar sucesso ao buscar por uma cidade existente', async () => {
      const instance = await Elections.deployed();
      const city = await instance.getCity(name);
      assert.equal(city, name);
    });

  })

});
