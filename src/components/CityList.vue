<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
import axios from "axios";
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";

const savedCities = ref([]);
const apiKey = import.meta.env.VITE_API_KEY;

const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const requests = [];
  savedCities.value.forEach((city) => {
    requests.push(
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.latitude}&lon=${city.coordinates.longitude}&appid=${apiKey}&units=metric`
      )
    );
  });

  const weatherData = await Promise.all(requests);
  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data;
  });
};

await getCities();

const router = useRouter();
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
