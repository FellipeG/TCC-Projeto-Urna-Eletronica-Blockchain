<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'estados.index'}">
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
                    <base-button type="success" @click="update"  :block="true">
                        Editar
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
            oldStateName: this.$route.params.name,
            stateName: this.$route.params.name
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
        async update() {
            const service = this.getService();
            service.update(this.oldStateName, this.stateName);
        },
        
    },
    components: {
        BaseButton,
        BaseInput
    }
}

</script>

<style scoped>
</style>