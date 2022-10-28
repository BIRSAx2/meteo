<template>
  <main class="container">
    <div class="pt-4 mb-8 relative mx-4 md:mx-0">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="input input-bordered w-full"
      />
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-full mt-2"
        v-if="searchResults"
      >
        <li class="py-2" v-if="searchError">
          Sorry something went wrong, please try again
        </li>
        <p class="py-2" v-if="!searchError && searchResults.length === 0">
          Your search did not match any location.
        </p>
        <template v-else>
          <li
            class="mb-2"
            v-for="place in searchResults"
            :key="place.place_id"
            @click="previewCity(place)"
          >
            <a href=""> {{ place.display_name }}</a>
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <progress class="progress w-56 self-center"></progress>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import CityList from "../components/CityList.vue";

const searchQuery = ref("");
const searchResults = ref(null);
const searchError = ref(null);

const queryTimeout = ref(null);
const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${searchQuery.value}&format=json&limit=5&addressdetails=1`
        );
        searchResults.value = result.data;
      } catch {
        searchError.value = true;
      }
      return;
    }
    searchResults.value = null;
  }, 300);
};

const router = useRouter();
const previewCity = (place) => {
  router.push({
    name: "CityView",
    params: {
      state: place.address.state,
      country: place.address.country,
      city:
        place.address.city || place.address.town || place.address.village || "",
    },
    query: {
      latitude: place.lat,
      longitude: place.lon,
      preview: true,
    },
  });
};
</script>
