export const Elections = require("../../../backend/build/contracts/Elections.json");

import { eventHub } from "../main";

export default (web3, contractAddress) => {

    const contract = new web3.eth.Contract(
        Elections.abi,
        contractAddress
    )

    contract.events.allEvents({}, (error, event) => {
        eventHub.$emit(event.event, event.returnValues);
        console.log('Event', event)
    })

    return contract
}