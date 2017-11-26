import * as types from './mutation-types'
import store from './store'
import { HTTP } from '../helpers/http'
import feathers from '../helpers/feathers'

export const toggleDrawer = ({ commit }) => {
  commit(types.TOGGLE_DRAWER, err => { console.log(err) })
}

export const getData = ({ commit, dispatch }) => {
  const route = `dashboard/${store.state.user.id}`
  HTTP
  .get(route)
  .then(response => {
    commit(types.SET_DATA, response, err => { console.log(err) })
  })
  .catch(e => {
    console.log(e)
  })
}

export const setDrawer = ({ commit }, data) => {
  commit(types.SET_DRAWER, data, err => { console.log(err) })
}

export const authenticate = ({commit}) => {
  return feathers.authenticate()
    .then(result => commit(types.LOGIN, result))
}

// Login user with email / password
export const login = ({commit, dispatch}, payload) => {
  return feathers.authenticate({strategy: 'local', ...payload})
    .then(res => {
      commit(types.LOGIN, res)
      return feathers.passport.verifyJWT(res.accessToken)
    })
    .then(payload => {
      return feathers.service('users').get(payload.userId)
    })
    .then(user => {
      feathers.set('user', user)
      commit(types.SET_USER, user)
      dispatch('getData')
    })
    .catch(error => {
      console.error('Error authenticating!', error)
      commit(types.SET_ERROR, error)
    })
}

// Logout user
export const logout = ({commit}) => {
  return feathers.logout()
    .then(result => {
      window.localStorage.removeItem('vuex')
      commit(types.LOGOUT)
    })
}

// Register and login new user
export const register = ({dispatch, commit}, payload) => {
  return feathers.service('users').create({...payload})
    .then(result => dispatch('login', {...payload}))
}
