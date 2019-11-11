<template>
    <!-- the router outlet, where all matched components would ber viewed -->
    <!-- <router-link v-bind:to="'/'">Home</router-link> | <router-link :to="'/spellfinder'">SpellFinder</router-link> -->
  <v-bottom-navigation
    absolute
    grow
    color="deep-purple accent-4"
  >
    <v-btn to="/">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/spellfinder">
      <span>Spellfinder</span>
      <v-icon>mdi-book-open-page-variant</v-icon>
    </v-btn>

    <v-btn :to="`/character/${$store.getters.currentCharacter.index}`">
      <span>Edit Character</span>
      <v-icon>mdi-pencil-outline</v-icon>
    </v-btn>

    <v-btn to="/character">
      <span>Add Character</span>
      <v-icon>mdi-account-plus</v-icon>
    </v-btn>
  </v-bottom-navigation>
  
</template>

<script>
  export default {
    data () {
      return {
        activeBtn: 0,
      }
    },
  }
</script>