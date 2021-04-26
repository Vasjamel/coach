<template>
  <div class=" bg-gray-600 w-full text-white">
    <form class="p-0">
      <div>
        <div class="text-xl text-center">
          <div>
            Please leave your message for
          </div>
          <div class="text-2xl text-yellow-400">{{ correctCoach.name }}:</div>
        </div>
        <div>
          <textarea
            class=" focus:bg-yellow-400 resize-none w-full p-2 h-20 text-black focus:outline-none"
            v-model="message"
            placeholder="Message here..."
          />
        </div>
      </div>
      <div>
        <button
          class="w-auto h-auto m-4 rounded p-1 bg-gray-400 text-black hover:text-red-400 hover:bg-red-600"
          @click.prevent="hide"
        >
          Cancel sending
        </button>
        <button
          class="w-auto h-auto m-4 rounded p-1 bg-gray-400 text-black hover:text-yellow-400 hover:bg-black"
          @click.prevent="send"
        >
          Send message
        </button>
      </div>
      <button
        class=" p-1 bg-gray-400 rounded hover:bg-red-700 hover:text-white"
        @click.prevent="deleteCoach"
      >
        Delete coach
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['correctCoach'],
  data() {
    return {
      coach: null,
      message: '',
    }
  },

  methods: {
    hide() {
      this.$emit('hide-form')
      this.message = ''
    },
    send() {
      this.$emit('send-form', this.message)
      this.message = ''
    },
    async deleteCoach() {
      await axios.delete('/coaches/' + this.$props.correctCoach.id + '.json')
      this.$store.dispatch('downloadCoaches')
    },
  },
  created() {
    this.coach = this.$props.correctCoach
  },
}
</script>
