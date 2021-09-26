import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: require("@/views/Index.vue").default,
  },
  {
    path: "/login",
    name: "Login",
    component: require("@/views/Login.vue").default,
  },
  {
    path: "/user/currencies",
    name: "User.Currencies",
    component: require("@/views/User/Currencies.vue").default,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
