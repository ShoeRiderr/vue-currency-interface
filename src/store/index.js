import Vue from "vue";
import Vuex from "vuex";
import { isLoggedIn, logOut } from "@/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: {
      id: null,
    },
    currencyInterfaceUrl: process.env.VUE_APP_CURRENCY_INTERFACE_URL,
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
    async loadUser(context, payload) {
      if (isLoggedIn()) {
        try {
          const user =
            payload == undefined
              ? (
                  await this.$axios.get(
                    `${context.state.currencyInterfaceUrl}/user`
                  )
                ).data.data
              : payload;
          context.commit("setUser", user);
          context.commit("setLoggedIn", true);
        } catch (error) {
          context.dispatch("logout");
        }
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
