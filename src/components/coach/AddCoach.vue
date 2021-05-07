<template>
  <div>
    <the-spinner v-if="loading"></the-spinner>
    <div v-else class="flex font-mono">
      <vee-form class="mx-auto my-8 text-center">
        <div class="m-0 bg-white">
          <h1 class="text-3xl">REGISTER A NEW COACH!</h1>
        </div>
        <div class="m-0 text-white bg-gray-600 rounded-xl p-4">
          <div class="">
            <label for="coach-name">Input a coach name:</label>
            <div>
              <vee-field
                rules="required"
                class="mx-2 px-2 focus:bg-yellow-400 focus:outline-none rounded-xl text-black"
                type="text"
                id="coach-name"
                name="coach-name"
                v-model.trim="newCoach.name"
              />
              <vee-error class="text-red-600" name="coach-name" as="div" />
            </div>
          </div>

          <div>
            <label for="coach-email">Input a coach email:</label>
            <div>
              <vee-field
                rules="required|email"
                class="mx-2 px-2 text-black focus:bg-yellow-400 focus:outline-none rounded-xl"
                type="email"
                id="coach-email"
                name="coach-email"
                v-model.trim="newCoach.email"
              />
              <vee-error name="coach-email" as="div" class="text-red-600" />
            </div>
          </div>

          <div>
            <label for="coach-description">Input a short description:</label>
            <div>
              <vee-field
                rules="required"
                class="mx-2 px-2 text-black focus:bg-yellow-400 focus:outline-none rounded-xl"
                type="text"
                id="coach-description"
                name="coach-description"
                v-model.trim="newCoach.description"
              />
              <vee-error
                class="text-red-600"
                name="coach-description"
                as="div"
              />
            </div>
          </div>

          <div>
            <!-- <div class=" text-2xl">
            Upload photo or use the URL:
          </div>
          <div>
            <input type="file" accept="image/*" @change="uploadImage" />
          </div> -->
            <label for="coach-url">URL to a coach photo:</label>
            <div>
              <vee-field
                rules="required"
                class="mx-2 px-2 text-black focus:bg-yellow-400 focus:outline-none rounded-xl"
                type="url"
                id="coach-url"
                name="coach-url"
                v-model.trim="newCoach.photoUrl"
              />
              <vee-error class="text-red-600" name="coach-url" as="div" />
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
              <div>
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
            <vee-error class="text-red-600" name="area" as="div" />
          </div>

          <div v-if="!isValid" class="text-red-600">
            <p>(At least 1 checkbox should be ticked)</p>
          </div>
        </div>
        <base-button
          class="m-4 bg-gray-600 rounded-xl text-white hover:text-black hover:bg-yellow-400"
          @click.prevent="cancelSending"
          >Cancel</base-button
        >
      </vee-form>
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
  </div>
</template>

<script>
import axios from 'axios'
import CoachesCard from './CoachesCard'
import { Form, Field, ErrorMessage } from 'vee-validate'
export default {
  components: {
    CoachesCard,
    VeeForm: Form,
    VeeField: Field,
    VeeError: ErrorMessage,
  },
  data() {
    return {
      isValid: true,
      newCoach: {
        name: '',
        email: '',
        photoUrl: '',
        description: '',
        area: [],
        // image: null,
      },
    }
  },

  computed: {
    loading() {
      return this.$store.getters.loading
    },
  },

  methods: {
    checkForm() {
      if (
        this.newCoach.area.length === 0 ||
        this.newCoach.name === '' ||
        this.newCoach.description === '' ||
        this.newCoach.email === ''
      ) {
        this.isValid = false
      } else {
        this.isValid = true
      }
    },

    // uploadImage(event) {
    //   const file = event.target.files[0]
    //   this.newCoach.image = file
    //   this.newCoach.photoUrl = URL.createObjectURL(file)
    // },

    registerForm() {
      axios
        .post(
          `/coaches.json?auth=${this.$store.getters.gettoken}`,
          this.newCoach
        )
        .then(() => {
          this.newCoach = {
            name: '',
            email: '',
            photoUrl: '',
            description: '',
            area: [],
            image: null,
          }
        })
        .catch((err) => alert(err))
    },

    cancelSending() {
      this.$router.push('/coaches')
    },

    submitForm() {
      this.$store.dispatch('startLoading')
      this.checkForm()
      if (this.isValid) {
        this.registerForm()
        this.$router.push('/coaches')
        this.$store.dispatch('endLoading')
      } else {
        alert('Please input a correct data!')
        this.$store.dispatch('endLoading')
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
