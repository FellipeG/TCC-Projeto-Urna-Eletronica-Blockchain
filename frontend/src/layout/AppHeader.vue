<template>
    <div>
        <base-nav 
            type="default"
            title="Urna Eletrônica"
            :transparent="true"
            :expand="true">
                <ul class="navbar-nav ml-lg-auto">
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" :to="{'name': 'home'}">
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" :to="{'name': 'conectar_blockchain.index'}">
                            Conectar ao Blockchain
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" :to="{'name': 'votar'}">
                            Votar
                        </router-link>
                    </li>
                    <base-dropdown tag="li" title="Admin" v-show="isAdmin">
                        <router-link :to="{'name': 'candidatos.index'}" class="dropdown-item">Gerenciar Candidatos</router-link>
                        <router-link :to="{'name': 'partidos_politicos.index'}" class="dropdown-item">Gerenciar Partidos Políticos</router-link>
                        <router-link :to="{'name': 'cargos_politicos.index'}" class="dropdown-item">Gerenciar Cargos Políticos</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link :to="{'name': 'cidades.index'}" class="dropdown-item">Gerenciar Cidades</router-link>
                        <router-link :to="{'name': 'estados.index'}" class="dropdown-item">Gerenciar Estados</router-link>
                        <router-link :to="{'name': 'votacoes.index'}" class="dropdown-item">Gerenciar Votações</router-link>
                    </base-dropdown>
                </ul>
        </base-nav>
    </div>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from '@/components/BaseDropdown.vue';
import AccountService from "@/services/AccountService";

export default {
    components: {
        BaseNav,
        BaseDropdown
    },
    data() {
        return {
            adminAccountAddress: this.getAccountService().get().data.shift().address
        }
    },
    methods: {
        getAccountService() {
            return new AccountService();
        }
    },
    computed: {
        isAdmin() {
            const adminAccountAddress = (this.adminAccountAddress) ? this.adminAccountAddress.toUpperCase() : null;
            const actualAccountAddress = (this.$store.state.accountAddress) ? this.$store.state.accountAddress.toUpperCase() : null;
            
            if (!adminAccountAddress || !actualAccountAddress) {
                return false;
            }

            return adminAccountAddress === actualAccountAddress;
        },
        isAccountSetted() {
            return (this.$store.state.accountAddress) ? true : false;
        }
    }
};
</script>
<style>
</style>
