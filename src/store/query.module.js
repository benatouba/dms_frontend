import { queryService } from '../services/query.service'

const getDefaultState = () => {
    return {
        queried: false,
        querying: false,
        error: null,
        result: null,
        downloading: false,
        downloaded: true,
        download_file: null,
    }
}
const state = getDefaultState()

const getters = {
    queriedFiles: state => {
        return state.result
    },
}

const actions = {
    resetQueryState({ commit }) {
        commit('resetState')
    },
    query({ dispatch, commit }, input) {
        commit('queryRequest', input)
        queryService.query(input.search).then(
            result => {
                commit('querySuccess', result)
            },
            error => {
                commit('queryFailure', error)
                dispatch('alerts/error', error, { root: true })
            }
        )
    },
    download({ dispatch, commit }, { file }) {
        commit('downloadRequest', file)
        let result = queryService.download(file).then(
            result => {
                commit('downloadSuccess')
                return result
            },
            error => {
                commit('downloadFailure', error)
                dispatch('alerts/error', error, { root: true })
            }
        )
        return result
    },
}

const mutations = {
    resetState(state) {
        // Merge rather than replace so we don't lose observers
        // https://github.com/vuejs/vuex/issues/1118
        Object.assign(state, getDefaultState())
    },
    queryRequest(state, input) {
        state.querying = true
        state.query = input
    },
    querySuccess(state, result) {
        state.queried = true
        state.querying = false
        state.result = result
    },
    queryFailure(state) {
        state.queryed = false
        state.querying = false
    },
    downloadRequest(state, file) {
        state.downloading = true
        state.download_file = file
    },
    downloadSuccess(state) {
        state.downloaded = true
        state.downloading = false
    },
    downloadFailure(state) {
        state.downloaded = false
        state.downloading = false
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
