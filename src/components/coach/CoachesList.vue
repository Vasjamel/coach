<template>
  <div class="content-center">
    <search-form></search-form>

    <base-button @click="goToAddCoach">
      AddCoach
    </base-button>

    <base-button @click="$store.dispatch('downloadCoaches')">
      Refresh
    </base-button>

    <base-button @click="seeMessages">See messages</base-button>

    <input
      type="text"
      class="bg-red-400"
      @input="filterCoaches(ontext)"
      v-model.trim="text"
    />

    <base-card v-if="!toShow">
      There are no coaches. Please registed some!
    </base-card>
    <div v-else>
      Pages:
      <div v-for="page in pages" :key="page">
        <base-button @click="changePage(page)">
          {{ page }}
        </base-button>
      </div>
      <ul class="w-full text-center">
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
    </div>
  </div>
</template>

<script>
import CoachCard from './CoachCard'
import SearchForm from './SearchForm'
export default {
  components: {
    CoachCard,
    SearchForm,
  },

  data() {
    return {
      text: '',
      coachesArray: [],
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
      console.log(page)
      this.currentPage = page
    },

    filterCoaches(value) {
      const filteredName = this.$store.getters.coaches.filter((coach) =>
        coach.name.toLowerCase().includes(value.toLowerCase())
      )
      const filteredDescription = this.$store.getters.coaches.filter((coach) =>
        coach.description.toLowerCase().includes(value.toLowerCase())
      )
      const filteredDuplicates = [...filteredName, ...filteredDescription]

      const withoutDuplicates = filteredDuplicates.filter(
        (item, pos) => filteredDuplicates.indexOf(item) == pos
      )

      this.filtered = withoutDuplicates
      this.calculatePages()
      this.paginate(this.filtered)
    },

    calculatePages() {
      this.pages = []
      let quantityOfPages = null
      quantityOfPages = Math.ceil(this.toShow.length / this.perPage)
      for (let i = 1; i <= quantityOfPages; i++) {
        this.pages.push(i)
      }
      console.log('pages:', this.pages)
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

  beforeMount() {
    this.$store.dispatch('downloadCoaches')
  },

  beforeUpdate() {
    this.calculatePages()
    this.paginate(this.toShow)
  },
}
</script>
