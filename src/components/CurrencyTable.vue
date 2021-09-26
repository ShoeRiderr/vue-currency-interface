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
      <tr v-for="(currency, index) in currencies" :key="index">
        <td>{{ currency.currency }}</td>
        <td>{{ currency.code }}</td>
        <td>{{ currency.mid || "-" }}</td>
        <td>{{ currency.ask || "-" }}</td>
        <td>{{ currency.bid || "-" }}</td>
        <td>{{ currency.updated_at }}</td>
        <td>
          <input
            type="checkbox"
            name="currencies[]"
            :value="currency.id"
            v-model="checkedCurrencies[index]"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    currencies: {
      required: true,
      type: Array,
    },

    data() {
      return {
        checkedCurrencies: [],
      };
    },

    watch: {
      checkedCurrencies: {
        deep: true,

        handler() {
          this.$emit("checked", this.checkedCurrencies);
        },
      },
    },
  },
};
</script>
