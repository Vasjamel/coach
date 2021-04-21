<template>
  <base-card>
    <h1>This message is for {{ coach }}</h1>
    <p>Message: {{ message }}</p>
  </base-card>
</template>

<script>
export default {
  props: ['id', 'coach', 'message'],
}
</script>
