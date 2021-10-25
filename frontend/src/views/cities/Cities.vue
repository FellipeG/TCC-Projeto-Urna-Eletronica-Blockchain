<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'cidades.create'}">
                <base-button type="primary" outline icon="fa fa-plus" class="float-right mb-2">Cadastrar Cidade</base-button>
            </router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th width="80%">Nome</th>
                        <th width="20%"></th>
                    </tr>
                </thead>
                <tbody v-if="cities && cities.data.length">
                    <tr v-for="city in cities.data" :key="city">
                        <td>{{ city }}</td>
                        <td align="right">
                            <router-link :to="{'name': 'cidades.edit', 'params': {'name': city}}">
                                <base-button 
                                    type="warning"
                                    class="mr-2"
                                    outline
                                    size="md"
                                    icon="fa fa-pencil"
                                    :iconOnly="true"></base-button>
                            </router-link>
        
                            <base-button
                                @click="openModal(city)"
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
                        <td colspan="2">Nenhuma cidade cadastrada</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <base-pagination
                    :total="(cities) ? parseInt(cities.total) : 0"
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
import CityService from "@/services/CityService";

export default {
    data() {
        return {
            cities: null,
            page: 1,
            perPage: 10,
            showModal: false,
            cityToDestroy: null
        }
    },
    async created() {
        this.cities = await this.index();

        eventHub.$on("DestroyedCityEvent", (city) => {
            this.index().then(response => {
                this.cities = response;
            });
        });

    },
    methods: {
        getService() {
            return new CityService(
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
            this.cities = await this.index();
        },
        openModal(city) {
            this.setCityToDestroy(city);
            this.showModal = true;
        },
        closeModal() {
            this.cleanCityToDestroy();
            this.showModal = false;
        },
        setCityToDestroy(city) {
            this.cityToDestroy = city;
        },
        cleanCityToDestroy() {
            this.cityToDestroy = null;
        },
        async destroy() {
            this.getService().destroy(this.cityToDestroy);
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