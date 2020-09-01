import Vue from 'vue'
import App from './App.vue'
import Maintenance from './Maintenance.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import FlagIcon from 'vue-flag-icon'
import './plugins/vee-validate'
import i18n from './plugins/i18n'
import './components/_globals'

Vue.use(FlagIcon)

Vue.config.productionTip = false
let maintenance = false

if (maintenance) {
    new Vue({
        el: '#app',
        vuetify,
        i18n,
        render: h => h(Maintenance),
    }).$mount('#app')
} else {
    new Vue({
        el: '#app',
        router,
        store,
        vuetify,
        i18n,
        render: h => h(App),
    }).$mount('#app')
}
