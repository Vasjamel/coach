<template>
  <div>
    <hr />
    <div>
      <div class="flex bg-black text-white text-xl content-center">
        <base-button
          @click="goToAddCoach"
          class=" mx-auto hover:text-yellow-400 focus:outline-none"
        >
          AddCoach
        </base-button>

        <base-button
          class="  mx-auto hover:text-yellow-400  focus:outline-none"
          @click="$store.dispatch('downloadCoaches')"
        >
          Refresh
        </base-button>

        <base-button
          class=" mx-auto hover:text-yellow-400  focus:outline-none"
          @click="seeMessages"
          >See messages</base-button
        >

        <base-card class=" mx-auto ">
          <label for="search" class="hover:text-yellow-400  focus:outline-none"
            >Search coach by name / description</label
          >
          <input
            id="search"
            type="text"
            class="bg-white text-black rounded-xl mx-2 focus:outline-none focus:bg-yellow-400"
            v-model.trim="text"
          />
        </base-card>
      </div>

      <div class="text-center text-2xl mt-2">
        Filter coaches by area of expertise:
      </div>
      <div class="flex content-center text-xl bg-black">
        <base-card class="m-auto bg-black">
          <label for="coach-area" class="text-white">
            Frontend
          </label>
          <input
            type="checkbox"
            v-model="areasToFilter"
            id="frontend"
            value="frontend"
          />
        </base-card>
        <base-card class="m-auto bg-black">
          <label for="coach-area" class="text-white">
            Backend
          </label>
          <input
            type="checkbox"
            v-model="areasToFilter"
            value="backend"
            id="backend"
          />
        </base-card>
        <base-card class="m-auto bg-black">
          <label for="coach-area" class="text-white">
            Vue
          </label>
          <input type="checkbox" v-model="areasToFilter" value="vue" id="vue" />
        </base-card>
        <base-card class="m-auto bg-black">
          <label for="coach-area" class="text-white">
            Other
          </label>
          <input
            type="checkbox"
            v-model="areasToFilter"
            value="other"
            id="other"
          />
        </base-card>
      </div>

      <base-card
        v-if="toShow.length < 1"
        class="bg-gray-600 text-white m-20 text-center"
      >
        There are no coaches with these parameters. Please registed
        some!</base-card
      >
      <the-spinner v-else-if="loading"></the-spinner>

      <div v-else>
        <div class="flex flex-wrap justify-center content-center">
          <ul class="flex text-center">
            <coaches-card
              class="justify-between items-stretch box-border min-h-full min-w-max max-w-full"
              v-for="coach in slicedToShow"
              :key="coach.id"
              :id="coach.id"
              :name="coach.name"
              :email="coach.email"
              :photoUrl="coach.photoUrl"
              :description="coach.description"
              :area="coach.area"
            ></coaches-card>
          </ul>
        </div>

        <div
          v-if="pagination.pages.length > 1"
          class="flex justify-center m-auto"
        >
          <div class="m-4" v-for="page in pagination.pages" :key="page">
            <base-button
              class="bg-white rounded-xl m-auto hover:bg-yellow-400"
              @click.prevent="changePage(page)"
            >
              {{ page }}
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoachesCard from './CoachesCard'
export default {
  components: {
    CoachesCard,
  },

  data() {
    return {
      text: '',
      coachesArray: [],
      areasToFilter: ['frontend', 'backend', 'vue', 'other'],
      filtered: null,
      pagination: {
        perPage: 2,
        pages: [],
        currentPage: 1,
      },
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    ontext() {
      return this.text
    },
    toShow() {
      const coachesToShow = this.$store.state.coaches

        .filter((coach) => {
          return this.areasToFilter.some((area) => {
            return area.includes(coach.area)
          })
        })

        .filter((coach) => {
          return (
            coach.name.toLowerCase().includes(this.text.toLowerCase()) ||
            coach.description.toLowerCase().includes(this.text.toLowerCase())
          )
        })
      return coachesToShow
    },

    slicedToShow() {
      const from =
        this.pagination.currentPage * this.pagination.perPage -
        this.pagination.perPage
      const to = this.pagination.currentPage * this.pagination.perPage
      return this.toShow.slice(from, to)
    },
  },

  watch: {
    toShow() {
      this.pagination.currentPage = 1
      this.pagination.pages = []
      const numberOfPages = Math.ceil(
        this.toShow.length / this.pagination.perPage
      )
      for (let i = 1; i <= numberOfPages; i++) {
        this.pagination.pages.push(i)
      }
    },
  },

  methods: {
    goToAddCoach() {
      this.$router.push({ path: '/addcoach' })
    },

    changePage(page) {
      this.pagination.currentPage = page
    },

    seeMessages() {
      this.$router.push('/messages')
    },
  },

  created() {
    this.$store.dispatch('startLoading')
    if (!this.$store.getters.loggedIn) {
      this.$router.push('/home')
    } else {
      this.$store.dispatch('downloadCoaches')
    }
    this.$store.dispatch('endLoading')
  },
}
</script>
