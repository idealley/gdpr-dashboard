import * as types from './mutation-types'

export default {
  [types.TOGGLE_DRAWER] (state) {
    state.drawer = !state.drawer
  },

  [types.SET_DRAWER] (state, data) {
    state.drawer = data
  },

  [types.SET_DATA] (state, data) {
    const {person, properties} = data.data
    state.gid = person.gid
    state.properties = properties
  },

  [types.SET_USER] (state, data) {
    state.user = data
  },

  [types.LOGIN] (state, data) {
    state.token = data.accessToken
  },

  [types.LOGOUT] (state) {
    state.token = null
    state.properties = []
    state.gid = ''
    state.user = {}
  },

  [types.SET_ERROR] (state, data) {
    state.error = data.message
  }
}
