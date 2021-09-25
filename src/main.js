import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import { isLoggedIn } from "@/auth.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Notifications from "vue-notification";

Vue.use(BootstrapVue);
Vue.use(Notifications);

Vue.config.productionTip = false;

Vue.prototype.$lodash = require("lodash");

const axios = require("axios");
axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
};
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_CURRENCY_INTERFACE_URL;

Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
  async beforeCreate() {
    this.$store.dispatch("loadUser");

    if (
      (!isLoggedIn() && this.$router.currentRoute.name != "Login") ||
      (isLoggedIn() && this.$router.currentRoute.name == "Login")
    ) {
      this.$router.push({ name: "Index" }).catch(() => {});
    }
  },
}).$mount("#app");
