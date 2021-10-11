<template>
        <div class="container pt-150">
            <router-link to="/cidades">
                <base-button type="primary" outline class="float-right mb-2" icon="fa fa-arrow-left">Voltar</base-button>
            </router-link>
            <div class="clearfix"></div>
            <div class="row">
                <div class="col-12">
                    <base-input label="Nome da Cidade" :required="true"></base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <base-button type="success" nativeType="submit" :block="true">
                        Cadastrar
                    </base-button>
                </div>
            </div>
        </div>
</template>

<script>

import BaseButton from "@/components/BaseButton"
import BaseInput from "@/components/BaseInput"

export default {
    data() {
        return {
            cities: []
        }
    },
    components: {
        BaseButton,
        BaseInput
    }
}

</script>
        BaseButton

<style scoped>
</style>