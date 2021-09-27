<template>
  <div>
    <notifications position="top center" width="50%" />
    <b-container>
      <b-navbar toggleable="lg" variant="faded" type="light">
        <b-navbar-brand>
          <router-link class="navbar-brand" :to="{ name: 'Index' }">
            Vue Currency Interface
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link
              v-if="isLoggedIn"
              class="nav-link"
              :to="{ name: 'User.Currencies' }"
            >
              Ulubione waluty
            </router-link>
            <router-link
              v-if="!isLoggedIn"
              class="nav-link"
              :to="{ name: 'Login' }"
            >
              Zaloguj się
            </router-link>
            <b-nav-item
              v-if="isLoggedIn"
              style="cursor: pointer"
              @click.prevent="logOut"
              >Wyloguj</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
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
        if (this.$route.name !== "Index") {
          this.$router.push({ name: "Index" });
        }
      } catch (error) {
        this.$store.dispatch("logout");
        if (this.$route.name !== "Index") {
          this.$router.push({ name: "Index" });
        }
      }
    },
  },
};
</script>
