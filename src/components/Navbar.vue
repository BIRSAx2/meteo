<template>
  <div
    class="navbar bg-base-100 w-full px-4 md:w-1/2 self-center sticky top-0 rounded-full"
  >
    <div class="navbar-start">
      <div
        class="md:tooltip md:tooltip-bottom cursor-pointer"
        data-tip="Change Theme"
        @click="$emit('change-theme')"
      >
        <button class="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="navbar-center">
      <RouterLink :to="{ name: 'home' }">
        <div
          class="flex items-center gap-3 no-underline normal-case text-xl hover:bg-color-primary"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke-linejoin="round"
              stroke-width="32"
              d="M400 240c-8.89-89.54-71-144-144-144-69 0-113.44 48.2-128 96-60 6-112 43.59-112 112 0 66 54 112 120 112h260c55 0 100-27.44 100-88 0-59.82-53-85.76-96-88z"
            ></path>
          </svg>
          <p class="">Meteo</p>
        </div>
      </RouterLink>
    </div>
    <header class="navbar-end">
      <!-- addCity -->
      <div class="md:tooltip md:tooltip-bottom swap" data-tip="Save city">
        <button
          class="btn btn-ghost active"
          @click="handleSaveCity"
          v-if="route.query.preview"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </button>
      </div>

      <!-- removeCity -->

      <div class="md:tooltip md:tooltip-bottom" data-tip="Remove">
        <button
          class="btn btn-ghost active"
          @click="handleRemoveCity"
          v-if="!route.query.preview && isWeatherView()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
            />
          </svg>
        </button>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

import { removeCity, addCity } from "../services/weatherApi";

defineEmits(["change-theme"]);

const route = useRoute();
const router = useRouter();

const savedCities = ref([]);

const handleRemoveCity = () => {
  removeCity(route.query.id);
  router.push({
    name: "home",
  });
};

const handleSaveCity = () => {
  let [cities, locationId] = addCity(
    route.params.state,
    route.params.city,
    route.params.country,
    route.query.latitude,
    route.query.longitude
  );

  savedCities.value = cities;
  let query = Object.assign({}, route.query);

  delete query.preview;
  query.id = locationId;

  router.replace({ query });
};

const isWeatherView = () => {
  return route.path.startsWith("/weather");
};
</script>

// TODO: fill water drop with water based on percentage of pop
