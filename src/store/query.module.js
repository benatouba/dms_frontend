import queryService from '../services/query.service'
// import i18n from '../plugins/i18n'

const getDefaultState = () => {
    return {
        deleted: false,
        queried: 'file',
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
        query: {
            search: null,
            acronym: null,
            site__id: null,
            variables__variable: null,
            uploader: null,
            is_invalid: false,
            is_old: false,
            offset: 0,
            limit: 10,
            ordering: null,
        },
        palm: {
            joblist: [],
        },
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
    async getJoblist({ commit, dispatch }) {
        try {
            let resp = await queryService.getJoblist()
            commit('setJoblist', resp)
        } catch (error) {
            dispatch('alerts/info', { type: 'warning', message: error, status: 2 }, { root: true })
        }
    },
    resetQueryState({ commit }) {
        commit('resetQueryState')
    },
    resetState({ commit }) {
        commit('resetState')
    },
    async search({ dispatch, commit }, { options, filetype }) {
        if (filetype === undefined) {
            filetype = state.queried
        }
        commit('queryRequest', options)
        try {
            let resp = await queryService.search(state.query, filetype)
            commit('querySuccess', { resp, filetype })
        } catch (error) {
            commit('queryFailure', { error, filetype })
            dispatch('alerts/info', { type: 'error', message: error, status: 3 }, { root: true })
        }
    },
    async fetchMeta({ commit, dispatch }, name) {
        try {
            let data = await queryService.meta(name)
            // sorting
            if (name === 'institution') {
                data = data.sort((a, b) => {
                    return a.ge_title.toUpperCase() > b.ge_title.toUpperCase() ? 1 : -1
                })
            } else if (name === 'variable') {
                data = data.sort((a, b) => {
                    return a.long_name.toUpperCase() > b.long_name.toUpperCase() ? 1 : -1
                })
            } else if (name === 'site') {
                data = data.sort((a, b) => {
                    return a.site.toUpperCase() > b.site.toUpperCase() ? 1 : -1
                })
            }
            commit('addMeta', { name, data })
        } catch (error) {
            dispatch('alerts/info', { type: 'error', message: error, status: 3 }, { root: true })
        }
    },
    download({ dispatch, commit }, { file, check_result = false }) {
        if (!check_result) {
            commit('downloadRequest', file)
        }
        let resp = queryService.download(file, check_result).then(
            resp => {
                if (!check_result) {
                    commit('downloadSuccess', file.id)
                }
                return resp
            },
            error => {
                commit('downloadFailure', error)
                dispatch('alerts/info', { type: 'error', message: error, status: 3 }, { root: true })
            }
        )
        return resp
    },
    async downloadAll({ dispatch, commit }, { ids, check_result = false }) {
        if (!check_result) {
            commit('downloadRequest', ids)
        }
        try {
            let resp = await queryService.downloadAll(ids, check_result)
            if (resp.status === 200 && !check_result) {
                commit('downloadSuccess', ids)
            } else if (resp.status !== 200) {
                throw resp.message
            }
        } catch (error) {
            commit('downloadFailure', error)
            dispatch('alerts/info', { type: 'error', message: error, status: 3 }, { root: true })
        }
    },
    async delete({ dispatch, commit }, files) {
        commit('deleteRequest', files)

        if (!Array.isArray(files)) {
            files = Array(files)
        }

        let successCount = 0
        let errorCount = 0
        let lastResp
        let lastError
        let info = {
            type: null,
            message: null,
            fatal: null,
            errors: null,
            warnings: null,
            status: 0,
        }
        for (const file of files) {
            try {
                console.log(file)
                lastResp = await queryService.deleteFile(file)
                console.log(file)
                commit('deleteSuccess', file.resp.result.id)
                successCount++
            } catch (error) {
                commit('deleteFailure')
                lastError = error
                errorCount++
            }
        }
        if (files.length === 1) {
            if (errorCount === 1) {
                info.type = 'error'
                info.message = lastError
                info.status = 3
            } else {
                info.type = 'success'
                info.message = lastResp
                info.status = 1
            }
        } else {
            if (errorCount !== 0) {
                info.type = 'error'
                info.message = `${errorCount} files could not be deleted. ${successCount} files were successfully deleted.`
                info.status = 3
            } else {
                info.type = 'success'
                info.message = `${successCount} files were successfully deleted.`
                info.status = 1
            }
        }
        dispatch('alerts/info', info, { root: true })
    },
    async setInvalid({ dispatch, commit }, files) {
        if (!Array.isArray(files)) {
            files = Array(files)
        }

        let successCount = 0
        let errorCount = 0
        let lastResp
        let lastError
        let info = {
            type: null,
            message: null,
            fatal: null,
            errors: null,
            warnings: null,
            status: 0,
        }
        for (const file of files) {
            try {
                lastResp = await queryService.setInvalid(file)
                commit('setInvalidSuccess', file.id)
                successCount++
            } catch (error) {
                lastError = error
                errorCount++
            }
        }
        if (files.length === 1) {
            if (errorCount === 1) {
                info.type = 'error'
                info.message = lastError
                info.status = 3
            } else {
                info.type = 'success'
                info.message = lastResp
                info.status = 1
            }
        } else {
            if (errorCount !== 0) {
                info.type = 'error'
                info.message = `${errorCount} files could not be marked invalid. ${successCount}
                                          files were successfully marked invalid.`
                info.status = 3
            } else {
                info.type = 'success'
                info.message = `${successCount} files were successfully marked invalid.`
                info.status = 1
            }
        }
        dispatch('alerts/info', info, { root: true })
    },
}

const mutations = {
    setJoblist(state, joblist) {
        state.palm.joblist.push(...joblist)
    },
    resetState(state) {
        // Merge rather than replace so we don't lose observers
        // https://github.com/vuejs/vuex/issues/1118
        Object.assign(state, getDefaultState())
    },
    resetQueryState(state) {
        state.queried = 'file'
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
        let query = Object.assign(state.query, input)
        state.query = query
    },
    querySuccess(state, { resp, filetype }) {
        state.error = null
        state.queried = filetype
        state.querying = false
        if (resp.count === 0) {
            state.result = []
        } else if (resp.results) {
            // if pagination is requested resp contains multiple objects
            state.result = resp.results // page result items
            state.count = resp.count // count of total items to return
        } else {
            state.result = resp // all items
        }
    },
    queryFailure(state, { error, filetype }) {
        state.error = error
        state.queried = filetype
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
    deleteSuccess(state, id) {
        let index = state.result.findIndex(file => file.id === id)
        if (index !== -1) {
            state.result.splice(index, 1)
        }
        index = this.state.upload.files.findIndex(file => file.resp.result.id === id)
        if (index !== -1) {
            this.state.upload.files.splice(index, 1)
        }
        state.deleting = false
        state.deleted = true
    },
    deleteFailure(state) {
        state.deleted = false
    },
    setInvalidSuccess(state, id) {
        let index = state.result.find(file => file.id === id)
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
