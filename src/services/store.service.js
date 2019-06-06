
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: { 
        filter: {
            type: null,
            value: null
        },
        loading: false
    },
    mutations: {
      filter(state, newFilter) {
        state.filter = newFilter;
      },
      switchLoading(state) {
        state.loading = !state.loading;
        console.log('change', state.loading);
      }
    }
  })