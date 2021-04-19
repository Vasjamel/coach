import axios from 'axios'

const store = {
  state() {
    return {
      loggedIn: false,
      coaches: null,
      filteredCoaches: [],
      newCoach: {
        name: '',
        email: '',
        photoUrl: '',
        description: '',
        area: [],
      },
      searchText: '',
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
  },

  mutations: {
    logIn(state) {
      state.loggedIn = true
    },

    logOut(state) {
      state.loggedIn = false
    },

    loadCoaches(state, payload) {
      state.coaches = payload
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

    downloadCoaches(context) {
      axios.get('/coaches.json').then((response) => {
        const receivedArray = []
        for (let each in response.data) {
          const everyCoach = {
            id: each,
            name: response.data[each].name,
            email: response.data[each].email,
            photoUrl: response.data[each].photoUrl,
            description: response.data[each].description,
            area: response.data[each].area,
          }
          receivedArray.push(everyCoach)
        }
        console.log('receivedArray', receivedArray)
        context.commit('loadCoaches', receivedArray)
      })
    },
  },
}

export default store
