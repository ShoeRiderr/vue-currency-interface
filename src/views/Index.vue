<template>
  <div>
    <b-alert :show="!isLoggedIn" variant="primary">
      <router-link :to="{ name: 'Login' }"> Zaloguj się </router-link>, żeby
      rozpocząć
    </b-alert>

    <div v-if="isLoggedIn">
      <h2>Lista walut</h2>
      <b-alert :show="!hasCurrencies" variant="primary">
        Aktualnie nie ma żadnych walut.
      </b-alert>

      <currency-table v-model="checkedCurrencies" />

      <div class="d-flex flex-row-reverse p-3">
        <b-button
          type="submit"
          :disabled="loading"
          @click.prevent="onSubmit"
          form="currency-form"
          variant="outline-primary"
        >
          Dodaj do ulbionej listy
        </b-button>
      </div>

      <pagination
        class="p-4 mb-0 float-right"
        :data="currencies"
        @pagination-change-page="fetchCurrencies"
      >
        <span slot="prev-nav">&lt;</span>
        <span slot="next-nav">&gt;</span>
      </pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import actionType from "@/enums/actionType.js";
import Pagination from "laravel-vue-pagination";
import CurrencyTable from "@/components/CurrencyTable";

export default {
  components: {
    Pagination,
    CurrencyTable,
  },

  data() {
    return {
      checkedCurrencies: [],
      loading: false,
    };
  },

  computed: {
    ...mapState({
      isLoggedIn: (state) => state.isLoggedIn,
      currencies: (state) => state.currencies,
    }),

    hasCurrencies() {
      return this.currencies.data.length > 0;
    },
  },

  mounted() {
    if (this.isLoggedIn) {
      this.fetchCurrencies();
    }
  },

  methods: {
    fetchCurrencies(page = 1) {
      this.$axios
        .get("/api/bank?page=" + page)
        .then((response) => {
          this.$store.commit(
            "setCurrencies",
            this.$lodash.get(response, "data", {})
          );
        })
        .catch(() => {
          this.$notify({
            type: "error",
            title: "Error",
            text: "Coś poszło nie tak podczas pobierania walut.",
          });
        });
    },

    onSubmit() {
      this.loading = true;
      const checkedCurrencies = this.$lodash.mapValues(
        this.checkedCurrencies,
        (checkedCurrency, id) => {
          if (checkedCurrency !== undefined) {
            return id;
          }
        }
      );

      this.$axios
        .post("/api/user/currency/action", {
          state: actionType.ADD_FAVOURITES,
          currencies: checkedCurrencies,
        })
        .then(() => {
          this.$notify({
            type: "success",
            title: "Sukces",
            text: "Pomyślnie dodano waluty.",
          });
          this.fetchCurrencies();
        })
        .catch(() => {
          this.$notify({
            type: "error",
            title: "Error",
            text: "Coś poszło nie tak podczas dodawania walut.",
          });
        })
        .then(() => {
          this.loading = false;
        });
    },

    getCurrencies(values) {
      this.checkedCurrencies = values;
    },
  },
};
</script>
