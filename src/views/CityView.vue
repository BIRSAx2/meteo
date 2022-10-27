<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <div class="flex h-screen justify-center items-center">
          <progress class="progress w-56"></progress>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
const title = () => {
  "Hello";
};
</script>
