<template>
  <div class="content-center">
    <search-form></search-form>

    <base-button @click="goToAddCoach">
      AddCoach
    </base-button>

    <base-button @click="$store.dispatch('downloadCoaches')">
      Refresh
    </base-button>

    <input
      type="text"
      class="bg-red-400"
      @input="filterCoaches(ontext)"
      v-model="text"
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
      filtered: [],
    }
  },
  computed: {
    ontext() {
      return this.text
    },
    toShow() {
      return this.filtered.length < 1
        ? this.$store.getters.coaches
        : this.filtered
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
      const filtered = new Set([...filteredName, ...filteredDescription])

      this.filtered = filtered
    },
  },

  created() {
    this.$store.dispatch('downloadCoaches')
  },
  beforeUpdate() {
    this.$store.dispatch('downloadCoaches')
  },
}
</script>
