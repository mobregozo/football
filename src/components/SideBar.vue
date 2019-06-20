
<template>
  <div>
    <v-navigation-drawer app class="hidden-sm-and-down">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">Football Dashboard</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list subheader>
        <v-divider></v-divider>
        <v-list-tile @click="changeFilter( null, null)">
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list subheader>
        <v-subheader>Clubs</v-subheader>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <template v-for="item in clubs">
          <v-list-tile v-if="item.name" :key="item.name" @click="changeFilter('teams', item)">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <v-divider></v-divider>
      <v-list subheader>
        <v-subheader>Competitions</v-subheader>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <template v-for="item in competitions">
          <v-list-tile
            v-if="item.name"
            :key="item.name"
            @click="changeFilter('competitions', item)"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list subheader>
          <v-divider></v-divider>
          <v-list-tile @click="changeFilter( null, null)">
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list subheader>
          <v-subheader>Clubs</v-subheader>
          <v-spacer></v-spacer>
          <v-divider></v-divider>
          <template v-for="item in clubs">
            <v-list-tile v-if="item.name" :key="item.name" @click="changeFilter('teams', item)">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-divider></v-divider>
        <v-list subheader>
          <v-subheader>Competitions</v-subheader>
          <v-spacer></v-spacer>
          <v-divider></v-divider>
          <template v-for="item in competitions">
            <v-list-tile
              v-if="item.name"
              :key="item.name"
              @click="changeFilter('competitions', item)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-menu>
    </v-toolbar>
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
      store.dispatch("filter", { type, value });
      this.$router.push("/games");
    }
  },
  created() {
    store.dispatch("filter", { type: null, value: null });
  }
};
</script>

<style>
</style>
