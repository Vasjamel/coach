<template>
  <div class="content-center">
    <h1>NOW YOU WILL SEE</h1>
    <ul class="w-full text-center">
      <coach-card
        v-for="coach in this.$store.state.coaches"
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
export default {
  components: {
    CoachCard,
  },
}
</script>
