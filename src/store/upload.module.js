import { uploadService } from '../services/upload.service'

const state = {
    files: [],
    metadataLists: [],
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
    async uploadFiles({ dispatch, commit }, { file }) {
        commit('uploadRequest')
        let promise = uploadService.upload(file).then(
            file => {
                commit('uploadSuccess', file)
            },
            error => {
                error.result.file_standard_name = file.name
                error.result.id = file.name
                commit('uploadFailure', error)
                dispatch('alerts/error', error, { root: true })
            }
        )
        await new Promise(resolve => setTimeout(resolve, 3000))
        let answer = await promise
        return answer
    },
    async metadataList({ dispatch, commit }, { file, listname }) {
        commit('uploadRequest', file, listname)
        try {
            let resp = await uploadService.uploadMetadataList(file, listname)
            console.log(resp)
            commit('uploadMetaSuccess', resp)
            return resp
        } catch(error) {
            error.message = error.file[0] // error message is store in "file" value of obj
            commit('uploadMetaFailure', error)
            dispatch('alerts/error', error, { root: true })
            return error
        }
    }
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
    uploadRequest(state, file) {
        state.uploading = { ongoing: true, file }
    },
    uploadSuccess: (state, file) => {
        state.uploaded = true
        state.uploading = { ongoing: false, file }
        state.files.push(file)
    },
    uploadFailure: (state, error) => {
        state.files.push(error)
        state.files.error = error
        state.files.uploaded = false
        state.files.uploading = { ongoing: false, error }
    },
    updateMessage(state, id, message) {
        state.files[id].message = message
    },
    uploadMetaSuccess: (state, file) => {
        file.uploaded = true
        file.uploading = false
        state.metadataLists.push(file)
    },
    uploadMetaFailure: (state, error) => {
        state.metadataLists.push(error)
        state.metadataLists.error = error
        state.metadataLists.uploaded = false
        state.metadataLists.uploading = false
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
