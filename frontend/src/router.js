import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader.vue";
import AppFooter from "./layout/AppFooter.vue";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Home from "./views/home/Home";
import Candidates from "./views/candidates/Candidates";
import CreateCandidate from './views/candidates/CreateCandidate';
import Cities from "./views/cities/Cities";
import CreateCity from "./views/cities/CreateCity";
import States from "./views/states/States";
import CreateState from "./views/states/CreateState";
import Positions from "./views/positions/Positions";
import CreatePosition from "./views/positions/CreatePosition";
import PoliticalParties from "./views/political-parties/PoliticalParties";
import CreatePoliticalParty from "./views/political-parties/CreatePoliticalParty";
import ConnectBlockchain from "./views/connect-blockchain/ConnectBlockchain";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/conectar_blockchain",
      name: "ConnectBlockchain",
      components: {
        header: AppHeader,
        default: ConnectBlockchain,
        footer: AppFooter
      }
    },
    {
      path: "/",
      name: "Início",
      components: {
        header: AppHeader,
        default: Home,
        footer: AppFooter
      }
    },
    {
      path: "/candidatos",
      name: "Candidatos",
      components: {
        header: AppHeader,
        default: Candidates,
        footer: AppFooter
      }
    },
    {
      path: "/candidatos/criar",
      name: "Cadastrar Candidatos",
      components: {
        header: AppHeader,
        default: CreateCandidate,
        footer: AppFooter
      }
    },
    {
      path: "/cidades",
      name: "Cidades",
      components: {
        header: AppHeader,
        default: Cities,
        footer: AppFooter
      }
    },
    {
      path: "/cidades/criar",
      name: "Cadastrar Cidade",
      components: {
        header: AppHeader,
        default: CreateCity,
        footer: AppFooter
      }
    },
    {
      path: "/estados",
      name: "Estados",
      components: {
        header: AppHeader,
        default: States,
        footer: AppFooter
      }
    },
    {
      path: "/estados/criar",
      name: "Cadastrar Estado",
      components: {
        header: AppHeader,
        default: CreateState,
        footer: AppFooter
      }
    },
    {
      path: "/cargos_politicos",
      name: "Cargos Políticos",
      components: {
        header: AppHeader,
        default: Positions,
        footer: AppFooter
      }
    },
    {
      path: "/cargos_politicos/criar",
      name: "Cadastrar Cargo Político",
      components: {
        header: AppHeader,
        default: CreatePosition,
        footer: AppFooter
      }
    },
    {
      path: "/partidos_politicos",
      name: "Partidos Políticos",
      components: {
        header: AppHeader,
        default: PoliticalParties,
        footer: AppFooter
      }
    },
    {
      path: "/partidos_politicos/criar",
      name: "Cadastrar Partidos Políticos",
      components: {
        header: AppHeader,
        default: CreatePoliticalParty,
        footer: AppFooter
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
