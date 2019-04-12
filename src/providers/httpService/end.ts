// const env:string = 'development' 
// const env: string = 'test'
const env:string = 'production' 

let baseURL = ''
let serviceURL = ''


switch (env) {
  case 'development': // 开发环境
    baseURL = 'http://192.168.0.145:9999'
    serviceURL = 'http://192.168.0.145:9999'
    break
  case 'test': // 测试环境
    baseURL = 'http://192.168.0.156:9999'
    serviceURL = 'http://192.168.0.156:9999'
    break
  case 'production': // 生产环境
    baseURL = 'https://app.58mixgo.com'
    serviceURL = 'https://app.58mixgo.com'
    break
}

export { baseURL, serviceURL }
