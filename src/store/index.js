import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import users from './user.module'
import account from './account.module'
import queries from './query.module'
import upload from './upload.module'
import alerts from './alert.module'

const debug = process.env.NODE_ENV !== 'production'
console.log('Debug: ' + debug)
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        account,
        alerts,
        users,
        upload,
        queries,
    },
    state: {
        errorBanner: true,
    },
    mutations: {
        showErrorBanner(state, value) {
            state.errorBanner = value
        },
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})
