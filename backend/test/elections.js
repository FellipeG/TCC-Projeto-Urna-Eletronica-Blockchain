const Elections = artifacts.require("Elections");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Elections", accounts => {

  describe('Cidades', () => {
    const name = 'Rio de Janeiro';
    const newName = 'São Paulo';

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

    it('2. A cidade não deve ser cadastrada com o nome vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addCity('', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('City name field is required') !== -1);
      })
    });

    it('3. A cidade deve ser cadastrada', async() => {

      const instance = await Elections.deployed();
      await instance.addCity(name, { from: accounts[0] });

      const city = await instance.getCity(name);
      assert.equal(city, name);
    });

    it('4. A cidade não deve ser cadastrada por ser duplicada', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addCity(name, { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('The city name must be unique') !== -1);
      })
    });

    it('5. Deve ocorrer erro ao buscar por uma cidade não existente', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.getCity('Mato Grosso', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('City not found') !== -1);
      })
    });

    it('6. Deve retornar sucesso ao buscar por uma cidade existente', async () => {
      const instance = await Elections.deployed();
      const city = await instance.getCity(name);
      assert.equal(city, name);
    });

    it('7. A cidade não deve ser atualizada por um usuário não autorizado', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateCity(name, newName, { from: accounts[1] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Only the owner can update that information') !== -1);
      })
    });

    it('8. A cidade não deve ser atualizada com o nome vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateCity(name, '', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('City name field is required') !== -1);
      })
    });

    it('9. A cidade deve ser atualizada', async() => {

      const instance = await Elections.deployed();
      await instance.updateCity(name, newName, { from: accounts[0] });

      const city = await instance.getCity(newName);
      assert.equal(city, newName);
    });

    it('10. A cidade não deve ser atualizada por ter uma vinculação com candidato', async() => {

      const instance = await Elections.deployed();

      const candidateObj = {
        fullName: 'Nome Completo',
        birthDate: '1970-10-22',
        politicalParty: 'Partido X',
        state: 'RJ',
        city: 'São Paulo',
        electoralNumber: '15122'
      };

      await instance.addPoliticalParty(candidateObj.politicalParty, { from: accounts[0] });
      await instance.addState(candidateObj.state, { from: accounts[0] });

      await instance.addCandidate(
        candidateObj.fullName,
        candidateObj.birthDate,
        candidateObj.politicalParty,
        candidateObj.state,
        candidateObj.city,
        candidateObj.electoralNumber,
        { from: accounts[0] }
      );

      try {
        await instance.updateCity(newName, 'Nova cidade', { from: accounts[0] })
      } catch(e){
        await instance.destroyCandidate(candidateObj.electoralNumber, { from: accounts[0] });
        await instance.destroyPoliticalParty(candidateObj.politicalParty, { from: accounts[0] });
        await instance.destroyState(candidateObj.state, { from: accounts[0] });

        assert(e.message.indexOf("Can't update a vinculated city") !== -1);
      }
    });

    it('11. A cidade não deve ser deletada por um usuário não autorizado', () => {
      
      Elections
        .deployed()
        .then((instance) => {
          return instance.destroyCity(newName, { from: accounts[1] });
        })
        .then(assert.fail)
        .catch((e) => {
          assert(e.message.indexOf("Only the owner can update that information") !== -1);
        });
    });

    it('12. A cidade não deve ser deletada por ter uma vinculação com candidato', async() => {

      const candidateObj = {
        fullName: 'Nome Completo',
        birthDate: '1970-10-22',
        politicalParty: 'Partido W',
        state: 'MG',
        city: newName,
        electoralNumber: '15133'
      };

      const instance = await Elections.deployed();

      await instance.addPoliticalParty(candidateObj.politicalParty, { from: accounts[0] });
      await instance.addState(candidateObj.state, { from: accounts[0] });

      await instance.addCandidate(
        candidateObj.fullName,
        candidateObj.birthDate,
        candidateObj.politicalParty,
        candidateObj.state,
        candidateObj.city,
        candidateObj.electoralNumber,
        { from: accounts[0] }
      );

      try {

        await instance.destroyCity(newName, { from: accounts[0] });
          
      } catch(e) {

        await instance.destroyCandidate(candidateObj.electoralNumber, { from: accounts[0] });
        await instance.destroyPoliticalParty(candidateObj.politicalParty, { from: accounts[0] });
        await instance.destroyState(candidateObj.state, { from: accounts[0] });

        assert(e.message.indexOf("Can't delete a vinculated city") !== -1);
      }

    });

    it('13. A cidade deve ser deletada', async() => {

      const instance = await Elections.deployed();
      const response = await instance.destroyCity.call(newName, { from: accounts[0] });
      assert.equal(response, true);

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

    it('2. O estado não deve ser cadastrado com o nome vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addState('', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('State name field is required') !== -1);
      })
    });

    it('3. O estado deve ser cadastrado', async() => {

      const instance = await Elections.deployed();
      await instance.addState(name, { from: accounts[0] });

      const state = await instance.getState(name);
      assert.equal(state, name);
    });

    it('4. O estado não deve ser cadastrado por ser duplicado', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addState(name, { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('The state name must be unique') !== -1);
      })
    });

    it('5. Deve ocorrer erro ao buscar por um estado não existente', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.getState('MT', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('State not found') !== -1);
      })
    });

    it('6. Deve retornar sucesso ao buscar por um estado existente', async () => {
      const instance = await Elections.deployed();
      const state = await instance.getState(name);
      assert.equal(state, name);
    });

    it('7. A cidade não deve ser atualizada por um usuário não autorizado', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateCity(name, newName, { from: accounts[1] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Only the owner can update that information') !== -1);
      })
    });

    it('8. A cidade não deve ser atualizada com o nome vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateCity(name, '', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('City name field is required') !== -1);
      })
    });

    it('9. A cidade deve ser atualizada', async() => {

      const instance = await Elections.deployed();
      await instance.updateCity(name, newName, { from: accounts[0] });

      const city = await instance.getCity(newName);
      assert.equal(city, newName);
    });

    it('10. A cidade não deve ser atualizada por ter uma vinculação com candidato', async() => {

      const instance = await Elections.deployed();

      const candidateObj = {
        fullName: 'Nome Completo',
        birthDate: '1970-10-22',
        politicalParty: 'Partido X',
        state: 'RJ',
        city: 'São Paulo',
        electoralNumber: '15122'
      };

      await instance.addPoliticalParty(candidateObj.politicalParty, { from: accounts[0] });
      await instance.addState(candidateObj.state, { from: accounts[0] });

      await instance.addCandidate(
        candidateObj.fullName,
        candidateObj.birthDate,
        candidateObj.politicalParty,
        candidateObj.state,
        candidateObj.city,
        candidateObj.electoralNumber,
        { from: accounts[0] }
      );

      try {
        await instance.updateCity(newName, 'Nova cidade', { from: accounts[0] })
      } catch(e){
        await instance.destroyCandidate(candidateObj.electoralNumber, { from: accounts[0] });
        await instance.destroyPoliticalParty(candidateObj.politicalParty, { from: accounts[0] });
        await instance.destroyState(candidateObj.state, { from: accounts[0] });

        assert(e.message.indexOf("Can't update a vinculated city") !== -1);
      }
    });

    it('11. A cidade não deve ser deletada por um usuário não autorizado', () => {
      
      Elections
        .deployed()
        .then((instance) => {
          return instance.destroyCity(newName, { from: accounts[1] });
        })
        .then(assert.fail)
        .catch((e) => {
          assert(e.message.indexOf("Only the owner can update that information") !== -1);
        });
    });

    it('12. A cidade não deve ser deletada por ter uma vinculação com candidato', async() => {

      const candidateObj = {
        fullName: 'Nome Completo',
        birthDate: '1970-10-22',
        politicalParty: 'Partido W',
        state: 'MG',
        city: newName,
        electoralNumber: '15133'
      };

      const instance = await Elections.deployed();

      await instance.addPoliticalParty(candidateObj.politicalParty, { from: accounts[0] });
      await instance.addState(candidateObj.state, { from: accounts[0] });

      await instance.addCandidate(
        candidateObj.fullName,
        candidateObj.birthDate,
        candidateObj.politicalParty,
        candidateObj.state,
        candidateObj.city,
        candidateObj.electoralNumber,
        { from: accounts[0] }
      );

      try {

        await instance.destroyCity(newName, { from: accounts[0] });
          
      } catch(e) {

        await instance.destroyCandidate(candidateObj.electoralNumber, { from: accounts[0] });
        await instance.destroyPoliticalParty(candidateObj.politicalParty, { from: accounts[0] });
        await instance.destroyState(candidateObj.state, { from: accounts[0] });

        assert(e.message.indexOf("Can't delete a vinculated city") !== -1);
      }

    });

    it('13. A cidade deve ser deletada', async() => {

      const instance = await Elections.deployed();
      const response = await instance.destroyCity.call(newName, { from: accounts[0] });
      assert.equal(response, true);

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

    it('6. O candidato não deve ser cadastrado por ser duplicado', () => {
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

    it('7. Deve ocorrer erro ao buscar por um candidato não existente', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.getCandidate('000000', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Candidate not found') !== -1);
      })
    });

    it('8. Deve retornar sucesso ao buscar por um candidato', async () => {
      const instance = await Elections.deployed();
      const candidate = await instance.getCandidate(candidateObj.electoralNumber);
      assert.equal(candidate[5], candidateObj.electoralNumber);
    });

  });

});