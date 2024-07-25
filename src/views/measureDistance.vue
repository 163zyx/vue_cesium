<template>
	<div id="globe"></div>
  <div class="mouseMove">
    <!-- 空间量算 -->
    <div id="toolbar" class="param-container tool-bar" >
      <button @click="draw('Polyline')">标点测距</button>
      <button @click="draw('Polygon')">标点测面</button>
      <button @click="clearAllDrawn()">清空数据</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Cesium from "cesium";
import { onMounted, reactive } from "vue";
import { 
  viewer, 
  loadGlobe, 
  flyTo, 
  loadDataSource, 
  Bearing, 
  getLength,
  drawPoint,
  getMidpoint,
  drawPointLabel,
  addLabel,
  drawPolygon,
  drawPolyline,
  addArea, 
  type IMovement,
} from "@/cesiumApi/cesiumApi"

let tempEntities = reactive(<any>[])
let pointNum:number = 0
let floatingPoint:any = undefined
let activeShape = undefined
let position = []
let tempPoints = <any>[]
let activeShapePoints = <any>[]

// 角度
function pointAngle (point1: Cesium.Cartesian3, point2:Cesium.Cartesian3, point3: Cesium.Cartesian3) {
  let bearing21 = Bearing(point2, point1)
  let bearing23 = Bearing(point2, point3)
  let angle: number = bearing21 - bearing23
  if (angle < 0) {
    angle += Math.PI * 2.0
  }
  return angle
}
// 获取面积
function getArea(positions: Cesium.Cartesian3[]) {
  let res : number = 0
  for (let i = 0; i < positions.length - 2; i++) {
    let j = (i + 1) % positions.length
    let k = (i + 2) % positions.length
    let totalAngle = pointAngle(positions[i], positions[j], positions[k])
    let tempLength1: number = parseFloat(getLength(positions[j], positions[0])) //这里有问题 需要调整
    let tempLength2: number = parseFloat(getLength(positions[k], positions[0])) //这里有问题 需要调整
    res += tempLength1 * tempLength2 * Math.sin(totalAngle) / 2
  }
  res = parseFloat(res.toFixed(2))
  // console.log(Math.abs(res))
  return Math.abs(res)
}
/* 清除实体 */
function clearAllDrawn () {
  tempEntities = []
  pointNum = 0
  viewer.value.entities.removeAll()
}

