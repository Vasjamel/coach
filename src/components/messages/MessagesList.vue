<template>
  <div v-if="$store.getters.loggedIn" class="bg-gray-200">
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
      ></message-card>
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
  },

  methods: {
    goToCoaches() {
      this.$router.push('/coaches')
    },
  },

  created() {
    this.$store.dispatch('downloadMessages')
  },
}
</script>
