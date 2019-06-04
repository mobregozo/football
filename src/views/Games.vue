<template>
    <div>
        <v-flex v-if="shareData.filter.value">
            <div class="text-xs-left">
                <v-chip :key="shareData.filter.type" close @input="handleClose()">{{shareData.filter.value.name}}</v-chip>
            </div>
        </v-flex>
        <v-layout row wrap>
            <v-flex v-for="game in matches" :key="game.id" xs6 class="pa-2">
                <v-card class="card" :to="`/games/${game.id}`">
                    <v-card-title primary-title>
                    <div>
                        <h2 class="headline mb-0">{{game.homeTeam.name}} vs {{game.awayTeam.name}}</h2>
                        <div>{{ new Date(game.utcDate) }}  </div>
                    </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import ApiService from "../services/api.service";
import { stateManager } from "../services/store.service";

export default {
  data: function() {
    return {
      matches: [],
      shareData: stateManager.state
    };
  },
  methods: {
    changeFilter() {},
    handleClose(){
      stateManager.clearFilter();
    }
  },
  watch: {
    "shareData.filter": {
      handler(newValue) {
        if (newValue.value){
          // let today = new Date();
          // today = today.toLocaleDateString("esp-ARG",{year:'numeric', month: '2-digit', day: '2-digit'})
          ApiService.get(`${newValue.type}/${newValue.value.id}/matches`).then(
            response => (this.matches = response.data.matches),
            error => (this.info = error)
          );
        }else{
          this.matches = [];
        }
      }
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
