import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import FlagIcon from 'vue-flag-icon'
import './plugins/vee-validate'
import i18n from './plugins/i18n'
import './components/_globals'

Vue.use(FlagIcon)
console.log()
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App),
}).$mount('#app')
