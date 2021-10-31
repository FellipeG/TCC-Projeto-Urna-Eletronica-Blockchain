<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'candidatos.index'}">
                <base-button
                    type="primary"
                    outline
                    class="float-right mb-2"
                    icon="fa fa-arrow-left">Voltar</base-button>
            </router-link>
            <div class="clearfix"></div>
            <div class="row">
                <div class="col-6">
                    <base-input label="Nome Completo" :required="true" v-model="fullName"></base-input>
                </div>
                <div class="col-6">
                    <base-input type="date" label="Data de Nascimento" :required="true" v-model="birthDate"></base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <base-select v-model="city" :options="cities" labelText="Cidade" :required="true"></base-select>
                </div>
                <div class="col-6">
                    <base-select v-model="state" :options="states" labelText="Estado" :required="true"></base-select>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <base-select v-model="politicalParty" :options="politicalParties" labelText="Partido Político" :required="true"></base-select>
                </div>
                <div class="col-6">
                    <base-input v-model="electoralNumber" type="number" label="Número Eleitoral" :required="true"></base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <base-button type="success" @click="add" :block="true">
                        Cadastrar
                    </base-button>
                </div>
            </div>
        </div>
</template>

<script>

import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import BaseSelect from '@/components/BaseSelect';
import { eventHub } from "@/main";
import CityService from "@/services/CityService";
import StateService from "@/services/StateService";
import PoliticalPartyService from "@/services/PoliticalPartyService";
import CandidateService from "@/services/CandidateService";

export default {
    data() {
        return {

            fullName: '',
            birthDate: '',
            city: '',
            state: '',
            politicalParty: '',
            electoralNumber: '',

            cities: [],
            states: [],
            politicalParties: [],
        }
    },
    async created() {
        const cityServiceResponse = await this.getCityService().getAll();
        const stateServiceResponse = await this.getStateService().getAll();
        const politicalPartyServiceResponse = await this.getPoliticalPartyService().getAll();

        this.cities = (cityServiceResponse) ? cityServiceResponse.data : [];
        this.states = (stateServiceResponse) ? stateServiceResponse.data : [];
        this.politicalParties = (politicalPartyServiceResponse) ? politicalPartyServiceResponse.data : [];
    },
    methods: {
        getCityService() {
            return new CityService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        getStateService() {
            return new StateService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        getPoliticalPartyService() {
            return new PoliticalPartyService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        getCandidateService() {
            return new CandidateService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        async add() {
            const service = this.getCandidateService();
            service.add(
                this.fullName,
                this.birthDate,
                this.politicalParty,
                this.state,
                this.city,
                this.electoralNumber
            );
            this.clearInput();
        },
        clearInput() {
            this.fullName = '';
            this.birthDate = '';
            this.politicalParty = '';
            this.state = '';
            this.city = '';
            this.electoralNumber = '';
        }
    },
    components: {
        BaseButton,
        BaseInput,
        BaseSelect,
    }
}

</script>

<style scoped>
</style>