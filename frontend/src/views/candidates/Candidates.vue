<template>
        <div class="container pt-150">
            <router-link to="/candidatos/criar">
                <base-button type="primary" outline icon="fa fa-plus" class="float-right mb-2">Cadastrar Candidato</base-button>
            </router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody v-if="candidates && candidates.data.length">
                    <tr v-for="candidate in candidate.data" :key="candidate">
                        <td>{{ candidate }}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td>Nenhuma candidato cadastrada</td>
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
            candidates: null,
            page: 1,
            perPage: 10
        }
    },
    async created() {
        this.candidates = await this.index();
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
            this.candidates = await this.index();
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