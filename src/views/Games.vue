<template>
    <div>
        <v-flex v-if="activeFilter.value">
            <div class="text-xs-left">
                <v-chip :key="activeFilter.type" close @input="handleClose()">{{activeFilter.value.name}}</v-chip>
            </div>
        </v-flex>
        <v-layout row wrap v-if="!loading">
            <v-flex v-for="game in games" :key="game.id" xs12 sm6 class="pa-2">
                <v-card class="card" :to="`/games/${game.id}`">
                    <v-card-title primary-title>
                    <div>
                        <h3 class="mb-0">{{game.homeTeam.name}} vs {{game.awayTeam.name}}</h3>
                        <div>{{ game.formattedDate }}  </div>
                    </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout align-center v-if="loading" >
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-layout>
    </div>
</template>

<script>
import { store } from './../services/store.service';

export default {
  methods: {
    changeFilter() {},
    handleClose(){
      store.dispatch('filter',{type: null, value: null})
    }
  },
  computed: {
    activeFilter () {
      return this.$store.state.filter;
    },
    loading() {
      return this.$store.state.loading;
    },
    games () {
      return this.$store.state.games
    }
  }
};
</script>
<style>
.card{
    transition: all .2s ease-in-out;
}
.card:hover{
    transform: scale(1.02);
    cursor:pointer;
}

</style>
