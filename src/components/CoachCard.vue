<template>
  <li class="m-4 p-2 w-100 border">
    <div class="border-box">
      <div>
        <img class="h-40" :src="photoUrl" :alt="name" />
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium text-gray-900">
          Name: {{ name.toUpperCase() }}
        </p>
      </div>
      <div>
        <p class="text-sm p-1">AREA: {{ area }}</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'name', 'email', 'photoUrl', 'description', 'area'],
}
</script>
