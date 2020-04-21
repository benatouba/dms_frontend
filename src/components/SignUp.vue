<template>
  <div>
    <h1>Please Sign Up</h1>
    <input v-model="user" placeholder="Enter Username" /> <br />
    <input v-model="email" placeholder="Enter EMail" /> <br />
    <input v-model="institution" placeholder="Enter Institution" /> <br />
    <input v-model="password" placeholder="Enter Password" /><br />
    <input v-model="password2" placeholder="Repeat Password" /><br />
    <button v-on:keyup="createUser()">SignUp</button>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  methods: {
    createUser() {
      fetch("http://localhost:8000/login/", {
        method: "GET"
      });
    }
  },
  data() {
    return {
      user: "",
      password: "",
      password2: "",
      email: "",
      institution: ""
    };
  }
};
</script>

<style scoped>
h1 {
  color: darkblue;
}
</style>
