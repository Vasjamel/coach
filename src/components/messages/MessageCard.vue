<template>
  <base-card class="bg-gray-600 text-center p-10 text-xl">
    <div class="m-2">
      This message was send for
      <span class="text-white">{{ coachUpper }}:</span>
    </div>
    <p>
      Message: <span class="text-white">{{ message }}</span>
    </p>
    <div class="mt-6">
      <button
        class=" p-1 bg-gray-400 rounded hover:bg-red-700 hover:text-white"
        @click.prevent="deleteMessage"
      >
        Delete message
      </button>
    </div>
  </base-card>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id', 'coach', 'message'],
  computed: {
    coachUpper() {
      return this.$props.coach.toUpperCase()
    },
  },
  methods: {
    async deleteMessage() {
      this.$store.dispatch('startLoading')
      await axios.delete(
        `/messages/${this.$props.id}.json?auth=${this.$store.getters.gettoken}`
      )
      this.$store.dispatch('endLoading')
      this.$store.dispatch('downloadMessages')
    },
  },
}
</script>
