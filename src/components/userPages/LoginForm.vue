<template>
  <div class="m-8 text-2xl font-mono ">
    <form class=" m-8 p-2 text-center bg-white rounded-xl">
      <div class="text-3xl font-extrabold p-4">
        LOG IN BELOW
      </div>
      <div class="m-8">
        <div>
          <label for="username">Email:</label>
        </div>
        <div>
          <input
            type="text"
            id="username"
            v-model="email"
            class="bg-black rounded-xl focus:outline-none focus:text-black  focus:bg-yellow-400 text-white w-1/4"
          />
        </div>
      </div>
      <div class="m-8">
        <div>
          <label for="password">Password:</label>
        </div>
        <div>
          <input
            type="password"
            id="password"
            v-model="password"
            class="bg-black rounded-xl focus:outline-none focus:text-black focus:bg-yellow-400  text-white w-1/4"
          />
        </div>
      </div>
      <div>
        <p v-if="!isValid">
          It seems that you entered incorrect email or password. <br />
          Please try again.
        </p>
        <base-button
          @click.prevent="log"
          class="bg-black rounded-xl text-white hover:bg-yellow-400 hover:text-black hover:text-2x1 focus:outline-none"
        >
          Log In
        </base-button>
      </div>
    </form>
  </div>
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
