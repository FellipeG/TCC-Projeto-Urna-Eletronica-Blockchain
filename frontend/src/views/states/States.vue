<template>
        <div class="container pt-150">
            <router-link to="/estados/criar">
                <base-button type="primary" outline icon="fa fa-plus" class="float-right mb-2">Cadastrar Estado</base-button>
            </router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody v-if="states && states.data.length">
                    <tr v-for="state in states.data" :key="state">
                        <td>{{ state }}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td>Nenhum estado cadastrado</td>
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
        </div>
</template>

<script>

import BasePagination from "@/components/BasePagination";
import BaseButton from "@/components/BaseButton";
import { eventHub } from "@/main";
import StateService from "@/services/StateService";

export default {
    data() {
        return {
            states: null,
            page: 1,
            perPage: 10
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