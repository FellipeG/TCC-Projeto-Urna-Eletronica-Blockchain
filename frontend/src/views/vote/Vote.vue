<template>
        <div class="container pt-150">

            <div v-if="!etapaVotacao">
                Nenhuma votação disponível
            </div>

            <div v-else>
                <div class="row">
                    <div class="col-6">

                        <div class="row">
                            <div class="col-12">
                                <h1>{{ etapaVotacao.title }}</h1>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <base-input v-model="voto" type="number"></base-input>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <base-button :outline="true">
                                    Branco
                                </base-button>
                                <base-button type="warning" @click="cleanInput" :outline="true">
                                    Corrige
                                </base-button>
                                <base-button type="success" :outline="true">
                                    Confirma
                                </base-button>
                            </div>
                        </div>

                    </div>

                    <div class="col-6">
                        <div v-if="candidate">
                            <div class="row">
                                <div class="col-12">
                                    <h1>{{ candidate.fullName }}</h1>
                                </div>
                            </div>

                            <table class="table table-borderless">
                                <tbody>

                                    <tr>
                                        <td>Data de Nascimento:</td>
                                        <td>{{ formatDate(candidate.birthDate) }}</td>
                                    </tr>

                                    <tr>
                                        <td>Cidade:</td>
                                        <td>{{ candidate.city }}</td>
                                    </tr>

                                    <tr>
                                        <td>Estado:</td>
                                        <td>{{ candidate.state }}</td>
                                    </tr>

                                    <tr>
                                        <td>Número Eleitoral:</td>
                                        <td>{{ candidate.electoralNumber }}</td>
                                    </tr>

                                    <tr>
                                        <td>Partido Político:</td>
                                        <td>{{ candidate.politicalParty }}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
</template>

<script>

import BasePagination from "@/components/BasePagination";
import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import Modal from "@/components/Modal";
import { eventHub } from "@/main";
import VotationService from "@/services/VotationService";
import CandidateService from "@/services/CandidateService";

export default {
    data() {
        return {
            voto: null,
            votos: [],
            votacaoPosition: 0,
            votacoes: [],
            candidate: null
        }
    },
    async created() {
        this.votacoes = await this.getVotations();

        eventHub.$on('changeAccount', (account) => {
            this.getVotations().then((response) => {
                this.votacoes = response;
            })
        });
    },
    methods: {
        getCandidateService() {
            return new CandidateService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        getService() {
            return new VotationService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        async getVotations() {
            const service = this.getService();
            const serviceResponse = await service.getAll();
            const data = (serviceResponse) 
                ? serviceResponse.data
                : [];

            return data.filter((votation) => {
                const accounts = votation.accounts.map((account) => account.toLowerCase());
                return accounts.indexOf(this.$store.state.accountAddress) !== -1
            });
        },    
        formatDateTimestamp(timestamp) {
            const date = new Date(parseInt(timestamp));
            return date.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'});
        },
        cleanInput() {
            this.voto = null;
        },
        formatDate(date) {
            return date.split('-').reverse().join('/');
        }
    },
    computed: {
        etapaVotacao() {
            if (this.votacoes.length === 0) {
                return null;
            }

            return this.votacoes[this.votacaoPosition];
        },

    },
    watch: {
        async voto(value) {

            const votationCandidates = (this.etapaVotacao) ? this.etapaVotacao._candidates : [];

            if (votationCandidates.indexOf(value) === -1) {
                this.candidate = null;
                return;
            }

            console.log(value);

            const serviceResponse = await this.getCandidateService().show(value);
            this.candidate = (serviceResponse) ? serviceResponse.data : null;
        }
    },
    components: {
        BaseInput,
        BaseButton
    }
}

</script>

<style scoped>
</style>