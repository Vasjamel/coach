<template>
  <base-card>
    <form>
      <base-card>
        CREATE ACCOUNT
        <base-card class>
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="user.email"
        /></base-card>
      </base-card>
      <base-card>
        <base-card>
          <label for="password">Password (at least 6 characters length):</label>
          <input type="password" id="password" v-model="user.password"
        /></base-card>
        <p></p>
      </base-card>
      <base-button @click="create">Create</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
        isValid: true,
      },
    }
  },

  methods: {
    check() {
      this.isValid = true
      if (
        this.user.email === '' ||
        !this.user.email.includes('@') ||
        this.user.password.length < 6
      ) {
        this.isValid = false
      }
    },

    create() {
      this.check()
      if (this.isValid) {
        this.$store.dispatch('signUp', this.user)
        this.$router.push('/coaches')
      }
    },
  },
}
</script>
