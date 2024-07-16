<template>
	<div id="globe"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { loadGlobe } from "@/cesiumApi/cesiumApi"

onMounted(() => {
  loadGlobe("globe")
});
</script>

<style lang="scss" scoped>
#globe {
	width: 100%;
	height: 100%;
}
</style>
