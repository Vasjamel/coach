<template>
  <div class="w-1/2 m-12 border-4 border-black text-center font-bold">
    <h1 class="text-4xl	m-2.5">REGISTER A NEW COACH!</h1>
    <div class="pt-10">
      <label for="coach-name">Input a coach name:</label>
      <div>
        <input
          class=" m-7 px-2 text-white border-red-600 bg-red-600 rounded"
          type="text"
          id="coach-name"
          name="coach-name"
          v-model="$store.getters.newCoach.name"
        />
      </div>
    </div>

    <div>
      <label for="coach-email">Input a coach email:</label>
      <div>
        <input
          class=" m-7 px-2 text-white border-red-600 bg-red-600 rounded"
          type="email"
          id="coach-email"
          name="coach-email"
          v-model="$store.getters.newCoach.email"
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
          v-model="$store.getters.newCoach.description"
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
          v-model="$store.getters.newCoach.photoUrl"
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
            value="frontend"
            v-model="$store.getters.newCoach.area"
          />
        </div>
        <div class="m-4">
          <label for="coach-area">
            Backend
          </label>
          <input
            type="checkbox"
            value="backend"
            v-model="$store.getters.newCoach.area"
          />
        </div>
        <div class="m-4">
          <label for="coach-area">
            Vue
          </label>
          <input
            type="checkbox"
            value="vue"
            v-model="$store.getters.newCoach.area"
          />
        </div>
        <div class="m-4">
          <label for="coach-area">
            Other
          </label>
          <input
            type="checkbox"
            value="other"
            v-model="$store.getters.newCoach.area"
          />
        </div>
      </div>
    </div>

    <base-button class="m-2 bg-red-600 text-white rounded" @click="submitForm"
      >Submit</base-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    submitForm() {
      this.$store.dispatch('registerForm')
    },
  },
}
</script>