/* 根据类型绘制对象
* @param type point polyline polygon */
function draw (type:string) {
  // let viewer = viewer
  // let pointNum = this.pointNum
  // console.log(pointNum)
  // let tempEntities = tempEntities
  // let floatingPoint = floatingPoint
  // let activeShape = activeShape
  // let position = []
  // let tempPoints = []
  // let activeShapePoints = []
  // 开启深度检测
  viewer.value.scene.globe.depthTestAgainstTerrain = true
  // 创建场景的HTML canvas元素
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.value.scene.canvas)
  switch (type) {
    // 绘制线
    case 'Polyline':
      // 取消鼠标双击事件
      viewer.value.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
      // 监听鼠标移动
      handler.setInputAction((movement:IMovement) => {
        if (Cesium.defined(floatingPoint)) {
          let newPosition = viewer.value.scene.pickPosition(movement.endPosition)
          if (Cesium.defined(newPosition)) {
            floatingPoint.position.setValue(newPosition)
            activeShapePoints.pop()
            activeShapePoints.push(newPosition)
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
      // 左键单击开始画线
      handler.setInputAction(function (click:any) {
        let earthPosition = viewer.value.scene.pickPosition(click.position)
        if (Cesium.defined(earthPosition)) {
          floatingPoint = drawPoint(viewer,earthPosition)
        }
        // 获取位置信息
        // 从相机位置创建一条射线，这条射线通过世界中movement.position像素所在的坐标,返回Cartesian3坐标
        let ray = viewer.value.camera.getPickRay(click.position)
        // 找到射线与渲染的地球表面之间的交点。射线必须以世界坐标给出。返回Cartesian3坐标
        position = viewer.value.scene.globe.pick(ray, viewer.value.scene)
        tempPoints.push(position) // 记录点位
        pointNum += 1
        let tempLength = tempPoints.length // 记录点数
        // 调用绘制点的接口
        let point = drawPointLabel(viewer,tempPoints[tempPoints.length - 1], JSON.stringify(pointNum))
        tempEntities.push(point)
        // 存在超过一个点时
        if (tempLength > 1) {
          // 绘制线
          let pointLength = getLength(tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1])
          let midPosition = getMidpoint(tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1])
          let pointline = drawPolyline(viewer,[tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1]])
          let pointLabel = addLabel(viewer,midPosition, pointLength)
          tempEntities.push(pointline) // 保存记录
          tempEntities.push(pointLabel)
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      // 右键单击结束画线
      handler.setInputAction(function (click:any) {
        // console.log(that.pointNum)
        activeShapePoints.pop()
        viewer.value.entities.remove(activeShapePoints)
        viewer.value.entities.remove(floatingPoint)
        tempPoints = [] // 清空点位记录
        // 销毁监听器
        if(!handler.isDestroyed()){
          handler.destroy()
        }
        floatingPoint = undefined
        activeShape = undefined
        activeShapePoints = []
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
      break
    // 绘制面
    case 'Polygon':
      // 取消鼠标双击事件
      viewer.value.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
      // 监听鼠标移动
      handler.setInputAction(function (movement:IMovement) {
        if (Cesium.defined(floatingPoint)) {
          let newPosition = viewer.value.scene.pickPosition(movement.endPosition)
          if (Cesium.defined(newPosition)) {
            floatingPoint.position.setValue(newPosition)
            activeShapePoints.pop()
            activeShapePoints.push(newPosition)
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
      // 左键单击开始画线
      handler.setInputAction(function (click:any) {
        let earthPosition = viewer.value.scene.pickPosition(click.position)
        console.log("earthPosition",earthPosition)
        if (Cesium.defined(earthPosition)) {
          if (activeShapePoints.length === 0) {
            floatingPoint = drawPoint(viewer,earthPosition)
            activeShapePoints.push(earthPosition)
            const dynamicPositions = new Cesium.CallbackProperty(function () {
              return new Cesium.PolygonHierarchy(activeShapePoints)
            }, false)
            activeShape = drawPolygon(viewer,dynamicPositions)
          }
          activeShapePoints.push(earthPosition)
        }
        // 获取位置信息
        let ray = viewer.value.camera.getPickRay(click.position)
        position = viewer.value.scene.globe.pick(ray, viewer.value.scene)
        tempPoints.push(position) // 记录点位
        let tempLength = tempPoints.length // 记录点数
        pointNum += 1
        // 调用绘制点的接口
        let point = drawPointLabel(viewer,tempPoints[tempPoints.length - 1], JSON.stringify(pointNum))
        tempEntities.push(point)
        // 存在超过一个点时
        if (tempLength > 1) {
          // 绘制线
          let pointline = drawPolyline(viewer,[tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1]])
          tempEntities.push(pointline) // 保存记录
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      // 右键单击结束画面
      handler.setInputAction(function (click:any) {
        // 选择一个椭球或地图
        let cartesian = viewer.value.camera.pickEllipsoid(click.position, viewer.value.scene.globe.ellipsoid)
        if (cartesian) {
          let tempLength = tempPoints.length
          if (tempLength < 3) {
            alert('闭合操作需要至少3个点嗷')
          } else {
            // 闭合最后一条线
            let pointline = drawPolyline(viewer,[tempPoints[0], tempPoints[tempPoints.length - 1]])
            tempEntities.push(pointline)
            drawPolygon(viewer,tempPoints)
            let pointArea = getArea(tempPoints)
            addArea(viewer,JSON.stringify(pointArea), tempPoints)
            tempEntities.push(tempPoints)
            if(!handler.isDestroyed()){
              handler.destroy()
              tempPoints = [] // 清空点位记录
              floatingPoint = undefined
              activeShape = undefined
              activeShapePoints = []
            }
          }
        }
        activeShapePoints.pop()
        viewer.value.entities.remove(activeShapePoints)
        viewer.value.entities.remove(floatingPoint)
        floatingPoint = undefined
        activeShapePoints = []
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
      break
  }
}

onMounted(() => {
  loadGlobe("globe")
	loadDataSource()
  flyTo({})


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
  top: 10%;
  left: 20%;
  padding: 0.429rem;
  z-index: 1;
  font-size: 0.6rem;
}
</style>
