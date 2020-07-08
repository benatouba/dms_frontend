import { userService } from '../services/user.service'

const state = {
    all: {},
}

const actions = {
    async list({ commit, dispatch }, searchParam) {
        commit('listRequest')
        try {
            let resp = await userService.list(searchParam)
            commit('listSuccess', resp)
        } catch (error) {
            dispatch('alerts/error', error, { root: true })
        }
    },
    // This action triggers mutation to store that user list is requested

    async manage({ commit, dispatch }, id, action) {
        /*Action triggers mutates store state to record that user should be deleted,
    then triggers service function that sends the request to the backend.
    Depending on the response, mutations will be triggered to alter the store state. */
        commit('manageRequest', id, action)
        try {
            let resp = await userService.manage(id, action)
            commit('manageSuccess', id, action, resp)
        } catch (error) {
            commit('manageFailure', { id, error: error.toString() })
            dispatch('alerts/error', error, { root: true })
        }
    },
}

const mutations = {
    listRequest(state) {
        state.all = { loading: true }
    },
    listSuccess(state, users) {
        state.all = { items: users }
    },
    listFailure(state, error) {
        state.all = { error }
    },
    deleteRequest(state, id) {
        // add property, to mark deletion request is sent
        state.all.items = state.all.items.map(user => (user.id === id ? { ...user, deleting: true } : user))
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    deleteFailure(state, { id, error, action }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user
        state.all.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { managing, ...userCopy } = user
                console.log(managing)
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, manageError: { error, action }}
            }
            return user
        })
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
