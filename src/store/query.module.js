import queryService from '../services/query.service'

const getDefaultState = () => {
    return {
        queried: false,
        querying: false,
        error: null,
        result: [],
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
    async search({ dispatch, commit }, input) {
        commit('queryRequest', input)
        try {
            let resp = await queryService.search(input)
            console.log(input)
            commit('querySuccess', resp)
        } catch (error) {
            commit('queryFailure', error)
            dispatch('alerts/error', error, {root: true})
        }
    },
    download({ dispatch, commit }, { file }) {
        commit('downloadRequest', file)
        let resp = queryService.download(file).then(
            resp => {
                commit('downloadSuccess')
                return resp
            },
            error => {
                commit('downloadFailure', error)
                dispatch('alerts/error', error, { root: true })
            }
        )
        return resp
    },
    delete({ dispatch, commit }, { file }) {
        commit('deleteRequest', file)
        let resp = queryService.deleteFile(file).then(
            resp => {
                commit('deleteSuccess', file.id)
                return resp
            },
            error => {
                commit('deleteFailure')
                dispatch('alerts/error', error, { root: true })
            }
        )
        return resp
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
        state.queried = false
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
    deleteRequest(state, file) {
        state.deleting = true
        state.deleting_file = file
    },
    deleteSuccess(state, id) {
        let index = state.result.findIndex(file => file.id == id)
        state.result.splice(index, 1)
        state.deleting = false
    },
    deleteFailure(state) {
        state.deleted = false
        state.deleted = false
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
