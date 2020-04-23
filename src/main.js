import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import i18n from './plugins/vuetify';
import { mapState } from 'vuex';
import { store } from "./store";
import FlagIcon from 'vue-flag-icon';
import "./vee-validate";

Vue.use(FlagIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
  computed: mapState([
      'token'
  ])
}).$mount("#app");
