function getInitialInfoState() {
    return {
        type: null,
        message: null,
        fatal: null,
        errors: null,
        warnings: null,
        status: 0,
    }
}
const state = {}
state.info = getInitialInfoState()
state.loginInfo = true

const actions = {
    success({ commit }, message) {
        commit('success', { message, status: 1 })
    },
    error({ commit }, message) {
        commit('error', { message, status: 3 })
    },
    clear({ commit }) {
        commit('clear')
    },
    showLoginInfo({ commit }, isTrue) {
        commit('showLoginInfo', isTrue)
    },
}
let types = ['info', 'success', 'warning', 'error', 'error']
const mutations = {
    success(state, result) {
        Object.entries(result).forEach(item => {
            state.info[item[0]] = item[1]
        })
        state.info.type = types[result.status]
    },
    error(state, result) {
        Object.entries(result).forEach(item => {
            state.info[item[0]] = item[1]
        })
        state.info.type = types[result.status]
    },
    showLoginInfo(state, isTrue) {
        state.loginInfo = isTrue
    },
    clear(state) {
        state.info = getInitialInfoState()
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
