<template>
  <base-button
    class=" hover:bg-yellow-400 hover:text-black hover:text-2x1 focus:outline-none"
    @click="openLogin"
  >
    {{ buttonType }}
  </base-button>
</template>

<script>
export default {
  methods: {
    openLogin() {
      this.$router.push('/login')
    },
  },
  computed: {
    buttonType() {
      return this.$store.getters.loggedIn ? 'Log Out' : 'Log In'
    },
  },
}
</script>
