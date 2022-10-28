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
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { ref } from "vue";

const theme = ref(null);

if (localStorage.getItem("theme")) {
  theme.value = localStorage.getItem("theme");
} else {
  theme.value = "corporate";
}
const themes = ref(["corporate", "dracula"]);
const changeTheme = () => {
  theme.value = theme.value == "corporate" ? "dracula" : "corporate";
  localStorage.setItem("theme", theme.value);
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
