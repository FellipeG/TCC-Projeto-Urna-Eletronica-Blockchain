<template>
        <div class="container pt-150">
            <router-link to="/estados">
                <base-button
                    type="primary"
                    outline
                    class="float-right mb-2"
                    icon="fa fa-arrow-left">Voltar</base-button>
            </router-link>
            <div class="clearfix"></div>
            <div class="row">
                <div class="col-12">
                    <base-input label="Nome do Estado" :required="true" v-model="stateName"></base-input>
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
import StateService from "@/services/StateService";

export default {
    data() {
        return {
            stateName: null
        }
    },
    methods: {
        getService() {
            return new StateService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        async add() {
            const service = this.getService();
            service.add(this.stateName);
            this.clearInput();
        },
        clearInput() {
            this.stateName = null;
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