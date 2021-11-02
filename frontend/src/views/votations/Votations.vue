<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'votacoes.create'}">
                <base-button type="primary" outline icon="fa fa-plus" class="float-right mb-2">Cadastrar Votação</base-button>
            </router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Término</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="votacoes && votacoes.data.length">
                    <tr v-for="votacao in votacoes.data" :key="votacao.id">
                        <td>{{ votacao.title }}</td>
                        <td>{{ formatDate(votacao.endDate) }}</td>
                        <td align="right">

                            <router-link :to="{'name': 'votacoes.definirContas', 'params': {'id': votacao.id}}">
                                <base-button 
                                    type="primary"
                                    class="mr-2"
                                    outline
                                    size="md"
                                    icon="fa fa-plus"
                                    :iconOnly="true"></base-button>
                            </router-link>

                            <router-link :to="{'name': 'votacoes.edit', 'params': {'id': votacao.id}}">
                                <base-button 
                                    type="warning"
                                    class="mr-2"
                                    outline
                                    size="md"
                                    icon="fa fa-pencil"
                                    :iconOnly="true"></base-button>
                            </router-link>

                            <base-button
                                @click="openModal(votacao)"
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
                        <td colspan="3">Nenhuma votação cadastrada</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <base-pagination
                    :total="(votacoes) ? parseInt(votacoes.total) : 0"
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
import VotationService from "@/services/VotationService";

export default {
    data() {
        return {
            votacoes: null,
            page: 1,
            perPage: 10,
            showModal: false,
            votationToDestroy: null
        }
    },
    async created() {
        this.votacoes = await this.index();

        eventHub.$on("DestroyedVotationEvent", (votation) => {
            this.index().then(response => {
                this.votacoes = response;
            });
        });

    },
    methods: {
        getService() {
            return new VotationService(
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
            this.votacoes = await this.index();
        },
        openModal(votation) {
            this.setVotationToDestroy(votation.id);
            this.showModal = true;
        },
        closeModal() {
            this.cleanVotationToDestroy();
            this.showModal = false;
        },
        setVotationToDestroy(id) {
            this.votationToDestroy = id;
        },
        cleanVotationToDestroy() {
            this.votationToDestroy = null;
        },
        async destroy() {
            this.getService().destroy(this.votationToDestroy);
            this.closeModal();
        },
        formatDate(timestamp) {
            const date = new Date(parseInt(timestamp));
            return date.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'});
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