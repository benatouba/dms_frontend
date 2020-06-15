import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import VueI18n from 'vue-i18n'
// import en from '../assets/locale_en'
// import de from '../assets/locale_de'

// Vue.use(VueI18n)
Vue.use(Vuetify)

// define messages in both languages
// const messages = { en: en, de: de }

// Create VueI18n instance with options
// export const i18n = new VueI18n({
//     locale: 'en',
//     fallbackLocale: 'de',
//     messages, // set locale messages
// })

// create vuetify instance and settings
export default new Vuetify({
    iconfont: 'md',
    theme: {
        primary: '#294993',
        secondary: '#0563C1',
        success: '#3cd1c2',
        info: '#ffaa2c',
        error: '#f83e70',
        warning: '#faffc7',
    },
    // lang: {
    //     t: (key, ...params) => i18n.t(key, params),
    // },
})
