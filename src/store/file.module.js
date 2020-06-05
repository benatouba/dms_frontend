import { uploadService } from '../services/upload.service'

const state = [{ name: 'test', size: 111, message: 'this is a message' }]

const getters = {
    allFiles: state => {
        return state
    },
    uploadedFiles: state => {
        return state.filter(file => file.uploaded)
    },
    failedFiles: state => {
        return state.filter(file => !file.uploaded)
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
        console.log(file)
        commit('uploadRequest')
        uploadService.upload(file).then(
            file => commit('uploadSuccess', file),
            error => {
                console.log('upload error')
                console.log(error)
                commit('uploadFailure', error)
                dispatch('alerts/error', error, { root: true })
            }
        )
    },
}

const mutations = {
    RESET(state) {
        const newState = []
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        })
    },
    addFile: (state, file) => state.push(file),
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
}

export default {
    namespaced: false,
    state,
    getters,
    actions,
    mutations,
}
