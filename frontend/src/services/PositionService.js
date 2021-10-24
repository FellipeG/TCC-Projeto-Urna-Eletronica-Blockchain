import ServiceUtils from './Utils/ServiceUtils';

require('./Utils/ServiceUtils');

class PositionService
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

            const total = await this.contract.methods.getPositionCount().call();

            if (endPosition > total) {
                endPosition = total;
            }
            
            const positionArray = [];
            for(let i=initialPosition; i<endPosition; i++) {
                const positionAddress = await this.contract.methods.getPositionAtIndex(i).call();
                const positionObj = await this.contract.methods.getPosition(positionAddress).call();
                positionArray.push(positionObj);
            }

            
            return this.utils.paginatedResponse(total, positionArray);
        } catch(e) {
            throw e;
        }
    }

    async show(positionAddress)
    {
        try {
            const positionObj = await this.contract.methods.getPosition(positionAddress).call();
            return this.utils.response(positionObj);
        } catch(e) {
            console.log(e.message)
            throw e;
        }
    }

    async getAll()
    {
        try {

            const total = await this.contract.methods.getPositionCount().call();
            
            const positionArray = [];
            for(let i=0; i<total; i++) {
                const positionAddress = await this.contract.methods.getPositionAtIndex(i).call();
                const positionObj = await this.contract.methods.getPosition(positionAddress).call();
                positionArray.push(positionObj);
            }

            
            return this.utils.response(positionArray);
        } catch(e) {
            throw e;
        }
    }

    async add(positionName) {

        try {

            await this.contract.methods
                .addPosition(positionName)
                .send({ from: this.accountAddress })
        }
        catch (e) {
            throw e;
        }
    }
}

export default PositionService;