import ServiceUtils from './Utils/ServiceUtils';

class CityService 
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

            const total = await this.contract.methods.getCityCount().call();

            if (endPosition > total) {
                endPosition = total;
            }
            
            const cityArray = [];
            for(let i=initialPosition; i<endPosition; i++) {
                const cityObj = await this.contract.methods.getCityAtIndex(i).call();
                cityArray.push(cityObj);
            }

            return this.utils.paginatedResponse(total, cityArray);
            
        } catch(e) {
            throw e;
        }
    }

    async show(cityAddress)
    {
        try {
            const cityObj = await this.contract.methods.getPosition(cityAddress).call();
            return this.utils.response(cityObj);
        } catch(e) {
            throw e;
        }
    }

    async getAll()
    {
        try {

            const total = await this.contract.methods.getCityCount().call();
            
            const cityArray = [];
            for(let i=0; i<total; i++) {
                const cityObj = await this.contract.methods.getCityAtIndex(i).call();
                cityArray.push(cityObj);
            }

            return this.utils.response(cityArray)

        } catch(e) {
            throw e;
        }
    }

    async add(cityName) {

        try {

            await this.contract.methods
                .addCity(cityName)
                .send({ from: this.accountAddress })
        }
        catch (e) {
            throw e;
        }
    }

    async update(oldCity, newCity) {

        try {

            await this.contract.methods
                .updateCity(oldCity, newCity)
                .send({ from: this.accountAddress })
        }
        catch (e) {
            throw e;
        }
    }

    async destroy(city) {

        try {

            const response = await this.contract.methods
                .destroyCity(city)
                .send({ from: this.accountAddress })

            return this.utils.response(response);
        }
        catch (e) {
            throw e;
        }
    }
}

export default CityService;