import { userService } from '../services'
import router from '../router'
import i18n from '../plugins/i18n'

const user = localStorage.getItem('user')
const state = user ? { status: { isLoggedIn: true }, user } : { status: { isLoggedIn: false }, user: null }
state.is_superuser = false
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
                    console.log(user)
                    commit('loginSuccess', user)
                    dispatch('alerts/success', i18n.t('login.success'), { root: true })
                    router.push('Home')
                },
                error => {
                    commit('loginFailure', error)
                    dispatch('alert/error', i18n.t('login.failure'), { root: true })
                }
            )
            .catch(err => alert(err))
    },
    logout({ commit }) {
        userService.logout()
        commit('logout')
        router.push('/')
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
    async info({ dispatch }, searchParam) {
        try {
            let resp = await userService.list(searchParam)
            return resp
        } catch (error) {
            dispatch('alerts/error', error, { root: true })
        }
    },
    async patch({ dispatch }, toChange) {
        try {
            let resp = await userService.patch(toChange)
            dispatch('alerts/success', 'Password changed', { root: true })
            return resp
        } catch (error) {
            dispatch('alerts/error', error, { root: true })
        }
    },
}

const mutations = {
    loginRequest(state, user) {
        state.status = { isLoggingIn: true }
        state.user = user
    },
    loginSuccess(state, data) {
        state.status = { isLoggedIn: true }
        state.user = data.user
        state.is_superuser = data.is_superuser
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
