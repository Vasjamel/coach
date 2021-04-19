<template>
  <base-button @click="openLogin">
    Log In
  </base-button>
</template>

<script>
export default {
  methods: {
    openLogin() {
      this.$router.push('/login')
    },
  },
}
</script>
