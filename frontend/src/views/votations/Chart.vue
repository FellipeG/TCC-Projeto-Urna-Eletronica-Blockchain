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
                        <tr v-for="voteObj in validVotes" :key="voteObj.candidate">
                            <td colspan="2">
                                <base-progress :value="calculatePercentual(voteObj.votes)" :label="`${voteObj.candidate} - ${voteObj.votes} Votos`" type="primary" :animated="true" :striped="true"></base-progress>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
</template>

<script>

import BaseProgress from "@/components/BaseProgress";

import CandidateService from "@/services/CandidateService";
import VotationService from "@/services/VotationService";

export default {
    data() {

        return {
            candidates: [],
            votation: null
        }
    },
    async created() {

        const candidateService = await this.getCandidateService().getAll();
        const votationService = await this.getVotationService().show(this.$route.params.id);

        this.candidates = (candidateService) ? candidateService.data : [],
        this.votation = (votationService) ? votationService.data : null

    },
    methods: {
        getVotationService() {
            return new VotationService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            );
        },
        getCandidateService() {
            return new CandidateService(
                this.$store.state.web3,
                this.$store.state.contract,
                this.$store.state.accountAddress
            );
        },
        calculatePercentual(candidateVotes) {
            if (!this.votes.length) return 0;
            const percentage = 100 * candidateVotes / this.votes.length;
            return parseFloat(percentage.toFixed(2));
        },
        getValidVotes() {
            return (this.votation) ? this.votation._candidates.filter((candidate) => this.votation.votes.includes(candidate)) : [];
        },
    },
    computed: {
        votes() {
            return (this.votation) ? this.votation.votes : [];
        },
        blankVotes() {
            return (this.votation) ? this.votation.votes.filter((vote) => !vote.length) : [];
        },
        nullVotes() {
            return (this.votation) ? this.votation.votes.filter((vote) => !this.votation._candidates.includes(vote) && vote.length) : [];
        },
        validVotes() {

            const validVotes = this.getValidVotes();
            const notVottedCandidates = (this.votation) ? this.votation._candidates.filter((candidate) => !this.votation.votes.includes(candidate)) : [];
            const voteCount = {};
            const voteObjs = [];
            
            let candidate;


            validVotes.forEach((vote) => {
                voteCount[vote] = (voteCount[vote] || 0) + 1;
            });

            notVottedCandidates.forEach((electoralNumber) => {
                voteCount[electoralNumber] = 0;
            });

            const votes = [...validVotes, ...notVottedCandidates];

            const uniqueVotes = (validVotes.length || notVottedCandidates.length)
                ? [...new Set(votes)]
                : [];

            uniqueVotes.forEach((vote) => {

                candidate = this.candidates.filter((candidate) => candidate.electoralNumber == vote).shift();
                
                voteObjs.push({
                    candidate: (candidate) ? candidate.fullName : null,
                    votes: voteCount[vote]
                });
            });

            voteObjs.push({
                candidate: 'Brancos',
                votes: this.blankVotes.length
            });

            voteObjs.push({
                candidate: 'Nulos',
                votes: this.nullVotes.length
            });

            return voteObjs.sort((vote1, vote2) => vote2.votes - vote1.votes);
        }
    },
    components: {
        BaseProgress
    }
}

</script>

<style scoped>
</style>