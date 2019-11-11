<template>
  <div>

    <div class="container">
      <ais-instant-search :search-client="searchClient" :routing="routing" index-name="index">
        <ais-configure v-bind="initial"/>
        <div class="search-panel">
          <div class="search-panel__filters">
            <div class="search-panel__filter">
              <h3>Classes</h3>
              <ais-refinement-list attribute="classes" searchable :refine="classes" />
            </div>
            <div class="search-panel__filter">
              <h3>Spell Level</h3>
              <ais-refinement-list :sort-by="['isRefined', 'name:asc']" attribute="level" />
            </div>
            <div class="search-panel__filter">
              <h3>Spell School</h3>
              <ais-refinement-list :transform-items="transformSchool" attribute="school" />
            </div>
          </div>

          <div class="search-panel__results">
            <ais-search-box placeholder="Search for spells" class="searchbox" :query="query" />
            <ais-hits>
              <template slot="item" slot-scope="{ item }">
                <!-- <router-link :to="'/spell/'+item.objectID"> -->
                <router-link :to="{name: 'spell', params: {id: item.objectID}}">
                  <h1>
                    <ais-highlight :hit="item" attribute="name" />
                  </h1>
                </router-link>
              </template>
            </ais-hits>

            <div class="pagination">
              <ais-pagination />
            </div>
          </div>
        </div>
      </ais-instant-search>
    </div>
  </div>
</template>

<script>
import algoliasearch from "algoliasearch/lite";
import { Component, Vue } from "vue-property-decorator";
import "instantsearch.css/themes/algolia-min.css";
import { history } from "instantsearch.js/es/lib/routers";
import { simple } from "instantsearch.js/es/lib/stateMappings";

export default {
  props: {
    query: {
      type: String,
      default: ""
    },
    classes: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchClient: algoliasearch(
        "AXJTQE63QK",
        "44f8861a984d1d4ec6acc79a66736566"
      ),
      routing: {
        router: history(),
        stateMapping: simple()
      },
      initial: {
        disjunctiveFacetsRefinements: {
          classes: []
        }
      }
    };
  },
  created(){
    this.initial.disjunctiveFacetsRefinements.classes = this.classes ? this.classes.split(',') : [];
  },
  methods: {
    transformSchool(items) {
      return items.map(spell => {
        let school;
        // "C", null, "A", "EV", "N", "T", "EN", "D", "I"
        switch (spell.label) {
          case "EV":
            school = "Evocation";
            break;
          case "C":
            school = "Conjuration";
            break;
          case "A":
            school = "Abjuration";
            break;
          case "N":
            school = "Necromancy";
            break;
          case "T":
            school = "Transmutation";
            break;
          case "EN":
            school = "Enchanchment";
            break;
          case "D":
            school = "Divination";
            break;
          case "I":
            school = "Illusion";
            break;
          default:
            school = "Class spell";
        }
        return { ...spell, label: school };
      });
    }
  }
};
</script>

<style>
body,
h1 {
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.ais-Highlight-highlighted {
  background: cyan;
  font-style: normal;
}

.header {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(to right, #4dba87, #2f9088);
  color: #fff;
  margin-bottom: 1rem;
}

.header a {
  color: #fff;
  text-decoration: none;
}

.header-title {
  font-size: 1.2rem;
  font-weight: normal;
}

.header-title::after {
  content: " ▸ ";
  padding: 0 0.5rem;
}

.header-subtitle {
  font-size: 1.2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.search-panel {
  display: flex;
}

.search-panel__filters {
  flex: 1;
  margin-right: 1em;
  overflow-y: auto;
}

.search-panel__results {
  flex: 3;
}

.searchbox {
  margin-bottom: 2rem;
}

.pagination {
  margin: 2rem auto;
  text-align: center;
}
</style>
