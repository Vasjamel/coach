<template>
  <the-spinner v-if="isLoading"></the-spinner>

  <div v-else class="m-8 text-2xl font-mono ">
    <vee-form class=" m-8 p-2 text-center bg-white rounded-xl">
      <div class="text-3xl font-extrabold p-4">
        LOG IN BELOW
      </div>
      <div class="m-8">
        <div>
          <label for="username">Email:</label>
        </div>
        <div>
          <vee-field
            name="email"
            rules="required|email"
            type="text"
            id="username"
            v-model="email"
            class="bg-black rounded-xl focus:outline-none focus:text-black  focus:bg-yellow-400 text-white w-1/4"
          />
          <vee-error class=" text-red-600" name="email" as="div" />
        </div>
      </div>
      <div class="m-8">
        <div>
          <label for="password">Password:</label>
        </div>
        <div>
          <vee-field
            name="password"
            rules="required|password"
            type="password"
            id="password"
            v-model="password"
            class="bg-black rounded-xl focus:outline-none focus:text-black focus:bg-yellow-400  text-white w-1/4"
          />
          <vee-error class="text-red-600" name="password" as="div" />
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
    </vee-form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
export default {
  components: {
    VeeForm: Form,
    VeeField: Field,
    VeeError: ErrorMessage,
  },
  data() {
    return {
      email: '',
      password: '',
      isValid: true,
      isLoading: false,
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
      } else {
        this.isValid = true
      }
    },

    async log() {
      this.isLoading = true
      await this.check()

      if (this.isValid) {
        await this.$store.dispatch('logIn', {
          email: this.email,
          password: this.password,
        })
        this.$router.push('/coaches')
        this.isLoading = false
      } else {
        this.email = ''
        this.password = ''
        this.isLoading = false
        this.$router.push('/login')
      }
    },
  },

  created() {
    if (this.$store.getters.loggedIn) {
      this.$router.push('/coaches')
    }
  },
}
</script>
