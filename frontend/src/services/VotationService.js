import ServiceUtils from './Utils/ServiceUtils';

class VotationService 
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

            const total = await this.contract.methods.getVotationCount().call();

            if (endPosition > total) {
                endPosition = total;
            }
            
            const votationArray = [];
            for(let i=initialPosition; i<endPosition; i++) {
                const obj = await this.contract.methods.getVotationAtIndex(i).call();
                votationArray.push(obj);
            }

            return this.utils.paginatedResponse(total, votationArray);

        } catch(e) {
            throw e;
        }
    }

    async show(id)
    {
        try {
            const obj = await this.contract.methods.getVotation(id).call();
            return this.utils.response(obj);
        } catch(e) {
            throw e;
        }
    }

    async getAll()
    {
        try {

            const total = await this.contract.methods.getVotationCount().call();
            
            const votationArray = [];
            for(let i=0; i<total; i++) {
                const obj = await this.contract.methods.getVotationAtIndex(i).call();
                votationArray.push(obj);
            }

            
            return this.utils.response(votationArray);

        } catch(e) {
            throw e;
        }
    }

    async add(
        title,
        candidates,
        endDate
    ) {

        try {

            await this.contract.methods
                .addVotation(
                    title,
                    candidates,
                    endDate
                )
                .send({ from: this.accountAddress })

        }
        catch (e) {
            throw e;
        }
    }

    async update(
        id,
        newTitle,
        newCandidates,
        newEndDate
    ) {

        try {

            await this.contract.methods
                .updateVotation(
                    id,
                    newTitle,
                    newCandidates,
                    newEndDate
                )
                .send({ from: this.accountAddress })
        }
        catch (e) {
            throw e;
        }
    }

    async destroy(id) {

        try {

            const response = await this.contract.methods
                .destroyVotation(id)
                .send({ from: this.accountAddress })

            return this.utils.response(response);
        }
        catch (e) {
            throw e;
        }
    }

    async setVotationAccounts(id, accounts) {

        try {

            await this.contract.methods
                .setVotationAccounts(
                    id,
                    accounts
                )
                .send({ from: this.accountAddress })

        }
        catch (e) {
            throw e;
        }

    }
}

export default VotationService;