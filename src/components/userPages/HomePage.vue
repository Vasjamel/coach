<template>
  <div class="p-12 m-12 text-center">
    <div>
      <div class="m-8 font-black font-mono bold text-4xl">
        PLEASE LOG IN TO SEE COACHES!
      </div>
      <login-button class="bg-black text-white rounded-xl "></login-button>
    </div>
    <div>
      <div class="m-8 font-mono font-extrabold text-2x1">
        Have no account? Sign up for free!
      </div>
      <signup-button class="bg-black text-white rounded-xl "></signup-button>
    </div>
  </div>
</template>

<script>
import LoginButton from './../userPages/LoginButton'
import SignupButton from './../userPages/SignupButton'
export default {
  components: {
    LoginButton,
    SignupButton,
  },

  created() {
    //if logged in redirect to coaches page
    if (this.$store.getters.loggedIn) {
      this.$router.push('/coaches')
    }
  },
}
</script>
