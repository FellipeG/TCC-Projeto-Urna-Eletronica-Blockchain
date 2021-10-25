<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'partidos_politicos.create'}">
                <base-button type="primary" outline icon="fa fa-plus" class="float-right mb-2">Cadastrar Partido Político</base-button>
            </router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th width="80%">Nome</th>
                        <th width="20%"></th>
                    </tr>
                </thead>
                <tbody v-if="politicalParties && politicalParties.data.length">
                    <tr v-for="politicalParty in politicalParties.data" :key="politicalParty">
                        <td>{{ politicalParty }}</td>
                        <td align="right">
                            <router-link :to="{'name': 'partidos_politicos.edit', 'params': {'name': politicalParty}}">
                                <base-button 
                                    type="warning"
                                    class="mr-2"
                                    outline
                                    size="md"
                                    icon="fa fa-pencil"
                                    :iconOnly="true"></base-button>
                            </router-link>
        
                            <base-button
                                @click="openModal(politicalParty)"
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
                        <td colspan="2">Nenhum partido político cadastrado</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <base-pagination
                    :total="(politicalParties) ? parseInt(politicalParties.total) : 0"
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
import PoliticalPartyService from "@/services/PoliticalPartyService";

export default {
    data() {
        return {
            politicalParties: null,
            page: 1,
            perPage: 10,
            showModal: false,
            politicalPartyToDestroy: null
        }
    },
    async created() {
        this.politicalParties = await this.index();

        eventHub.$on("DestroyedPoliticalPartyEvent", (politicalParty) => {
            this.index().then(response => {
                this.politicalParties = response;
            });
        });

    },
    methods: {
        getService() {
            return new PoliticalPartyService(
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
            this.politicalParties = await this.index();
        },
        openModal(politicalParty) {
            this.setPoliticalPartyToDestroy(politicalParty);
            this.showModal = true;
        },
        closeModal() {
            this.cleanPoliticalPartyToDestroy();
            this.showModal = false;
        },
        setPoliticalPartyToDestroy(politicalParty) {
            this.politicalPartyToDestroy = politicalParty;
        },
        cleanPoliticalPartyToDestroy() {
            this.politicalPartyToDestroy = null;
        },
        async destroy() {
            this.getService().destroy(this.politicalPartyToDestroy);
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