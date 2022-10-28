<template>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div v-for="city in savedCities" :key="city.id">
      <CityCard :city="city" @click="goToCityView(city)" class="mx-4 md:mx-0" />
    </div>
  </div>
  <p v-if="savedCities.length == 0" class="text-center px-2">
    No location added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import CityCard from "./CityCard.vue";

import { getWeatherForCities } from "../services/weatherApi";

const router = useRouter();
const savedCities = ref([]);

const cities = JSON.parse(localStorage.getItem("savedCities")) ?? [];
savedCities.value = await getWeatherForCities(cities);

const goToCityView = (city) => {
  router.push({
    name: "CityView",
    params: {
      city: city.city,
      country: city.country,
    },
    query: {
      id: city.id,
      latitude: city.coordinates.latitude,
      longitude: city.coordinates.longitude,
    },
  });
};
</script>
