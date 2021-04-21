import axios from 'axios'

const store = {
  state() {
    return {
      loggedIn: false,
      coaches: null,
      messages: null,
      filterArea: [],
      newCoach: {
        name: '',
        email: '',
        photoUrl: '',
        description: '',
        area: [],
      },
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
    filterArea(state) {
      return state.filterArea
    },
    getMessages(state) {
      return state.messages
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
    loadMessages(state, payload) {
      state.messages = [...payload]
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

    searchAreaChange(context) {
      context.commit('changeSearchArea')
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
        context.commit('loadCoaches', receivedArray)
      })
    },
    downloadMessages(context) {
      axios.get('messages.json').then((response) => {
        console.log(response)
        const receivedArray = []
        for (let each in response.data) {
          const eachMessage = {
            messageId: each,
            coach: response.data[each].coach,
            message: response.data[each].message,
          }
          receivedArray.push(eachMessage)
        }
        console.log(receivedArray)
        context.commit('loadMessages', receivedArray)
      })
    },
  },
}

export default store
