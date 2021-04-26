<template>
  <li
    class=" w-full m-4 min-w-2x1 max-w-2xl center border-8 border-white bg-gray-400 rounded-xl flex content-center"
  >
    <div class="w-full m-4  text-xl text-black ">
      <div class="h-64 w-full">
        <img
          class="center rounded-xl h-full w-auto mx-auto"
          :src="photoUrl"
          :alt="computedName"
        />
      </div>
      <div class="m-8">
        <p class="h-4 font-bold text-4xl rounded-xl">
          {{ computedName }}
        </p>
      </div>
      <div class="h-32 w-full">
        <div class="my-auto" v-for="each in area" :key="each">
          <p class="mx-16 my-2 bg-black text-white  font-light rounded-full">
            <span class="text-yellow-400"> &#9733; </span> {{ each }}
          </p>
        </div>
      </div>
      <div class="border border-white text-white m-4">
        <div class="text-black text-sm">Description</div>
        <p class=" text-3xl p-1">{{ description }}</p>
      </div>
      <div>
        <base-button
          class="rounded-xl bg-yellow-400 hover:text-yellow-400 hover:bg-black"
          @click="contact(id)"
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
      <base-button
        v-if="seeContactForm"
        class="bg-gray-400 rounded-xl hover:bg-red-700 hover:text-white"
        >Delete coach</base-button
      >
    </div>
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
      this.seeContactForm = !this.seeContactForm
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
