import axios from 'axios'

const store = {
  state() {
    return {
      loggedIn: true,
      coaches: null,
      messages: null,
    }
  },

  getters: {
    coaches(state) {
      return state.coaches
    },
    loggedIn(state) {
      return state.loggedIn
    },
    getMessages(state) {
      return state.messages
    },
  },

  mutations: {
    logIn(state) {
      state.loggedIn = !state.loggedIn
    },

    logOut(state) {
      state.loggedIn = false
    },

    setUser(state, payload) {
      state.token = payload.token
      state.userId = payload.userId
      state.tokenExpiration = payload.tokenExpiration
    },

    loadCoaches(state, payload) {
      state.coaches = payload
    },
    loadMessages(state, payload) {
      state.messages = [...payload]
    },
  },

  actions: {
    async signUp(context, payload) {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPbLFOBHKzYhiK0NAuVN6ZltT2RCApStk',
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      )
      const responseData = await response.json()
      console.log(responseData)
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'failed to authenticate'
        )
        throw error
      }
      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      })
    },

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
