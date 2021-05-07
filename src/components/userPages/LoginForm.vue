<template>
  <the-spinner v-if="loading"></the-spinner>

  <div v-else class="m-8 text-2xl font-mono ">
    <the-modal v-if="showModal">
      {{ showModal }}
    </the-modal>

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
        <base-button
          @click="log"
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
      formIsValid: true,
    }
  },

  computed: {
    showModal() {
      //show error message in modal wiindow
      return this.$store.getters.error
    },
    loading() {
      //show loading spinner
      return this.$store.getters.loading
    },
  },

  methods: {
    //check if all the fields are filled in
    check() {
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false
      } else {
        this.formIsValid = true
      }
    },

    async log() {
      this.$store.dispatch('startLoading')
      await this.check()
      try {
        if (this.formIsValid) {
          await this.$store.dispatch('logIn', {
            email: this.email,
            password: this.password,
          })
          this.$router.push('/coaches')
          this.$store.dispatch('endLoading')
        } else {
          await this.$store.dispatch(
            'seeError',
            'Email or password is incorrect.'
          )
          this.$store.dispatch('endLoading')
        }
      } catch (err) {
        await this.$store.dispatch('seeError', err.message)
      }
      this.$store.dispatch('endLoading')
    },

    created() {
      //if user is logged in - redirect to coaches page
      if (this.$store.getters.loggedIn) {
        this.$router.push('/coaches')
      }
    },
  },
}
</script>
