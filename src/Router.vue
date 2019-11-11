<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <router-view />
    <Navigation />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
export default {
  name: "app",
  components: {
    Navigation
  },
  data() {
    return {
      msg: "Welcome to the spellbook."
    };
  }
};
</script>
<!-- styling for the component -->
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin: 10px;
}
</style>