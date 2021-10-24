<template>
        <div class="container pt-150">
            <router-link to="/candidatos/criar">
                <base-button type="primary" outline icon="fa fa-plus" class="float-right mb-2">Cadastrar Candidato</base-button>
            </router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Número Eleitoral</th>
                        <th>Nome Completo</th>
                        <th>Partido Político</th>
                        <th>Cargo a Concorrer</th>
                        <th>Estado</th>
                        <th>Cidade</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="candidates && candidates.data.length">
                    <tr v-for="candidate in candidates.data" :key="candidate.electoralNumber">
                        <td>{{ candidate.electoralNumber }}</td>
                        <td>{{ candidate.fullName }}</td>
                        <td>{{ candidate.politicalParty }}</td>
                        <td>{{ candidate.position }}</td>
                        <td>{{ candidate.state }}</td>
                        <td>{{ candidate.city }}</td>
                        <td align="right">
                            <base-button 
                                type="warning"
                                outline
                                size="md"
                                icon="fa fa-pencil"
                                :iconOnly="true"></base-button>

                            <base-button
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
                        <td colspan="8">Nenhum candidato cadastrado</td>
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
import CandidateService from "@/services/CandidateService";

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
            return new CandidateService(
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