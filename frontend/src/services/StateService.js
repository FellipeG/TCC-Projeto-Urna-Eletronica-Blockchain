import ServiceUtils from './Utils/ServiceUtils';

class StateService
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

            const total = await this.contract.methods.getStateCount().call();

            if (endPosition > total) {
                endPosition = total;
            }
            
            const stateArray = [];
            for(let i=initialPosition; i<endPosition; i++) {
                const stateObj = await this.contract.methods.getStateAtIndex(i).call();
                stateArray.push(stateObj);
            }

            return this.utils.paginatedResponse(total, stateArray);

        } catch(e) {
            throw e;
        }
    }

    async show(stateAddress)
    {
        try {
            const stateObj = await this.contract.methods.getPosition(stateAddress).call();
            return this.utils.response(stateObj);
        } catch(e) {
            throw e;
        }
    }

    async getAll()
    {
        try {

            const total = await this.contract.methods.getStateCount().call();
            
            const stateArray = [];
            for(let i=0; i<total; i++) {
                const stateObj = await this.contract.methods.getStateAtIndex(i).call();
                stateArray.push(stateObj);
            }

            return this.utils.response(stateArray);

        } catch(e) {
            throw e;
        }
    }

    async add(stateName) {

        try {

            await this.contract.methods
                .addState(stateName)
                .send({ from: this.accountAddress })
        }
        catch (e) {
            throw e;
        }
    }

    async update(oldState, newState) {

        try {

            await this.contract.methods
                .updateState(oldState, newState)
                .send({ from: this.accountAddress })
        }
        catch (e) {
            throw e;
        }
    }

    async destroy(state) {

        try {

            const response = await this.contract.methods
                .destroyState(state)
                .send({ from: this.accountAddress })

            return this.utils.response(response);
        }
        catch (e) {
            throw e;
        }
    }
}

export default StateService;