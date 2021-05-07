<template>
  <base-button
    class=" hover:bg-yellow-400 hover:text-black hover:text-2x1 focus:outline-none"
    @click="openSignup"
  >
    Sign Up
  </base-button>
</template>

<script>
export default {
  methods: {
    //button redirects to sign up page
    openSignup() {
      this.$router.push('/signup')
    },
  },
}
</script>
