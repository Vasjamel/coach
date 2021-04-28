<template>
  <div v-if="!isLoading" class="m-8 text-2xl font-mono ">
    <form class=" m-8 p-2 text-center bg-white rounded-xl">
      <div class="text-3xl font-extrabold p-4">
        CREATE AN ACCOUNT
      </div>
      <div class="m-8">
        <div>
          <label for="username">Email:</label>
        </div>
        <div>
          <input
            type="text"
            id="username"
            v-model="user.email"
            class="bg-black rounded-xl focus:outline-none focus:text-black  focus:bg-yellow-400 text-white w-1/4"
          />
        </div>
      </div>
      <div class="m-8">
        <div>
          <label for="password"
            >Password:
            <div class=" text-sm">(6 characters min)</div></label
          >
        </div>
        <div>
          <input
            type="password"
            id="password"
            v-model="user.password"
            class="bg-black rounded-xl focus:outline-none focus:text-black focus:bg-yellow-400  text-white w-1/4"
          />
        </div>
      </div>

      <div class="m-8">
        <div>
          <label for="cofirmPassword">Confirm password:</label>
        </div>
        <div>
          <input
            type="password"
            id="cofirmPassword"
            v-model="cofirmPassword"
            class="bg-black rounded-xl focus:outline-none focus:text-black focus:bg-yellow-400  text-white w-1/4"
          />
        </div>
      </div>

      <div>
        <p v-if="!formIsValid">
          Email or password is incorrect. <br />
          Please try again.
        </p>
        <div>
          <base-button
            @click.prevent="create"
            class="bg-black rounded-xl text-white hover:bg-yellow-400 hover:text-black hover:text-2x1 focus:outline-none"
          >
            Create account
          </base-button>
          <base-button
            @click.prevent="goHome"
            class="bg-black rounded-xl m-4 text-white hover:bg-red-400 hover:text-black hover:text-2x1 focus:outline-none"
          >
            Cancel
          </base-button>
        </div>
      </div>
    </form>
  </div>
  <the-spinner v-else></the-spinner>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },

      cofirmPassword: '',
      formIsValid: true,
      isLoading: false,
      error: null,
    }
  },

  methods: {
    check() {
      this.formIsValid = true
      if (
        this.user.email === '' ||
        !this.user.email.includes('@') ||
        this.user.password.length < 6
      ) {
        this.formIsValid = false
      } else {
        this.isValid = true
        if (this.cofirmPassword !== this.user.password) {
          alert('PASSWORD IS NOT MATCHING WITH CONFIRMED PASSWORD!!!')
          this.formIsValid = false
        }
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
}
</script>
