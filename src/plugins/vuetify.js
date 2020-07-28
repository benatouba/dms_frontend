import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    iconfont: 'md',
    theme: {
        themes: {
            light: {
                primary: '#294993',
                secondary: '#333333',
                success: '#27ba3a',
                error: '#f83e70',
                warning: '#ffaa2c',
                info: '#0563C1',
                accent: '#000000',
            },
        },
    },
})
