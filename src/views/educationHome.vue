<template>
	<div class="avue-contail">
		<!-- 顶部导航栏 -->
		<div class="avue-header">
			<div class="visuality-top">
        <div class="visuality-top-bg">
					<div class="visuality-content">
          <div class="time-content">
            <div class="time">{{ time }}</div>
						<div>
              <div>{{ "星期" + "日一二三四五六".charAt(new Date().getDay()) }}</div>
              <div>{{ dateFormat(new Date(), 'yyyy-MM-dd') }}</div>
            </div>
					</div>
					<div class="left-beautyTree-menu" style="left: 15%">
            <div :class="fatherActive === 'pc' ? 'leftClick' :  'leftdiv'" @click="clickLeft('pc')">PC大屏</div>
            <div :class="fatherActive === 'gjs' ? 'leftClick' :  'leftdiv'" @click="clickLeft('gjs')">高教司</div>
					</div>
					<div class="system-title">
            <div>教育数字大屏</div>
          </div>
				</div>
			</div>
			</div>
		</div>
		
		<!-- 主体视图层 -->
		<div id="avue-view">
			<div id="globe"></div>
		</div>

	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { loadGlobe, flyTo, loadTdtShp} from "@/cesiumApi/cesiumApi";
// @ts-ignore
import {dateFormat} from "@/util/date.js";

let time = ref<string>('')
let	fatherActive = ref<string>('pc')


const clickLeft = (val:string) => {
	fatherActive.value = val
}
onMounted(() => {
	const updateTime = () => {
		const now = new Date();
		time.value = now.toLocaleTimeString();
	};
	setInterval(updateTime, 1000);
	updateTime();
  loadGlobe("globe")
	flyTo({lon: 108, lat: 33, alt: 7000000})
	loadTdtShp()
});
</script>

<style lang="scss" scoped>
.avue-contail {
	display: flex;
	flex-direction: column;
	.avue-header {
		height: vh(100);
		margin: 0px;
	}
	#globe {
		width: 100%;
		height: 100%;
	}
}
.visuality-top {
    // height: 100%;
    height: vh(100);
    color: #F8FFFE;
    position: relative;
    // background: url("../../../public/img/big-screen/landscape-bg.png") no-repeat;
    // background-size: cover;
    z-index: 30;
    .visuality-top-bg {
      width: 100%;
      height: 100%;
      background: url("../../public/img/landscape-top-bg.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 1;
    }
		.visuality-content {
			width: 100%;
			display: flex;
			align-items: center;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1;
			.time-content{
				display: flex;
				flex-wrap: nowrap;
				margin-left: vw(30);
				// height: 65%;
				.time {
					height: vh(78);
					line-height: 2;
					font-size: font(31);
					font-weight: 400;
					color: #D7EDFF;
					margin-right: vw(10);
					font-family: DINPro;
				}
				.time+div {
					padding-top: vh(10);
					margin-left: vw(10);
					font-size: font(19);
					font-weight: 300;
					color: #D7EDFF;
					font-family: DINPro;
					font-weight: 400;
				}
			}
			.system-title {
				position: absolute;
				left: 50%;
				top: 12%;
				transform: translateX(-50%);
				div:nth-child(1) {
					text-align: center;
					font-size: font(35);
					font-family: Microsoft YaHei;
					font-weight: bold;
					color: #FFFFFF;
					letter-spacing: vw(8);
					background: linear-gradient(0deg, #35FFE5 0%, #FFFFFF 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
				div:nth-child(2) {
					font-size: font(9);
					transform: scale(0.75);
					font-family: Microsoft YaHei;
					font-weight: 300;
					color: #136768;
					text-shadow: 0 8px 4px rgba(205,252,251,0.18);
					background: linear-gradient(0deg, #B5FDF9 0%, #FFFFFF 97.4609375%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
			.left-beautyTree-menu {
				display: flex;
				align-items: center;
				position: absolute;
				cursor: pointer;
				left: 25%;
				// top: 20%;
				.leftdiv {
					width: vw(160);
					// height: vw(42);
					font-size: font(15);
					font-family: Microsoft YaHei;
					font-weight: 500;
					font-style: italic;
					color: #F8FFFE;
					text-align: center;
					line-height: vw(42);
					background: url("../../public/img/big-screen-btn.png") no-repeat;
					background-size: contain;
				}
				.leftClick {
					width: vw(160);
					// height: vw(42);
					font-size: font(15);
					font-family: Microsoft YaHei;
					font-weight: 500;
					font-style: italic;
					color: #F8FFFE;
					text-align: center;
					line-height: vw(42);
					background: url("../../public/img/landscape-btn-bg.png") no-repeat;
					background-size: contain;
				}
			}
		}
}
#avue-view {
	flex: 1;
	// margin-top: vh(-27);
	margin-top: -3.8vh;
	position: relative;
	// z-index: 3;
	height: 0px;
}
</style>
