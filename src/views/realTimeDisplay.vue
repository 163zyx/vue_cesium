<template>
	<div id="globe"></div>
  <div class="mouseMove" v-if="mouseMove.lat">
      <div v-if="mouseMove.lat">经度：{{ mouseMove.lon }}</div>
      <div v-if="mouseMove.lon">纬度：{{ mouseMove.lat }}</div>
  </div>
</template>

<script setup lang="ts">
import * as Cesium from "cesium";
import { onMounted, reactive } from "vue";
import { viewer, loadGlobe, flyTo,loadDataSource} from "@/cesiumApi/cesiumApi"

interface IRealTimeData {
  lon: number | string,
  lat: number | string,
  alt?: number | string,
}

let mouseMove = reactive<IRealTimeData>({
  lon: '',
  lat: '',
})
function getMouseMove() {
  let handler = new Cesium.ScreenSpaceEventHandler(
    viewer.value.scene.canvas
  );
  handler.setInputAction(function (movement:any) {
    //具体事件的实现
    var ellipsoid = viewer.value.scene.globe.ellipsoid;
    //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
    var cartesian = viewer.value.camera.pickEllipsoid(
      movement.endPosition,
      ellipsoid
    );
    if (cartesian) {
      //将笛卡尔三维坐标转为地图坐标（弧度）
      var cartographic = viewer.value.scene.globe.ellipsoid.cartesianToCartographic(
        cartesian
      );
      //将地图坐标（弧度）转为十进制的度数
      mouseMove = Object.assign(mouseMove,{
        lat: Cesium.Math.toDegrees(cartographic.latitude).toFixed(2),
        lon: Cesium.Math.toDegrees(cartographic.longitude).toFixed(2),
        alt: viewer.value.camera.positionCartographic.height / 1000,
      });
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}

onMounted(() => {
  loadGlobe("globe")
	loadDataSource()
  flyTo({})
  getMouseMove()
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
  bottom: 3px;
  right: 33px;
  padding: 0.429rem;
  z-index: 1;
  color: #fff;
  font-size: 0.6rem;
}
</style>
