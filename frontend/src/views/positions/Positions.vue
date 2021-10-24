<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'cargos_politicos.create'}">
                <base-button type="primary" outline icon="fa fa-plus" class="float-right mb-2">Cadastrar Cargo Político</base-button>
            </router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th width="80%">Nome</th>
                        <th width="20%"></th>
                    </tr>
                </thead>
                <tbody v-if="positions && positions.data.length">
                    <tr v-for="position in positions.data" :key="position">
                        <td>{{ position }}</td>
                        <td align="right">
                            <router-link :to="{'name': 'cargos_politicos.edit', 'params': {'name': position}}">
                                <base-button 
                                    type="warning"
                                    class="mr-2"
                                    outline
                                    size="md"
                                    icon="fa fa-pencil"
                                    :iconOnly="true"></base-button>
                            </router-link>
        
                            <base-button
                                @click="openModal(position)"
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
                        <td colspan="2">Nenhum cargo político cadastrado</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <base-pagination
                    :total="(positions) ? parseInt(positions.total) : 0"
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
import PositionService from "@/services/PositionService";

export default {
    data() {
        return {
            positions: null,
            page: 1,
            perPage: 10,
            showModal: false,
            positionToDestroy: null
        }
    },
    async created() {
        this.positions = await this.index();
    },
    methods: {
        getService() {
            return new PositionService(
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
            this.positions = await this.index();
        },
        openModal(position) {
            this.setPositionToDestroy(position);
            this.showModal = true;
        },
        closeModal() {
            this.cleanPositionToDestroy();
            this.showModal = false;
        },
        setPositionToDestroy(position) {
            this.positionToDestroy = position;
        },
        cleanPositionToDestroy() {
            this.positionToDestroy = null;
        },
        async destroy() {
            this.getService().destroy(this.positionToDestroy);
            this.positions = await this.index();
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