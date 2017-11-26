
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
  actions,
  state: {
    drawer: false,
    properties: [],
    token: null,
    gid: '',
    user: {},
    error: null
  },
  mutations: mutations.default,
  getters,
  plugins: [vuexLocal.plugin]
})

