
import * as Cesium from "cesium";
import { ref, reactive } from "vue";

export let viewer = ref();
export let dataSource = ref();
// 天气效果控制单元
export let lastStage:any = reactive( {} )

// 天地图Token
let tdtToken:string ='472d058f4ce357f09abb3e8dcbc71e7e'

export function loadGlobe(val:string) {
  viewer.value = new Cesium.Viewer(val, {
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
  (viewer.value.cesiumWidget.creditContainer as HTMLElement).style.display = "none";
  // // 获取比例 渲染清晰 抗锯齿
  // viewer.resolutionScale = window.devicePixelRatio;
  // viewer.scene.postProcessStages.fxaa.enabled = true;
  //设置该属性为true之后，标绘将位于地形的顶部
  // viewer.scene.globe.depthTestAgainstTerrain = true
}

// 飞行函数的参数配置
interface IflyToOptions {
  lon?: number;
  lat?: number;
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
  viewer.value.scene.camera.flyTo({
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
  viewer.value.imageryLayers.addImageryProvider(
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
  viewer.value.imageryLayers.addImageryProvider(
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
export function loadGaoDeShp() {
  //加载高德/百度影像地图，UrlTemplateImageryProvider该接口是加载谷歌地图服务的接口
	viewer.value.imageryLayers.addImageryProvider(
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
	viewer.value.imageryLayers.addImageryProvider(
		new (Cesium.UrlTemplateImageryProvider as any)({
			url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
			layer: 'tdtAnnoLayer',
			style: 'default',
			format: 'image/jpeg',
			tileMatrixSetID: 'GoogleMapsCompatible',
		})
	)
}

// 添加dataSource
export function loadDataSource() {
  dataSource.value = new Cesium.CustomDataSource('myData')
  viewer.value.dataSources.add(dataSource.value)
}

// 添加点位属性接口
interface IAddPoint {
  lon: number | string;
  lat: number | string;
  [propName: string]:any;
}
// 将字符串转化为浮点数函数
function outputFloat(val: number|string) {  
  return typeof val === 'string' && !isNaN(parseFloat(val)) ? parseFloat(val) : val;  
}  
// 添加entity点
export function addEntityPoint(msg:IAddPoint) {
  let point = dataSource.value.entities.add({
    tag: msg,
    position: Cesium.Cartesian3.fromDegrees((outputFloat(msg.lon) as number), (outputFloat(msg.lat) as number)),
    point: {
      pixelSize: 100,
      color: new Cesium.Color(0,1,0,1),
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    }
  })
}

// 添加entity线
export function addEntityLine(){
  //添加实体
  const line = dataSource.value.entities.add({
    polyline: {
      show: true,
      positions: Cesium.Cartesian3.fromDegreesArray([116.39, 39.91, 116.40, 39.91]),
      width: 5,
      material:new Cesium.Color(0,0,1,1)
    }
  })
  console.log("line",line)
  viewer.value.trackedEntity = line;
}

// 添加entity面
export function addEntityPlane(){
  //添加实体
  const plane = dataSource.value.entities.add({
    position: Cesium.Cartesian3.fromDegrees(116.391, 39.914, 1000),
    plane: {
      plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0),
      dimensions: new Cesium.Cartesian2(400, 300), //面的长度和宽度
      material: Cesium.Color.RED.withAlpha(0.5), //显示材质
      outline: true, //显示边框
      outlineColor: Cesium.Color.BLACK
    }
  })
  viewer.value.trackedEntity = plane;
}

/* 空间两点距离计算函数 */
export function getLength(start: Cesium.Cartesian3, end: Cesium.Cartesian3) {
  // 将起点与终点位置信息从笛卡尔坐标形式转换为Cartographic形式
  let startCartographic = Cesium.Cartographic.fromCartesian(start)
  let endCartographic = Cesium.Cartographic.fromCartesian(end)
  // 初始化测地线
  let geodesic = new Cesium.EllipsoidGeodesic()
  // 设置测地线起点和终点，EllipsoidGeodesic中setEndPoints常与surfaceDistance搭配使用
  geodesic.setEndPoints(startCartographic, endCartographic)
  // 获取起点和终点之间的表面距离，单位为km，规定四舍五入保留两位小数
  // surfaceDistance返回number 单位为m，带小数
  // console.log((geodesic.surfaceDistance / 1000).toFixed(2))
  return (geodesic.surfaceDistance / 1000).toFixed(2)
}
/* 空间两点计算中点函数 */
export function getMidpoint(start: Cesium.Cartesian3, end: Cesium.Cartesian3) {
  let startPoint = Cesium.Cartographic.fromCartesian(start)
  let endPoint = Cesium.Cartographic.fromCartesian(end)
  let geodesic = new Cesium.EllipsoidGeodesic()
  geodesic.setEndPoints(startPoint, endPoint)
  let geoPoint = geodesic.interpolateUsingFraction(0.5)
  return Cesium.Ellipsoid.WGS84.cartographicToCartesian(geoPoint)
}
export function addLabel(viewer: {value: any} ,midPoint: Object, labelLength:string) {
  return viewer.value.entities.add({
    name: '中点',
    position: midPoint,
    label: {
      text: labelLength + 'km',
      font: '20px sans-serif',
      fillColor: Cesium.Color.WHITE,
      outlineWidth: 2,
      backgroundColor: Cesium.Color.BLACK,
      showBackground: true,
      style: Cesium.LabelStyle.FILL,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    }
  })
}
export function Bearing(from: Cesium.Cartesian3, to: Cesium.Cartesian3) {
  let fromCartographic = Cesium.Cartographic.fromCartesian(from)
  let toCartographic = Cesium.Cartographic.fromCartesian(to)
  let lat1 = fromCartographic.latitude
  let lon1 = fromCartographic.longitude
  let lat2 = toCartographic.latitude
  let lon2 = toCartographic.longitude
  let angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) *
    Math.cos(lat2) * Math.cos(lon1 - lon2))
  if (angle < 0) {
    angle += Math.PI * 2.0
  }
  return angle
}
export function addArea(viewer: {value: any} ,area: string, positions: Cesium.Cartesian3[]) {
  return viewer.value.entities.add({
    name: '多边形面积',
    position: positions[positions.length - 1],
    label: {
      text: area + '平方公里',
      font: '20px sans-serif',
      fillColor: Cesium.Color.WHITE,
      outlineWidth: 2,
      backgroundColor: Cesium.Color.BLACK,
      showBackground: true,
      style: Cesium.LabelStyle.FILL,
      pixelOffset: new Cesium.Cartesian2(60, -60),
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    }
  })
}
/* 绘制函数 */
export function drawPointLabel(viewer: {value: any},position: Cesium.Cartesian3, pointNum: string) {
  // 本质上就是添加一个点的实体
  return viewer.value.entities.add({
    name: '点几何对象',
    position: position,
    point: {
      color: Cesium.Color.WHEAT,
      pixelSize: 5,
      outlineWidth: 3,
      disableDepthTestDistance: Number.POSITIVE_INFINITY, //
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // 规定贴地
    },
    label: {
      text: pointNum,
      font: '30px sans-serif',
      fillColor: Cesium.Color.WHITE,
      outlineWidth: 2,
      backgroundColor: Cesium.Color.BLACK,
      showBackground: true,
      style: Cesium.LabelStyle.FILL,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER
    }
  })
}
export function drawPoint(viewer:{value: any},position: Cesium.Cartesian3) {
  // let viewer = this.viewer
  // 本质上就是添加一个点的实体
  return viewer.value.entities.add({
    position: position,
    point: {
      color: Cesium.Color.WHEAT,
      pixelSize: 5,
      outlineWidth: 3,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // 规定贴地
    }
  })
}
export function drawPolyline(viewer: {value: any},positions: Cesium.Cartesian3[]) {
  if (positions.length < 1) return
  return viewer.value.entities.add({
    name: '线几何对象',
    polyline: {
      positions: positions,
      width: 5.0,
      material: new Cesium.PolylineGlowMaterialProperty({
        // eslint-disable-next-line new-cap
        color: Cesium.Color.WHEAT
      }),
      depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
        // eslint-disable-next-line new-cap
        color: Cesium.Color.WHEAT
      }),
      clampToGround: true
    }
  })
}
export function drawPolygon(viewer: {value: any},positions: any) {
  // let viewer = this.viewer
  if (positions.length < 2) return
  return viewer.value.entities.add({
    name: '面几何对象',
    polygon: {
      hierarchy: positions,
      // eslint-disable-next-line new-cap
      material: new Cesium.ColorMaterialProperty(
        Cesium.Color.WHEAT.withAlpha(0.4)
      )
    }
  })
}
export interface IMovement {
  startPosition: Cesium.Cartesian2,
  endPosition: Cesium.Cartesian2,
}

// 雨
const FS_Rain = `uniform sampler2D colorTexture;
			 in vec2 v_textureCoordinates;
       uniform float tiltAngle;
       uniform float rainSize;
       uniform float rainWidth;
       uniform float rainSpeed;
			 float hash(float x){
					return fract(sin(x*233.3)*13.13);
			 }
       out vec4 vFragColor;
			void main(void){
				float time = czm_frameNumber / rainSpeed;
			  vec2 resolution = czm_viewport.zw;
			  vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);
			  vec3 c=vec3(1.0,1.0,1.0);
			  float a= tiltAngle;
			  float si=sin(a),co=cos(a);
			  uv*=mat2(co,-si,si,co);
			  uv*=length(uv+vec2(0,4.9))*rainSize + 1.;
			  float v = 1.0 - abs(sin(hash(floor(uv.x * rainWidth)) * 2.0));
			  float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;
			  c*=v*b;
        vFragColor = mix(texture(colorTexture, v_textureCoordinates), vec4(c,.3), .3);
			}
`;
// 雾
const FS_Fog = `float getDistance(sampler2D depthTexture, vec2 texCoords)
{
    float depth = czm_unpackDepth(texture(depthTexture, texCoords));
    if (depth == 0.0) {
        return czm_infinity;
    }
    vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth);
    return -eyeCoordinate.z / eyeCoordinate.w;
}
//根据距离，在中间进行插值
float interpolateByDistance(vec4 nearFarScalar, float distance)
{
    //根据常识，雾应该是距离远，越看不清，近距离内的物体可以看清
    //因此近距离alpha=0，远距离的alpha=1.0
    //本例中设置可见度为200米
    //雾特效的起始距离
    float startDistance = nearFarScalar.x;
    //雾特效的起始alpha值
    float startValue = nearFarScalar.y;
    //雾特效的结束距离
    float endDistance = nearFarScalar.z;
    //雾特效的结束alpha值
    float endValue = nearFarScalar.w;
    //根据每段距离占总长度的占比，插值alpha，距离越远，alpha值越大。插值范围0,1。
    float t = clamp((distance - startDistance) / (endDistance - startDistance), 0.0, 1.0);
    return mix(startValue, endValue, t);
}
vec4 alphaBlend(vec4 sourceColor, vec4 destinationColor)
{
    return sourceColor * vec4(sourceColor.aaa, 1.0) + destinationColor * (1.0 - sourceColor.a);
}
uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
uniform vec4 fogByDistance;
uniform vec4 fogColor;
in vec2 v_textureCoordinates;
void main(void)
{
    //获取地物距相机的距离
    float distance = getDistance(depthTexture, v_textureCoordinates);
    //获取场景原本的纹理颜色
    vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
    //根据距离，对alpha进行插值
    float blendAmount = interpolateByDistance(fogByDistance, distance);
    //将alpha变化值代入雾的原始颜色中，并将雾与场景原始纹理进行融合
    vec4 finalFogColor = vec4(fogColor.rgb, fogColor.a * blendAmount);
    out_FragColor = alphaBlend(finalFogColor, sceneColor);
}`;
// 雪
const FS_Snow = `uniform sampler2D colorTexture;
    in vec2 v_textureCoordinates;
    uniform float rainSpeed;
    float snow(vec2 uv,float scale){
        float time = czm_frameNumber / rainSpeed;
        float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;
        uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;
        uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;
        p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);
        k=smoothstep(0.,k,sin(f.x+f.y)*0.01);
        return k*w;
    }
    out vec4 vFragColor;
    void main(void){
        vec2 resolution = czm_viewport.zw;
        vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);
        vec3 finalColor=vec3(0);
        float c = 0.0;
        c+=snow(uv,50.)*.0;
        c+=snow(uv,30.)*.0;
        c+=snow(uv,10.)*.0;
        c+=snow(uv,5.);
        c+=snow(uv,4.);
        c+=snow(uv,3.);
        c+=snow(uv,2.);
        finalColor=(vec3(c));
        vFragColor = mix(texture(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.3);
    }
`;

// 添加雨
export function handleRain(rainWidth: number, rainSpeed: number) {
  removeStage();
  var rain = new Cesium.PostProcessStage({
    name: "hi_rain",
    fragmentShader: FS_Rain,
    uniforms: {
      tiltAngle: 0.5, // 倾斜角度
      rainSize: 0.6, // 雨大小
      rainWidth, //雨长度
      rainSpeed, //雨速
    },
  });
  viewer.value.scene.postProcessStages.add(rain);
  lastStage = rain;
};

// 添加雾
export function handleBigFog() {
  removeStage();
  var rain = new Cesium.PostProcessStage({
    name: "hi_rain",
    fragmentShader: FS_Fog,
    uniforms: {
      fogByDistance: new Cesium.Cartesian4(500, 0.0, 4000, 0.8), //
      fogColor: Cesium.Color.WHITE,
    },
  });
  viewer.value.scene.postProcessStages.add(rain);
  lastStage = rain;
};

// 添加雪
export function handleSnow(rainSpeed: number) {
  removeStage();
  var rain = new Cesium.PostProcessStage({
    name: "hi_snow",
    fragmentShader: FS_Snow,
    uniforms: {
      rainSpeed, // 雪速
    },
  });
  viewer.value.scene.postProcessStages.add(rain);
  lastStage = rain;
};

export function removeStage() {
  lastStage && viewer.value.scene.postProcessStages.remove(lastStage),
    (lastStage = null);
};

