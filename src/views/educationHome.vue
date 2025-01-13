<template>
	<div id="globe"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { loadGlobe, flyTo, loadGaoDeShp} from "@/cesiumApi/cesiumApi"

onMounted(() => {
  loadGlobe("globe")
	flyTo({lon: 108, lat: 33, alt: 7000000})
	loadGaoDeShp()
});
</script>

<style lang="scss" scoped>
#globe {
	width: 100%;
	height: 100%;
}
</style>
