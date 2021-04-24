<template>
  <div v-if="this.$store.getters.loggedIn">
    <!-- <filter-form></filter-form> -->
    <base-card class="flexbox content-center">
      <div class="flex content-center mx-8">
        <base-card class="m-4 mx-10">
          <label for="coach-area">
            Frontend
          </label>
          <input type="checkbox" v-model="abc" id="frontend" value="frontend" />
        </base-card>
        <base-card class="m-4">
          <label for="coach-area">
            Backend
          </label>
          <input type="checkbox" v-model="abc" value="backend" id="backend" />
        </base-card>
        <base-card class="m-4">
          <label for="coach-area">
            Vue
          </label>
          <input type="checkbox" v-model="abc" value="vue" id="vue" />
        </base-card>
        <base-card class="m-4">
          <label for="coach-area">
            Other
          </label>
          <input type="checkbox" v-model="abc" value="other" id="other" />
        </base-card>
        <ul>
          <li v-for="item in filteredList" :key="item.name">
            {{ item.name }} / {{ item.categories }}
          </li>
        </ul>
      </div>
    </base-card>
    <base-card class="flex">
      <base-button @click="goToAddCoach">
        AddCoach
      </base-button>

      <base-button @click="$store.dispatch('downloadCoaches')">
        Refresh
      </base-button>

      <base-button @click="seeMessages">See messages</base-button>

      <base-card>
        <label for="search">Search</label>
        <input
          id="search"
          type="text"
          class="bg-red-400"
          @input="filterCoaches(ontext)"
          v-model.trim="text"
        />
      </base-card>
    </base-card>
    <base-card v-if="!toShow">
      There are no coaches. Please registed some!
    </base-card>
    <div v-else>
      <base-card class="flex right-8">
        <div v-for="page in pages" :key="page">
          <base-button @click="changePage(page)">
            {{ page }}
          </base-button>
        </div>
      </base-card>
      <base-card class="flex content-center">
        <ul class="flex content-center text-center">
          <coach-card
            v-for="coach in paginate(toShow)"
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
      filters: { frontend: true, backend: true, vue: true, other: true },
      abc: [],
      toFilter: [
        {
          name: 'A',
          categories: ['vue'],
        },
        {
          name: 'B',
          categories: ['frontend'],
        },
        {
          name: 'C',
          categories: ['vue', 'other'],
        },
      ],
      filtered: null,
      perPage: 3,
      pages: [],
      currentPage: 1,
    }
  },
  computed: {
    filteredList() {
      return this.toFilter.filter((el) => {
        return el.categories.some((i) => {
          return this.abc.includes(i)
        })
      })
    },
    ontext() {
      return this.text
    },
    toShow() {
      return !this.filtered ? this.$store.state.coaches : this.filtered
    },
  },
  watch: {
    toShow() {
      this.paginate(this.toShow)
    },
  },

  methods: {
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
      quantityOfPages = Math.ceil(this.toShow.length / this.perPage)
      for (let i = 1; i <= quantityOfPages; i++) {
        this.pages.push(i)
      }
    },

    paginate(coaches) {
      const page = this.currentPage
      let perPage = this.perPage
      let from = page * perPage - perPage
      let to = page * perPage
      return coaches.slice(from, to)
    },

    seeMessages() {
      this.$router.push('/messages')
    },
  },

  async created() {
    await this.$store.dispatch('downloadCoaches')
    console.log('dispatched', this.$store.getters.coaches)
  },

  beforeUpdate() {
    this.calculatePages()
    this.paginate(this.toShow)
  },
}
</script>
