function getInitialInfoState() {
    return []
}
let state = {}
state.infos = getInitialInfoState()
state.loginInfo = true

const actions = {
    info({ commit }, payload) {
        commit('info', payload)
    },
    removeInfo({ commit }, id) {
        commit('removeInfo', id)
    },
    clear({ commit }) {
        commit('clear')
    },
    showLoginInfo({ commit }, isTrue) {
        commit('showLoginInfo', isTrue)
    },
}
// let types = ['info', 'success', 'warning', 'error', 'error']
const mutations = {
    info(state, payload) {
        let item_id = state.infos.findIndex(x => (x.message = payload.message))
        if (item_id !== -1) {
            state.infos.splice(item_id, 1)
        }
        state.infos.push(payload)
    },
    removeInfo(state, id) {
        state.infos.splice(id, 1)
    },
    showLoginInfo(state, isTrue) {
        state.loginInfo = isTrue
    },
    clear(state) {
        state.infos.splice(0, state.infos.length)
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
