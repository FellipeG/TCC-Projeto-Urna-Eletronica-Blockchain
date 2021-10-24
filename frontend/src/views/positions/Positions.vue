<template>
        <div class="container pt-150">
            <router-link to="/cargos_politicos/criar">
                <base-button type="primary" outline icon="fa fa-plus" class="float-right mb-2">Cadastrar Cargo Político</base-button>
            </router-link>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th></th>
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
        </div>
</template>

<script>

import BasePagination from "@/components/BasePagination";
import BaseButton from "@/components/BaseButton";
import { eventHub } from "@/main";
import PositionService from "@/services/PositionService";

export default {
    data() {
        return {
            positions: null,
            page: 1,
            perPage: 10
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