import { userService } from '../services'
import router from '../router'
import i18n from '../plugins/i18n'

const loggedIn = localStorage.getItem('loggedIn') || false
function getDefaultState() {
    return {
        is_superuser: false,
        isLoggedIn: !!loggedIn,
        user: false,
    }
}

const state = getDefaultState()

const getters = {
    user: state => {
        return state.user
    },
    isLoggedIn: state => {
        return !!state.token
    },
}
const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username })
        commit('showErrorBanner', false, { root: true })

        userService.login({ username, password }).then(
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
                dispatch('alerts/success', { message: i18n.t('register.success_message') }, { root: true })
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
            dispatch('alerts/success', resp, { root: true })
        } catch (error) {
            dispatch('alerts/error', error, { root: true })
        }
    },
}

const mutations = {
    loginRequest(state, user) {
        state.isLoggedIn = false
        state.user = user
    },
    loginSuccess(state, data) {
        state.isLoggedIn = true
        Object.entries(data).forEach(item => {
            state[item[0]] = item[1]
        })
        state.user = data.username
        state.is_superuser = !!data.is_superuser
    },
    loginFailure(state) {
        state.isLoggedIn = false
        state.user = null
        state.token = null
    },
    logout(state) {
        state.token = null
        state.isLoggedIn = false
        Object.assign(state, getDefaultState())
    },
    registerRequest(state) {
        state.registering = true
    },
    registerSuccess(state) {
        state.registered = true
    },
    registerFailure(state) {
        state.registered = false
    },
    userInfoSuccess(state, data) {
        Object.entries(data).forEach(item => {
            state[item[0]] = item[1]
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
