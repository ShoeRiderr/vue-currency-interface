<template>
  <div>
    <div v-if="!isLoggedIn" class="alert alert-info" role="alert">
      <router-link :to="{ name: 'Login' }"> Zaloguj się </router-link>, żeby
      rozpocząć
    </div>
    <div v-else>
      <h2>Lista walut</h2>
      <div v-if="!hasCurrencies" class="alert alert-info" role="alert">
        Aktualnie nie ma żadnych walut.
      </div>

      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Waluta</th>
            <th>Skrócona nazwa</th>
            <th>Uśredniony kurs wymiany</th>
            <th>Cena kupna</th>
            <th>Cena sprzedaży</th>
            <th>Data pobrania informacji</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(currency, index) in currencies" :key="index">
            <td>{{ currency.currency }}</td>
            <td>{{ currency.code }}</td>
            <td>{{ currency.mid || "-" }}</td>
            <td>{{ currency.ask || "-" }}</td>
            <td>{{ currency.bid || "-" }}</td>
            <td>{{ currency.updated_at }}</td>
            <td>
              <input type="checkbox" v-model="checkedCurrencies[currency.id]" />
            </td>
          </tr>
        </tbody>
      </table>

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

export default {
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
    fetchCurrencies() {
      this.$axios
        .get("/api/bank")
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
      const chckedCurrencies = this.$lodash.mapValues(
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
          currencies: chckedCurrencies,
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
