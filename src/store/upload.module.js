import { uploadService } from '../services/upload.service'

const state = {
    files: [],
    meta: [],
}

const getters = {
    notUploadedFiles: state => {
        return state.filter(file => file.status !== 1)
    },
    successFiles: state => {
        return state.filter(file => file.status === 1)
    },
    warningFiles: state => {
        return state.filter(file => file.status === 2)
    },
    errorFiles: state => {
        return state.filter(file => file.status === 3)
    },
    fatalFiles: state => {
        return state.filter(file => file.status === 4)
    },
}

const actions = {
    reset({ commit }) {
        commit('RESET')
    },
    uploadedFiles: state => {
        return state.files.filter(file => file.status === 1)
    },
    addFile({ commit }, { file }) {
        commit('addFile', file)
    },
    removeFile({ commit }, f) {
        commit('removeFile', f)
    },
    /**
     * Action triggering file upload.
     *
     * Fires upload service function and handles logging in store
     *
     * @since 0.1.0
     *
     * @see services/uploadService
     *
     * @param {Object} data An object containing all info to pass to backend
     */
    async uploadFiles({ dispatch, commit }, obj) {
        commit('uploadRequest', obj)
        try {
            let resp = await uploadService.upload(obj)
            if (!resp.ok && resp.status !== 406) {
                // throw error if response is not ok and not data not acceptable
                throw await resp.json()
            }
            resp = await resp.json()
            commit('uploadResult', { obj, resp })
        } catch (error) {
            dispatch('alerts/error', error, { root: true })
        }
    },
    async metadataList({ dispatch, commit }, obj) {
        commit('uploadMetaRequest', obj)
        try {
            let resp = await uploadService.uploadMetadataList(obj)
            commit('uploadMetaResult', { resp, file: obj.file })
            return resp
        } catch (error) {
            // commit('uploadMetaFailure', error, file, 'metaData')
            dispatch('alerts/error', error, { root: true })
            return error
        }
    },
}

const mutations = {
    RESET(state) {
        const newState = []
        Object.keys(newState).forEach(key => {
            state.files[key] = newState[key]
        })
    },
    addFile: (state, file) => state.files.push(file),
    removeFile: (state, elm) => {
        let index = state.files.findIndex(state_elm => state_elm.file === elm.file)
        if (index !== -1){
            state.files.splice(index, 1)
        }
    },
    uploadRequest(state, { file, ignore_warnings, ignore_errors }) {
        const item = state.files.find(data => data.file.name === file.name)
        if (item) {
            item.uploading = true
            item.uploaded = false
            item.ignore_warnings = ignore_warnings
            item.ignore_errors = ignore_errors
        } else {
            state.files.push({
                file,
                resp: {},
                uploaded: false,
                uploading: true,
                ignore_errors,
                ignore_warnings,
            })
        }
    },
    uploadResult: (state, { obj, resp }) => {
        let item = state.files.find(data => data.file.name === obj.file.name)
        item.resp = resp
        item.ignore_warnings = obj.ignore_warnings
        item.ignore_errors = obj.ignore_errors
        item.uploaded = resp.status === 1
        if (obj.ignore_warnings) {
            item.uploaded = resp.status <= 2
        }
        if (obj.ignore_errors) {
            item.uploaded = resp.status <= 3
        }
        item.uploading = false
    },
    updateMessage(state, id, message) {
        state.files[id].message = message
    },
    uploadMetaRequest(state, obj) {
        const item = state.meta.find(data => data.file.name === obj.file.name)
        if (item) {
            item.uploading = true
            item.uploaded = false
        } else {
            state.meta.push({
                file: obj.file,
                resp: {},
                // type: obj.type,
                uploaded: false,
                uploading: true,
            })
        }
    },
    uploadMetaResult: (state, payload) => {
        const item = state.meta.find(i => i.file.name === payload.file.name)
        item.uploaded = payload.resp.status === 1
        item.uploading = false
        item.resp = payload.resp
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
