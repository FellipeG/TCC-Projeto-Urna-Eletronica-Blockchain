<template>
        <div class="container pt-150">
            <div v-if="!etapaVotacao">
                Nenhuma votação disponível
            </div>
            <div v-else>
                <span>{{ etapaVotacao.title }}</span>
                
            </div>
        </div>
</template>

<script>

import BasePagination from "@/components/BasePagination";
import BaseButton from "@/components/BaseButton";
import Modal from "@/components/Modal";
import { eventHub } from "@/main";
import VotationService from "@/services/VotationService";

export default {
    data() {
        return {
            votacaoPosition: 0,
            votacoes: []
        }
    },
    async created() {
        this.votacoes = await this.getVotations();

        eventHub.$on('changeAccount', (account) => {
            this.getVotations().then((response) => {
                this.votacoes = response;
            })
        });
    },
    methods: {
        getService() {
            return new VotationService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            )
        },
        async getVotations() {
            const service = this.getService();
            const serviceResponse = await service.getAll();
            const data = (serviceResponse) 
                ? serviceResponse.data
                : [];

            return data.filter((votation) => {
                const accounts = votation.accounts.map((account) => account.toLowerCase());
                return accounts.indexOf(this.$store.state.accountAddress) !== -1
            });
        },    
        formatDate(timestamp) {
            const date = new Date(parseInt(timestamp));
            return date.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'});
        }
    },
    computed: {
        etapaVotacao() {
            if (this.votacoes.length === 0) {
                return null;
            }

            return this.votacoes[this.votacaoPosition];
        }
    },
    components: {
    }
}

</script>

<style scoped>
</style>