import Vue from "vue";
import Vuex from "vuex";
import ApiService from "../services/api.service";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    filter: {
      type: null,
      value: null
    },
    games: [],
    loading: false
  },
  mutations: {
    filter(state, newFilter) {
      state.filter = { ...state.filter, ...newFilter };
    },
    switchLoading(state, value) {
      state.loading = value
    },
    updateGamesSuccess(state, games) {
      state.games = { ...state.games, ...games};
    },
    updateGamesFailure(state) {
      state.games = [];
    }
  },
  actions: {
    filter({ commit }, payload) {
      commit("filter", payload);
      commit('switchLoading',true);
      if (payload.value) {
        // let today = new Date();
        // today = today.toLocaleDateString("esp-ARG",{year:'numeric', month: '2-digit', day: '2-digit'})

        ApiService.get(`${payload.type}/${payload.value.id}/matches`).then(
          response => {
            const matches = response.data.matches;
            matches.map(game => {
              const formattedDate = new Date(game.utcDate);
              game.formattedDate =
                formattedDate.getFullYear() +
                "-" +
                (formattedDate.getMonth() + 1) +
                "-" +
                formattedDate.getDate() +
                " " +
                formattedDate.getHours() +
                ":" +
                formattedDate.getMinutes() +
                ":" +
                formattedDate.getSeconds();
            });
            commit('updateGamesSuccess', matches);
            commit('switchLoading',false);
          },
          () => {
            commit('updateGamesFailure');
            commit('switchLoading',false);
          }
        );
      } else {
        ApiService.get(`/matches?dateFrom=2018-06-22&dateTo=2018-06-30`).then(
          response => {
            const matches = response.data.matches;
            matches.map(game => {
              const formattedDate = new Date(game.utcDate);
              game.formattedDate =
                formattedDate.getFullYear() +
                "-" +
                (formattedDate.getMonth() + 1) +
                "-" +
                formattedDate.getDate() +
                " " +
                formattedDate.getHours() +
                ":" +
                formattedDate.getMinutes() +
                ":" +
                formattedDate.getSeconds();
            });
            commit('updateGamesSuccess', matches);
            commit('switchLoading',false);
          },
          () => {
            commit('updateGamesFailure');
            commit('switchLoading',false);
          }
        );
      }
    }
  }
});
