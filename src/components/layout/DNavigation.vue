<template>
    <v-navigation-drawer
        v-if="isAuthenticated"
        app
        fixed
        disable-route-watcher
        persistent
        v-model="drawer" 
        :mini-variant="mini" 
        light
        >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
              <v-list-tile-action>
                <v-icon>chevron_right</v-icon>
              </v-list-tile-action>
          </v-list-tile>
            <v-list-tile avatar tag="div">
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{user.firstName}}
                  {{user.lastName}}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click.stop="mini = !mini">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Application
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile :href="item.route" v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'd-navigation',
    data () {
      return {
        fixed: false,
        mini: false,
        items: [
          { title: 'Dashboard', icon: 'dashboard', route: '/dashboard' }
        ],
        right: null
      }
    },

    methods: {
      ...mapActions([
        'setDrawer'
      ])
    },

    computed: {
      ...mapGetters([
        'isAuthenticated'
      ]),

      drawer: {
        get: function () {
          return this.$store.state.drawer
        },
        set: function (value) {
          this.setDrawer(value)
        }
      },

      user () {
        return this.$store.state.user
      }
    }

  }
</script>

<style lang="stylus">
  @import '../../stylus/main'
</style>
