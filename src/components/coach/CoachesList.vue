<template>
  <div class="content-center">
    <search-form></search-form>
    <base-button @click.prevent="goToAddCoach">
      AddCoach
    </base-button>
    <base-button @click="$store.dispatch('downloadCoaches')">
      Refresh
    </base-button>
    <ul class="w-full text-center">
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
      pages: [],
      currentPage: 1,
      coachesToRender: [],
      coachesPerPage: 10,
    }
  },

  methods: {
    goToAddCoach() {
      this.$router.push('/addcoach')
    },

    renderCoaches() {
      this.$store.getters.coaches.forEach((coach) => {
        this.coachesToRender.push(coach)
      })
    },
  },

  created() {
    this.$store.dispatch('downloadCoaches')
  },
}
</script>
