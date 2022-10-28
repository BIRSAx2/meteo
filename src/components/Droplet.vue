<template>
  <i class="droplet fa-solid fa-droplet"></i>
</template>

<script setup>
const props = defineProps({
  fillPercent: {
    type: String,
    default: () => "0%",
  },
});
</script>

<style scoped>
.droplet {
  display: inline-block;
  position: relative;
  font-size: 20;
  @apply text-gray-300;
}
.droplet:after {
  font-family: FontAwesome;
  content: "\f043";
  position: absolute;
  left: 0;
  top: 0px;
  width: 100%;
  height: v-bind("props.fillPercent");
  overflow: hidden;
  color: #60a5fa;
}
</style>
