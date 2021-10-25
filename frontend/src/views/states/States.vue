<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'estados.create'}">
                <base-button type="primary" outline icon="fa fa-plus" class="float-right mb-2">Cadastrar Estado</base-button>
            </router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th width="80%">Nome</th>
                        <th width="20%"></th>
                    </tr>
                </thead>
                <tbody v-if="states && states.data.length">
                    <tr v-for="state in states.data" :key="state">
                        <td>{{ state }}</td>
                        <td align="right">
                            <router-link :to="{'name': 'estados.edit', 'params': {'name': state}}">
                                <base-button 
                                    type="warning"
                                    class="mr-2"
                                    outline
                                    size="md"
                                    icon="fa fa-pencil"
                                    :iconOnly="true"></base-button>
                            </router-link>
        
                            <base-button
                                @click="openModal(state)"
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
                        <td colspan="2">Nenhum estado cadastrado</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <base-pagination
                    :total="(states) ? parseInt(states.total) : 0"
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
import Modal from "@/components/Modal"
import { eventHub } from "@/main";
import StateService from "@/services/StateService";

export default {
    data() {
        return {
            states: null,
            page: 1,
            perPage: 10,
            showModal: false,
            stateToDestroy: null
        }
    },
    async created() {
        this.states = await this.index();
    },
    methods: {
        getService() {
            return new StateService(
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
            this.states = await this.index();
        },
        openModal(state) {
            this.setStateToDestroy(state);
            this.showModal = true;
        },
        closeModal() {
            this.cleanStateToDestroy();
            this.showModal = false;
        },
        setStateToDestroy(state) {
            this.stateToDestroy = state;
        },
        cleanStateToDestroy() {
            this.stateToDestroy = null;
        },
        async destroy() {
            this.getService().destroy(this.stateToDestroy);
            this.states = await this.index();
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