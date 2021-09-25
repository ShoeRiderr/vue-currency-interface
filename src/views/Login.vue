<template>
  <div>
    <div class="d-flex w-50 m-auto align-items-center">
      <div class="card card-body">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="name">Login</label>
            <input class="form-control" type="text" v-model="name" />
          </div>
          <div class="form-group">
            <label for="password">Hasło</label>
            <input class="form-control" type="password" v-model="password" />
          </div>
          <button
            class="btn btn-primary btn-block"
            type="submit"
            :disabled="loading"
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { logIn } from "../auth.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "",
      password: "",
      loading: false,
    };
  },

  computed: {
    ...mapState({
      currencyInterfaceUrl: (state) => state.currencyInterfaceUrl,
    }),
  },

  methods: {
    login() {
      this.loading = true;
      this.$axios
        .get(`${this.currencyInterfaceUrl}/sanctum/csrf-cookie`, {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        })
        .then(() => {
          this.$axios
            .post(`${this.currencyInterfaceUrl}/login`, {
              name: this.name,
              password: this.password,
            })
            .then(() => {
              this.fetchUser();
            })
            .catch(() => {
              this.$notify({
                type: "error",
                title: "Error",
                text: "Coś poszło nie tak.",
              });
            });
        })
        .catch(() => {
          //
        })
        .then(() => {
          this.loading = false;
        });
    },

    fetchUser() {
      this.$axios
        .get(`${this.currencyInterfaceUrl}/user`)
        .then((response) => {
          logIn();
          this.$store.dispatch(
            "loadUser",
            this.$lodash.get(response.data, "data", {})
          );
          this.$router.push({ name: "Index" });
        })
        .catch(() => {
          this.$notify({
            type: "error",
            title: "Error",
            text: "Coś poszło nie tak.",
          });
          this.$store.dispatch("logout");
        });
    },
  },
};
</script>
