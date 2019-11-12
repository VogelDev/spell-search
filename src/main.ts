import Vue from 'vue'
import Router from './Router.vue'
import store from './store'
import InstantSearch from 'vue-instantsearch';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import VueRouter from 'vue-router'
//import the hello component
import SpellFinder from './components/SpellFinder.vue'
import Spell from './components/Spell.vue'
import Character from './components/Character.vue'
import Hello from './components/Hello.vue'

Vue.use(VueRouter)
Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})
Vue.use(InstantSearch);
Vue.config.productionTip = false

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes : [
    //route for the home route of the web page
    { path: '/', component: Hello },
    //route for the about route of the web page
    { 
      name: 'spellfinder',
      path: 'dist/spellfinder', 
      component: SpellFinder,
      props: route => ({ query: route.query.q, classes: route.query.classes }),
    },
    { 
      name: 'spell',
      path: 'dist/spell/:id', 
      component: Spell,
    },
    { 
      name: 'character',
      path: 'dist/character/:id', 
      component: Character,
    },
    { 
      name: 'character',
      path: 'dist/character', 
      component: Character,
    }
  ],
  base: 'spell-search/dist',
  mode: 'history'
})

new Vue({
  store,
  render: h => h(Router),
  router,
}).$mount('#app')
