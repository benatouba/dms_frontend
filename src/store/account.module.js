import { userService } from '../services'
import router from '../router'
import i18n from '../plugins/i18n'

// const loggedIn = localStorage.getItem('loggedIn') || false
let user = null
if (localStorage.getItem('user')) {
    try {
        user = JSON.parse(localStorage.getItem('user'))
    } catch (error) {
        localStorage.removeItem('user')
    }
}

function getDefaultState() {
    if (user) {
        return user
    } else {
        return {
            is_superuser: false,
            token: null,
            email: null,
            id: null,
            institutions: [],
            first_name: null,
            last_name: null,
            groups: [],
            username: null,
            phone_number: null,
        }
    }
}
const state = getDefaultState()

const getters = {
    group: state => groups => {
        return state.groups.find(item => item.name === groups)
    },
}
const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', username)
        commit('showErrorBanner', false, { root: true })

        userService.login({ username, password }).then(
            resp => {
                commit('loginSuccess', resp)
                dispatch('alerts/info', { type: 'sucess', message: i18n.t('login.success'), status: 1 }, { root: true })
                router.push('Home')
            },
            error => {
                commit('loginFailure', error)
                dispatch('alerts/info', { type: 'error', message: error, status: 3 }, { root: true })
            }
        )
    },
    logout({ commit }) {
        userService.logout()
        commit('logout')
        router.push('/')
    },
    async register({ dispatch, commit }, user) {
        commit('registerRequest', user)
        commit('showErrorBanner', false, { root: true })
        try {
            let resp = await userService.register(user)
            if (resp.status !== 201) {
                throw await resp.json()
            }
            commit('registerSuccess', resp.json())
            dispatch(
                'alerts/info',
                { type: 'success', message: i18n.t('register.success_message'), status: 1 },
                { root: true }
            )
        } catch (error) {
            commit('registerFailure', error)
            dispatch('alerts/info', { type: 'error', message: error, status: 3 }, { root: true })
        }
    },
    async info({ commit, dispatch }, id) {
        try {
            let resp = await userService.info(id)
            commit('userInfoSuccess', resp)
        } catch (error) {
            dispatch('alerts/info', { type: 'error', message: error, status: 3 }, { root: true })
        }
    },
    async patch({ commit, dispatch }, input) {
        if (input.password) {
            commit('showErrorBanner', false, { root: true })
        }
        try {
            let resp = await userService.patch(input)
            if (input.pk) {
                delete input.pk
                commit('userInfoSuccess', input)
            }
            dispatch('alerts/info', { type: 'error', message: resp, status: 3 }, { root: true })
        } catch (error) {
            dispatch('alerts/info', { type: 'error', message: error, status: 3 }, { root: true })
        }
    },
    async requestPassword({ commit, dispatch }, userid) {
        commit('showErrorBanner', false, { root: true })
        try {
            let resp = await userService.requestPassword(userid)
            dispatch('alerts/info', { type: 'error', message: resp, status: 3 }, { root: true })
        } catch (error) {
            dispatch('alerts/info', { type: 'error', message: error, status: 3 }, { root: true })
        }
    },
}

const mutations = {
    loginRequest(state, username) {
        state.token = null
        state.username = username
    },
    loginSuccess(state, data) {
        Object.entries(data).forEach(item => {
            state[item[0]] = item[1]
        })
        state.is_superuser = !!data.is_superuser
    },
    loginFailure(state) {
        state.user = null
        state.token = null
    },
    logout(state) {
        state.token = null
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
