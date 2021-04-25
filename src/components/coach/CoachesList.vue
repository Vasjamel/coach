<template>
  <div>
    <hr />
    <div v-if="this.$store.getters.loggedIn">
      <!-- <filter-form></filter-form> -->

      <div class="flex bg-black text-white text-xl content-center">
        <base-button
          @click="goToAddCoach"
          class=" mx-auto hover:text-yellow-400 focus:outline-none"
        >
          AddCoach
        </base-button>

        <base-button
          class=" mx-auto hover:text-yellow-400  focus:outline-none"
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
            @input="filterCoaches(ontext)"
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

      <base-card v-if="!toShow">
        Loading...
      </base-card>
      <base-card v-else-if="toShow.length < 1">
        There are no coaches with these parameters. Please registed
        some!</base-card
      >
      <div v-else>
        <div v-if="pages.length > 1" class="flex justify-center m-auto">
          <div>Pages:</div>
          <div class="m-4" v-for="page in pages" :key="page">
            <base-button
              class="bg-white rounded-xl m-auto"
              @click="changePage(page)"
            >
              {{ page }}
            </base-button>
          </div>
        </div>

        <base-card class="flex content-center">
          <ul class="flex content-center text-center">
            <coach-card
              v-for="coach in paginate(filterCoachesByArea(toShow))"
              :key="coach.id"
              :id="coach.id"
              :name="coach.name"
              :email="coach.email"
              :photoUrl="coach.photoUrl"
              :description="coach.description"
              :area="coach.area"
            ></coach-card>
          </ul>
        </base-card>
      </div>
    </div>
  </div>
</template>

<script>
import CoachCard from './CoachCard'
// import FilterForm from './FilterForm'
export default {
  components: {
    CoachCard,
    // FilterForm,
  },

  data() {
    return {
      text: '',
      coachesArray: [],
      areasToFilter: ['frontend', 'backend', 'vue', 'other'],

      filtered: null,
      perPage: 3,
      pages: [],
      currentPage: 1,
    }
  },
  computed: {
    ontext() {
      return this.text
    },
    toShow() {
      return this.filtered ? this.filtered : this.$store.getters.coaches
    },
  },
  watch: {
    toShow() {
      this.paginate(this.filterCoachesByArea(this.toShow))
    },
  },

  methods: {
    filterCoachesByArea(array) {
      const filtersByArea = array.filter((coach) => {
        return coach.area.some((area) => this.areasToFilter.includes(area))
      })
      return filtersByArea
    },

    goToAddCoach() {
      this.$router.push({ path: '/addcoach' })
    },

    changePage(page) {
      this.currentPage = page
      this.paginate(this.toShow)
    },

    filterCoaches(value) {
      const withoutDuplicates = this.$store.getters.coaches.filter(
        (coach) =>
          coach.name.toLowerCase().includes(value.toLowerCase()) ||
          coach.description.toLowerCase().includes(value.toLowerCase())
      )

      this.filtered = withoutDuplicates
      this.calculatePages()
      this.paginate(this.filtered)
      this.currentPage = 1
    },

    calculatePages() {
      this.pages = []
      let quantityOfPages = null
      quantityOfPages = Math.ceil(
        this.filterCoachesByArea(this.toShow).length / this.perPage
      )
      for (let i = 1; i <= quantityOfPages; i++) {
        this.pages.push(i)
      }
    },

    paginate(coaches) {
      const page = this.currentPage
      let perPage = this.perPage
      let from = page * perPage - perPage
      let to = page * perPage
      this.calculatePages()
      return coaches.slice(from, to)
    },

    seeMessages() {
      this.$router.push('/messages')
    },
  },

  async created() {
    await this.$store.dispatch('downloadCoaches')
  },

  beforeUpdate() {
    this.calculatePages()
    this.paginate(this.toShow)
  },
}
</script>
