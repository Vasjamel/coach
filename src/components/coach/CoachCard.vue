<template>
  <li
    class="border w-full min-w-2x1 max-w-2xl center border-solid rounded-xl flex content-center"
  >
    <base-card class="">
      <div>
        <img class="center h-300 w-auto" :src="photoUrl" :alt="computedName" />
      </div>
      <div class="mb-20">
        <p class="h-4 font-bold text-2xl rounded-xl">
          {{ computedName }}
        </p>
      </div>
      <div v-for="each in area" :key="each">
        <p class="mx-8 my-2 bg-black text-white font-light rounded-full">
          &#9733; {{ each }}
        </p>
      </div>
      <div>
        <p class="text-sm p-1">{{ description }}</p>
      </div>
      <div>
        <base-button class="bg-green-200 rounded-xl" @click="contact(id)"
          >Contact me</base-button
        >
        <contact-coach
          v-if="seeContactForm"
          :correctCoach="thisCoach"
          @hide-form="hide"
          @send-form="send"
        >
        </contact-coach>
      </div>
    </base-card>
  </li>
</template>

<script>
import axios from 'axios'
import ContactCoach from './ContactCoach.vue'
export default {
  components: {
    ContactCoach,
  },
  props: ['name', 'email', 'photoUrl', 'description', 'area', 'id'],
  data() {
    return {
      seeContactForm: false,
      thisCoach: null,
    }
  },
  computed: {
    computedName() {
      return this.name.toUpperCase()
    },
  },
  methods: {
    contact(id) {
      this.seeContactForm = true
      const correctCoach = this.$store.getters.coaches.find(
        (coach) => coach.id === id
      )
      this.thisCoach = correctCoach
    },
    hide() {
      this.seeContactForm = false
    },
    send(message) {
      const createMessage = {
        coach: this.thisCoach.name,
        message: message,
      }
      axios
        .post('/messages.json', createMessage)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    },
  },
}
</script>
