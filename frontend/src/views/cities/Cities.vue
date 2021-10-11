<template>
    <div class="container">
        <table class="table table-striped">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Nome</th>
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
    </div>
</template>

<script>

export default {
    data() {
        return {
            cities: []
        }
    }
}

</script>

<style scoped>
</style>