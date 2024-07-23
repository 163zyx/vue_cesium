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
            <el-menu-item index="/index/cesium">地球初始化</el-menu-item>
            <el-menu-item index="/index/tdt">天地图</el-menu-item>
            <el-menu-item index="/index/gaode">高德地图</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/entity">
            <template #title>entity添加</template>
            <el-menu-item index="/entity/addPoint">加点</el-menu-item>
            <el-menu-item index="/entity/addLine">加线</el-menu-item>
            <el-menu-item index="/entity/addPlane">加面</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/entity">
            <template #title>测量</template>
            <el-menu-item index="/entity/addPoint">测距</el-menu-item>
            <el-menu-item index="/entity/addLine">测面</el-menu-item>
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
