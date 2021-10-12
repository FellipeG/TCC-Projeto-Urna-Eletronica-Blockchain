class CityService
{
    constructor(web3, contract, accountAddress) {
        this.web3 = web3;
        this.contract = contract;
        this.accountAddress = accountAddress;
    }

    async index()
    {
        try {
            const cityArray = [];
            const cityIndexCount = await this.contract.methods.getCityCount().call();
            for(let i=0; i<cityIndexCount; i++) {
                const cityAddress = await this.contract.methods.getCityAtIndex(i).call();
                const cityObj = await this.contract.methods.getCity(cityAddress).call();
                cityArray.push(cityObj);
            }

            return cityArray;
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