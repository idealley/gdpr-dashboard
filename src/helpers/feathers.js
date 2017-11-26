import Feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import authentication from 'feathers-authentication/client'
import rest from 'feathers-rest/client'
import axios from 'axios'

// Configure Feathers client
const restClient = rest(process.env.FEATHERS_HOST || 'http://localhost:3030')
const feathers = Feathers()
  .configure(restClient.axios(axios))
  .configure(hooks())
  .configure(authentication({storage: window.localStorage}))

import Vue from 'vue'
import VueFeathers from 'vue-feathers'
Vue.use(VueFeathers, feathers)

export default feathers
