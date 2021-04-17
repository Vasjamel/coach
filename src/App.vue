<template>
  <div>
    <base-header></base-header>
    <home-page v-if="loggedIn === false"></home-page>
    <coaches-list v-else></coaches-list>
  </div>
</template>

<script>
import BaseHeader from './components/BaseHeader'
import CoachesList from './components/CoachesList.vue'
import HomePage from './components/HomePage'

export default {
  components: {
    BaseHeader,
    HomePage,
    CoachesList,
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn
    },
  },
}
</script>
