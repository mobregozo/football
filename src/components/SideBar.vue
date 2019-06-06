<template>
  <div>
    <v-btn @click="changeFilter( null, null)"> Home </v-btn>
    <!-- clubs -->
    <v-list subheader>
      <v-subheader>Clubs</v-subheader>
      <v-spacer></v-spacer>
      <template v-for="item in clubs">
        <v-list-tile v-if="item.name" :key="item.name">
            <v-btn @click="changeFilter('teams', item)">{{ item.name }}</v-btn>
         </v-list-tile >
      </template>
    </v-list>
    <!-- Competitions -->
    <v-list subheader>
      <v-subheader>Competitions</v-subheader>
      <v-spacer></v-spacer>
      <template v-for="item in competitions">
        <v-list-tile v-if="item.name" :key="item.name" @click="changeFilter('competitions', item)">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
import { store } from "./../services/store.service";

const clubsList = [
  { id: 73, name: "Tottenham" },
  { id: 678, name: "Ajax" },
  { id: 65, name: "Manchester City" },
  { id: 78, name: "Atletico de Madrid" },
  { id: 109, name: "Juventus" },
  { id: 81, name: "Barcelona" }
];

const competitionList = [{ id: 2001, name: "UEFA Champions League" }];

export default {
  name: "SideBar",
  data: function() {
    return {
      clubs: clubsList,
      competitions: competitionList
    };
  },
  methods: {
    changeFilter(type, value) {
      store.commit('filter', {type, value});
      this.$router.push('/games')
    }
  }
};
</script>

<style>
</style>
