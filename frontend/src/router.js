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
import Cities from "./views/cities/Cities";
import CreateCity from "./views/cities/CreateCity";
import StatusBar from "./views/status-bar/StatusBar";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/statusbar",
      name: "StatusBar",
      components: {
        header: AppHeader,
        default: StatusBar,
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
