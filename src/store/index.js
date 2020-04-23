import Vue from 'vue'
import Vuex from 'vuex'
import { userModule } from './user.module'
import { accountModule } from './account.module'
// import { fileModule } from './file.module'
//import { alertModule } from './alert.module'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    accountModule,
    //alertModule,
    userModule,
  },
  debug: true,
  strict: true,
  state: {
    uploadFiles: [],
    files: [{ id: 1, code: 1 }],
    username: '',
    password: '',
    token: '',
  },
  getters: {
    getFileByCheckResult: state => code => {
      return state.files.find(file => file.code === code)
    },
    getFileByIdCount: (state, getters) => {
      return getters.getFileById.length
    },
  },
  mutations: {
    updateUsername(state, value) {
      if (this.debug) console.log('login triggered with', value)
      state.username = value
    },
    tokenize(t) {
      if (this.debug) console.log('login triggered with', t)
      this.state.token = t
    },
    addFiles(e) {
      // if (this.debug) console.log('addFiles triggered with', e
      let droppedFiles = e.dataTransfer.files
      if (!droppedFiles) return
      ;[...droppedFiles].forEach(f => {
        this.state.uploadFiles.push(f)
      })
    },
    login(t) {
      this.state.token = t.token
    },
    removeFile(file) {
      if (this.debug) console.log('removeFile triggered with', file)
      this.state.uploadFiles = this.state.uploadFiles.filter(f => {
        return f !== file
      })
    },
  },
})
