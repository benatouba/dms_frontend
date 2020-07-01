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
                    dispatch('alerts/success', 'You are now logged in', { root: true })
                    router.push('Upload')
                },
                error => {
                    commit('loginFailure', error)
                    dispatch('alert/error', 'Login failed', { root: true })
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
                commit('registerSuccess', user.json())
                // router.push('Home')
                setTimeout(() => {
                    // display success message after route change completes
                    dispatch('alerts/success', 'Registration Form was sent', { root: true })
                })
            },
            error => {
                error = error.json()
                commit('registerFailure', error)
                dispatch('alerts/error', error, { root: true })
            }
        )
    },
    async info({ dispatch }) {
        try {
            let resp = await userService.list()
            return resp
        } catch(error) {
            dispatch('alerts/error', error, { root: true })
        }
    },
    async patch({dispatch}, toChange) {
        try {
            let resp = await userService.patch(toChange)
            dispatch('alerts/success', 'Password changed', { root: true })
            return resp
        } catch(error) {
            dispatch('alerts/error', error, { root: true })
        }
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
