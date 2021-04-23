<template>
  <base-button @click="openLogin">
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
