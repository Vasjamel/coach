<template>
  <div class="text-center h-14">
    <base-card>
      <h1>PLEASE LOG IN OR SIGN UP!</h1>
      <div>
        <login-button></login-button>
      </div>
      <div>
        <signup-button></signup-button>
      </div>
    </base-card>
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
}
</script>
