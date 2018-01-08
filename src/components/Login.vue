<template>
  <v-container>
    <v-alert 
      class="error" 
      icon="warning" 
      :value="alert"
      transition="scale-transition"
    >
      {{error}}
    </v-alert> 
    <v-card color="grey lighten-4" flat>
    <v-card-text>
    <v-form v-model="valid">
      <v-container fluid>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              label="Email"
              v-model="email"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              name="input-10-2"
              required
              label="Enter your password"
              hint="At least 4 characters"
              min="4"
              :append-icon="e2 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e2 = !e2)"
              v-model="password"
              :type="e2 ? 'password' : 'text'"
              counter
            ></v-text-field>
                <v-btn
                  @click="submit"
                  :disabled="!valid"
                > Login
                </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>  
    </v-card-text>
  </v-card>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'Login',
    data () {
      return {
        valid: false,
        alert: false,
        e2: false,
        password: '',
        email: ''
        // emailRules: [
        //   (v) => !!v || 'E-mail is required',
        //   (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        // ]
      }
    },
    watch: {
      'isAuthenticated': function (v) {
        if (v) {
          this.$router.push({path: '/dashboard'})
        }
      },

      'error': function (v) {
        if (v) this.alert = true
      }
    },

    computed: {
      ...mapGetters([
        'isAuthenticated'
      ]),

      person () {
        return this.$store.state.person
      },
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

      error () {
        return this.$store.state.error
      }
    },

    methods: {
      ...mapActions([
        'login'
      ]),

      submit () {
        // hint member@somewhere.com member
        const credentials = {email: this.email, password: this.password}
        this.login(credentials)
      }
    }

  }
</script>

<style lang="stylus">
  @import '../stylus/main'
</style>