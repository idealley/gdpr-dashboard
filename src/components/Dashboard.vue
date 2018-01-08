<template>
  <v-container v-if="isAuthenticated">
    <v-layout row >
      <v-flex xs12 sm12 md8 lg8 offset-md2 offset-lg2>
        <v-card id="test" class="card--flex-toolbar">
          <v-toolbar card class="white">
            <v-toolbar-title class="body-2 grey--text">
              {{user.firstName}}
              {{user.lastName}}<br>
              User ID: {{user.id}} GRAKN ID: {{gid}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
          <v-alert 
            class="error" 
            icon="warning" 
            :value="alert"
            transition="scale-transition"
          >
            {{error}}
          </v-alert> 
          <v-layout v-if="properties" row wrap>
            <v-flex xs12>
              <v-list>
                <v-list-group 
                  v-for="item in properties" 
                  :value="item.active" 
                  v-bind:key="item.title"
                >
                  <v-list-tile slot="item" @click="">
                    <v-list-tile-action>
                      <v-icon>{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{item.name}}: {{item.value}}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon>keyboard_arrow_down</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile v-for="system in item.systems" v-bind:key="system.title" @click="">
                    <v-list-tile-content>
                      <v-list-tile-title>
                        <span 
                          :class="system.rel === 'revoke' ? system.rel : '' "
                        >
                          {{ system.system }}
                        </span>
                        <span 
                          style="text-decoration:none;" 
                          v-if="system.rel === 'revoke'"
                        >
                          - authorization revoked
                        </span>
                      </v-list-tile-title>
                      <v-list-tile-sub-title>{{ system.auth }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn 
                        small 
                        icon 
                        ripple
                        @click="toggle(item.value, system)"
                      >
                        <v-icon v-if="system.rel === 'revoke'" color="green darken-2">check</v-icon>
                        <v-icon v-if="system.rel !== 'revoke'" color="red darken-2">cancel</v-icon>
                      </v-btn>
                    </v-list-tile-action>  
                  </v-list-tile>
                </v-list-group>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { HTTP } from '../helpers/http'

  export default {
    name: 'Dashboard',
    data () {
      return {
        fixed: false,
        alert: false,
        error: ''
      }
    },

    watch: {
      'isAuthenticated': function (v) {
        if (!v) this.$router.push({path: '/login'})
      }
    },

    computed: {
      ...mapGetters([
        'isAuthenticated'
      ]),

      properties () {
        return this.$store.state.properties
      },

      skip () {
        return this.$store.state.skip
      },

      limit () {
        return this.$store.state.limit
      },

      user () {
        return this.$store.state.user
      },

      gid () {
        return this.$store.state.gid
      }
    },

    methods: {
      ...mapActions([
        'getData',
        'login'
      ]),

      fetchData () {
        this.getData()
      },

      toggle (property, system) {
        console.log('property:', property)
        const data = {
          property: property,
          type: system.rel === 'revoke' ? 'needs' : 'revoke',
          relId: system.relId,
          authId: system.authId
        }

        HTTP.defaults.headers.common['Authorization'] = this.$store.state.token
        HTTP.put('authorizations', data).then(res => {
          this.alert = false
          this.error = ''
          this.getData()
        }).catch(error => {
          this.alert = true
          this.error = error
        })
      }
    }

  }
</script>

<style lang="stylus">
  @import '../stylus/main'

  .revoke {
    text-decoration: line-through;
  }
</style>
