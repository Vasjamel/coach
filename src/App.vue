<template>
  <div>
    <base-header></base-header>
    <home-page v-if="loggedIn === false"></home-page>
    <div v-else>
      <coaches-list></coaches-list>
      <add-coach></add-coach>
    </div>
  </div>
</template>

<script>
import BaseHeader from './components/BaseHeader'
import CoachesList from './components/CoachesList.vue'
import HomePage from './components/HomePage'
import AddCoach from './components/AddCoach'

export default {
  components: {
    BaseHeader,
    HomePage,
    CoachesList,
    AddCoach,
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn
    },
  },
}
</script>
