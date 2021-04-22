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

    <p v-if="!toShow">
      There are no coaches. Please registed some!
    </p>

    <ul v-else class="w-full text-center">
      <coach-card
        v-for="coach in toShow"
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

  methods: {
    goToAddCoach() {
      this.$router.push({ path: '/addcoach' })
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
      if (this.toShow) {
        quantityOfPages = Math.ceil(this.toShow.length / this.perPage)
      }
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
    this.calculatePages()
  },
}
</script>
