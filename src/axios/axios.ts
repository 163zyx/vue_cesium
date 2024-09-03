import axios from 'axios'

const talkServerUrl = "https://api.chatanywhere.com.cn"

const talkAxios = axios.create({
  baseURL: talkServerUrl,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000,
})

const token = "Bearer sk-txEKmVgU1uIDEz3KO0ezSgBWxvGuX54D3CYvecSXXsAf2jhR"

talkAxios.interceptors.request.use((request) => {
  console.log("请求中间件",request)
  request.headers["Authorization"] = token
  return request
})

talkAxios.interceptors.response.use((response) => {
  console.log("相应中间件",response)
  if(response.status !== 200){
    // 错误
    console.log("服务异常")
    return Promise.reject(response.statusText)
  }
  return response.data
},(err => {
  console.log("接口报错",err)
  return Promise.reject(err)
}))

export default talkAxios