<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'eleicoes.index'}">
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
                    <base-input type="datetime-local" label="Data de encerramento" :required="true" v-model="endDate"></base-input>
                </div>
            </div>
            <div class="row">
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
import ElectionService from "@/services/ElectionService";

export default {
    data() {
        return {

            title: null,
            endDate: null,
            candidates: [],

            candidatesOptions: []
        }
    },
    async created() {
        const candidateServiceResponse = await this.getCandidateService().getAll();
        const electionServiceResponse = await this.getElectionService().show(this.$route.params.id);

        this.candidatesOptions = (candidateServiceResponse) ? candidateServiceResponse.data : [];

        if (electionServiceResponse) {
            const response = electionServiceResponse.data;
            const endDate = this.formatDateFromTimestamp(response.endDate);
            this.title = response.title;
            this.endDate = this.parseDateTimeInputFormat(endDate);
            this.candidates = response.electionCandidates;
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
        getElectionService() {
            return new ElectionService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        async update() {
            const service = this.getElectionService();
            const time = new Date(this.endDate).getTime().toString();

            service.update(
                this.$route.params.id,
                this.title,
                this.candidates,
                time
            );
        },
        formatDateFromTimestamp(timestamp) {
            const date = new Date(parseInt(timestamp));
            return date.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'});
        },
        parseDateTimeInputFormat(datetime) {
            const dateArray = datetime.split(' ');
            const date = dateArray[0].split('/').reverse().join('-');
            const time = dateArray[1].split(':');
            return `${date}T${time[0]}:${time[1]}`;
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