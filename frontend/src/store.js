import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        contractAddress: '0xD2E8e6018741322Df2ba09ADC7B3C0E7fEE6b4cC',
        accountAddress: null,
        web3: null,
        contract: null
    },
    mutations: {
        setWeb3(state, web3) {
            state.web3 = web3
        },
        setContract(state, contract) {
            state.contract = contract
        },
        setAccountAddress(state, address) {
            state.accountAddress = address
        }
    },
    getters: {
    },
    actions: {
    }
})