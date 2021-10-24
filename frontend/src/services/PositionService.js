import ServiceUtils from './Utils/ServiceUtils';

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
                const positionObj = await this.contract.methods.getPositionAtIndex(i).call();
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

    async update(oldPosition, newPosition) {

        try {

            await this.contract.methods
                .updatePosition(oldPosition, newPosition)
                .send({ from: this.accountAddress })
        }
        catch (e) {
            throw e;
        }
    }

    async destroy(position) {

        try {

            const response = await this.contract.methods
                .destroyPosition(position)
                .send({ from: this.accountAddress })

            return this.utils.response(response);
        }
        catch (e) {
            throw e;
        }
    }
}

export default PositionService;