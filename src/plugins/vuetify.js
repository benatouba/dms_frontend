import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    iconfont: 'md',
    theme: {
        primary: '#294993',
        secondary: '#0563C1',
        success: '#3cd1c2',
        error: '#f83e70',
        warning: '#ffaa2c',
        info: '#faffc7',
        accent: '#000000',
    },
})
