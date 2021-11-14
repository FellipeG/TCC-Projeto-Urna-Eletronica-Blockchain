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
    const newName = 'SP';

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

    it('7. O estado não deve ser atualizado por um usuário não autorizado', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateState(name, newName, { from: accounts[1] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Only the owner can update that information') !== -1);
      })
    });

    it('8. O estado não deve ser atualizado com o nome vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateState(name, '', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('State name field is required') !== -1);
      })
    });

    it('9. O estado deve ser atualizado', async() => {

      const instance = await Elections.deployed();
      await instance.updateState(name, newName, { from: accounts[0] });

      const city = await instance.getState(newName);
      assert.equal(city, newName);
    });

    it('10. O estado não deve ser atualizado por ter uma vinculação com candidato', async() => {

      const instance = await Elections.deployed();

      const candidateObj = {
        fullName: 'Nome Completo',
        birthDate: '1970-10-22',
        politicalParty: 'Partido X',
        state: newName,
        city: 'Santa Catarina',
        electoralNumber: '15122'
      };

      await instance.addPoliticalParty(candidateObj.politicalParty, { from: accounts[0] });
      await instance.addCity(candidateObj.city, { from: accounts[0] });

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
        await instance.updateState(newName, 'Novo Estado', { from: accounts[0] })
      } catch(e){
        await instance.destroyCandidate(candidateObj.electoralNumber, { from: accounts[0] });
        await instance.destroyPoliticalParty(candidateObj.politicalParty, { from: accounts[0] });
        await instance.destroyCity(candidateObj.city, { from: accounts[0] });

        assert(e.message.indexOf("Can't update a vinculated state") !== -1);
      }
    });

    it('11. O estado não deve ser deletado por um usuário não autorizado', () => {
      
      Elections
        .deployed()
        .then((instance) => {
          return instance.destroyState(newName, { from: accounts[1] });
        })
        .then(assert.fail)
        .catch((e) => {
          assert(e.message.indexOf("Only the owner can update that information") !== -1);
        });
    });

    it('12. O estado não deve ser deletado por ter uma vinculação com candidato', async() => {

      const candidateObj = {
        fullName: 'Nome Completo',
        birthDate: '1970-10-22',
        politicalParty: 'Partido W',
        state: newName,
        city: 'Santa Catarina',
        electoralNumber: '15133'
      };

      const instance = await Elections.deployed();

      await instance.addPoliticalParty(candidateObj.politicalParty, { from: accounts[0] });
      await instance.addCity(candidateObj.city, { from: accounts[0] });

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

        await instance.destroyState(newName, { from: accounts[0] });
          
      } catch(e) {

        await instance.destroyCandidate(candidateObj.electoralNumber, { from: accounts[0] });
        await instance.destroyPoliticalParty(candidateObj.politicalParty, { from: accounts[0] });
        await instance.destroyCity(candidateObj.city, { from: accounts[0] });

        assert(e.message.indexOf("Can't delete a vinculated state") !== -1);
      }

    });

    it('13. O estado deve ser deletado', async() => {

      const instance = await Elections.deployed();
      const response = await instance.destroyState.call(newName, { from: accounts[0] });
      assert.equal(response, true);

    });

  });

  describe('Partidos Políticos', () => {
    const name = 'Partido A';
    const newName = 'Partido B';

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

    it('2. O partido político não deve ser cadastrado com o nome vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addPoliticalParty('', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Political party name field is required') !== -1);
      })
    });

    it('3. O partido político deve ser cadastrado', async() => {

      const instance = await Elections.deployed();
      await instance.addPoliticalParty(name, { from: accounts[0] });

      const politicalParty = await instance.getPoliticalParty(name);
      assert.equal(politicalParty, name);
    });

    it('4. O partido político não deve ser cadastrado por ser duplicado', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addPoliticalParty(name, { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('The political party must be unique') !== -1);
      })
    });

    it('5. Deve ocorrer erro ao buscar por um partido político não existente', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.getPoliticalParty('Partido Y', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Political party not found') !== -1);
      })
    });

    it('6. Deve retornar sucesso ao buscar por um partido político existente', async () => {
      const instance = await Elections.deployed();
      const policicalParty = await instance.getPoliticalParty(name);
      assert.equal(policicalParty, name);
    });

    it('7. O partido político não deve ser atualizado por um usuário não autorizado', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updatePoliticalParty(name, newName, { from: accounts[1] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Only the owner can update that information') !== -1);
      })
    });

    it('8. O partido político não deve ser atualizado com o nome vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updatePoliticalParty(name, '', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Political party name field is required') !== -1);
      })
    });

    it('9. O partido político deve ser atualizado', async() => {

      const instance = await Elections.deployed();
      await instance.updatePoliticalParty(name, newName, { from: accounts[0] });

      const city = await instance.getPoliticalParty(newName);
      assert.equal(city, newName);
    });

    it('10. O partido político não deve ser atualizado por ter uma vinculação com candidato', async() => {

      const instance = await Elections.deployed();

      const candidateObj = {
        fullName: 'Nome Completo',
        birthDate: '1970-10-22',
        politicalParty: newName,
        state: 'PR',
        city: 'Paraná',
        electoralNumber: '15000'
      };

      await instance.addState(candidateObj.state, { from: accounts[0] });
      await instance.addCity(candidateObj.city, { from: accounts[0] });

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
        await instance.updatePoliticalParty(newName, 'Novo Partido Político', { from: accounts[0] })
      } catch(e){
        await instance.destroyCandidate(candidateObj.electoralNumber, { from: accounts[0] });
        await instance.destroyState(candidateObj.state, { from: accounts[0] });
        await instance.destroyCity(candidateObj.city, { from: accounts[0] });

        assert(e.message.indexOf("Can't update a vinculated political party") !== -1);
      }
    });

    it('11. O partido político não deve ser deletado por um usuário não autorizado', () => {
      
      Elections
        .deployed()
        .then((instance) => {
          return instance.destroyPoliticalParty(newName, { from: accounts[1] });
        })
        .then(assert.fail)
        .catch((e) => {
          assert(e.message.indexOf("Only the owner can update that information") !== -1);
        });
    });

    it('12. O partido político não deve ser deletado por ter uma vinculação com candidato', async() => {

      const candidateObj = {
        fullName: 'Nome Completo',
        birthDate: '1970-10-22',
        politicalParty: newName,
        state: 'PR',
        city: 'Paraná',
        electoralNumber: '15000'
      };

      const instance = await Elections.deployed();

      await instance.addState(candidateObj.state, { from: accounts[0] });
      await instance.addCity(candidateObj.city, { from: accounts[0] });

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

        await instance.destroyPoliticalParty(newName, { from: accounts[0] });
          
      } catch(e) {

        await instance.destroyCandidate(candidateObj.electoralNumber, { from: accounts[0] });
        await instance.destroyState(candidateObj.state, { from: accounts[0] });
        await instance.destroyCity(candidateObj.city, { from: accounts[0] });

        assert(e.message.indexOf("Can't delete a vinculated political party") !== -1);
      }

    });

    it('13. O partido político deve ser deletado', async() => {

      const instance = await Elections.deployed();
      const response = await instance.destroyPoliticalParty.call(newName, { from: accounts[0] });
      assert.equal(response, true);

    });

  });

  describe('Candidatos', () => {
    const candidateObj = {
      fullName: 'Nome Completo',
      birthDate: '1970-10-22',
      politicalParty: 'Partido X',
      state: 'RJ',
      city: 'Rio de Janeiro',
      electoralNumber: '44',
      newElectoralNumber: '55'
    };


    it('1. O candidato não deve ser cadastrado por um usuário não autorizado', async() => {

      const instance = await Elections.deployed();

      await instance.addPoliticalParty(candidateObj.politicalParty);
      await instance.addState(candidateObj.state);
      await instance.addCity(candidateObj.city);

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
          'Estado Inválido',
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
          'Cidade Inválida',
          candidateObj.electoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('City not found') !== -1);
      })
    });

    it('5. O candidato não deve ser cadastrado com o nome vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addCandidate(
          '',
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
        assert(e.message.indexOf('Full name field is required') !== -1);
      })
    });

    it('6. O candidato não deve ser cadastrado com a data de nascimento vazia', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addCandidate(
          candidateObj.fullName,
          '',
          candidateObj.politicalParty,
          candidateObj.state,
          candidateObj.city,
          candidateObj.electoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Birthdate field is required') !== -1);
      })
    });

    it('7. O candidato não deve ser cadastrado com o partido político vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addCandidate(
          candidateObj.fullName,
          candidateObj.birthDate,
          '',
          candidateObj.state,
          candidateObj.city,
          candidateObj.electoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Political party field is required') !== -1);
      })
    });

    it('8. O candidato não deve ser cadastrado com o estado vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addCandidate(
          candidateObj.fullName,
          candidateObj.birthDate,
          candidateObj.politicalParty,
          '',
          candidateObj.city,
          candidateObj.electoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('State field is required') !== -1);
      })
    });

    it('9. O candidato não deve ser cadastrado com a cidade vazia', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addCandidate(
          candidateObj.fullName,
          candidateObj.birthDate,
          candidateObj.politicalParty,
          candidateObj.state,
          '',
          candidateObj.electoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('City field is required') !== -1);
      })
    });

    it('10. O candidato não deve ser cadastrado com o número de eleitor vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.addCandidate(
          candidateObj.fullName,
          candidateObj.birthDate,
          candidateObj.politicalParty,
          candidateObj.state,
          candidateObj.city,
          '',
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Electoral number field is required') !== -1);
      })
    });

    it('11. O candidato deve ser cadastrado', async() => {

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

    it('12. O candidato não deve ser cadastrado por ser duplicado', () => {
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

    it('13. Deve ocorrer erro ao buscar por um candidato não existente', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.getCandidate('000000', { from: accounts[0] });
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Candidate not found') !== -1);
      })
    });

    it('14. Deve retornar sucesso ao buscar por um candidato', async () => {
      const instance = await Elections.deployed();
      const candidate = await instance.getCandidate(candidateObj.electoralNumber);
      assert.equal(candidate[5], candidateObj.electoralNumber);
    });

    it('15. O candidato não deve ser atualizado por um usuário não autorizado', () => {

      return Elections.deployed()
        .then((instance) => {
          return instance.updateCandidate(
            candidateObj.electoralNumber,
            candidateObj.fullName,
            candidateObj.birthDate,
            candidateObj.politicalParty,
            candidateObj.state,
            candidateObj.city,
            candidateObj.newElectoralNumber,
            { from: accounts[1] }
          );
        })
        .then(assert.fail)
        .catch((e) => {
          assert(e.message.indexOf('Only the owner can update that information') !== -1);
        })
    });

    it('16. O candidato não deve ser atualizado por ter um partido político inválido', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateCandidate(
          candidateObj.electoralNumber,
          candidateObj.fullName,
          candidateObj.birthDate,
          'Partido Y',
          candidateObj.state,
          candidateObj.city,
          candidateObj.newElectoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Political party not found') !== -1);
      })
    });

    it('17. O candidato não deve ser atualizado por ter um estado inválido', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateCandidate(
          candidateObj.electoralNumber,
          candidateObj.fullName,
          candidateObj.birthDate,
          candidateObj.politicalParty,
          'Estado Inválido',
          candidateObj.city,
          candidateObj.newElectoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('State not found') !== -1);
      })
    });

    it('18. O candidato não deve ser atualizado por ter uma cidade inválida', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateCandidate(
          candidateObj.electoralNumber,
          candidateObj.fullName,
          candidateObj.birthDate,
          candidateObj.politicalParty,
          candidateObj.state,
          'Cidade Inválida',
          candidateObj.newElectoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('City not found') !== -1);
      })
    });

    it('19. O candidato não deve ser atualizado com o nome vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateCandidate(
          candidateObj.electoralNumber,
          '',
          candidateObj.birthDate,
          candidateObj.politicalParty,
          candidateObj.state,
          candidateObj.city,
          candidateObj.newElectoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Full name field is required') !== -1);
      })
    });

    it('20. O candidato não deve ser atualizado com a data de nascimento vazia', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateCandidate(
          candidateObj.electoralNumber,
          candidateObj.fullName,
          '',
          candidateObj.politicalParty,
          candidateObj.state,
          candidateObj.city,
          candidateObj.newElectoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Birthdate field is required') !== -1);
      })
    });

    it('21. O candidato não deve ser atualizado com o partido político vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateCandidate(
          candidateObj.electoralNumber,
          candidateObj.fullName,
          candidateObj.birthDate,
          '',
          candidateObj.state,
          candidateObj.city,
          candidateObj.newElectoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Political party field is required') !== -1);
      })
    });

    it('22. O candidato não deve ser atualizado com o estado vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateCandidate(
          candidateObj.electoralNumber,
          candidateObj.fullName,
          candidateObj.birthDate,
          candidateObj.politicalParty,
          '',
          candidateObj.city,
          candidateObj.newElectoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('State field is required') !== -1);
      })
    });

    it('23. O candidato não deve ser atualizado com a cidade vazia', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateCandidate(
          candidateObj.electoralNumber,
          candidateObj.fullName,
          candidateObj.birthDate,
          candidateObj.politicalParty,
          candidateObj.state,
          '',
          candidateObj.newElectoralNumber,
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('City field is required') !== -1);
      })
    });

    it('24. O candidato não deve ser atualizado com o número de eleitor vazio', () => {
      return Elections.deployed()
      .then((instance) => {
        return instance.updateCandidate(
          candidateObj.electoralNumber,
          candidateObj.fullName,
          candidateObj.birthDate,
          candidateObj.politicalParty,
          candidateObj.state,
          candidateObj.city,
          '',
          { from: accounts[0] }
        );
      })
      .then(assert.fail)
      .catch((e) => {
        assert(e.message.indexOf('Electoral number field is required') !== -1);
      })
    });

    it('25. O candidato deve ser atualizado', async() => {

      const instance = await Elections.deployed();

      await instance.updateCandidate(
        candidateObj.electoralNumber,
        candidateObj.fullName,
        candidateObj.birthDate,
        candidateObj.politicalParty,
        candidateObj.state,
        candidateObj.city,
        candidateObj.newElectoralNumber,
        { from: accounts[0] }
      );

      const candidate = await instance.getCandidate(candidateObj.newElectoralNumber);
      assert.equal(candidate[5], candidateObj.newElectoralNumber);
    });

    it('26. O candidato não deve ser atualizado por estar vinculado a uma votação', async() => {

      const instance = await Elections.deployed();

      await instance.addVotation('Prefeito - Votação', [candidateObj.newElectoralNumber]);

      try {
        await instance.updateCandidate(
          candidateObj.newElectoralNumber,
          candidateObj.fullName,
          candidateObj.birthDate,
          candidateObj.politicalParty,
          candidateObj.state,
          candidateObj.city,
          candidateObj.newElectoralNumber,
          { from: accounts[0] }
        );
      } catch(e) {
        assert(e.message.indexOf("Can't update a vinculated candidate") !== -1)
      }
    });

    it('27. O candidato não deve ser deletado por estar vinculado a uma votação', async() => {

      const instance = await Elections.deployed();

      try {
        await instance.destroyCandidate(candidateObj.newElectoralNumber, { from: accounts[0] });
      } catch(e) {
        assert(e.message.indexOf("Can't delete a vinculated candidate") !== -1)
      }
    });

    it('28. O candidato deve ser deletado', async() => {

      const instance = await Elections.deployed();

      try {
        await instance.destroyVotation('0');
        const response = await instance.destroyCandidate.call(candidateObj.newElectoralNumber, { from: accounts[0] });
        assert.equal(response, true);
      } catch(e) {
        assert(false);
      }
    });

  });

  describe('Votações', () => {
    const votation = {
      title: 'Prefeito',
      candidates: [accounts[0]]
    };


    it('1. A votação não deve ser cadastrada por um usuário não autorizado', async() => {

      try {

        const instance = await Elections.deployed();
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[1] });
      } catch(e) {
          assert(e.message.indexOf('Only the owner can update that information') !== -1);
      }

    });

    it('2. A votação não deve ser cadastrada por estar com o campo título vazio', async() => {
      
      try {

        const instance = await Elections.deployed();
        await instance.addVotation('', votation.candidates, { from: accounts[0] });
      } catch(e) {
          assert(e.message.indexOf('Title field is required') !== -1);
      }

    });

    it('3. A votação não deve ser cadastrada por estar com o campo candidatos vazio', async() => {
      
      try {

        const instance = await Elections.deployed();
        await instance.addVotation(votation.title, [], { from: accounts[0] });
      } catch(e) {
          assert(e.message.indexOf('Candidate field is required') !== -1);
      }

    });

    it('4. A votação deve ser cadastrada', async() => {
    
      const instance = await Elections.deployed();
      const response = await instance.addVotation.call(votation.title, votation.candidates, { from: accounts[0] });

      assert.equal(response, true);

    });

    it('5. A votação não deve ser atualizada por um usuário não autorizado', async() => {

      try {

        const instance = await Elections.deployed();
        await instance.updateVotation('0', votation.title, votation.candidates, { from: accounts[1] });
      } catch(e) {
          assert(e.message.indexOf('Only the owner can update that information') !== -1);
      }

    });

    it('6 A votação não deve ser atualizada por estar com o campo título vazio', async() => {
      
      try {

        const instance = await Elections.deployed();
        await instance.updateVotation('0', '', votation.candidates, { from: accounts[0] });
      } catch(e) {
          assert(e.message.indexOf('Title field is required') !== -1);
      }

    });

    it('7. A votação não deve ser atualizada por estar com o campo candidatos vazio', async() => {
      
      try {

        const instance = await Elections.deployed();
        await instance.updateVotation('0', votation.title, [], { from: accounts[0] });
      } catch(e) {
          assert(e.message.indexOf('Candidate field is required') !== -1);
      }

    });

    it('8. A votação não deve ser atualizada por conter votos', async() => {
      try {
        
        const instance = await Elections.deployed();
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[0] });
        await instance.setVotationAccounts('0', [accounts[1]], { from: accounts[0] });

      } catch(e) {
        assert(e.message.indexOf("Can't update a started votation") !== -1);
      }
    });

    it('9. A votação deve ser atualizada', async() => {
      try {

        const instance = await Elections.deployed();
        const response = await instance.updateVotation.call('0', votation.title, votation.candidates, { from: accounts[0] });

      assert.equal(response, true);
      } catch(e) {
        assert(false);
      }

    });

    it('10. A votação não deve ser deletada por um usuário não autorizado', async() => {

      try {

        const instance = await Elections.deployed();
        await instance.destroyVotation('0', { from: accounts[1] });
      } catch(e) {
          assert(e.message.indexOf('Only the owner can update that information') !== -1);
      }

    });

    it('11. A votação não deve ser deletada por conter votos', async() => {
      try {
        
        const instance = await Elections.deployed();
        await instance.destroyVotation('0', { from: accounts[0] });

      } catch(e) {
        assert(e.message.indexOf("Can't delete a started votation") !== -1);
      }
    });

    it('12. A votação deve ser deletada', async() => {
      try {

        const instance = await Elections.deployed();

        await instance.destroyVotation('0', { from: accounts[0] });
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[0] });

        const response = await instance.destroyVotation.call('0', { from: accounts[0] });

        assert.equal(response, true);
      } catch(e) {
        assert(false);
      }

    });

    it('13. A votação não deve incluir contas para votação por um usuário não autorizado', async() => {
      try {

        const instance = await Elections.deployed();

        await instance.destroyVotation('0', { from: accounts[0] });
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[0] });
        await instance.setVotationAccounts('0', [], { from: accounts[1] })
        
      } catch(e) {
        assert(e.message.indexOf('Only the owner can update that information') !== -1);
      }

    });

    it('14. A votação não deve permitir que o "campo contas para votação" seja vazio', async() => {
      try {

        const instance = await Elections.deployed();

        await instance.destroyVotation('0', { from: accounts[0] });
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[0] });
        await instance.setVotationAccounts('0', [], { from: accounts[0] })
        
      } catch(e) {
        assert(e.message.indexOf('Accounts are required') !== -1);
      }

    });

    it('15. A votação não deve incluir contas para votação em uma votação inativa', async() => {
      try {

        const instance = await Elections.deployed();

        await instance.destroyVotation('0', { from: accounts[0] });
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[0] });
        await instance.inactivateVotation('0');
        await instance.setVotationAccounts('0', [accounts[1]], { from: accounts[0] })
        
      } catch(e) {
        assert(e.message.indexOf("Can't set votation accounts to an inactive votation") !== -1);
      }

    });

    it('16. A votação não deve incluir contas para votação', async() => {
      try {

        const instance = await Elections.deployed();

        await instance.destroyVotation('0', { from: accounts[0] });
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[0] });
        await instance.setVotationAccounts('0', [accounts[1]], { from: accounts[0] })
        
      } catch(e) {
        assert(e.message.indexOf("Can't set votation accounts to an inactive votation") !== -1);
      }

    });

    it('17. A votação não deve ser inativada por um usuário não autorizado', async() => {
      try {

        const instance = await Elections.deployed();

        await instance.destroyVotation('0', { from: accounts[0] });
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[0] });
        await instance.inactivateVotation('0', { from: accounts[1] });
        
      } catch(e) {
        assert(e.message.indexOf("Only the owner can update that information") !== -1);
      }

    });

    it('18. A votação deve ser inativada', async() => {
      try {

        const instance = await Elections.deployed();

        await instance.destroyVotation('0', { from: accounts[0] });
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[0] });
        const response = await instance.inactivateVotation.call('0', { from: accounts[0] });

        assert.equal(response, true);
        
      } catch(e) {
        assert(false);
      }

    });

  });

  describe('Votos', () => {

    const votation = {
      title: 'Prefeito',
      candidates: [accounts[0]],
      votationAccounts: [accounts[0], accounts[1], accounts[2]]
    };

    it('1. Não é permitido ao administrador realizar um voto', async() => {

      try {

        const instance = await Elections.deployed();
        await instance.destroyVotation('0', { from: accounts[0] });
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[0] });
        await instance.setVotationAccounts('0', votation.votationAccounts, { from: accounts[0] })
        await instance.setVote('0', '', accounts[0], { from: accounts[0] });

      } catch(e) {
          assert(e.message.indexOf('The owner can not update that information') !== -1);
      }

    });

    it('2. Não é permitido realizar um voto após a votação ser inativada', async() => {

      try {

        const instance = await Elections.deployed();
        await instance.destroyVotation('0', { from: accounts[0] });
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[0] });
        await instance.setVotationAccounts('0', votation.votationAccounts, { from: accounts[0] })
        await instance.inactivateVotation('0');
        await instance.setVote('0', '', accounts[1], { from: accounts[1] });

      } catch(e) {
          assert(e.message.indexOf("Can't set votes to an inactive votation") !== -1);
      }

    });

    it('3. Deve realizar um voto em branco', async() => {

      try {

        const instance = await Elections.deployed();
        await instance.destroyVotation('0', { from: accounts[0] });
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[0] });
        await instance.setVotationAccounts('0', votation.votationAccounts, { from: accounts[0] })
        const response = await instance.setVote.call('0', '', accounts[1], { from: accounts[1] });

        assert.equal(response, true);
      } catch(e) {
          assert(false);
      }

    });

    it('4. Deve realizar um voto nulo', async() => {

      try {

        const instance = await Elections.deployed();
        await instance.destroyVotation('0', { from: accounts[0] });
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[0] });
        await instance.setVotationAccounts('0', votation.votationAccounts, { from: accounts[0] })
        const response = await instance.setVote.call('0', '123456', accounts[1], { from: accounts[1] });

        assert.equal(response, true);
      } catch(e) {
          assert(false);
      }

    });

    it('5. Deve realizar um voto', async() => {

      try {

        const instance = await Elections.deployed();
        await instance.destroyVotation('0', { from: accounts[0] });
        await instance.addVotation(votation.title, votation.candidates, { from: accounts[0] });
        await instance.setVotationAccounts('0', votation.votationAccounts, { from: accounts[0] })
        const response = await instance.setVote.call('0', accounts[0], accounts[1], { from: accounts[1] });

        assert.equal(response, true);
      } catch(e) {
          assert(false);
      }

    });

  });

});