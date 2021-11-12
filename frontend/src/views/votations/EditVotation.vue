<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'votacoes.index'}">
                <base-button
                    type="primary"
                    outline
                    class="float-right mb-2"
                    icon="fa fa-arrow-left">Voltar</base-button>
            </router-link>
            <div class="clearfix"></div>
            <div class="row">
                <div class="col-6">
                    <base-input label="Título" :required="true" v-model="title"></base-input>
                </div>
                <div class="col-6">
                    <base-select
                        v-model="candidates"
                        label="fullName"
                        labelText="Candidatos"
                        :reduce="(candidate) => candidate.electoralNumber"
                        :options="candidatesOptions"
                        :required="true"
                        multiple></base-select>
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

import CandidateService from "@/services/CandidateService";
import VotationService from "@/services/VotationService";

export default {
    data() {
        return {

            title: '',
            candidates: [],

            candidatesOptions: []
        }
    },
    async created() {
        const candidateServiceResponse = await this.getCandidateService().getAll();
        const electionServiceResponse = await this.getVotationService().show(this.$route.params.id);

        this.candidatesOptions = (candidateServiceResponse) ? candidateServiceResponse.data : [];

        if (electionServiceResponse) {
            const response = electionServiceResponse.data;
            this.title = response.title;
            this.candidates = response._candidates;
        }
    },
    methods: {
        getCandidateService() {
            return new CandidateService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        getVotationService() {
            return new VotationService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        async update() {
            const service = this.getVotationService();

            service.update(
                this.$route.params.id,
                this.title,
                this.candidates
            );
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