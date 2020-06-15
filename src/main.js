import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import FlagIcon from 'vue-flag-icon'
import './plugins/vee-validate'
import i18n from './plugins/i18n'

Vue.use(FlagIcon)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    let language = to.params.lang
    if (!language) {
        language = 'en'
    }

    i18n.locale = language
    next()
})

new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App),
}).$mount('#app')

i18n.locale = 'de'
