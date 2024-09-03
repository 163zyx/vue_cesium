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
          <el-sub-menu index="/measure">
            <template #title>测量</template>
            <el-menu-item index="/measure/realTimeDisplay">实时显示经纬度</el-menu-item>
            <el-menu-item index="/measure/measureDistance">测距</el-menu-item>
            <el-menu-item index="/entity/addLine">测面</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/weather">
            <template #title>天气效果</template>
            <el-menu-item index="/weather/rain">雨</el-menu-item>
            <el-menu-item index="/weather/snow">雪</el-menu-item>
            <el-menu-item index="/weather/fog">雾</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/talkroom/talk">
            <span>聊天室</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="layout-header">
          <el-avatar style="margin-right: 20px;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </el-header>
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
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    align-items: center;
    // background-color: cadetblue ;
  }
  .layout-main{
    color: black;
    height: 50px;
    // background-color: cornflowerblue ;
  }
}
</style>
