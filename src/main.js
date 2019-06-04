import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Router from 'vue-router'

Vue.config.productionTip = false

import Games from './views/Games.vue'
import GameDetails from './views/GameDetails.vue'
import ApiService from './services/api.service'

const routes = [
  { path: '/', component: Games},
  { path: '/games/:id', component: GameDetails} 
]

Vue.use(Router)

const router = new Router({ 
  base: process.env.BASE_URL,
  mode: 'history',
  routes});

ApiService.init();
ApiService.setHeader();

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
