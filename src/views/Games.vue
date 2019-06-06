<template>
    <div>
        <v-flex v-if="filter.value">
            <div class="text-xs-left">
                <v-chip :key="filter.type" close @input="handleClose()">{{filter.value.name}}</v-chip>
            </div>
        </v-flex>
        <v-layout row wrap v-if="!loading">
            <v-flex v-for="game in matches" :key="game.id" xs6 class="pa-2">
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
import ApiService from "../services/api.service";
import { store } from './../services/store.service';

export default {
  data: function() {
    return {
      matches: []
    };
  },
  methods: {
    changeFilter() {},
    handleClose(){
      store.commit('filter',{type: null, value: null})
    },
    handlerFilter(filter) {
        store.commit('switchLoading')
        if (filter.value){
          // let today = new Date();
          // today = today.toLocaleDateString("esp-ARG",{year:'numeric', month: '2-digit', day: '2-digit'})

          ApiService.get(`${filter.type}/${filter.value.id}/matches`).then(
            response => {
              this.matches = response.data.matches;
              this.matches.map( game =>{
                const formattedDate = new Date(game.utcDate)
                game.formattedDate = formattedDate.getFullYear() + "-" + (formattedDate.getMonth() + 1) + "-" + formattedDate.getDate() + " " + formattedDate.getHours() + ":" + formattedDate.getMinutes() + ":" + formattedDate.getSeconds()
              })
              store.commit('switchLoading', false);
              },
            error => {
              this.info = error;
              store.commit('switchLoading', false);
            }
          );
        }else{
          ApiService.get(`/matches?dateFrom=2018-06-22&dateTo=2018-06-30`).then(
            response => {
              this.matches = response.data.matches;
              this.matches.map( game =>{
                const formattedDate = new Date(game.utcDate)
                game.formattedDate = formattedDate.getFullYear() + "-" + (formattedDate.getMonth() + 1) + "-" + formattedDate.getDate() + " " + formattedDate.getHours() + ":" + formattedDate.getMinutes() + ":" + formattedDate.getSeconds()
              })
              store.commit('switchLoading', false);
              },
            error => {
              this.info = error
              store.commit('switchLoading', false);
            }
          );
        }
      }
  },
  computed: {
    filter () {
      return this.$store.state.filter;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  created() {
    this.handlerFilter(this.filter);
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
