<template>
  <div>
    <label for="search">Search</label>
    <input
      class="bg-red-800 rounded px-2"
      type="search"
      id="search"
      :v-model="search"
      @input="searchStart"
    />
  </div>
</template>

<script>
export default {
  computed: {
    search() {
      return this.$store.getters.search
    },
  },
  methods: {
    searchStart(event) {
      console.log(event.target.value)
    },
  },
}
</script>
