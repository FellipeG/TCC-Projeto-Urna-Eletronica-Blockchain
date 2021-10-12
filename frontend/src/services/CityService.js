class CityService
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

            const total = await this.contract.methods.getCityCount().call();

            if (endPosition > total) {
                endPosition = total;
            }
            
            const cityArray = [];
            for(let i=initialPosition; i<endPosition; i++) {
                const cityAddress = await this.contract.methods.getCityAtIndex(i).call();
                const cityObj = await this.contract.methods.getCity(cityAddress).call();
                cityArray.push(cityObj);
            }

            
            return {
                total: total,
                data: cityArray
            }
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
}

export default CityService;