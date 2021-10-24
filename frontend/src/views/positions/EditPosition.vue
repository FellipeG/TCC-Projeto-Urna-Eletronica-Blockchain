<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'cargos_politicos.index'}">
                <base-button
                    type="primary"
                    outline
                    class="float-right mb-2"
                    icon="fa fa-arrow-left">Voltar</base-button>
            </router-link>
            <div class="clearfix"></div>
            <div class="row">
                <div class="col-12">
                    <base-input label="Nome do Cargo Político" :required="true" v-model="positionName"></base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <base-button type="success" @click="edit" :block="true">
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
import PositionService from "@/services/PositionService";

export default {
    data() {
        return {
            positionName: null
        }
    },
    async created() {
        const positionServiceResponse = await this.show();
        this.positionName = (positionServiceResponse) ? positionServiceResponse.data : null;
    },
    methods: {
        getService() {
            return new PositionService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        async edit() {
            const service = this.getService();
            service.add(this.positionName);
            this.clearInput();
        },
        async show()
        {
            const service = this.getService();
            return service.show(this.$route.params.address);
        },
        clearInput() {
            this.positionName = null;
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