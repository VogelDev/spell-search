<template>
  <div>
    <header class="header">
      <h1 class="header-title">
        <a href="/">Spellbook</a>
      </h1>

      <div class="container">
        <!-- <ais-instant-search index-name="index" :search-client="searchClient"> -->
          <!-- Widgets -->
        <!-- </ais-instant-search> -->
        <ais-instant-search :search-client="searchClient" index-name="index">
          <div class="search-panel">
            <v-row align="center">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header expand-icon="mdi-menu-down">Choose a class</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="search-panel__filters">
                      <ais-refinement-list attribute="classes" searchable />
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
            <v-row align="center">
              <div class="search-panel__results">
                <ais-search-box placeholder="Search here…" class="searchbox" />
                <ais-hits>
                  <template slot="item" slot-scope="{ item }">
                    <v-card class="mx-auto" max-width="344">
                      <v-card-text>
                        <div>
                          <ais-highlight :hit="item" attribute="name" />
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn text color="deep-purple accent-4">Add Spell</v-btn>
                        <v-btn text color="deep-purple accent-4">Learn More</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </ais-hits>

                <div class="pagination">
                  <ais-pagination />
                </div>
              </div>
            </v-row>
          </div>
        </ais-instant-search>
      </div>
      <p class="header-subtitle">
        using
        <a href="https://github.com/algolia/vue-instantsearch">Vue InstantSearch</a>
      </p>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Vuetify from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";
import algoliasearch from "algoliasearch/lite";
// import "instantsearch.css/themes/algolia-min.css";

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  data() {
    return {
      searchClient: algoliasearch(
        "GZCCNOE2M5",
        "542f1f216361f603770ceecd954ca5cd"
      )
    }
  }
}
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
