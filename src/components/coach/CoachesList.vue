<template>
  <div class="content-center">
    <search-form></search-form>
    <base-button @click.prevent="goToAddCoach">
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
    <p v-if="ontext && ontextLength < 1">Sorry, we cannot find this</p>
    <base-button>Render</base-button>
    <ul v-if="this.filtered.length < 1" class="w-full text-center">
      <coach-card
        v-for="coach in this.$store.getters.coaches"
        :key="coach.id"
        :id="coach.id"
        :name="coach.name"
        :email="coach.email"
        :photoUrl="coach.photoUrl"
        :description="coach.description"
        :area="coach.area"
      ></coach-card>
    </ul>
    <ul v-else>
      <coach-card
        v-for="coach in this.filtered"
        :key="coach.id"
        :id="coach.id"
        :name="coach.name"
        :email="coach.email"
        :photoUrl="coach.photoUrl"
        :description="coach.description"
        :area="coach.area"
      >
      </coach-card>
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
      filtered: '',
      pages: [],
      currentPage: 1,
      coachesToRender: [],
      coachesPerPage: 10,
    }
  },
  computed: {
    ontext() {
      return this.text
    },
    ontextLength() {
      return this.text.length
    },
  },

  methods: {
    goToAddCoach() {
      this.$router.push('/addcoach')
    },

    filterCoaches(value) {
      const filtered = this.$store.getters.coaches.filter((coach) =>
        coach.name.toLowerCase().includes(value.toLowerCase())
      )
      this.filtered = filtered
    },
  },

  created() {
    this.$store.dispatch('downloadCoaches')
  },
}
</script>
