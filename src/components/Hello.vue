<template>
  <div class="hello">
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="8">
          <ul>
            <li v-for="(character, i) in $store.getters.characters" :key="i">
              <div class="my-2">
                <v-btn text small v-on:click="loadCharacter(i)">{{character.name}}</v-btn>
              </div>
            </li>
          </ul>
        </v-col>
        <v-col cols="6" md="4">
          <ul>
            <li v-for="spell in $store.getters.spellbook" :key="spell.objectID">
                <router-link :to="{name: 'spell', params: {id: spell.objectID}}">
                    {{spell.name}}
                </router-link>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {};
  },
  methods: {
    loadCharacter(character) {
      this.$store.commit("setCurrentCharacter", character);
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>