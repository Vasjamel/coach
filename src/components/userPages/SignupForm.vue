<template>
  <div v-if="!isLoading" class="m-8 text-2xl font-mono ">
    <vee-form @submit="create" class=" m-8 p-2 text-center bg-white rounded-xl">
      <div class="text-3xl font-extrabold p-4">
        CREATE AN ACCOUNT
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
            v-model="user.email"
            class="bg-black rounded-xl focus:outline-none focus:text-black  focus:bg-yellow-400 text-white w-1/4"
          />
          <vee-error name="email" as="div"></vee-error>
        </div>
      </div>
      <div class="m-8">
        <div>
          <label for="password">Password: </label>
        </div>
        <div>
          <vee-field
            type="password"
            rules="required|password"
            name="password"
            id="password"
            v-model="user.password"
            class="bg-black rounded-xl focus:outline-none focus:text-black focus:bg-yellow-400  text-white w-1/4"
          />
          <vee-error name="password" as="div"></vee-error>
        </div>
      </div>

      <div class="m-8">
        <div>
          <label for="cofirmPassword">Confirm password:</label>
        </div>
        <div>
          <vee-field
            name="cofirmPassword"
            rules="required|password"
            type="password"
            id="cofirmPassword"
            class="bg-black rounded-xl focus:outline-none focus:text-black focus:bg-yellow-400  text-white w-1/4"
          />
          <vee-error name="cofirmPassword" as="div"></vee-error>
        </div>
      </div>

      <div>
        <div>
          <base-button
            @click.prevent="create"
            class="bg-black rounded-xl text-white hover:bg-yellow-400 hover:text-black hover:text-2x1 focus:outline-none"
          >
            Create account
          </base-button>
        </div>
      </div>
    </vee-form>
    <base-button
      @click.prevent="goHome"
      class="bg-black text-center rounded-xl m-4 text-white hover:bg-red-400 hover:text-black hover:text-2x1 focus:outline-none"
    >
      Cancel
    </base-button>
  </div>
  <the-spinner v-else></the-spinner>
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
      user: {
        email: '',
        password: '',
      },

      cofirmPassword: '',
      formIsValid: true,
      isLoading: false,
    }
  },

  methods: {
    check() {
      this.formIsValid = true
      if (this.cofirmPassword !== this.user.password) {
        alert('PASSWORD IS NOT MATCHING WITH CONFIRMED PASSWORD!!!')
        this.formIsValid = false
      }
    },

    async create() {
      this.isLoading = true
      await this.check()
      try {
        if (this.formIsValid) {
          await this.$store.dispatch('signUp', this.user)
          this.$router.push('/login')
        } else {
          alert('Something went wrong. Please retry!')
          this.$router.push('/home')
        }
        this.isLoading = false
      } catch (err) {
        alert(err.message)
        this.isLoading = false
      }
    },

    goHome() {
      this.$router.push('/home')
    },
  },
  created() {
    if (this.$store.getters.loggedIn) {
      this.$router.push('/coaches')
    }
  },
}
</script>
