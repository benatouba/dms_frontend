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
    toggleLoginInfo({ commit }) {
        commit('toggleLoginInfo')
    },
}

const mutations = {
    success(state, message) {
        state.type = 'success'
        state.message = message
    },
    error(state, error) {
        state.type = 'error'
        state.status = error.status
        state.message = error.message
    },
    clear(state) {
        state.type = null
        state.message = null
    },
    toggleLoginInfo(state) {
        state.loginInfo = !state.loginInfo
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
