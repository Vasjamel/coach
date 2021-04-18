<template>
  <li class="m-12 p-2  w-1/4 shadow-2xl border rounded-xl">
    <div class="border-box text-center">
      <div>
        <img
          class="h-40 w-full rounded-xl"
          :src="photoUrl"
          :alt="computedName"
        />
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
        <base-button class="bg-green-200 rounded-xl">Contact me</base-button>
      </div>
    </div>
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
}
</script>
