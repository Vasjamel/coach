<template>
  <div>
    <div>
      <label for="search">Search</label>
      <input class="bg-red-800 rounded px-2" type="search" id="search" />
    </div>

    <div class="flex ">
      <div class="m-4">
        <label for="coach-area">
          Frontend
        </label>
        <input type="checkbox" checked value="frontend" />
      </div>
      <div class="m-4">
        <label for="coach-area">
          Backend
        </label>
        <input type="checkbox" checked value="backend" />
      </div>
      <div class="m-4">
        <label for="coach-area">
          Vue
        </label>
        <input type="checkbox" checked value="vue" />
      </div>
      <div class="m-4">
        <label for="coach-area">
          Other
        </label>
        <input type="checkbox" checked value="other" @change="pes" />
      </div>
    </div>
  </div>
</template>
