<template>
  <div>
    <div class="m-6 p-0 flex bg-gray-600 text-white text-center rounded-xl">
      <div>
        <div class="m-4 text-2xl font-bold">
          {{ computedName }}
        </div>

        <div>
          <img
            class=" block mx-auto m-0 h-48  w-auto rounded-none"
            :src="photoUrl"
            :alt="photoAlt"
          />
        </div>
        <div class="p-4 text-center space-y-4">
          <div class=" font-bold">
            <div class="text-xl mb-4">
              Areas:
            </div>

            <div class="text-yellow-400" v-for="each in area" :key="each">
              <span> &#9733; </span> {{ each }}
            </div>
          </div>
        </div>
        <button
          v-if="showButton"
          class="w-auto h-auto m-4 rounded p-1 bg-gray-400 text-black hover:text-yellow-400 hover:bg-black"
          @click="contact(id)"
        >
          {{ showHide }}
        </button>
        <contact-coach
          v-if="seeContactForm"
          :correctCoach="thisCoach"
          :description="description"
          @hide-form="hide"
          @send-form="send"
        >
        </contact-coach>
      </div>
    </div>
  </div>
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
      seeContactForm: false, //see details and send message form
      thisCoach: null, //find the correct coach id to send message or delete
    }
  },
  computed: {
    //name to upper case
    computedName() {
      return this.name.toUpperCase()
    },

    //add alt attribute if image is not availible
    photoAlt() {
      return this.name + ' image shoud be here'
    },

    //in case card is addCoach preview - hide button details/message
    showButton() {
      return this.$route.fullPath === '/addcoach' ? false : true
    },

    //button type change: show info / hide info
    showHide() {
      return this.seeContactForm ? 'Hide info' : 'See more'
    },
  },
  methods: {
    //show the correct coach details
    contact(id) {
      this.seeContactForm = !this.seeContactForm
      const correctCoach = this.$store.getters.coaches.find(
        (coach) => coach.id === id
      )
      this.thisCoach = correctCoach
    },

    //hide details
    hide() {
      this.seeContactForm = false
    },

    //send message to database
    send(message) {
      const createMessage = {
        coach: this.thisCoach.name,
        message: message,
      }
      axios
        .post(
          `/messages.json?auth=${this.$store.getters.gettoken}`,
          createMessage
        )
        .catch((err) => console.log(err))
    },
  },
}
</script>
