<template>
  <div ref="cesiumContainer" class="cesium-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as Cesium from 'cesium';
import Heatmap from 'heatmap.js';
import type { HeatmapConfiguration, HeatmapData } from 'heatmap.js';

// 类型定义
type ScreenPosition = { x: number; y: number };

// DOM 引用
const cesiumContainer = ref<HTMLElement | null>(null);
let viewer: Cesium.Viewer | null = null;
let heatmapInstance: Heatmap.Heatmap<'value', 'x', 'y'> | null = null;

// 初始化 Cesium
const initCesium = () => {
  if (!cesiumContainer.value) return;

  viewer = new Cesium.Viewer(cesiumContainer.value, {
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false
  });
};

// 经纬度转屏幕坐标
const convertToScreenPosition = (
  longitude: number,
  latitude: number
): ScreenPosition | null => {
  if (!viewer) return null;

  const cartesian = Cesium.Cartesian3.fromDegrees(longitude, latitude);
  const scene = viewer.scene;
  const result = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, cartesian);
  
  return result 
    ? { x: result.x, y: scene.canvas.height - result.y }
    : null;
};

// 创建热力图
const createHeatmap = () => {
  if (!viewer) return;

  // 热力图配置
  const config: HeatmapConfiguration<'value', 'x', 'y'> = {
    container: document.createElement('div') as HTMLElement,
    radius: 35,
    maxOpacity: 0.6,
    blur: 0.8,
  };

  // 初始化 heatmap.js
  heatmapInstance = Heatmap.create(config);

  // 生成测试数据（示例）
  const testData = {
    max: 100,
    min: 0,
    data: [
      { x: 100, y: 100, value: 50 },
      { x: 200, y: 200, value: 100 },
      { x: 300, y: 300, value: 75 }
    ]
  };

  // 设置数据
  heatmapInstance.setData(testData);

  // 创建 Cesium 图元
  const heatmapPrimitive = new Cesium.Primitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: new Cesium.RectangleGeometry({
        rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
      })
    }),
    appearance: new Cesium.EllipsoidSurfaceAppearance({
      material: new Cesium.Material({
        fabric: {
          type: 'Image',
          uniforms: {
            image: heatmapInstance.getDataURL()
          }
        }
      })
    })
  });

  viewer.scene.primitives.add(heatmapPrimitive);
};

// 动态更新数据
const updateHeatmapData = (data: HeatmapData<{ x: number; y: number; value: number }>) => {
  if (!heatmapInstance) return;
  heatmapInstance.setData(data);
};

onMounted(() => {
  initCesium();
  if (viewer) {
    debugger
    createHeatmap();
    viewer.zoomTo(viewer.entities);
  }
});

onUnmounted(() => {
  if (viewer && !viewer.isDestroyed()) {
    viewer.destroy();
  }
});
</script>

<style scoped>
.cesium-container {
  width: 100%;
  height: 100vh;
}
</style>