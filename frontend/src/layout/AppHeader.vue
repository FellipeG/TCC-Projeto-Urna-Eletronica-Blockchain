<template>
    <div>
        <base-nav 
            type="default"
            title="Urna Eletrônica"
            :transparent="true"
            :expand="true">
                <ul class="navbar-nav ml-lg-auto">
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/">
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/conectar_blockchain">
                            Conectar ao Blockchain
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-icon" href="#">
                            Votar
                        </a>
                    </li>
                    <base-dropdown tag="li" title="Admin">
                        <router-link to="/candidatos" class="dropdown-item">Gerenciar Candidatos</router-link>
                        <a class="dropdown-item" href="#">Gerenciar Partidos Políticos</a>
                        <router-link to="/cargos_politicos" class="dropdown-item">Gerenciar Cargos Políticos</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link to="/cidades" class="dropdown-item">Gerenciar Cidades</router-link>
                        <router-link to="/estados" class="dropdown-item">Gerenciar Estados</router-link>
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
