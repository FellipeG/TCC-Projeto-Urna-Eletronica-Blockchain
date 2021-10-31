import ServiceUtils from './Utils/ServiceUtils';

class ElectionService 
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

            const total = await this.contract.methods.getElectionCount().call();

            if (endPosition > total) {
                endPosition = total;
            }
            
            const electionArray = [];
            for(let i=initialPosition; i<endPosition; i++) {
                const obj = await this.contract.methods.getElectionAtIndex(i).call();
                electionArray.push(obj);
            }

            return this.utils.paginatedResponse(total, electionArray);

        } catch(e) {
            throw e;
        }
    }

    async show(id)
    {
        try {
            const obj = await this.contract.methods.getElection(id).call();
            return this.utils.response(obj);
        } catch(e) {
            throw e;
        }
    }

    async getAll()
    {
        try {

            const total = await this.contract.methods.getElectionCount().call();
            
            const electionArray = [];
            for(let i=0; i<total; i++) {
                const obj = await this.contract.methods.getElectionAtIndex(i).call();
                candidateArray.push(obj);
            }

            
            return this.utils.response(electionArray);

        } catch(e) {
            throw e;
        }
    }

    async add(
        title,
        candidates,
        // endDate
    ) {

        try {

            // console.log(title, candidates, endDate);

            await this.contract.methods
                .addElection(
                    title,
                    candidates,
                    // endDate
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
        newEndDate
    ) {

        try {

            await this.contract.methods
                .updateElection(
                    id,
                    newTitle,
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
                .destroyElection(id)
                .send({ from: this.accountAddress })

            return this.utils.response(response);
        }
        catch (e) {
            throw e;
        }
    }
}

export default ElectionService;