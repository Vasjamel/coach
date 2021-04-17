<template>
  <div class="p-6 text-white font-serif w-full h-28 bg-green-600">
    <div>
      <div v-if="!this.$store.state.loggedIn" class="float-right">
        <base-button @click="this.$store.commit('logIn')">
          Log In
        </base-button>
        <base-button>
          Sign Up
        </base-button>
      </div>
      <div v-else class="float-right">
        <base-button>
          Register a new coach!
        </base-button>
        <base-button @click="this.$store.commit('logOut')">
          Log Out
        </base-button>
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
