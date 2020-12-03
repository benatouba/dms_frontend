import { userService } from '../services/user.service'

const state = { items: [], status: { loading: false, loaded: false } }

const actions = {
    async list({ commit, dispatch }, searchParam) {
        commit('listRequest')
        try {
            let resp = await userService.list(searchParam)
            commit('listSuccess', resp)
        } catch (error) {
            dispatch('alerts/info', { type: 'error', message: error, status: 3 }, { root: true })
        }
    },
    // This action triggers mutation to store that user list is requested

    async manage({ dispatch }, token) {
        /*Action triggers mutates store state to record that user should be deleted,
    then triggers service function that sends the request to the backend.
    Depending on the response, mutations will be triggered to alter the store state. */
        try {
            let resp = await userService.manage(token)
            dispatch('alerts/info', { type: 'success', message: resp, status: 1 }, { root: true })
        } catch (error) {
            dispatch('alerts/info', { type: 'error', message: error, status: 3 }, { root: true })
        }
    },
    async delete({ commit, dispatch }, id, action) {
        /*Action triggers mutates store state to record that user should be deleted,
    then triggers service function that sends the request to the backend.
    then triggers service function that sends the request to the backend.
    Depending on the response, mutations will be triggered to alter the store state. */
        commit('deleteRequest', id)
        try {
            await userService.delete(id, action)
            commit('deleteSuccess', id)
        } catch (error) {
            commit('deleteFailure', { id, error })
            dispatch('alerts/info', { type: 'error', message: error, status: 3 }, { root: true })
        }
    },
}

const mutations = {
    listRequest(state) {
        state.status = { loading: true, loaded: false }
    },
    listSuccess(state, users) {
        state.items = users
        state.status = { loading: true, loaded: false }
    },
    listFailure(state) {
        state.status = { loading: false, loaded: false }
    },
    deleteRequest(state, id) {
        // add property, to mark deletion request is sent
        state.items = state.items.map(user => (user.id === id ? { ...user, deleting: true } : user))
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.items = state.items.filter(user => user.id !== id)
    },
    deleteFailure(state, data) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user
        state.items = state.items.map(user => {
            if (user.id === data.id) {
                // make copy of user without 'deleting:true' property
                // eslint-disable-next-line no-unused-vars
                let { deleting, ...userCopy } = user
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: data.error }
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
