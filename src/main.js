import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import i18n from './plugins/vuetify'
// import { mapState } from 'vuex'
import store from './store'
import FlagIcon from 'vue-flag-icon'
import './vee-validate'

Vue.use(FlagIcon)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App),
    theme: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
    },
    // computed: mapState(['token']),
}) //.$mount('#app')
