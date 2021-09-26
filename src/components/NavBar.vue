<template>
  <div>
    <notifications position="top center" width="50%" />
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
      <router-link class="navbar-brand" :to="{ name: 'Index' }">
        Vue Currency Interface
      </router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              v-if="isLoggedIn"
              class="nav-link"
              :to="{ name: 'User.Currencies' }"
            >
              Ulubione waluty
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" :to="{ name: 'Login' }">
              Zaloguj się
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link" href="" @click.prevent="logOut">Wyloguj</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.isLoggedIn,
    }),
  },

  methods: {
    async logOut() {
      try {
        await this.$axios.post("logout");
        this.$store.dispatch("logout");
        this.$router.push({ name: "Index" });
      } catch (error) {
        this.$store.dispatch("logout");
        this.$router.push({ name: "Index" });
      }
    },
  },
};
</script>
