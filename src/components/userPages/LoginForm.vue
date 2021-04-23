<template>
  <base-card>
    <form>
      <base-card>
        LOG IN HERE
        <base-card class>
          <label for="username">Email:</label>
          <input type="text" id="username" v-model="email"
        /></base-card>
      </base-card>
      <base-card>
        <base-card>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password"
        /></base-card>
      </base-card>
      <div>
        <p v-if="!isValid">
          It seems that you entered incorrect email or password. <br />
          Please try again.
        </p>
        <base-button @click.prevent="log">
          Log In
        </base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isValid: true,
    }
  },

  methods: {
    check() {
      this.isValid = true
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.isValid = false
      }
    },

    log() {
      this.check()
      if (this.isValid) {
        this.$store.dispatch('logIn')
        this.$router.push('/coaches')
      }
    },
  },
}
</script>
