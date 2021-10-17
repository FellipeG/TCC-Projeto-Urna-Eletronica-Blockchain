class PoliticalPartyService
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

            const total = await this.contract.methods.getPoliticalPartyCount().call();

            if (endPosition > total) {
                endPosition = total;
            }
            
            const politicalPartyArray = [];
            for(let i=initialPosition; i<endPosition; i++) {
                const politicalPartyAddress = await this.contract.methods.getPoliticalPartyAtIndex(i).call();
                const politicalPartyObj = await this.contract.methods.getPoliticalParty(politicalPartyAddress).call();
                politicalPartyArray.push(politicalPartyObj);
            }

            
            return {
                total: total,
                data: politicalPartyArray
            }
        } catch(e) {
            throw e;
        }
    }

    async getAll()
    {
        try {

            const total = await this.contract.methods.getPoliticalPartyCount().call();
            
            const politicalPartyArray = [];
            for(let i=0; i<total; i++) {
                const politicalPartyAddress = await this.contract.methods.getPoliticalPartyAtIndex(i).call();
                const politicalPartyObj = await this.contract.methods.getPoliticalParty(politicalPartyAddress).call();
                politicalPartyArray.push(politicalPartyObj);
            }

            
            return politicalPartyArray;
        } catch(e) {
            throw e;
        }
    }

    async add(politicalPartyName) {

        try {

            await this.contract.methods
                .addPoliticalParty(politicalPartyName)
                .send({ from: this.accountAddress })
        }
        catch (e) {
            throw e;
        }
    }
}

export default PoliticalPartyService;