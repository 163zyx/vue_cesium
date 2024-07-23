<template>
	<div id="globe"></div>
</template>

<script setup lang="ts">
import * as Cesium from "cesium";
import { onMounted } from "vue";
import { loadGlobe, dataSource, addEntityPoint, loadDataSource} from "@/cesiumApi/cesiumApi"

onMounted(() => {
  loadGlobe("globe")
	loadDataSource()
	addEntityPoint({lat: '39.91',lon: '116.39'})
});
</script>

<style lang="scss" scoped>
#globe {
	width: 100%;
	height: 100%;
}
</style>
