<template>
  <base-button v-if="!this.$store.getters.loggedIn" @click="openSignup">
    Sign Up
  </base-button>
</template>

<script>
export default {
  methods: {
    openSignup() {
      this.$router.push('/signup')
    },
  },
}
</script>
