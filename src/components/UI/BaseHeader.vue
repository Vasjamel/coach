<template>
  <div class="p-6 text-white font-serif w-full h-28 bg-green-600">
    <div>
      <div class="float-right">
        <login-button>
          <router-link to="/home"> </router-link>
        </login-button>

        <signup-button>
          <router-link to="/coaches"></router-link>
        </signup-button>
      </div>

      <h1 class="text-3xl h-1/2 text-red-400">
        COACH FINDER
      </h1>
    </div>
    <div>
      <h6 class="h-1/2 text-red-300 mt-2 ml-14">
        Find the relevant coach!
      </h6>
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
