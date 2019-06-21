<template>
  <v-app dark>
    <side-bar app></side-bar>
    <v-toolbar app>FOOTBALL DASHBOARD</v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app class="pa-3">
        <v-spacer></v-spacer>
        <div>&copy; Manuel Obregozo {{ new Date().getFullYear() }}</div>
      </v-footer>
  </v-app>
</template>

<script>

import SideBar from './components/SideBar.vue'

export default {
  name: 'App',
  components: {
    SideBar
  },
  data () {
    return {
      //
    }
  }
}
</script>
