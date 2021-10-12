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
                <tbody v-if="cities.length">
                    <tr v-for="city in cities" :key="city">
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
                <base-pagination :total="cities.length" align="center"></base-pagination>
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
            cities: []
        }
    },
    async created() {
        const cities = await this.index();
        this.cities = cities;
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
            return service.index();
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