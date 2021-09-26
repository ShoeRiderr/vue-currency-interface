<template>
  <div>
    <div v-if="!hasCurrencies" class="alert alert-info" role="alert">
      Brak ulubionych walut.
    </div>
    <div v-else>
      <h2>Lista walut</h2>

      <currency-table
        @checked="getCurrencies"
        :currencies="currencies"
      ></currency-table>

      <div class="d-flex flex-row-reverse p-3">
        <button
          type="button"
          :disabled="loading"
          @click.prevent="onSubmit"
          form="currency-form"
          class="btn btn-outline-primary"
        >
          Dodaj do ulbionej listy
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import actionType from "@/enums/actionType.js";
import CurrencyTable from "@/components/CurrencyTable";

export default {
  components: {
    CurrencyTable,
  },

  data() {
    return {
      currencies: [],
      checkedCurrencies: [],
      loading: false,
    };
  },

  computed: {
    ...mapState({
      isLoggedIn: (state) => state.isLoggedIn,
    }),

    hasCurrencies() {
      return this.currencies.length > 0;
    },
  },

  mounted() {
    this.fetchCurrencies();
  },

  methods: {
    fetchUCurrencies() {
      this.$axios
        .get("/api/user/currency")
        .then((response) => {
          this.currencies = this.$lodash.get(response.data, "data", []);
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
      this.$axios
        .post("/api/user/currency/action", {
          state: actionType.REMOVE_FAVOURITES,
          currencies: this.checkedCurrencies,
        })
        .then(() => {
          this.$notify({
            type: "success",
            title: "Sukces",
            text: "Pomyślnie usunięto waluty.",
          });
          this.fetchCurrencies();
        })
        .catch(() => {
          this.$notify({
            type: "error",
            title: "Error",
            text: "Coś poszło nie tak podczas usuwania walut.",
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
