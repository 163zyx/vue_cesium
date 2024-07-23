<template>
	<div id="globe"></div>
</template>

<script setup lang="ts">
import * as Cesium from "cesium";
import { onMounted } from "vue";
import { viewer, loadGlobe, addEntityPlane,loadDataSource} from "@/cesiumApi/cesiumApi"

onMounted(() => {
  loadGlobe("globe")
	loadDataSource()
	const position = Cesium.Cartesian3.fromDegrees(116.39, 39.912, 4000);
    //设置观察点
    viewer.value.camera.setView({
      destination: position, //设置目的地
      orientation: {
        //设置视口方向
        heading: Cesium.Math.toRadians(0), //控制视口方向水平旋转,为0表示正北方向
        pitch: Cesium.Math.toRadians(-90), //视口上下旋转,-90度俯视朝向地面
        roll: 0 //控制视口的翻转角度
      }
    });
    addEntityPlane()
});
</script>

<style lang="scss" scoped>
#globe {
	width: 100%;
	height: 100%;
}
</style>
