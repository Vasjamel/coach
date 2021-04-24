<template>
  <div class="flex content-center">
    <base-card
      class="border w-full min-w-2x1 max-w-2xl center border-solid rounded-xl "
    >
      <base-card
        ><h1 class="text-4xl	m-2.5">REGISTER A NEW COACH!</h1></base-card
      >
      <base-card class="pt-10">
        <label for="coach-name">Input a coach name:</label>
        <div>
          <input
            class=" m-7 px-2 text-white border-red-600 bg-red-600 rounded"
            type="text"
            id="coach-name"
            name="coach-name"
            v-model.trim="newCoach.name"
          />
        </div>
      </base-card>

      <div>
        <label for="coach-email">Input a coach email:</label>
        <div>
          <input
            class=" m-7 px-2 text-white border-red-600 bg-red-600 rounded"
            type="email"
            id="coach-email"
            name="coach-email"
            v-model.trim="newCoach.email"
          />
        </div>
      </div>

      <div>
        <label for="coach-description">Input a short description:</label>
        <div>
          <input
            class=" m-7 px-2 text-white border-red-600 bg-red-600 rounded"
            type="text"
            id="coach-description"
            name="coach-description"
            v-model.trim="newCoach.description"
          />
        </div>
      </div>

      <div>
        <label for="coach-url">URL to a coach photo:</label>
        <div>
          <input
            class=" m-7 px-2 text-white border-red-600 bg-red-600 rounded"
            type="url"
            id="coach-url"
            name="coach-url"
            v-model.trim="newCoach.photoUrl"
          />
        </div>
      </div>

      <div>
        This coach will coach us on:
        <div class="flexbox">
          <div class="m-4">
            <label for="coach-area">
              Frontend
            </label>
            <input
              type="checkbox"
              id="frontend"
              value="frontend"
              v-model="newCoach.area"
            />
          </div>
          <div class="m-4">
            <label for="coach-area">
              Backend
            </label>
            <input
              type="checkbox"
              id="backend"
              value="backend"
              v-model="newCoach.area"
            />
          </div>
          <div class="m-4">
            <label for="coach-area">
              Vue
            </label>
            <input
              type="checkbox"
              id="vue"
              value="vue"
              v-model="newCoach.area"
            />
          </div>
          <div class="m-4">
            <label for="coach-area">
              Other
            </label>
            <input
              type="checkbox"
              id="other"
              value="other"
              v-model="newCoach.area"
            />
          </div>
        </div>
      </div>
      <div v-if="!isValid">
        <p>Please insert the correct data!</p>
        <p>Note that all the fields are mandatory!</p>
        <p>(At least 1 checkbox should be ticked)</p>
      </div>
      <base-button
        class="m-2 bg-red-600 text-white rounded"
        @click.prevent="submitForm"
        >Submit</base-button
      >
    </base-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      isValid: true,
      newCoach: {
        name: '',
        email: '',
        photoUrl: '',
        description: '',
        area: [],
      },
    }
  },
  methods: {
    checkForm() {
      if (
        this.newCoach.name === '' ||
        this.newCoach.email === '' ||
        !this.newCoach.email.includes('@') ||
        this.newCoach.description === '' ||
        this.newCoach.area.length === 0
      ) {
        this.isValid = false
      } else {
        this.isValid = true
      }
    },

    registerForm() {
      axios
        .post('/coaches.json', this.newCoach)
        .then((res) => {
          console.log(res)
          this.newCoach = {
            name: '',
            email: '',
            photoUrl: '',
            description: '',
            area: [],
          }
        })
        .catch((err) => console.log(err))
    },

    submitForm() {
      this.checkForm()
      if (this.isValid) {
        this.registerForm()
        this.$router.push('/coaches')
        this.$store.dispatch('downloadCoaches')
      } else {
        this.newCoach = {
          name: '',
          email: '',
          photoUrl: '',
          description: '',
          area: [],
        }
      }
    },
  },
}
</script>
