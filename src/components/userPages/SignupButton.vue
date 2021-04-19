<template>
  <base-button @click="openSignup">
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
