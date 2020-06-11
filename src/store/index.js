import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import users from './user.module'
import accounts from './account.module'
import queries from './query.module'
import upload from './upload.module'
import alerts from './alert.module'

const debug = process.env.NODE_ENV !== 'production'
console.log('Debug: ' + debug)
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        accounts,
        alerts,
        users,
        upload,
        queries,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})
// debug: true,
// strict: true,
// state: {
//   uploadFiles: [],
//   files: [{ id: 1, code: 1 }],
//   username: '',
//   password: '',
//   token: '',
// },
// getters: {
//   getFileByCheckResult: state => code => {
//     return state.files.find(file => file.code === code)
//   },
// getFileByIdCount: (state, getters) => {
//   return getters.getFileById.length
// },
// },
// mutations: {
//   updateUsername(state, value) {
//     if (this.debug) console.log('login triggered with', value)
//     state.username = value
//   },
//   // tokenize(t) {
//   //   if (this.debug) console.log('login triggered with', t)
//   //   this.state.token = t
//   // },
//   addFiles(e) {
//     // if (this.debug) console.log('addFiles triggered with', e
//     let droppedFiles = e.dataTransfer.files
//     if (!droppedFiles) return
//     ;[...droppedFiles].forEach(f => {
//       this.state.uploadFiles.push(f)
//     })
//   },
//   // login(t) {
//   //   this.state.token = t.token
//   // },
//   removeFile(file) {
//     if (this.debug) console.log('removeFile triggered with', file)
//     this.state.uploadFiles = this.state.uploadFiles.filter(f => {
//       return f !== file
//     })
//   },
// },
// })
