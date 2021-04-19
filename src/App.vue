<template>
  <div>
    <base-header></base-header>
    <main class="p-2">
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
    console.log('this.$store.state', this.$store.state)
  },
}
</script>
