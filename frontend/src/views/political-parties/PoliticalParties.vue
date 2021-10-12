<template>
        <div class="container pt-150">
            <router-link to="/partidos_politicos/criar">
                <base-button type="primary" outline icon="fa fa-plus" class="float-right mb-2">Cadastrar Partido Político</base-button>
            </router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody v-if="politicalParties && politicalParties.data.length">
                    <tr v-for="politicalParty in politicalParties.data" :key="politicalParty">
                        <td>{{ politicalParty }}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td>Nenhum partido político cadastrado</td>
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
        </div>
</template>

<script>

import BasePagination from "@/components/BasePagination";
import BaseButton from "@/components/BaseButton";
import { eventHub } from "@/main";
import PoliticalPartyService from "@/services/PoliticalPartyService";

export default {
    data() {
        return {
            politicalParties: null,
            page: 1,
            perPage: 10
        }
    },
    async created() {
        this.politicalParties = await this.index();
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