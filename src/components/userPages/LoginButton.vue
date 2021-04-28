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
      if (this.$store.getters.loggedIn) {
        this.$store.dispatch('logOut')
        this.$router.push('/home')
      } else {
        this.$router.push('/login')
      }
    },
  },
  computed: {
    buttonType() {
      return this.$store.getters.loggedIn ? 'Log Out' : 'Log In'
    },
  },
}
</script>
