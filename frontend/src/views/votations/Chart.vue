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
            votation: null,
            candidates: []
        }
    },
    async created() {

        const votationService = await this.getVotationService().show(this.$routes.params.id);
        const candidateService = await this.getCandidateService().getAll();

        this.votations = (votationService) ? votationService.data : null;
        this.candidates = (candidateService) ? candidateService.data : [];
    },
    methods: {
        getVotationService() {
            return new VotationService();
        },
        getCandidateService() {
            return new CandidateService();
        },
        getVotes() {
            return (this.votation) ? this.votation.votes : [];
        },
        getBlankVotes() {
            return (this.votation) ? this.votation.votes.filter((vote) => !vote.length) : [];
        },
        getNullVotes() {
            return (this.votation) ? this.votation.votes.filter((vote) => !vote.includes(vote._candidates)) : [];
        },
        getValidVotes() {
            return (this.votation) ? this.votation.votes.filter((vote) => vote.includes(vote._candidates)) : [];
        },
        getValidVotesCountPerElectoralNumber() {

            const arr = this.getValidVotes();
            const votes = [];

            let candidate;

            arr.forEach((vote) => {

                candidate = this.candidates.filter((candidate) => candidate.electoralNumber == vote).shift();

                votes[vote]['times'] = ++(votes[vote]['times'] || 0);
                votes[vote]['candidate'] = candidate || null;

            });

            return votes;
        },
        calculatePercentual(candidateVotes) {
            const percentage = 100 * candidateVotes / this.getVotes().length;
            return percentage.toFixed(2);
        }
    },
    components: {
        BaseProgress
    }
}

</script>

<style scoped>
</style>