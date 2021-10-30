<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'candidatos.create'}">
                <base-button type="primary" outline icon="fa fa-plus" class="float-right mb-2">Cadastrar Candidato</base-button>
            </router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Número Eleitoral</th>
                        <th>Nome Completo</th>
                        <th>Partido Político</th>
                        <th>Estado</th>
                        <th>Cidade</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="candidates && candidates.data.length">
                    <tr v-for="candidate in candidates.data" :key="candidate.electoralNumber">
                        <td>{{ candidate.electoralNumber }}</td>
                        <td>{{ candidate.fullName }}</td>
                        <td>{{ candidate.politicalParty }}</td>
                        <td>{{ candidate.state }}</td>
                        <td>{{ candidate.city }}</td>
                        <td align="right">
                            <router-link :to="{'name': 'candidatos.edit', 'params': {'number': candidate.electoralNumber}}">
                                <base-button 
                                    type="warning"
                                    class="mr-2"
                                    outline
                                    size="md"
                                    icon="fa fa-pencil"
                                    :iconOnly="true"></base-button>
                            </router-link>

                            <base-button
                                @click="openModal(candidate)"
                                type="danger"
                                outline
                                size="md"
                                icon="fa fa-trash"
                                :iconOnly="true"></base-button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="8">Nenhum candidato cadastrado</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <base-pagination
                    :total="(candidates) ? parseInt(candidates.total) : 0"
                    :perPage="perPage"
                    :value="page"
                    align="center"
                    @input="setPage"></base-pagination>
            </div>
            <modal 
                :show="showModal"
                bodyClasses="d-none"
                @close="closeModal">
                <template v-slot:header><strong>Tem certeza que deseja deletar este registro?</strong></template>
                <template v-slot:footer>
                    <base-button type="primary" outline @click="closeModal">Cancelar</base-button>
                    <base-button type="danger" @click="destroy()">Deletar</base-button>
                </template>
            </modal>
        </div>
</template>

<script>

import BasePagination from "@/components/BasePagination";
import BaseButton from "@/components/BaseButton";
import Modal from "@/components/Modal";
import { eventHub } from "@/main";
import CandidateService from "@/services/CandidateService";

export default {
    data() {
        return {
            candidates: null,
            page: 1,
            perPage: 10,
            showModal: false,
            candidateToDestroy: null
        }
    },
    async created() {
        this.candidates = await this.index();

        eventHub.$on("DestroyedCandidateEvent", (candidate) => {
            this.index().then(response => {
                this.candidates = response;
            });
        });

    },
    methods: {
        getService() {
            return new CandidateService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        async index() {
            const service = this.getService();
            return service.index(this.page, this.perPage);
        },
        async setPage(page) {
            this.page = page;
            this.candidates = await this.index();
        },
        openModal(candidate) {
            this.setCandidateToDestroy(candidate.electoralNumber);
            this.showModal = true;
        },
        closeModal() {
            this.cleanCandidateToDestroy();
            this.showModal = false;
        },
        setCandidateToDestroy(electoralNumber) {
            this.candidateToDestroy = electoralNumber;
        },
        cleanCandidateToDestroy() {
            this.candidateToDestroy = null;
        },
        async destroy() {
            this.getService().destroy(this.candidateToDestroy);
            this.closeModal();
        }
    },
    components: {
        BasePagination,
        BaseButton,
        Modal
    }
}

</script>

<style scoped>
</style>