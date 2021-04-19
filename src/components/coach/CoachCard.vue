<template>
  <li class="m-8 border border-solid rounded-xl">
    <base-card>
      <div>
        <img class="rounded-xl" :src="photoUrl" :alt="computedName" />
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
        <base-button class="bg-green-200 rounded-xl" @click="contact"
          >Contact me</base-button
        >
      </div>
    </base-card>
  </li>
</template>

<script>
export default {
  props: ['name', 'email', 'photoUrl', 'description', 'area'],
  computed: {
    computedName() {
      return this.name.toUpperCase()
    },
  },
  methods: {
    contact() {
      this.$router.push('/contact')
    },
  },
}
</script>
