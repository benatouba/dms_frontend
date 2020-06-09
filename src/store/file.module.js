import { uploadService } from '../services/upload.service'

// const state = [{ name: 'test', size: 111, message: 'this is a message', id: 0 }]
const state = { files: [] }

const getters = {
    allFiles: state => {
        return state.files
    },
    uploadedFiles: state => {
        return state.files.filter(file => file.status === 1)
    },
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
    addFile({ commit }, { file }) {
        commit('addFile', file)
    },
    removeFile({ commit }, f) {
        commit('removeFile', f)
    },
    uploadFiles({ dispatch, commit }, { file }) {
        commit('uploadRequest')
        return uploadService
            .upload(file)
            .then(file => {
                commit('uploadSuccess', file)
                commit('addFile', file)
            })
            .catch(error => {
                commit('uploadFailure', error)
                dispatch('alerts/error', error, { root: true })
            })
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
    setStatus: (state, id, status) => {
        state.files[id].status = status
    },
    removeFile: (state, id) => {
        let index = state.findIndex(state => state.files.id == id)
        state.splice(index, 1)
    },
    uploadRequest(state) {
        state.uploading = true
    },
    uploadSuccess(state) {
        state.uploaded = true
        state.uploading = false
    },
    uploadFailure(state) {
        state.uploaded = false
        state.uploading = false
    },
    updateMessage(state, id, message) {
        state.files[id].message = message
    },
}

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations,
}
