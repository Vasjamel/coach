const mainStore = {
  state() {
    return {
      loggedIn: false,
      coaches: [
        {
          id: 1,
          name: 'Ivan Petrenko',
          email: 'aaa@aa.aa',
          photoUrl:
            'https://i.guim.co.uk/img/media/a53ae9e9657c4b358cdb30a345f6f20e5a389e78/0_143_6376_3825/master/6376.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d2d2e966743309e95159fa2dae360b90',
          description: 'Very good',
          area: 'frontend',
        },
        {
          id: 2,
          name: 'Petro Petrenko',
          email: 'aaa@aa.aa',
          photoUrl:
            'https://dailygazette.com/wp-content/uploads/fly-images/126428/shutterstock_245726512-scaled-940x940.jpg',
          description: 'Best coach',
          area: 'backend',
        },
        {
          id: 3,
          name: 'Andriy Petrenko',
          email: 'aaa@aa.aa',
          photoUrl: 'https://static.dw.com/image/52232031_401.jpg',
          description: 'not bad',
          area: 'vue',
        },
        {
          id: 4,
          name: 'Serhiy Petrenko',
          email: 'aaa@aa.aa',
          photoUrl:
            'https://dailygazette.com/wp-content/uploads/fly-images/126428/shutterstock_245726512-scaled-940x940.jpg',
          description: 'Knows how to make it work',
          area: 'tailwind',
        },
      ],
    }
  },

  mutations: {
    logIn(state) {
      state.loggedIn = true
    },
    logOut(state) {
      state.loggedIn = false
    },
  },

  getters: {
    getCoaches(state) {
      return state.coaches
    },
  },
}

export default mainStore
