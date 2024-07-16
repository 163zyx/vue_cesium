<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script setup lang="ts" name="App">

</script>

<style lang="scss" scoped>
  body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  #app {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
