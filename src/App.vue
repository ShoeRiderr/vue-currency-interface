<template>
  <div id="app">
    <nav-bar></nav-bar>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
export default {
  components: {
    NavBar,
  },
};
</script>
