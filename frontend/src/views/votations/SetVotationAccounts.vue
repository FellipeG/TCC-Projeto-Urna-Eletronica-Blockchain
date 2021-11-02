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
            <div class="row">
                <div class="col-6">
                    <base-select
                        v-model="account"
                        label="label"
                        labelText="Contas para Votação"
                        :reduce="(account) => account.address"
                        :options="accounts"
                        :required="true"
                        multiple></base-select>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <base-button type="success" @click="vinculate" :block="true">
                        Cadastrar Contas para Votação
                    </base-button>
                </div>
            </div>
        </div>
</template>

<script>

import BaseButton from "@/components/BaseButton";
import BaseSelect from '@/components/BaseSelect';
import { eventHub } from "@/main";

import VotationService from "@/services/VotationService";
import AccountService from "@/services/AccountService";

export default {
    data() {
        return {
            account: null,
            accounts: [],
            selectedAccounts: [],
        }
    },
    async created() {
        const accountServiceResponse = await this.getAccountService().get();
        this.accounts = (accountServiceResponse) ? accountServiceResponse.data : [];
    },
    methods: {
        getAccountService() {
            return new AccountService()
        },
        getVotationService() {
            return new VotationService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        async vinculate() {
            const service = this.getVotationService();
            service.add(
                this.title,
                this.candidates,
                time
            );
        },
        clearInput() {
            this.account = null;
        }
    },
    components: {
        BaseButton,
        BaseSelect,
    }
}

</script>

<style scoped>
</style>