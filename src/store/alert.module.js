const state = {
    type: null,
    message: null,
    loginInfo: true,
}

const getters = {
    loginInfo: state => {
        return state.loginInfo
    },
}
const actions = {
    success({ commit }, message) {
        commit('success', message)
    },
    error({ commit }, message) {
        commit('error', message)
    },
    clear({ commit }) {
        commit('clear')
    },
    disableLoginInfo({ commit }) {
        commit('disable_login_info')
    },
}

const mutations = {
    success(state, message) {
        state.type = 'alert-success'
        state.message = message
    },
    error(state, error) {
        state.type = 'alert-danger'
        state.status = error.status
        state.message = error.message
    },
    clear(state) {
        state.type = null
        state.message = null
    },
    disable_login_info(state) {
        state.loginInfo = false
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
