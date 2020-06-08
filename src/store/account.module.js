import { userService } from '../services'
import router from '../router'

const user = localStorage.getItem('user')
const state = user ? { status: { isLoggedIn: true }, user } : { status: { isLoggedIn: false }, user: null }
state.status.isLoggingIn = false
state.status

const getters = {
    user: state => {
        return state.user
    },
    isLoggedIn: state => {
        return state.status.isLoggedIn
    },
}
const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username })

        userService
            .login({ username, password })
            .then(
                user => {
                    commit('loginSuccess', user)
                    console.log('Login Success')
                    router.push('Upload')
                },
                error => {
                    console.log('login error')
                    commit('loginFailure', error)
                    dispatch('alert/error', error, { root: true })
                }
            )
            .catch(err => console.log(err))
    },
    logout({ commit }) {
        userService.logout()
        commit('logout')
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user)
        userService.register(user).then(
            user => {
                commit('registerSuccess', user)
                router.replace('/login')
                setTimeout(() => {
                    // display success message after route change completes
                    dispatch('alert/success', 'Registration Form was sent', { root: true })
                })
            },
            error => {
                commit('registerFailure', error)
                dispatch('alert/error', error, { root: true })
            }
        )
    },
}

const mutations = {
    loginRequest(state, user) {
        state.status = { isLoggingIn: true }
        state.user = user
    },
    loginSuccess(state, user) {
        state.status = { isLoggedIn: true }
        state.user = user
    },
    loginFailure(state) {
        state.status = {}
        state.user = null
    },
    logout(state) {
        state.status = {}
        state.user = null
    },
    registerRequest(state) {
        state.status = { registering: true }
    },
    registerSuccess(state) {
        state.status = {}
    },
    registerFailure(state) {
        state.status = {}
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
