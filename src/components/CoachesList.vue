<template>
  <div>
    <h1>NOW YOU WILL SEE</h1>
    <ul class="w-max grid-cols-2">
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
