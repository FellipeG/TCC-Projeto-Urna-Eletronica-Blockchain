export const Elections = require("../../../backend/build/contracts/Elections.json")

export default (web3, contractAddress) => {

    const contract = new web3.eth.Contract(
        Elections.abi,
        contractAddress
    )

    contract.events.allEvents({}, (error, event) => {
        console.log('Event', event)
    })

    return contract
}