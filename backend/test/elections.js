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

  });

  describe('Estados', () => {
    const name = 'RJ';

    it('1. O estado não deve ser cadastrado por um usuário não autorizado', () => {
        return Elections.deployed()
        .then((instance) => {
          return instance.addState(name, { from: accounts[1] });
        })
        .then(assert.fail)
        .catch((e) => {
          assert(e.message.indexOf('Only the owner can update that information') !== -1);
        })
    });

    it('2. O estado deve ser cadastrado', async() => {

      const instance = await Elections.deployed();
      await instance.addState(name, { from: accounts[0] });

      const state = await instance.getState(name);
      assert.equal(state, name);
    });

    it('3. O estado não deve ser cadastrado por ser duplicado', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addState(name, { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('The state name must be unique') !== -1);
      })
    });

    it('4. Deve ocorrer erro ao buscar por um estado não existente', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.getState('MT', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('State not found') !== -1);
      })
    });

    it('5. Deve retornar sucesso ao buscar por um estado existente', async () => {
      const instance = await Elections.deployed();
      const state = await instance.getState(name);
      assert.equal(state, name);
    });

  });

  describe('Cargos', () => {
    const name = 'Governador';

    it('1. O cargo não deve ser cadastrado por um usuário não autorizado', () => {
        return Elections.deployed()
        .then((instance) => {
          return instance.addPosition(name, { from: accounts[1] });
        })
        .then(assert.fail)
        .catch((e) => {
          assert(e.message.indexOf('Only the owner can update that information') !== -1);
        })
    });

    it('2. O cargo deve ser cadastrado', async() => {

      const instance = await Elections.deployed();
      await instance.addPosition(name, { from: accounts[0] });

      const position = await instance.getPosition(name);
      assert.equal(position, name);
    });

    it('3. O cargo não deve ser cadastrado por ser duplicado', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addPosition(name, { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('The position must be unique') !== -1);
      })
    });

    it('4. Deve ocorrer erro ao buscar por um cargo não existente', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.getPosition('Vereador', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Position not found') !== -1);
      })
    });

    it('5. Deve retornar sucesso ao buscar por um cargo existente', async () => {
      const instance = await Elections.deployed();
      const position = await instance.getPosition(name);
      assert.equal(position, name);
    });

  });

  describe('Partidos Políticos', () => {
    const name = 'Partido X';

    it('1. O partido político não deve ser cadastrado por um usuário não autorizado', () => {
        return Elections.deployed()
        .then((instance) => {
          return instance.addPoliticalParty(name, { from: accounts[1] });
        })
        .then(assert.fail)
        .catch((e) => {
          assert(e.message.indexOf('Only the owner can update that information') !== -1);
        })
    });

    it('2. O partido político deve ser cadastrado', async() => {

      const instance = await Elections.deployed();
      await instance.addPoliticalParty(name, { from: accounts[0] });

      const politicalParty = await instance.getPoliticalParty(name);
      assert.equal(politicalParty, name);
    });

    it('3. O partido político não deve ser cadastrado por ser duplicado', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addPoliticalParty(name, { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('The political party must be unique') !== -1);
      })
    });

    it('4. Deve ocorrer erro ao buscar por um partido político não existente', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.getPoliticalParty('Partido Y', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Political party not found') !== -1);
      })
    });

    it('5. Deve retornar sucesso ao buscar por um partido político existente', async () => {
      const instance = await Elections.deployed();
      const policicalParty = await instance.getPoliticalParty(name);
      assert.equal(policicalParty, name);
    });

  });

  describe('Candidatos', () => {
    const candidateObj = {
      fullName: 'Nome Completo',
      birthDate: '1970-10-22',
      politicalParty: 'Partido X',
      state: 'RJ',
      city: 'Rio de Janeiro',
      electoralNumber: '44'
    };

    it('1. O candidato não deve ser cadastrado por um usuário não autorizado', () => {
        return Elections.deployed()
        .then((instance) => {
          return instance.addCandidate(
            candidateObj.fullName,
            candidateObj.birthDate,
            candidateObj.politicalParty,
            candidateObj.state,
            candidateObj.city,
            candidateObj.electoralNumber,
            { from: accounts[1] }
          );
        })
        .then(assert.fail)
        .catch((e) => {
          assert(e.message.indexOf('Only the owner can update that information') !== -1);
        })
    });

    it('2. O candidato não deve ser cadastrado por ter um partido político inválido', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addCandidate(
          candidateObj.fullName,
          candidateObj.birthDate,
          'Partido Y',
          candidateObj.state,
          candidateObj.city,
          candidateObj.electoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Political party not found') !== -1);
      })
    });

    it('3. O candidato não deve ser cadastrado por ter um estado inválido', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addCandidate(
          candidateObj.fullName,
          candidateObj.birthDate,
          candidateObj.politicalParty,
          'MT',
          candidateObj.city,
          candidateObj.electoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('State not found') !== -1);
      })
    });

    it('4. O candidato não deve ser cadastrado por ter uma cidade inválida', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addCandidate(
          candidateObj.fullName,
          candidateObj.birthDate,
          candidateObj.politicalParty,
          candidateObj.state,
          'Mato Grosso',
          candidateObj.electoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('City not found') !== -1);
      })
    });

    it('5. O candidato deve ser cadastrado', async() => {

      const instance = await Elections.deployed();
      await instance.addCandidate(
        candidateObj.fullName,
        candidateObj.birthDate,
        candidateObj.politicalParty,
        candidateObj.state,
        candidateObj.city,
        candidateObj.electoralNumber,
        { from: accounts[0] }
      );

      const candidate = await instance.getCandidate(candidateObj.electoralNumber);
      assert.equal(candidate[5], candidateObj.electoralNumber);
    });

    it('6. O candidato deve ser cadastrado com estado em branco', async() => {

      const electoralNumber = '00001';

      const instance = await Elections.deployed();
      await instance.addCandidate(
        candidateObj.fullName,
        candidateObj.birthDate,
        candidateObj.politicalParty,
        '',
        candidateObj.city,
        electoralNumber,
        { from: accounts[0] }
      );

      const candidate = await instance.getCandidate(electoralNumber);
      assert.equal(candidate[5], electoralNumber);
    });

    it('7. O candidato deve ser cadastrado com cidade em branco', async() => {

      const electoralNumber = '00002';

      const instance = await Elections.deployed();
      await instance.addCandidate(
        candidateObj.fullName,
        candidateObj.birthDate,
        candidateObj.politicalParty,
        candidateObj.state,
        '',
        electoralNumber,
        { from: accounts[0] }
      );

      const candidate = await instance.getCandidate(electoralNumber);
      assert.equal(candidate[5], electoralNumber);
    });

    it('8. O candidato deve ser cadastrado com cidade e estado em branco', async() => {

      const electoralNumber = '00003';

      const instance = await Elections.deployed();
      await instance.addCandidate(
        candidateObj.fullName,
        candidateObj.birthDate,
        candidateObj.politicalParty,
        '',
        '',
        electoralNumber,
        { from: accounts[0] }
      );

      const candidate = await instance.getCandidate(electoralNumber);
      assert.equal(candidate[5], electoralNumber);
    });

    it('9. O candidato não deve ser cadastrado por ser duplicado', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addCandidate(
          candidateObj.fullName,
          candidateObj.birthDate,
          candidateObj.politicalParty,
          candidateObj.state,
          candidateObj.city,
          candidateObj.electoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('The electoral number must be unique') !== -1);
      })
    });

    it('10. Deve ocorrer erro ao buscar por um candidato não existente', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.getCandidate('000000', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Candidate not found') !== -1);
      })
    });

    it('11. Deve retornar sucesso ao buscar por um candidato', async () => {
      const instance = await Elections.deployed();
      const candidate = await instance.getCandidate(candidateObj.electoralNumber);
      assert.equal(candidate[5], candidateObj.electoralNumber);
    });

  });

});