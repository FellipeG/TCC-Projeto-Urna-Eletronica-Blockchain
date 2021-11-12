<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'partidos_politicos.index'}">
                <base-button
                    type="primary"
                    outline
                    class="float-right mb-2"
                    icon="fa fa-arrow-left">Voltar</base-button>
            </router-link>
            <div class="clearfix"></div>
            <div class="row">
                <div class="col-12">
                    <base-input label="Nome do Partido Político" :required="true" v-model="politicalPartyName"></base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <base-button type="success" @click="add" :block="true">
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
import PoliticalPartyService from "@/services/PoliticalPartyService";

export default {
    data() {
        return {
            politicalPartyName: ''
        }
    },
    methods: {
        getService() {
            return new PoliticalPartyService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        async add() {
            const service = this.getService();
            service.add(this.politicalPartyName);
            this.clearInput();
        },
        clearInput() {
            this.politicalPartyName = '';
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