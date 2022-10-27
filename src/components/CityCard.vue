<template>
  <div
    class="flex flex-col bg-secondary bg-opacity-20 rounded p-4 cursor-pointer"
  >
    <div class="font-bold text-xl">{{ city.city }}</div>
    <div class="text-sm text-gray-500">
      {{
        new Date().toLocaleDateString("en-us", {
          weekday: "short",
          day: "2-digit",
          month: "long",
        })
      }}
    </div>
    <div
      class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24"
    >
      <img
        class="w-[150px] h-auto"
        :src="`http://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>
    <div class="flex flex-row items-center justify-center mt-6">
      <div class="font-medium text-6xl">
        {{ Math.round(city.weather.main.temp) }}&deg;C
      </div>
      <div class="flex flex-col items-center ml-6">
        <div class="capitalize">
          {{ city.weather.weather[0].main }}
        </div>

        <div class="flex gap-1">
          <span class="text-sm"><i class="fa fa-long-arrow-down"></i></span>
          <span class="text-sm font-light text-gray-500">
            {{ Math.round(city.weather.main.temp_min) }}&deg;C</span
          >
        </div>
        <div class="flex gap-1">
          <span class="text-sm"><i class="fa fa-long-arrow-up"></i></span>
          <span class="text-sm font-light text-gray-500">
            {{ Math.round(city.weather.main.temp_max) }}&deg;C</span
          >
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-6">
      <div class="flex flex-col items-center">
        <div class="font-medium text-sm">Wind</div>
        <div class="text-sm text-gray-500">
          {{ (city.weather.wind.speed * 3.6).toFixed(2) }} km/h
        </div>
      </div>
      <div class="flex flex-col items-center">
        <div class="font-medium text-sm">Humidity</div>
        <div class="text-sm text-gray-500">
          {{ city.weather.main.humidity }}%
        </div>
      </div>
      <div class="flex flex-col items-center">
        <div class="font-medium text-sm">Visibility</div>
        <div class="text-sm text-gray-500">
          {{ city.weather.visibility / 1000 }}km
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>
