<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary darken-2" flat>
                <v-toolbar-title>{{ $vuetify.lang.t($vuetify.welcomeMsg) }}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="username" label="Username" name="username" prepend-icon="person" type="text" />
                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary darken-2" @click="handleSubmit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'SignIn',
  computed: {
    ...mapState('account', ['status']),
    created() {
      // logout if user is logged in
      this.logout()
      return true
    },
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    handleSubmit() {
      this.submitted = true
      const { username, password } = this
      if (username && password) {
        this.login({ username, password })
      }
    },
  },
  data() {
    return {
      username: '',
      password: '',
      login_info: 'Users can retrieve additional data files',
      submitted: false,
      loading: false,
      returnUrl: '',
      error: '',
    }
  },
}
</script>

<!--<style scoped>-->
<!--h1 {-->
<!--  color: #294993;-->
<!--}-->
<!--</style>-->
