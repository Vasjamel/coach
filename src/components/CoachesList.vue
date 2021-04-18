<template>
  <div class="content-center">
    <search-form></search-form>
    <ul class="w-full text-center">
      <coach-card
        v-for="coach in this.$store.getters.coaches"
        :key="coach.email"
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
  created() {
    this.$store.dispatch('loadCoaches')
  },
}
</script>
