<template>
        <div class="container pt-150">
            <router-link to="/cidades/criar">
                <base-button type="primary" outline icon="fa fa-plus" class="float-right mb-2">Cadastrar Cidade</base-button>
            </router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody v-if="cities && cities.data.length">
                    <tr v-for="city in cities.data" :key="city">
                        <td>{{ city }}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td>Nenhuma cidade cadastrada</td>
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
        </div>
</template>

<script>

import BasePagination from "@/components/BasePagination";
import BaseButton from "@/components/BaseButton";
import { eventHub } from "@/main";
import CityService from "@/services/CityService";

export default {
    data() {
        return {
            cities: null,
            page: 1,
            perPage: 10
        }
    },
    async created() {
        this.cities = await this.index();
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
        }
    },
    components: {
        BasePagination,
        BaseButton
    }
}

</script>

<style scoped>
</style>