import * as Cesium from "cesium";

let viewer:Cesium.Viewer

// 天地图Token
let tdtToken:string ='472d058f4ce357f09abb3e8dcbc71e7e'

export function loadGlobe(val:string) {
    viewer = new Cesium.Viewer(val, {
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
    // // 获取比例 渲染清晰 抗锯齿
    // viewer.resolutionScale = window.devicePixelRatio;
    // viewer.scene.postProcessStages.fxaa.enabled = true;
    //设置该属性为true之后，标绘将位于地形的顶部
    // viewer.scene.globe.depthTestAgainstTerrain = true
  }

// 飞行函数的参数配置
interface IflyToOptions {
  lon: number;
  lat: number;
  alt?: number;
  heading?: number;
  pitch?: number;
  roll?: number;
  callback?:Function;
}

// 飞行函数
export function flyTo(options:IflyToOptions){
    let mOptions = options || {}
    let lon = mOptions.lon ? mOptions.lon : 108
    let lat = mOptions.lat ? mOptions.lat : 33
    let alt = mOptions.alt ? mOptions.alt : 7000000
    let heading = mOptions.heading ? mOptions.heading : 0
    let pitch = mOptions.pitch ? mOptions.pitch : -90
    let roll = mOptions.roll ? mOptions.roll : 0
    let callback = mOptions.callback ? mOptions.callback : null
    viewer.scene.camera.flyTo({
      destination: new (Cesium.Cartesian3.fromDegrees as any)(lon, lat, alt),
      orientation: {
        heading: Cesium.Math.toRadians(heading),
        pitch: Cesium.Math.toRadians(pitch),
        roll: Cesium.Math.toRadians(roll)
      },
      complete: function () {
        if (callback) {
          callback()
        }
      }
    })
  }

// tdt 添加矢量图层
export function loadTdtShp() {
  //加载天地图
  viewer.imageryLayers.addImageryProvider(
    new (Cesium.WebMapTileServiceImageryProvider as any)({
      url:
        'http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' +
        tdtToken,
      layer: 'tdtAnnoLayer',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible',
      show: false,
    })
  )
}

// tdt影像注记图层 (感觉与loadTdtShp没区别)
export function loadTdtShpNote() {
  //影像注记
  viewer.imageryLayers.addImageryProvider(
    new (Cesium.WebMapTileServiceImageryProvider as any)({
      url:
        'http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' +
        tdtToken,
      layer: 'tdtAnnoLayer',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible',
      show: false,
    })
  )
}


// 加载高德百度地图图层 
export function loadGaoDeShp(){
  //加载高德/百度影像地图，UrlTemplateImageryProvider该接口是加载谷歌地图服务的接口
	viewer.imageryLayers.addImageryProvider(
		new (Cesium.UrlTemplateImageryProvider as any)({
			url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
			layer: 'tdtVecBasicLayer',
			style: 'default',
			format: 'image/png',
			tileMatrixSetID: 'GoogleMapsCompatible',
			show: false,
		})
	)
	// 如果需要叠加高德/百度注记地图则添加以下代码
	viewer.imageryLayers.addImageryProvider(
		new (Cesium.UrlTemplateImageryProvider as any)({
			url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
			layer: 'tdtAnnoLayer',
			style: 'default',
			format: 'image/jpeg',
			tileMatrixSetID: 'GoogleMapsCompatible',
		})
	)
}
