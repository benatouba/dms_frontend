import { userService } from '../services'

const state = {
  all: {},
}

const actions = {
  // This action triggers mutation to store that user list is requested
  async list({ commit }) {
    commit('listRequest')
    userService.list().then(
      users => commit('listSuccess', users),
      error => commit('listFailure', error)
    )
  },

  delete({ commit }, id) {
    /*Action triggers mutates store state to record that user should be deleted,
    then triggers service function that sends the request to the backend.
    Depending on the response, mutations will be triggered to alter the store state. */
    commit('deleteRequest', id)
    userService
      .delete(id)
      .then(commit('deleteSuccess', id), error => commit('deleteFailure', { id, error: error.toString() }))
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
  deleteFailure(state, { id, error }) {
    // remove 'deleting:true' property and add 'deleteError:[error]' property to user
    state.all.items = state.items.map(user => {
      if (user.id === id) {
        // make copy of user without 'deleting:true' property
        const { deleting, ...userCopy } = user
        console.log(deleting)
        // return copy of user with 'deleteError:[error]' property
        return { ...userCopy, deleteError: error }
      }

      return user
    })
  },
}

export const user = {
  namespaced: true,
  state,
  actions,
  mutations,
}
