<template>
  <base-card>
    <form>
      <base-card>
        LOG IN HERE
        <base-card class>
          <label for="username">Email:</label>
          <input type="text" id="username"
        /></base-card>
      </base-card>
      <base-card>
        <base-card>
          <label for="password">Password:</label>
          <input type="password" id="password"
        /></base-card>
      </base-card>
      <div>
        <base-button @click.prevent="log">
          Log In
        </base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  methods: {
    log() {
      this.$store.dispatch('logIn')
      this.$router.push('/coaches')
    },
  },
}
</script>
