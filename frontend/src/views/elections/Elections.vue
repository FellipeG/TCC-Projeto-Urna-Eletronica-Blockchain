<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'eleicoes.create'}">
                <base-button type="primary" outline icon="fa fa-plus" class="float-right mb-2">Cadastrar Eleição</base-button>
            </router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Término</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="eleicoes && eleicoes.data.length">
                    <tr v-for="eleicao in eleicoes.data" :key="eleicao.id">
                        <td>{{ eleicao.title }}</td>
                        <td>{{ eleicao.endDate }}</td>
                        <td align="right">
                            <router-link :to="{'name': 'eleicoes.edit', 'params': {'id': eleicao.id}}">
                                <base-button 
                                    type="warning"
                                    class="mr-2"
                                    outline
                                    size="md"
                                    icon="fa fa-pencil"
                                    :iconOnly="true"></base-button>
                            </router-link>

                            <base-button
                                @click="openModal(eleicao)"
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
                        <td colspan="3">Nenhuma eleição cadastrada</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <base-pagination
                    :total="(eleicoes) ? parseInt(eleicoes.total) : 0"
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
import ElectionService from "@/services/ElectionService";

export default {
    data() {
        return {
            eleicoes: null,
            page: 1,
            perPage: 10,
            showModal: false,
            electionToDestroy: null
        }
    },
    async created() {
        this.candidates = await this.index();

        eventHub.$on("DestroyedElectionEvent", (candidate) => {
            this.index().then(response => {
                this.eleicoes = response;
            });
        });

    },
    methods: {
        getService() {
            return new ElectionService(
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
            this.eleicoes = await this.index();
        },
        openModal(election) {
            this.setElectionToDestroy(election.id);
            this.showModal = true;
        },
        closeModal() {
            this.cleanElectionToDestroy();
            this.showModal = false;
        },
        setElectionToDestroy(id) {
            this.electionToDestroy = id;
        },
        cleanElectionToDestroy() {
            this.electionToDestroy = null;
        },
        async destroy() {
            this.getService().destroy(this.electionToDestroy);
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