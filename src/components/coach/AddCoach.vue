<template>
  <div class="flex font-mono">
    <div class="mx-auto my-8 text-center">
      <div class="m-0 bg-white">
        <h1 class="text-3xl">REGISTER A NEW COACH!</h1>
      </div>
      <div class="m-0 text-white bg-gray-600 rounded-xl p-4">
        <div class="">
          <label for="coach-name">Input a coach name:</label>
          <div>
            <input
              class="mx-2 px-2 focus:bg-yellow-400 focus:outline-none rounded-xl text-black"
              type="text"
              id="coach-name"
              name="coach-name"
              v-model.trim="newCoach.name"
            />
          </div>
        </div>

        <div>
          <label for="coach-email">Input a coach email:</label>
          <div>
            <input
              class="mx-2 px-2 text-black focus:bg-yellow-400 focus:outline-none rounded-xl"
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
              class="mx-2 px-2 text-black focus:bg-yellow-400 focus:outline-none rounded-xl"
              type="text"
              id="coach-description"
              name="coach-description"
              v-model.trim="newCoach.description"
            />
          </div>
        </div>

        <div>
          <div class=" text-2xl">
            Upload photo or use the URL:
          </div>
          <div>
            <input type="file" accept="image/*" @change="uploadImage" />
          </div>
          <label for="coach-url">URL to a coach photo:</label>
          <div>
            <input
              class="mx-2 px-2 text-black focus:bg-yellow-400 focus:outline-none rounded-xl"
              type="url"
              id="coach-url"
              name="coach-url"
              v-model.trim="newCoach.photoUrl"
            />
          </div>
        </div>

        <div>
          This coach will coach us on:
          <div>
            <div>
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
            <div class="">
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
            <div class="">
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
            <div class="">
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

        <div v-if="!isValid" class="text-red-400">
          <p>Please insert the correct data!</p>
          <p>Note that all the fields are mandatory!</p>
          <p>(At least 1 checkbox should be ticked)</p>
        </div>
      </div>
      <base-button
        class="m-4 bg-gray-600 rounded-xl text-white hover:text-black hover:bg-yellow-400"
        @click.prevent="cancelSending"
        >Cancel</base-button
      >
    </div>
    <div class=" flex-col m-auto text-center w-72">
      <div class="mt-0 text-3xl">Coach preview:</div>
      <coaches-card
        :name="newCoach.name"
        :email="newCoach.email"
        :photoUrl="newCoach.photoUrl"
        :description="newCoach.description"
        :area="newCoach.area"
      >
      </coaches-card>
      <base-button
        class="bg-gray-600 rounded-xl text-white hover:text-black hover:bg-yellow-400"
        @click.prevent="submitForm"
        >Submit this form
      </base-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CoachesCard from './CoachesCard'
export default {
  components: { CoachesCard },
  data() {
    return {
      isValid: true,
      newCoach: {
        name: '',
        email: '',
        image: null,
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

    uploadImage(event) {
      const file = event.target.files[0]
      this.newCoach.image = file
      this.newCoach.photoUrl = URL.createObjectURL(file)
    },

    registerForm() {
      axios
        .post(
          `/coaches.json?auth=${this.$store.getters.gettoken}`,
          this.newCoach
        )
        .then((res) => {
          this.newCoach = {
            name: '',
            email: '',
            photoUrl: '',
            description: '',
            area: [],
            image: null,
          }
          console.log(res)
        })
        .catch((err) => alert(err))
    },

    cancelSending() {
      this.$router.push('/coaches')
    },

    submitForm() {
      this.checkForm()
      if (this.isValid) {
        this.registerForm()
        this.$router.push('/coaches')
      } else {
        alert('Please input a correct data!')
      }
    },
  },
  created() {
    if (!this.$store.getters.loggedIn) {
      this.$router.push('/home')
    }
  },
}
</script>
