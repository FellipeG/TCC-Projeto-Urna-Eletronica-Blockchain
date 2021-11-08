<template>
        <div class="container pt-150">
            <router-link :to="{'name': 'votacoes.index'}">
                <base-button
                    type="primary"
                    outline
                    class="float-right mb-2"
                    icon="fa fa-arrow-left">Voltar</base-button>
            </router-link>
            <div class="clearfix"></div>
            <div class="table-responsive">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td colspan="2">
                                <base-progress :value="49.83" label="Fellipe J. R. Garcias - 3000 Votos" type="primary" :animated="true" :striped="true"></base-progress>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <base-progress :value="49.83" label="Erick V. Sousa Carvalho - 3000 Votos" type="primary" :animated="true" :striped="true"></base-progress>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <base-progress :value="0.17" label="Brancos - 10 Votos" type="primary" :animated="true" :striped="true"></base-progress>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <base-progress :value="0.17" label="Nulos - 10 Votos" type="primary" :animated="true" :striped="true"></base-progress>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
</template>

<script>

import BaseProgress from "@/components/BaseProgress";

import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import BaseSelect from '@/components/BaseSelect';
import { eventHub } from "@/main";

import CandidateService from "@/services/CandidateService";
import VotationService from "@/services/VotationService";

export default {
    data() {
        return {
        }
    },
    async created() {
    },
    methods: {
    },
    components: {
        BaseProgress
    }
}

</script>

<style scoped>
</style>