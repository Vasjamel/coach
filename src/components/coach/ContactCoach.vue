<template>
  <base-card>
    <form>
      <base-card>
        <p>Please leave your message for coach {{ correctCoach.name }}</p>
        <base-card>
          <input type="text" v-model="message" />
        </base-card>
      </base-card>
      <div>
        <base-button @click.prevent="hide">Cancel sending</base-button>
        <base-button @click.prevent="send">Send message</base-button>
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
