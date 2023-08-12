export const state = () => ({
  user: null
})

export const mutations = {
  RESET_STORE: (state) => {
    Object.assign(state, {user: null})
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.user = {
      uid: authUser.uid,
      email: authUser.email
    }
  }
}

export const actions = {
  async onAuthStateChangedAction({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }

    commit('SET_AUTH_USER', { authUser })

    this.$router.push('/')
  },
}

export const getters = {
  isLoggedIn: (state) => {
    try {
      return state.user.uid !== null
    } catch {
      return false
    }
  }
}
