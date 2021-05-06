<template>
  <div v-if="!isLoading" class="m-8 text-2xl font-mono ">
    <the-modal v-if="showModal">
      {{ showModal }}
    </the-modal>
    <vee-form class=" m-8 p-2 text-center bg-white rounded-xl">
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
            v-model.trim="user.email"
            class="bg-black rounded-xl focus:outline-none focus:text-black  focus:bg-yellow-400 text-white w-1/4"
          />
          <vee-error class="text-red-600" name="email" as="div" />
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
          <vee-field
            name="password"
            rules="required|password"
            type="password"
            id="password"
            v-model="user.password"
            class="bg-black rounded-xl focus:outline-none focus:text-black focus:bg-yellow-400  text-white w-1/4"
          />
          <vee-error class="text-red-600" name="password" as="div" />
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
    </vee-form>
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

  computed: {
    showModal() {
      return this.$store.getters.error
    },
  },

  methods: {
    check() {
      if (this.cofirmPassword !== this.user.password) {
        this.$store.dispatch(
          'seeError',
          'PASSWORD IS NOT MATCHING WITH CONFIRMED PASSWORD!!!'
        )
        this.formIsValid = false
      } else {
        this.formIsValid = true
      }
    },

    async create() {
      this.isLoading = true
      await this.check()
      try {
        if (this.formIsValid) {
          await this.$store.dispatch('signUp', this.user)
          this.user.email = ''
          this.user.password = ''
          this.cofirmPassword = ''
        } else {
          await this.$store.dispatch(
            'seeError',
            'Email or password is incorrect.'
          )
        }
        this.isLoading = false
      } catch (err) {
        await this.$store.dispatch('seeError', err.message)
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
