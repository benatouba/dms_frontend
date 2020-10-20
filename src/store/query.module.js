import queryService from '../services/query.service'
// import i18n from '../plugins/i18n'

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
        meta: [
            { name: 'institution', data: [] },
            { name: 'variable', data: [] },
            { name: 'site', data: [] },
            { name: 'license', data: [] },
        ],
    }
}
const state = getDefaultState()

const getters = {
    queriedFiles: state => {
        return state.result
    },
    meta: state => name => {
        return state.meta.find(item => item.name === name).data
    },
}

const actions = {
    resetQueryState({ commit }) {
        commit('resetQueryState')
    },
    resetState({ commit }) {
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
    async fetchMeta({ commit, dispatch }, name) {
        try {
            let data = await queryService.meta(name)
            commit('addMeta', { name, data })
        } catch (error) {
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
    async downloadAll({ dispatch, commit }, { ids }) {
        commit('downloadRequest', ids)
        try {
            let resp = await queryService.downloadAll(ids)
            if (resp.status === 200) {
                commit('downloadSuccess', ids)
            } else {
                throw resp.message
            }
        } catch (error) {
            commit('downloadFailure', error)
            dispatch('alerts/error', error, { root: true })
        }
    },
    async delete({ dispatch, commit }, files) {
        commit('deleteRequest', files)

        if (!Array.isArray(files)){
            files = Array(files);
        }

        let successCount = 0
        let errorCount = 0
        let lastResp
        let lastError
        for (const file of files) {
            try {
                lastResp = await queryService.deleteFile(file)
                commit('deleteSuccess', file.id)
                successCount++
                console.log(lastResp)
            } catch (error) {
                commit('deleteFailure')
                lastError = error
                errorCount++
            }
        }
        if(files.length === 1){
            if (errorCount === 1){
                dispatch('alerts/error', lastError, {root: true})
            }else{
                dispatch('alerts/success', lastResp, {root: true})
            }
        }else{
            if (errorCount !== 0){
                dispatch('alerts/error', `${errorCount} files could not be deleted. ${successCount} 
                                          files were successfully deleted.`, {root: true})
            }else{
                dispatch('alerts/success', `${successCount} files were successfully deleted.`, {root: true})
            }
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
    resetQueryState(state) {
        state.queried = false
        state.querying = false
        state.error = null
        state.result = []
        state.downloading = false
        state.downloaded = true
        state.download_file = null
        state.count = 0
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
    addMeta(state, input) {
        let item = state.meta.find(obj => obj.name === input.name)
        item.data.push(...input.data)
    },
    downloadRequest(state, file) {
        state.downloading = true
        state.download_file = file
    },
    downloadSuccess(state, ids) {
        // check if ids is a single integer and convert to array (top handle both cases, single and batch download)
        if (Number.isInteger(ids)) {
            ids = [ids]
        }
        ids.forEach(id => {
            let item = state.result.find(item => item.id === id)
            item.download_count = item.download_count + 1
        })
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
    deleteSuccess(state, id ) {
        let index = state.result.findIndex(file => file.id == id)
        if (index !== -1){
            state.result.splice(index, 1)
        }
        index = this.state.upload.files.findIndex(file => file.resp.result.id == id)
        if (index !== -1){
            this.state.upload.files.splice(index, 1)
        }
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
