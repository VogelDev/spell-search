<template>
  <div class="card" style="width: 18rem;">
    <!-- <label class="switch">
      <input type="checkbox" v-model="prepared" />
      <span class="slider round"></span>
    </label>
    <button type="button" class="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>-->
    <div class="card-body">
      <h5 class="card-title">{{spell.name}}</h5>
      <h6 class="card-subtitle mb-2 text-muted" v-if="spell.level">Level: {{spell.level}}</h6>
      <h6 class="card-subtitle mb-2 text-muted">Cast Time: {{spell.time}}</h6>
      <h6 class="card-subtitle mb-2 text-muted">School: {{spell.school}}</h6>
      <h6 class="card-subtitle mb-2 text-muted">Duration: {{spell.duration}}</h6>
      <h6 class="card-subtitle mb-2 text-muted">Range: {{spell.range}}</h6>
      <p class="card-text">{{spell.text}}</p>
    </div>
    <button type="button" v-on:click="addSpell" aria-label="Close">Add to Spellbook</button>
  </div>
</template>

<script>
import algoliasearch from "algoliasearch/lite";
export default {
  name: "Spell",
  props: {
    spellSrc: Object
  },
  data() {
    return {
      searchClient: algoliasearch(
        "AXJTQE63QK",
        "44f8861a984d1d4ec6acc79a66736566"
      ),
      index: {},
      prepared: false,
      spell: {}
    };
  },
  methods: {
    addSpell() {
      //   console.log(this.spell);
      this.$store.commit("addSpell", this.spell);
      this.$router.replace({ path: "/" });
    }
  },
  watch: {
    prepared(newVal) {
      this.spell.prepared = newVal;
    }
  },
  created() {
    let id = this.$route.params.id || this.$route.query.id;
    if (id) {
      this.index = this.searchClient.initIndex("index");
      this.index.getObject(this.$route.params.id, (err, content) => {
        if (err) throw err;
        this.spell = content;
      });
    }
  }
};
</script>

<style scoped>
.card {
  display: inline;
  margin: 5px;
}
.card-text {
  max-height: 250px;
  overflow-y: auto;
}

@media print {
  .card-text {
    max-height: unset;
    overflow-y: visible;
    page-break-inside: avoid;
  }
  .switch input {
    opacity: unset;
    width: unset;
    height: unset;
  }
  .slider,
  .close {
    visibility: hidden;
  }
  .card {
    display: contents;
    page-break-inside: avoid;
  }
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

@media screen {
  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
