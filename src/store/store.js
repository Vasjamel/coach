import axios from 'axios'

const mainStore = {
  state() {
    return {
      loggedIn: false,
      coaches: [
        {
          id: 1,
          name: 'Ivan Petrenko Stepan',
          email: 'aaa@aa.aa',
          photoUrl:
            'https://i.guim.co.uk/img/media/a53ae9e9657c4b358cdb30a345f6f20e5a389e78/0_143_6376_3825/master/6376.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d2d2e966743309e95159fa2dae360b90',
          description: 'Very good',
          area: ['frontend'],
        },
        {
          id: 2,
          name: 'Petro Petrenko',
          email: 'aaa@aa.aa',
          photoUrl:
            'https://dailygazette.com/wp-content/uploads/fly-images/126428/shutterstock_245726512-scaled-940x940.jpg',
          description: 'Best coach',
          area: ['frontend', 'backend'],
        },
        {
          id: 3,
          name: 'Andriy Petrenko',
          email: 'aaa@aa.aa',
          photoUrl: 'https://static.dw.com/image/52232031_401.jpg',
          description: 'not bad',
          area: ['vue'],
        },
      ],

      newCoach: {
        id: null,
        name: null,
        email: null,
        photoUrl: null,
        description: null,
        area: [],
      },
    }
  },

  mutations: {
    logIn(state) {
      state.loggedIn = true
    },
    logOut(state) {
      state.loggedIn = false
    },

    registerForm(state) {
      axios.post('/coaches.json', {
        id: state.coaches.length + 1,
        name: state.newCoach.name,
        email: state.newCoach.email,
        photoUrl: state.newCoach.photoUrl,
        description: state.newCoach.description,
        area: state.newCoach.area,
      })
      ;(state.newCoach.id = null),
        (state.newCoach.name = null),
        (state.newCoach.email = null),
        (state.newCoach.photoUrl = null),
        (state.newCoach.description = null),
        (state.newCoach.area = [])
    },
  },
}

export default mainStore
