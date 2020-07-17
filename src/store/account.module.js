import { userService } from '../services'
import router from '../router'
import i18n from '../plugins/i18n'

// const token = localStorage.getItem('token')
function getDefaultState() {
    return {
        is_superuser: false,
        status: { isLoggingIn: false, isLoggedIn: false },
        user: false
    }
}

const state = getDefaultState()

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
                resp => {
                    commit('loginSuccess', resp)
                    dispatch('alerts/success', i18n.t('login.success'), { root: true })
                    router.push('Home')
                },
                error => {
                    commit('loginFailure', error)
                    dispatch('alerts/error', error, { root: true })
                }
            )
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
                    dispatch('alerts/success', { message: 'Registration Form was sent' }, { root: true })
                })
            },
            error => {
                error = error.json()
                commit('registerFailure', error)
                dispatch('alerts/error', error, { root: true })
            }
        )
    },
    async info({ commit, dispatch }, id) {
        try {
            let resp = await userService.info(id)
            commit('userInfoSuccess', resp)
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
        state.status = { isLoggedIn: true, isLoggingIn: false }
        Object.entries(data).forEach(
            item => {
                state[item[0]] = item[1]
            }
        )
        state.user = data.username
        if (data.is_superuser) {
            state.is_superuser = data.is_superuser
        }
    },
    loginFailure(state) {
        state.status.isLoggedIn = false
        state.status.isLoggingIn = false
        state.user = null
    },
    logout(state) {
        Object.assign(state, getDefaultState())
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
    userInfoSuccess(state, data) {
        Object.entries(data).forEach(
            item => {
                state[item[0]] = item[1]
            }
        )
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
