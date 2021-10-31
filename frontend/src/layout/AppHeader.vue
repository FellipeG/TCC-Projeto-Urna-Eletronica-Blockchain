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
                        <a class="nav-link nav-link-icon" href="#">
                            Votar
                        </a>
                    </li>
                    <base-dropdown tag="li" title="Admin">
                        <router-link :to="{'name': 'candidatos.index'}" class="dropdown-item">Gerenciar Candidatos</router-link>
                        <router-link :to="{'name': 'partidos_politicos.index'}" class="dropdown-item">Gerenciar Partidos Políticos</router-link>
                        <router-link :to="{'name': 'cargos_politicos.index'}" class="dropdown-item">Gerenciar Cargos Políticos</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link :to="{'name': 'cidades.index'}" class="dropdown-item">Gerenciar Cidades</router-link>
                        <router-link :to="{'name': 'estados.index'}" class="dropdown-item">Gerenciar Estados</router-link>
                        <router-link :to="{'name': 'eleicoes.index'}" class="dropdown-item">Gerenciar Eleições</router-link>
                    </base-dropdown>
                </ul>
        </base-nav>
    </div>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from '@/components/BaseDropdown.vue';

export default {
    components: {
        BaseNav,
        BaseDropdown
    }
};
</script>
<style>
</style>
