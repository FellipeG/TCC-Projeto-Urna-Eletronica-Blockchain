<template>
    <div>
        <base-nav 
            type="default"
            title="Urna Eletrônica"
            :transparent="true"
            :expand="true">
                <ul class="navbar-nav ml-lg-auto">
                    <li class="nav-item">
                        <a class="nav-link nav-link-icon" href="#">
                            Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-icon" href="#">
                            Votar
                        </a>
                    </li>
                    <base-dropdown tag="li" title="Admin">
                        <a class="dropdown-item" href="#">Gerenciar Candidatos</a>
                        <a class="dropdown-item" href="#">Gerenciar Partidos Políticos</a>
                        <a class="dropdown-item" href="#">Gerenciar Cargos Políticos</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Gerenciar Cidades</a>
                        <a class="dropdown-item" href="#">Gerenciar Estados</a>
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
