<template>
  <div class="p-6 text-white font-serif w-full h-28 bg-green-600">
    <div>
      <div v-if="!this.$store.state.loggedIn">
        <base-button class="float-right pl-4 pr-4 py-2">
          Sign Up
        </base-button>
        <base-button
          class="float-right pl-4 pr-4 py-2"
          @click="this.$store.commit('logIn')"
        >
          Log In
        </base-button>
      </div>
      <div v-else>
        <base-button
          class="float-right pl-4 pr-4 py-2"
          @click="this.$store.commit('logOut')"
        >
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
