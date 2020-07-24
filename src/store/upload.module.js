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
    async uploadFiles({ dispatch, commit }, data) {
        commit('uploadRequest', data)
        try {
            let resp = await uploadService.upload(data)
            commit('uploadResult', { ...data, resp })
        } catch (error) {
            dispatch('alerts/error', error, { root: true })
        }
    },
    async metadataList({ dispatch, commit }, obj) {
        commit('uploadMetaRequest', obj)
        try {
            let resp = await uploadService.uploadMetadataList(obj)
            let payload = { resp, obj }
            commit('uploadMetaResult', payload)
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
    removeFile: (state, id) => {
        let index = state.findIndex(state => state.files.id == id)
        state.splice(index, 1)
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
    uploadMetaRequest(state, obj) {
        const item = state.meta.find(data => data.name === obj.file.name)
        if (item) {
            item.uploading = true
            item.uploaded = false
        } else {
            state.meta.push({ name: obj.file.name, type: obj.type, uploaded: false, uploading: true })
        }
    },
    uploadResult: (state, payload) => {
        const item = state.files.find(data => data.file.name === payload.file.name)
        item.resp = payload.resp
        item.ignore_warnings = payload.ignore_warnings
        item.ignore_errors = payload.ignore_errors
        item.uploaded = payload.resp.status === 1
        item.uploading = false
    },
    updateMessage(state, id, message) {
        state.files[id].message = message
    },
    uploadMetaResult: (state, payload) => {
        const item = state.meta.find(item => item.name === payload.obj.file.name)
        console.log(item)
        item.uploaded = payload.resp.status === 1
        item.uploading = false
        item.result = payload.resp
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
