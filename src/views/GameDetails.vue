<template>
  <div v-if="detail">
      {{detail.match.awayTeam.name}} - {{detail.match.homeTeam.name}} 

<!-- awayTeam: {id: 73, name: "Tottenham Hotspur FC"}
id: 73
name: "Tottenham Hotspur FC"
competition: {id: 2021, name: "Premier League"}
id: 2021
name: "Premier League"
group: "Regular Season"
homeTeam: {id: 67, name: "Newcastle United FC"}
id: 67
name: "Newcastle United FC"
id: 233026
lastUpdated: "2019-04-20T15:34:33Z"
matchday: 1
referees: [{id: 11551, name: "Martin Atkinson", nationality: null},…]
score: {winner: "AWAY_TEAM", duration: "REGULAR", fullTime: {homeTeam: 1, awayTeam: 2},…}
season: {id: 151, startDate: "2018-08-10", endDate: "2019-05-12", currentMatchday: 38, winner: null}
stage: "REGULAR_SEASON"
status: "FINISHED"
utcDate: "2018-08-11T11:30:00Z"
venue: "St. James' Park" -->


  </div>
</template>

<script>
import ApiService from "../services/api.service";
import { stateManager } from "../services/store.service";

export default {
  data: function() {
    return {
      detail: {
          info: 'test'
      },
      shareData: stateManager.state
    };
  },
  methods: {
    getDetails() {
      if (this.$route.params.id) {
        // let today = new Date();
        // today = today.toLocaleDateString("esp-ARG",{year:'numeric', month: '2-digit', day: '2-digit'})
        ApiService.get(`/matches/${this.$route.params.id}`).then(
          response => (this.detail = { match: response.data.match, stats: response.data.head2head}),
          error => (this.info = error)
        );
      } else {
        this.detail = {};
      }
    }
  },
  created() {
    this.getDetails();
  }
};
</script>