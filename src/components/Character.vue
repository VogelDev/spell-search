<template>
  <v-form v-model="valid" class="v-application">
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-alert
            type="error"
            v-if="error"
          >The character you tried to load doesn't exist, but you can create a new one here.</v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="character.name" label="Character Name" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-btn class="ma-2" text color="green" dark v-on:click="addClass">
            <v-icon left>mdi-plus</v-icon>Add Class
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-for="(c, i) in character.classes" v-bind:key="i">
        <v-col cols="12" md="12">
          <v-text-field v-model="c.name" label="Class Name" required></v-text-field>
          <v-text-field v-model="c.level" label="Class Level" required></v-text-field>
        </v-col>
        <v-row>
          <v-col cols="12" md="12">
            <v-btn class="ma-2" text color="red" dark v-on:click="removeClass(i)">
              <v-icon left>mdi-plus</v-icon>
              Remove Class {{c.name}}
            </v-btn>
          </v-col>
        </v-row>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <div class="text-center">
            <v-btn class="ma-2" color="green" dark v-on:click="saveCharacter">Save Character</v-btn>
            <v-btn class="ma-2" color="red" dark v-on:click="cancelCharacter">Cancel</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="typescript">
export default {
  data: () => ({
    valid: false,
    error: false,
    editing: false,
    character: {
      index: 0,
      name: "",
      classes: [{ name: "", level: "" }],
      spellbook: []
    }
  }),
  methods: {
    addClass() {
      this.character.classes.push({ name: "", level: "" });
    },
    removeClass(remove) {
      this.character.classes.splice(remove, 1);
    },
    saveCharacter() {
      if (this.editing) {
        this.$store.commit(
          "updateCharacter",
          this.character,
          this.$route.params.id
        );
      } else {
        this.$store.commit("addCharacter", this.character);
      }
      this.$router.replace({ path: "/" });
    },
    cancelCharacter() {
      this.$router.replace({ path: "/" });
    }
  },
  created() {
    let id = this.$route.params.id;
    if (id) {
      let characters = this.$store.getters.characters;
      if (id < characters.length) {
        this.character = characters[id];
        this.editing = true;
      } else {
        this.error = true;
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
