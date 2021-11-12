<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'cidades.index'}">
                <base-button
                    type="primary"
                    outline
                    class="float-right mb-2"
                    icon="fa fa-arrow-left">Voltar</base-button>
            </router-link>
            <div class="clearfix"></div>
            <div class="row">
                <div class="col-12">
                    <base-input label="Nome da Cidade" :required="true" v-model="cityName"></base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <base-button type="success" @click="add"  :block="true">
                        Cadastrar
                    </base-button>
                </div>
            </div>
        </div>
</template>

<script>

import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput.vue";
import { eventHub } from "@/main";
import CityService from "@/services/CityService";

export default {
    data() {
        return {
            cityName: ''
        }
    },
    methods: {
        getService() {
            return new CityService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        async add() {
            const service = this.getService();
            service.add(this.cityName);
            this.clearInput();
        },
        clearInput() {
            this.cityName = '';
        }
    },
    components: {
        BaseButton,
        BaseInput
    }
}

</script>

<style scoped>
</style>