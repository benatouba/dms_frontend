const state = {
    type: null,
    message: null,
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
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
