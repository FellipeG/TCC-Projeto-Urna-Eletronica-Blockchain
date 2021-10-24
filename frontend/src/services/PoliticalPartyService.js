import ServiceUtils from './Utils/ServiceUtils';

class PoliticalPartyService
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

            const total = await this.contract.methods.getPoliticalPartyCount().call();

            if (endPosition > total) {
                endPosition = total;
            }
            
            const politicalPartyArray = [];
            for(let i=initialPosition; i<endPosition; i++) {
                const politicalPartyObj = await this.contract.methods.getPoliticalPartyAtIndex(i).call();
                politicalPartyArray.push(politicalPartyObj);
            }

            return this.utils.paginatedResponse(total, politicalPartyArray);

        } catch(e) {
            throw e;
        }
    }

    async show(politicalPartyAddress)
    {
        try {
            const politicalPartyObj = await this.contract.methods.getPoliticalParty(politicalPartyAddress).call();
            return this.utils.response(politicalPartyObj);
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
                const politicalPartyObj = await this.contract.methods.getPoliticalPartyAtIndex(i).call();
                politicalPartyArray.push(politicalPartyObj);
            }

            return this.utils.response(politicalPartyArray);

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

    async update(oldPoliticalParty, newPoliticalParty) {

        try {

            await this.contract.methods
                .updatePoliticalParty(oldPoliticalParty, newPoliticalParty)
                .send({ from: this.accountAddress })
        }
        catch (e) {
            throw e;
        }
    }

    async destroy(politicalParty) {

        try {

            const response = await this.contract.methods
                .destroyPoliticalParty(politicalParty)
                .send({ from: this.accountAddress })

            return this.utils.response(response);
        }
        catch (e) {
            throw e;
        }
    }
}

export default PoliticalPartyService;