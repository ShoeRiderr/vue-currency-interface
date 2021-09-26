import Vue from "vue";
import Vuex from "vuex";
import { isLoggedIn, logOut } from "@/auth";

Vue.use(Vuex);

const axios = require("axios");
axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
};
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_CURRENCY_INTERFACE_URL;

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: {
      id: null,
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
  },
  actions: {
    loadUser(context, payload) {
      if (isLoggedIn()) {
        var user = {};
        if (payload === undefined) {
          axios
            .get(`/api/user`)
            .then((response) => {
              user = response.data.data || {};
            })
            .catch(() => {
              context.dispatch("logout");
            });
        } else {
          user = payload;
        }
        context.commit("setUser", user);
        context.commit("setLoggedIn", true);
      }
    },
    setLoggedIn(context, payload) {
      context.commit("setLoggedIn", payload);
      localStorage.setItem("isLoggedIn", payload);
    },
    logout({ commit }) {
      commit("setUser", {});
      commit("setLoggedIn", false);
      logOut();
    },
  },
});
