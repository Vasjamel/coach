<template>
  <base-card class="m-8 bg-black text-white">
    <form>
      <base-card>
        <div>
          Please leave your message for
          <span class="text-2x1 text-yellow-400">
            {{ correctCoach.name }}
          </span>
        </div>
        <base-card class="block">
          <input
            type="text"
            class="h-20 p-1  focus:bg-yellow-400  text-black focus:outline-none"
            v-model="message"
          />
        </base-card>
      </base-card>
      <div>
        <base-button
          class="rounded-xl  hover:text-yellow-400 hover:bg-black"
          @click.prevent="send"
          >Send message</base-button
        >
        <base-button class="hover:text-red-600" @click.prevent="hide"
          >Cancel sending</base-button
        >
      </div>
    </form>
  </base-card>
</template>

<script>
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
  },
  created() {
    this.coach = this.$props.correctCoach
  },
}
</script>
