<template>
    <div class="container pt-150">

        <div v-if="!etapaVotacao && !completed">
            <base-alert>
                <template v-slot:text>
                    <strong>Nenhuma votação disponível</strong>
                </template>
            </base-alert>
        </div>
        <div v-else-if="completed">
            <base-alert type="success">
                <template v-slot:text>
                    <strong>Obrigado pelo seu voto!</strong>
                </template>
            </base-alert>
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
                            <base-input v-model="voto" :error="(voto && voto.length && !candidate) ? 'Voto Nulo' : ''" type="number"></base-input>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <base-button :outline="true" @click="openModal('default', 'Branco', true)">
                                Branco
                            </base-button>
                            <base-button type="warning" @click="cleanInput" :outline="true">
                                Corrige
                            </base-button>
                            <base-button type="success" @click="openModal('success', 'Confirma', false)" :outline="true">
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

            <modal 
            :show="modal.show"
            bodyClasses="d-none"
            @close="closeModal">
                <template v-slot:header><strong>Tem certeza que deseja realizar esta ação?</strong></template>
                <template v-slot:footer>
                    <base-button outline @click="closeModal">Cancelar</base-button>
                    <base-button :type="modal.type" @click="vote()">{{ modal.btnText }}</base-button>
                </template>
            </modal>
            
        </div>
    </div>
</template>

<script>

import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import BaseAlert from "@/components/BaseAlert";
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
            candidate: null,
            completed: false,
            modal: {
                type: 'success',
                show: false,
                btnText: 'Confirmar',
                isBlankVote: false
            }
        }
    },
    async created() {
        this.votacoes = await this.getVotations();

        eventHub.$on('changeAccount', (account) => {
            this.getVotations().then((response) => {
                this.votacoes = response;
                this.voto = null;
                this.votos = [];
                this.votacaoPosition = 0;
                this.candidate = null;
                this.completed = false;
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
        vote() {
            ++this.votacaoPosition;

            const computedVote = (this.modal.isBlankVote) ? null : this.voto;
            this.votos.push(computedVote);
            this.cleanInput();
            this.closeModal();

            if (!this.etapaVotacao) {
                this.completed = true;
            }
        },
        cleanInput() {
            this.voto = null;
        },
        formatDate(date) {
            return date.split('-').reverse().join('/');
        },
        setModalType(type) {
            this.modal.type = type;
        },
        openModal(type, btnText, isBlankVote) {
            this.modal.type = type;
            this.modal.btnText = btnText;
            this.modal.isBlankVote = isBlankVote;
            this.modal.show = true;
        },
        closeModal() {
            this.modal.show = false;
        },
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

            const serviceResponse = await this.getCandidateService().show(value);
            this.candidate = (serviceResponse) ? serviceResponse.data : null;
        }
    },
    components: {
        BaseInput,
        BaseButton,
        BaseAlert,
        Modal
    }
}

</script>

<style scoped>
</style>