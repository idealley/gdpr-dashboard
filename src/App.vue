<template>
  <v-app class="Simple">
    <v-toolbar 
      app
      fixed
      clipped
      prominent
    >
      <v-toolbar-side-icon :disabled="!isAuthenticated" @click.stop="toggle"></v-toolbar-side-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :disabled="!isAuthenticated" @click.stop="logout()" icon>
        <v-icon>fa-sign-out</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout row>
          <transition name="test">
            <router-view></router-view> 
          </transition>
        </v-layout>
      </v-container>
    </v-content>
    <d-navigation></d-navigation>
    <d-footer></d-footer>
  </v-app>
</template>
<script>
  import DFooter from './components/layout/DFooter'
  import DNavigation from './components/layout/DNavigation'
  import { mapActions, mapState, mapGetters } from 'vuex'

  export default {
    name: 'App',
    data () {
      return {
        title: 'Dashboard',
        offsetTop: 0,
        height: 600,
        rightDrawer: false
      }
    },
    computed: {
      ...mapState([
        'drawer'
      ]),

      ...mapGetters([
        'isAuthenticated'
      ])
    },

    methods: {
      ...mapActions([
        'toggleDrawer',
        'logout'
      ]),

      toggle () {
        this.toggleDrawer()
      }
    },
    components: { DFooter, DNavigation }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  .transparent {
    background: transparent;
    background-size: cover;
  }

  .test-enter-active, .test-leave-active {
      transition: opacity 0.2s
      transition-timing-function: ease-in
  }
  .test-enter, .test-leave-to {
      opacity: 0
  }
</style>
