<template>
  <div
    class=" block fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-60"
  >
    <div
      class="bg-yellow-400 mt-56 m-auto p-5 border-solid border-yellow-400 w-8/12 h-32"
    >
      <div>ERROR:</div>
      <div class="my-auto">
        <slot></slot>

        <base-button
          @click="closeModal"
          class="text-red-600 float-right text-4xl
      font-extrabold hover:text-black hover:no-underline cursor-pointer
      focus:text-black focus:no-underline"
          >OK</base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$store.dispatch('closeModal')
    },
  },
}
</script>
