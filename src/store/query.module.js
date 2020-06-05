import { queryService } from '../services/query.service'

const state = {
    queried: false,
    querying: false,
    error: null,
    result: null,
    downloading: false,
    downloaded: true,
    download_file: null,
}

const getters = {
    queriedFiles: state => {
        return state.result
    },
}

const actions = {
    query({ dispatch, commit }, { input }) {
        commit('queryRequest')
        queryService.query(input).then(
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
    queryRequest(state) {
        state.querying = true
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
