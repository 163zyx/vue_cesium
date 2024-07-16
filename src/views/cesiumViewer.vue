<template>
	<div id="globe"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as Cesium from "cesium";
function loadGlobe() {
  const viewer = new Cesium.Viewer("globe", {
    infoBox: false,               //是否沙盒显示
    geocoder: false,				      //是否显示地名查找控件
    timeline: false,				      //是否显示时间线控件
    animation: false,				      //是否显示动画控件
    homeButton: false,				    //是否显示主页按钮
    baseLayerPicker: false,       //是否显示基本图层
    sceneModePicker: false,			  //是否显示投影方式控件
    fullscreenButton: false,		  //是否显示全屏按钮
    selectionIndicator: false,		//是否显示选择指示器
    navigationHelpButton: false,	//是否显示帮助信息控件
  });
  //去除版权信息
  (viewer.cesiumWidget.creditContainer as HTMLElement).style.display = "none";
  //设置该属性为true之后，标绘将位于地形的顶部
  // viewer.scene.globe.depthTestAgainstTerrain = true
}
onMounted(() => {
  loadGlobe()
});
</script>

<style lang="scss" scoped>
#globe {
	width: 100%;
	height: 100%;
}
</style>
