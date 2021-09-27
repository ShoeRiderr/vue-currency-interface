<template>
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
      <tr v-for="(currency, index) in currencies.data" :key="index">
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
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      checkedCurrencies: [],
    };
  },

  watch: {
    checkedCurrencies: {
      deep: true,

      handler() {
        this.$emit("input", this.checkedCurrencies);
      },
    },
  },

  computed: {
    ...mapState({
      currencies: (state) => state.currencies,
    }),
  },
};
</script>
