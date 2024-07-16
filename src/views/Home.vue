<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="layout-menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          mode="vertical"
          @select="handleSelect"
        >
        <el-sub-menu index="/index">
            <template #title>地图</template>
            <el-menu-item index="/index/cesium">地图初始化</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>矢量数据添加</template>
            <el-menu-item index="2-1">点</el-menu-item>
            <el-menu-item index="2-2">线</el-menu-item>
            <el-menu-item index="2-3">面</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="layout-header">Header</el-header>
        <el-main class="layout-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="Home">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  let activeIndex = ref('/index');
  let router = useRouter();

  let handleSelect = (index:string) => {
    console.log("index",index)
    router.push(index);
  };
</script>

<style lang="scss" scoped>
.common-layout{
  .layout-menu{
    color: black;
    border-right: 1px solid #E4E7ED;
    width: 260px ;
    height: 100vh;
    // background-color:#001529 ;
  }
  .layout-header{
    color: black;
    height: 50px;
    // background-color: cadetblue ;
  }
  .layout-main{
    color: black;
    height: 50px;
    // background-color: cornflowerblue ;
  }
}
</style>
