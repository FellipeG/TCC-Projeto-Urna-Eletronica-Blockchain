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
import EditCandidate from './views/candidates/EditCandidate';

import Cities from "./views/cities/Cities";
import CreateCity from "./views/cities/CreateCity";
import EditCity from "./views/cities/EditCity";

import States from "./views/states/States";
import CreateState from "./views/states/CreateState";
import EditState from "./views/states/EditState";

import Positions from "./views/positions/Positions";
import CreatePosition from "./views/positions/CreatePosition";
import EditPosition from "./views/positions/EditPosition";

import PoliticalParties from "./views/political-parties/PoliticalParties";
import CreatePoliticalParty from "./views/political-parties/CreatePoliticalParty";
import EditPoliticalParty from "./views/political-parties/EditPoliticalParty";

import Votations from "./views/votations/Votations";
import CreateVotation from './views/votations/CreateVotation';
import EditVotation from './views/votations/EditVotation';
import SetVotationAccounts from './views/votations/SetVotationAccounts';

import Vote from "./views/vote/Vote";

import ConnectBlockchain from "./views/connect-blockchain/ConnectBlockchain";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/conectar_blockchain",
      name: "conectar_blockchain.index",
      components: {
        header: AppHeader,
        default: ConnectBlockchain,
        footer: AppFooter
      }
    },
    {
      path: "/",
      name: "home",
      components: {
        header: AppHeader,
        default: Home,
        footer: AppFooter
      }
    },
    {
      path: "/votar",
      name: "votar",
      components: {
        header: AppHeader,
        default: Vote,
        footer: AppFooter
      }
    },
    {
      path: "/candidatos",
      name: "candidatos.index",
      components: {
        header: AppHeader,
        default: Candidates,
        footer: AppFooter
      }
    },
    {
      path: "/candidatos/criar",
      name: "candidatos.create",
      components: {
        header: AppHeader,
        default: CreateCandidate,
        footer: AppFooter
      }
    },
    {
      path: "/candidatos/editar/:number",
      name: "candidatos.edit",
      components: {
        header: AppHeader,
        default: EditCandidate,
        footer: AppFooter
      }
    },
    {
      path: "/votacoes",
      name: "votacoes.index",
      components: {
        header: AppHeader,
        default: Votations,
        footer: AppFooter
      }
    },
    {
      path: "/votacoes/criar",
      name: "votacoes.create",
      components: {
        header: AppHeader,
        default: CreateVotation,
        footer: AppFooter
      }
    },
    {
      path: "/votacoes/editar/:id",
      name: "votacoes.edit",
      components: {
        header: AppHeader,
        default: EditVotation,
        footer: AppFooter
      }
    },
    {
      path: "/votacoes/editar/:id/definir_contas",
      name: "votacoes.definirContas",
      components: {
        header: AppHeader,
        default: SetVotationAccounts,
        footer: AppFooter
      }
    },
    {
      path: "/cidades",
      name: "cidades.index",
      components: {
        header: AppHeader,
        default: Cities,
        footer: AppFooter
      }
    },
    {
      path: "/cidades/criar",
      name: "cidades.create",
      components: {
        header: AppHeader,
        default: CreateCity,
        footer: AppFooter
      }
    },
    {
      path: "/cidades/editar/:name",
      name: "cidades.edit",
      components: {
        header: AppHeader,
        default: EditCity,
        footer: AppFooter
      }
    },
    {
      path: "/estados",
      name: "estados.index",
      components: {
        header: AppHeader,
        default: States,
        footer: AppFooter
      }
    },
    {
      path: "/estados/criar",
      name: "estados.create",
      components: {
        header: AppHeader,
        default: CreateState,
        footer: AppFooter
      }
    },
    {
      path: "/estados/editar/:name",
      name: "estados.edit",
      components: {
        header: AppHeader,
        default: EditState,
        footer: AppFooter
      }
    },
    {
      path: "/cargos_politicos",
      name: "cargos_politicos.index",
      components: {
        header: AppHeader,
        default: Positions,
        footer: AppFooter
      }
    },
    {
      path: "/cargos_politicos/criar",
      name: "cargos_politicos.create",
      components: {
        header: AppHeader,
        default: CreatePosition,
        footer: AppFooter
      }
    },
    {
      path: "/cargos_politicos/editar/:name",
      name: "cargos_politicos.edit",
      components: {
        header: AppHeader,
        default: EditPosition,
        footer: AppFooter
      }
    },
    {
      path: "/partidos_politicos",
      name: "partidos_politicos.index",
      components: {
        header: AppHeader,
        default: PoliticalParties,
        footer: AppFooter
      }
    },
    {
      path: "/partidos_politicos/criar",
      name: "partidos_politicos.create",
      components: {
        header: AppHeader,
        default: CreatePoliticalParty,
        footer: AppFooter
      }
    },
    {
      path: "/partidos_politicos/editar/:name",
      name: "partidos_politicos.edit",
      components: {
        header: AppHeader,
        default: EditPoliticalParty,
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
