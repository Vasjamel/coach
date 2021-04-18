import axios from 'axios'

const mainStore = {
  state() {
    return {
      loggedIn: false,
      coaches: [],
      newCoach: {
        name: '',
        email: '',
        photoUrl: '',
        description: '',
        area: [],
      },
      search: '',
    }
  },

  getters: {
    coaches(state) {
      return state.coaches
    },
    newCoach(state) {
      return state.newCoach
    },
    loggedIn(state) {
      return state.loggedIn
    },
    search(state) {
      return state.search
    },
  },

  mutations: {
    logIn(state) {
      state.loggedIn = true
    },

    logOut(state) {
      state.loggedIn = false
    },

    loadCoaches(state, payload) {
      state.coaches = payload.data
    },

    registerForm(state) {
      axios
        .post('/coaches.json', state.newCoach)
        .then(() => {
          state.newCoach = {
            name: '',
            email: '',
            photoUrl: '',
            description: '',
            area: [],
          }
        })
        .catch((err) => console.log(err))
    },
  },

  actions: {
    logIn(context) {
      context.commit('logIn')
    },

    logOut(context) {
      context.commit('logOut')
    },

    registerForm(context) {
      context.commit('registerForm')
    },

    loadCoaches(context) {
      axios.get('/coaches.json').then((response) => {
        if (response.data) {
          context.commit('loadCoaches', response)
        } else {
          context.commit('loadCoaches', null)
        }
      })
    },
  },
}

export default mainStore
