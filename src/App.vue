<template>
  <div
    class="flex flex-col min-h-screen font-Roboto"
    :data-theme="theme"
    id="container"
  >
    <Navbar @change-theme="changeTheme" />
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { ref } from "vue";

const theme = ref(null);

if (localStorage.getItem("theme")) {
  theme.value = localStorage.getItem("theme");
} else {
  theme.value = "light";
}
const themes = ref([
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
]);
const changeTheme = () => {
  let randomTheme =
    themes.value[Math.floor(Math.random() * themes.value.length)];
  while (randomTheme == theme.value) {
    randomTheme = themes.value[Math.floor(Math.random() * themes.value.length)];
  }
  theme.value = randomTheme;
  localStorage.setItem("theme", randomTheme);
};
</script>

<style>
.page-enter-active {
  transition: 600ms ease all;
}
.page-enter-from {
  opacity: 0;
}
</style>
