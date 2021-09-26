<template>
  <div>
    <div v-if="!hasCurrencies" class="alert alert-info" role="alert">
      Brak ulubionych walut.
    </div>
    <div v-else>
      <h2>Lista walut</h2>

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
          state: actionType.REMOVE_FAVOURITES,
          currencies: chckedCurrencies,
        })
        .then((response) => {
          this.currencies = this.$lodash.get(response.data, "data", []);
          this.$notify({
            type: "success",
            title: "Sukces",
            text: "Pomyślnie usunięto waluty.",
          });
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
  },
};
</script>
