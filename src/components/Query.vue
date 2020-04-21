<template>
  <div>
    <input v-model="query" placeholder="Search" /> <br />
    <v-btn @click="fetchQueryResults(this.query)" icon large target="_blank" v-on="on">
      <v-icon>mdi-cloud-search</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: "SignIn",
    methods: {
      fetchQueryResults: function (input) {
        fetch("http://127.0.0.1:8000/uc2list/", input)
                .then(resp => {
                          return resp.json();
                        }
                ).then(
                (jsonData) => {
                  this.files = jsonData;
                }
        );
      }
    },
    data() {
      return {
        query: ""
      };
    }
  };
</script>

<style scoped>
  h1 {
  color: darkblue;
}
</style>
