class StateService
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

            const total = await this.contract.methods.getStateCount().call();

            if (endPosition > total) {
                endPosition = total;
            }
            
            const stateArray = [];
            for(let i=initialPosition; i<endPosition; i++) {
                const stateAddress = await this.contract.methods.getStateAtIndex(i).call();
                const stateObj = await this.contract.methods.getState(stateAddress).call();
                stateArray.push(stateObj);
            }

            
            return {
                total: total,
                data: stateArray
            }
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
                const stateAddress = await this.contract.methods.getStateAtIndex(i).call();
                const stateObj = await this.contract.methods.getState(stateAddress).call();
                stateArray.push(stateObj);
            }

            
            return stateArray;
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
}

export default StateService;