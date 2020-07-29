import queryService from '../services/query.service'
import i18n from '../plugins/i18n'

const getDefaultState = () => {
    return {
        queried: false,
        querying: false,
        error: null,
        result: [],
        downloading: false,
        downloaded: true,
        download_file: null,
        count: 0,
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
            commit('querySuccess', resp)
        } catch (error) {
            commit('queryFailure', error)
            dispatch('alerts/error', error, { root: true })
        }
    },
    download({ dispatch, commit }, { file }) {
        commit('downloadRequest', file)
        let resp = queryService.download(file).then(
            resp => {
                commit('downloadSuccess', file.id)
                return resp
            },
            error => {
                commit('downloadFailure', error)
                dispatch('alerts/error', error, { root: true })
            }
        )
        return resp
    },
    async delete({ dispatch, commit }, { file }) {
        commit('deleteRequest', file)
        try {
            await queryService.deleteFile(file)
            commit('deleteSuccess', file.id)
            dispatch('alerts/success', i18n.t('alerts.file_deleted', { name: file.file_standard_name }), { root: true })
        } catch (error) {
            commit('deleteFailure')
            dispatch('alerts/error', error, { root: true })
        }
    },
    async setInvalid({ dispatch, commit }, file) {
        try {
            let resp = await queryService.setInvalid(file)
            let payload = { resp, file }
            commit('setInvalidResult', payload)
            commit('alerts/success', ['Marked as invalid'], { root: true })
        } catch (error) {
            // commit('uploadMetaFailure', error, file, 'metaData')
            dispatch('alerts/error', error, { root: true })
        }
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
    querySuccess(state, resp) {
        state.queried = true
        state.querying = false
        if (resp.results) {
            // if pagination is requested resp contains multiple objects
            state.result = resp.results // page result items
            state.count = resp.count // resp.count // count of total items to return
        } else {
            state.result = resp // all items
        }
    },
    queryFailure(state) {
        state.queried = false
        state.querying = false
    },
    downloadRequest(state, file) {
        state.downloading = true
        state.download_file = file
    },
    downloadSuccess(state, id) {
        state.downloaded = true
        state.downloading = false
        let item = state.result.find(item => item.id === id)
        item.download_count = item.download_count + 0
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
    setInvalidResult(state, payload) {
        let index = state.result.find(file => file.id == payload.file.id)
        index.is_invalid = true
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
