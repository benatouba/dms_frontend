<template>
  <!--<h1 v-bind:title="login_info">Please Login</h1>
    <input v-model="user" placeholder="Enter Username"> <br>
    <input v-model="password" placeholder="Enter Password"><br>
    <button v-on:keyup=login()>Login</button>
    Don't have an Account yet?
    <router-link to="signup">SignUp</router-link>-->
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn :href="source" icon large target="_blank" v-on="on">
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="https://codepen.io/johnjleider/pen/pMvGQO"
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-codepen</v-icon>
                    </v-btn>
                  </template>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  />

                  <v-text-field
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
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "SignIn",
  /*props: {
    source: String
  },
  vuetify: new Vuetify(),*/
  methods: {
    login() {
      fetch("http://localhost:8000/login/", {
        method: "GET"
      });
    }
  },
  data() {
    return {
      user: "",
      password: "",
      login_info: "Users can retrieve additional data files"
    };
  }
};
</script>

<style scoped>
h1 {
  color: #294993;
}
</style>
