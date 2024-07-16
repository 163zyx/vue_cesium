<template>
	<div id="globe"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as Cesium from "cesium";

onMounted(() => {
	const viewer = new Cesium.Viewer("globe");
});
</script>

<style lang="scss" scoped>
#globe {
	width: 100%;
	height: 100%;
}
</style>
