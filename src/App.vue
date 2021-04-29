<template>
  <div class="w-screen h-screen bg-white">
    <base-header></base-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import BaseHeader from './components/UI/BaseHeader'

export default {
  components: {
    BaseHeader,
  },

  created() {
    this.$store.dispatch('tryLogin')
  },
}
</script>
