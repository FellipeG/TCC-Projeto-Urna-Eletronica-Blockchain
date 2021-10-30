import ServiceUtils from './Utils/ServiceUtils';

class CandidateService 
{
    constructor(web3, contract, accountAddress) {
        this.utils = new ServiceUtils();
        this.web3 = web3;
        this.contract = contract;
        this.accountAddress = accountAddress;
    }

    async index(page, perPage)
    {
        try {
            let endPosition = page * perPage;
            const initialPosition = endPosition - perPage;

            const total = await this.contract.methods.getCandidateCount().call();

            if (endPosition > total) {
                endPosition = total;
            }
            
            const candidateArray = [];
            for(let i=initialPosition; i<endPosition; i++) {
                const candidateObj = await this.contract.methods.getCandidateAtIndex(i).call();
                candidateArray.push(candidateObj);
            }

            return this.utils.paginatedResponse(total, candidateArray);

        } catch(e) {
            throw e;
        }
    }

    async show(candidateAddress)
    {
        try {
            const obj = await this.contract.methods.getCandidate(candidateAddress).call();
            return this.utils.response(obj);
        } catch(e) {
            throw e;
        }
    }

    async getAll()
    {
        try {

            const total = await this.contract.methods.getCandidateCount().call();
            
            const candidateArray = [];
            for(let i=0; i<total; i++) {
                const candidateObj = await this.contract.methods.getCandidateAtIndex(i).call();
                candidateArray.push(candidateObj);
            }

            
            return this.utils.response(candidateArray);

        } catch(e) {
            throw e;
        }
    }

    async add(
        fullName,
        birthDate,
        politicalParty,
        position,
        state,
        city,
        electoralNumber
    ) {

        try {

            await this.contract.methods
                .addCandidate(
                    fullName,
                    birthDate,
                    politicalParty,
                    position,
                    state,
                    city,
                    electoralNumber
                )
                .send({ from: this.accountAddress })

        }
        catch (e) {
            throw e;
        }
    }

    async update(
        oldElectoralNumber,
        newFullName,
        newBirthDate,
        newPoliticalParty,
        newPosition,
        newState,
        newCity,
        newElectoralNumber
    ) {

        try {

            await this.contract.methods
                .updateCandidate(
                    oldElectoralNumber,
                    newFullName,
                    newBirthDate,
                    newPoliticalParty,
                    newPosition,
                    newState,
                    newCity,
                    newElectoralNumber
                )
                .send({ from: this.accountAddress })
        }
        catch (e) {
            throw e;
        }
    }

    async destroy(electoralNumber) {

        try {

            const response = await this.contract.methods
                .destroyCandidate(electoralNumber)
                .send({ from: this.accountAddress })

            return this.utils.response(response);
        }
        catch (e) {
            throw e;
        }
    }
}

export default CandidateService;