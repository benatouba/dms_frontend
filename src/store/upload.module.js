import { uploadService } from '../services/upload.service'

const state = {
    files: [
        {
            result: {
                file_standard_name: 'test',
                size: 111,
                message: 'this is a message',
                id: 1,
            },
            errors: [],
            fatal: ['fatal error'],
            warnings: [],
            status: 1,
        },
        {
            result: {
                file_standard_name: 'test',
                size: 111,
                message: 'this is a message',
                id: 2,
            },
            errors: ['The given version numbers...'],
            fatal: ['fatal error'],
            warnings: ['warning note'],
            status: 2,
        },
        {
            result: {
                file_standard_name: 'test',
                size: 111,
                message: 'this is a message',
                id: 3,
            },
            errors: ['The given version numbers...'],
            fatal: ['fatal error'],
            warnings: ['warning note'],
            status: 3,
        },
        {
            result: {
                file_standard_name: 'test',
                size: 111,
                message: 'this is a message',
                id: 4,
            },
            errors: ['The given version numbers...'],
            fatal: ['fatal error'],
            warnings: ['warning note'],
            status: 4,
        },
    ],
}
// const state = { files: [] }

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
    uploadRequest(state) {
        state.uploading = true
    },
    uploadSuccess: (state, file) => {
        file.uploaded = true
        file.uploading = false
        state.files.push(file)
    },
    uploadFailure: (state, error) => {
        state.files.push(error)
        state.files.error = error
        state.files.uploaded = false
        state.files.uploading = false
    },
    updateMessage(state, id, message) {
        state.files[id].message = message
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
