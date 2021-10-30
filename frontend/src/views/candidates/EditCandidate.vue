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
                    <base-select v-model="city" :options="cities" label="Cidade" :required="true"></base-select>
                </div>
                <div class="col-6">
                    <base-select v-model="state" :options="states" label="Estado" :required="true"></base-select>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <base-select v-model="position" :options="positions" label="Cargo" :required="true"></base-select>
                </div>
                <div class="col-6">
                    <base-select v-model="politicalParty" :options="politicalParties" label="Partido Político" :required="true"></base-select>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <base-input v-model="electoralNumber" type="number" label="Número Eleitoral" :required="true"></base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <base-button type="success" @click="update" :block="true">
                        Editar
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
import PositionService from "@/services/PositionService";
import PoliticalPartyService from "@/services/PoliticalPartyService";
import CandidateService from "@/services/CandidateService";

export default {
    data() {
        return {
            oldElectoralNumber: this.$route.params.number,
            fullName: '',
            birthDate: '',
            city: '',
            state: '',
            position: '',
            politicalParty: '',
            electoralNumber: '',

            cities: [],
            states: [],
            positions: [],
            politicalParties: [],
        }
    },
    async created() {
        const cityServiceResponse = await this.getCityService().getAll();
        const stateServiceResponse = await this.getStateService().getAll();
        const positionServiceResponse = await this.getPositionService().getAll();
        const politicalPartyServiceResponse = await this.getPoliticalPartyService().getAll();
        const candidateServiceResponse = await this.getCandidateService().show(this.oldElectoralNumber);

        this.fillData(candidateServiceResponse);

        this.cities = (cityServiceResponse) ? cityServiceResponse.data : [];
        this.states = (stateServiceResponse) ? stateServiceResponse.data : [];
        this.positions = (positionServiceResponse) ? positionServiceResponse.data : [];
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
        getPositionService() {
            return new PositionService(
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
        async update() {
            const service = this.getCandidateService();
            service.update(
                this.oldElectoralNumber,
                this.fullName,
                this.birthDate,
                this.politicalParty,
                this.position,
                this.state,
                this.city,
                this.electoralNumber
            );
        },
        fillData(serviceResponse) {
            if (!serviceResponse) {
                return;
            }

            const data = serviceResponse.data;

            this.fullName = data.fullName;
            this.birthDate = data.birthDate;
            this.city = data.city;
            this.state = data.state;
            this.position = data.position;
            this.politicalParty = data.politicalParty;
            this.electoralNumber =  data.electoralNumber;
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