<template>
	<div id="globe"></div>
	<div class="mouseMove">
    <!-- 空间量算 -->
    <div id="toolbar" class="param-container tool-bar">
      <button @click="handleRain(20.0, 90.0)">下雨</button>
      <button @click="removeStage">清空数据</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { onMounted } from "vue";
import {loadGlobe, flyTo, removeStage, handleRain} from "@/cesiumApi/cesiumApi"

onMounted(() => {
  loadGlobe("globe")
	flyTo({lon: 108, lat: 33, alt: 7000000})
});
</script>

<style lang="scss" scoped>
#globe {
	width: 100%;
	height: 100%;
}
.mouseMove {
  background: #303336;
  position: absolute;
  top: 10%;
  left: 20%;
  padding: 0.429rem;
  z-index: 1;
  font-size: 0.6rem;
}
</style>
