import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { mapState } from 'vuex';
import { store } from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  computed: mapState([
      'token'
  ])
}).$mount("#app");
