<template>
  <div id="viewerDiv"></div>
</template>

<script setup lang="ts">
  import * as Cesium from "cesium";
  import { onMounted, getCurrentInstance } from "vue";
  let viewer: Cesium.Viewer;
 
  function createViewer() {
      viewer = new Cesium.Viewer("viewerDiv", {
      })
  }
  
  onMounted(() => {
      createViewer();
  })
</script>

<style lang="scss" scoped>
  #viewerDiv {
      position: absolute;
      width: 100%;
      height: 100%;
  }
</style>