import userService from '../services/user.service'
import router from '../router'

const user = JSON.parse(localStorage.getItem('user'))
const state = user ? { status: { isloggedIn: true }, user } : { status: {}, user: null }

const actions = {
    async login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username })

        await userService.login({ username, password }).then(
            user => {
                commit('loginSuccess', user)
                router.push('/')
            },
            error => {
                commit('loginFailure', error)
                dispatch('alert/error', error, { root: true })
            }
        )
    },
    async logout({ commit }) {
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
        state.status = { loggingIn: true }
        state.user = user
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true }
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
    actions,
    mutations,
}
