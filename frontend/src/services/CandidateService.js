class CandidateService 
{
    constructor(web3, contract, accountAddress) {
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
                const candidateAddress = await this.contract.methods.getCandidateAtIndex(i).call();
                const candidateObj = await this.contract.methods.getCandidate(candidateAddress).call();
                candidateArray.push(candidateObj);
            }

            
            return {
                total: total,
                data: candidateArray
            }
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
                const candidateAddress = await this.contract.methods.getCandidateAtIndex(i).call();
                const candidateObj = await this.contract.methods.getCandidate(candidateAddress).call();
                candidateArray.push(candidateObj);
            }

            
            return candidateArray;
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
}

export default CandidateService;