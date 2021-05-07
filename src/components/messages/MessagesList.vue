<template>
  <div>
    <the-spinner v-if="loading" />
    <div v-else class="bg-gray-200">
      <div class="p-8">
        <base-button
          @click="goToCoaches"
          class="mx-20 bg-gray-400 text-white hover:bg-black rounded-xl"
          >Back to coaches</base-button
        >
        <div class="text-4xl text-center">Messages:</div>
        <message-card
          class="m-12"
          v-for="message in arrayOfMessages"
          :key="message.messageId"
          :id="message.messageId"
          :message="message.message"
          :coach="message.coach"
          :time="message.time"
        ></message-card>
      </div>
    </div>
  </div>
</template>

<script>
import MessageCard from './MessageCard'
export default {
  components: {
    MessageCard,
  },

  computed: {
    arrayOfMessages() {
      return this.$store.getters.getMessages
    },

    loading() {
      return this.$store.getters.loading
    },
  },

  methods: {
    //return to coaches page
    goToCoaches() {
      this.$router.push('/coaches')
    },
  },

  created() {
    //dowload messages from DB
    this.$store.dispatch('startLoading')
    if (!this.$store.getters.loggedIn) {
      this.$router.push('/home')
      this.$store.dispatch('endLoading')
    } else {
      this.$store.dispatch('downloadMessages')
      this.$store.dispatch('endLoading')
    }
  },
}
</script>
