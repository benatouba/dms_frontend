<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary darken-2" flat>
                <v-toolbar-title>Hello {{ username }}, Please Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                          v-model="username"
                          label="Login"
                          name="username"
                          prepend-icon="person"
                          type="text"
                  />

                  <v-text-field v-model="password"
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
                <v-btn color="primary darken-2" @click="login(username, password)">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { required } from "vuelidate/lib/validators";
  import { mapState } from "vuex";
  // import { mapState } from 'vuex';
  export default {
    name: "SignIn",
    validations: {
      username: { required },
      password: { required }
    },
    computed: {
      ...mapState('account', ['status']),
      username: {
        get () {
          return this.$store.state.username
        },
        set (value) {
          this.$store.commit('updateUsername', value)
        }
      },
    },
    methods: {
      updateUsername: function (e) {
        this.$store.commit('updateUsername', e.target.value)
      },
      login: function () {
        const { username, password } = this

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", password);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

        fetch("http://localhost:8000/auth/login/", requestOptions)
                .then(response => response.text())
                .then(result => this.$store.commit('tokenize', result))
                .catch(error => console.log('error', error));
      }
    },
    data() {
      return {
        username: '',
        password: "",
        login_info: "Users can retrieve additional data files",
        submitted: false,
        loading: false,
        returnUrl: "",
        error: ""
      };
    }
  };
</script>

<style scoped>
  h1 {
    color: #294993;
  }
</style>
