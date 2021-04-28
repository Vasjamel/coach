<template>
  <div class="bg-black font-mono text-white h-36">
    <div class="block">
      <div class="float-right m-8">
        <login-button class="bg-white text-black font-bold rounded-xl m-2">
        </login-button>

        <signup-button
          v-if="!$store.getters.loggedIn"
          class="bg-white text-black font-bold rounded-xl"
        >
        </signup-button>
      </div>

      <div class="text-7xl mx-10 font-bold">
        <div class="p-2">
          COACH DISCOVERY
        </div>
      </div>

      <div class=" my-5 text-center text-lg">
        Find the relevant coach!
      </div>
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
}
</script>
