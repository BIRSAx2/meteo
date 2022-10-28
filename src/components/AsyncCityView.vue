<template>
  <div class="flex flex-col flex-1 items-center">
    <div class="px-2">
      <div class="mt-2 bg-secondary bg-opacity-20 alert shadow-lg p-2 md:p-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span
            >You are currently previewing this city. To start tracking this city
            presso the save button above</span
          >
        </div>
      </div>
    </div>
    <!-- Weather Overview -->
    <div
      class="grid grid-cols-1 lg:grid-cols-3 md:gap-12 items-center justify-center py-12"
    >
      <div class="flex flex-col items-center justify-content-center">
        <div class="flex flex-row gap-2 items-centers self-center align-middle">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </div>
          <h1 class="text-4xl mb-2">
            {{ route.params.city }}
          </h1>
        </div>
        <p class="text-sm mb-2 md:mb-0">
          {{
            new Date(weatherData.currentTime).toLocaleDateString("en-us", {
              weekday: "short",
              day: "2-digit",
              month: "long",
            })
          }}
          {{
            new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
              timeStyle: "short",
            })
          }}
        </p>
      </div>
      <div class="flex flex-col items-center">
        <p class="text-8xl mb-8">
          {{ Math.round(weatherData.current.temp) }}&deg;
        </p>
        <p>
          Feels like
          {{ Math.round(weatherData.current.feels_like) }} &deg;
        </p>
      </div>
      <div class="flex flex-col items-center">
        <img
          class="w-[150px] h-auto"
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt=""
        />
        <p class="capitalize">
          {{ weatherData.current.weather[0].description }}
        </p>
      </div>
    </div>

    <div class="divider w-1/2 self-center" />
    <!-- Today -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8">
        <h2 class="mb-4 font-bold text-2xl text-center">Today</h2>
        <div
          class="grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-8"
        >
          <div class="flex flex-col items-center justify-center">
            <h3 class="text-lg capitalize font-medium mb-2">Cloudiness</h3>
            <p>{{ weatherData.current.clouds }} %</p>
          </div>
          <div class="flex flex-col items-center justify-center">
            <h3 class="text-lg capitalize font-medium mb-2">Humidity</h3>
            <p>{{ weatherData.current.humidity }} %</p>
          </div>
          <div class="flex flex-col items-center justify-center">
            <h3 class="text-lg capitalize font-medium mb-2">Pressure</h3>
            <p>{{ weatherData.current.pressure }} hPa</p>
          </div>
          <div class="flex flex-col items-center justify-center">
            <p class="text-lg capitalize font-medium mb-2">Sunrise</p>
            <p>
              {{
                new Date(weatherData.current.sunrise * 1000).toLocaleTimeString(
                  "en-us"
                )
              }}
            </p>
          </div>
          <div class="flex flex-col items-center justify-center">
            <h3 class="text-lg capitalize font-medium mb-2">Sunset</h3>
            <p>
              {{
                new Date(weatherData.current.sunset * 1000).toLocaleTimeString(
                  "en-us"
                )
              }}
            </p>
          </div>
          <div class="flex flex-col items-center justify-center">
            <h3 class="text-lg capitalize font-medium mb-2">Wind speed</h3>
            <p>{{ (weatherData.current.wind_speed * 3.6).toFixed(2) }} km/h</p>
          </div>
        </div>
      </div>
    </div>

    <div class="divider w-1/2 self-center" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-2 md:mx-8">
        <h2 class="mb-4 font-bold text-2xl text-center">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-auto scroll-auto">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="text-xl font-medium">
              {{ Math.round(hourData.temp) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="divider w-1/2 self-center" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-0 md:py-12">
      <div class="mx-2 md:mx-8">
        <h2 class="mb-4 font-bold text-2xl text-center">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="grid grid-cols-3 gap-4 items-center rounded-full p-2 md:px-3 my-1 hover:bg-secondary hover:bg-opacity-10"
        >
          <div class="flex items-center col-span-1">
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
              alt=""
            />
            <div class="flex flex-col">
              <p class="flex-1 font-medium text-lg">
                {{
                  new Date(day.dt * 1000).toLocaleDateString("en-us", {
                    weekday: "long",
                    day: "2-digit",
                  })
                }}
              </p>
              <p class="text-sm capitalize">{{ day.weather[0].description }}</p>
            </div>
          </div>

          <div class="col-span-2 md:flex">
            <div class="flex gap-2 flex-1 justify-end font-medium text-lg">
              <p>{{ Math.ceil(day.pop) }} %</p>
              <svg
                fill="currentColor"
                class="w-5 h-5 fill-current ml-1 text-red-blue-900"
                viewBox="0 0 16 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="matrix(1,0,0,1,-4,-2)">
                  <path
                    d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z"
                    style="fill-rule: nonzero"
                  />
                </g>
              </svg>
            </div>
            <div class="flex gap-2 flex-1 justify-end font-medium text-lg">
              <p>{{ Math.round(day.temp.max) }} &deg;</p>
              /
              <p>{{ Math.round(day.temp.min) }} &deg;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const apiKey = import.meta.env.VITE_API_KEY;
const route = useRoute();

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.latitude}&lon=${route.query.longitude}&exclude={part}&appid=${apiKey}&units=metric`
    );

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;
    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();
</script>
