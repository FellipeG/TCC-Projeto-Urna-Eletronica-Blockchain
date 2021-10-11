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
                <tbody>
                    <tr v-if="cities.length">
                        <td v-for="city in cities" :key="city">{{ city }}</td>
                    </tr>
                    <tr v-else>
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

import BasePagination from "@/components/BasePagination"
import BaseButton from "@/components/BaseButton"

export default {
    data() {
        return {
            cities: []
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