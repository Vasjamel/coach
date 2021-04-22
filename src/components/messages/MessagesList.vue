<template>
  <base-card>
    <div>
      <h1>Messages:</h1>
      <message-card
        class="m-12"
        v-for="message in arrayOfMessages"
        :key="message.messageId"
        :id="message.messageId"
        :message="message.message"
        :coach="message.coach"
      ></message-card>
    </div>
  </base-card>
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
  created() {
    this.$store.dispatch('downloadMessages')
  },
}
</script>
