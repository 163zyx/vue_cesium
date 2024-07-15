<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="layout-menu">Aside</el-aside>
      <el-container>
        <el-header class="layout-header">Header</el-header>
        <el-main class="layout-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.common-layout{
  .layout-menu{
    color: white;
    border-right: 1px solid #E4E7ED;
    width: 260px ;
    height: 100vh;
    background-color:#001529 ;
  }
  .layout-header{
    color: white;
    height: 50px;
    background-color: cadetblue ;
  }
  .layout-main{
    color: white;
    height: 50px;
    background-color: cornflowerblue ;
  }
}
</style>
