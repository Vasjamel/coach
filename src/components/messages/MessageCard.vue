<template>
  <base-card class="bg-gray-600 text-center p-10 text-xl">
    <div class="m-2">
      This message is for <span class="text-white">{{ coach }}:</span>
    </div>
    <p>
      Message: <span class="text-white">{{ message }}</span>
    </p>
  </base-card>
</template>

<script>
export default {
  props: ['id', 'coach', 'message'],
}
</script>
