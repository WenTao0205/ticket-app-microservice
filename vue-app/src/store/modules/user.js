import { getCurrentUser } from '../../api/users'

const state = {
  currentUser: null
}

const getters = {
  getCurrentUser: (state) => state.currentUser,
  getUsername: (state) => state.currentUser.username
}

const mutations = {
  setCurrentUser(state, payload) {
    state.currentUser = payload
  }
}

const actions = {
  async fetchCurrentUser({ commit }) {
    const res = await getCurrentUser()
    const currentUser = res.data.currentUser
    commit('setCurrentUser', currentUser)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}