<template>
  <p>{{ Math.ceil(value * 100) }} %</p>

  <i
    class="weather-icon fa-solid"
    :class="'weather-icon fa-solid fa-' + iconName"
  ></i>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  value: {
    type: Number,
    default: () => 0,
  },
  iconName: {
    type: String,
    default: () => "droplet",
  },
  iconCodePoint: {
    type: String,
    default: () => "'\f043'",
  },
});

const fillPercent = ref(props.value * 100 + "%");
</script>

<style scoped>
.weather-icon {
  display: inline-block;
  position: relative;
  font-size: 20;
  @apply text-gray-200;
}
.weather-icon:after {
  font-family: FontAwesome;
  content: v-bind("props.iconCodePoint");
  position: absolute;
  left: 0;
  top: 0px;
  width: 100%;
  height: v-bind("fillPercent");
  overflow: hidden;
  @apply text-blue-300;
}
</style>
