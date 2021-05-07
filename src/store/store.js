import axios from 'axios'

const store = {
  state() {
    return {
      loggedIn: false, //checks if user is logged in
      coaches: [], //array of coaches from DB
      messages: null, //array of messages
      error: null, //if error - show modal window
      loading: false, //if loading - show spinner
      //secureToken from firebase:
      token: null,
      userId: null,
      tokenExpiration: null,
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
    gettoken(state) {
      return state.token
    },
    error(state) {
      return state.error
    },
    loading(state) {
      return state.loading
    },
  },

  mutations: {
    logIn(state, payload) {
      state.token = payload.token
      state.userId = payload.userId
      state.tokenExpiration = payload.tokenExpiration
      state.loggedIn = true
    },

    logOut(state) {
      state.token = null
      state.userId = null
      state.tokenExpiration = null
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
      state.messages = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    startLoading(state) {
      state.loading = true
    },
    endLoading(state) {
      state.loading = false
    },
  },

  actions: {
    //register user:
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

      if (!response.ok) {
        context.commit('setError', responseData.error.message)
      } else {
        context.commit('setUser', {
          token: responseData.idToken,
          userId: responseData.localId,
          tokenExpiration: responseData.expiresIn,
        })
        context.commit('setError', 'Account is created! Please logIn.')
      }
    },

    async logIn(context, payload) {
      //logIn:
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPbLFOBHKzYhiK0NAuVN6ZltT2RCApStk',
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

      if (!response.ok) {
        context.commit('setError', responseData.error.message)
      } else {
        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)
        context.commit('logIn', {
          token: responseData.idToken,
          userId: responseData.localId,
          tokenExpiration: responseData.expiresIn,
        })
      }
    },

    tryLogin(context) {
      //to allow user to reopen page without login (if was logged in)
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      if (token && userId) {
        context.commit('logIn', {
          token: token,
          userId: userId,
          tokenExpiration: null,
        })
      }
    },

    logOut(context) {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      context.commit('logOut')
    },

    startLoading(context) {
      context.commit('startLoading')
    },
    endLoading(context) {
      context.commit('endLoading')
    },

    searchAreaChange(context) {
      context.commit('changeSearchArea')
    },

    downloadCoaches(context) {
      //load array of coaches from database
      axios
        .get('/coaches.json?auth=' + context.getters.gettoken)
        .then((response) => {
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
      //load array of messages from database
      axios
        .get('messages.json?auth=' + context.getters.gettoken)
        .then((response) => {
          const receivedArray = []
          for (let each in response.data) {
            const eachMessage = {
              messageId: each,
              coach: response.data[each].coach,
              message: response.data[each].message,
            }
            receivedArray.push(eachMessage)
          }
          context.commit('loadMessages', receivedArray)
        })
    },

    seeError(context, payload) {
      context.commit('setError', payload)
    },

    closeModal(context) {
      context.commit('clearError')
    },
  },
}

export default store
