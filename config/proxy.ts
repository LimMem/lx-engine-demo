const DTalk_URL = 'http://172.21.72.205:8088/'; // 钉钉接口
// const BASE_URL = 'http://172.21.72.201:8890/'; // 测试环境
const BASE_URL = 'http://172.21.72.205:10000/'; // 开发环境
// const BASE_URL = 'http://172.16.84.236:8883/'; // 江苏电子协议
// const BASE_URL = 'https://lxdev.iwhalecloud.com/';
const DEV_URL = process.env.LCDP_SERVICE_URL || `${BASE_URL}lcdp-app/server/`;

export default {
  '/portal': {
    target: BASE_URL,
    changeOrigin: true,
  },
  '/server': {
    target: DEV_URL,
    changeOrigin: true,
    pathRewrite: { '^/server': '' },
  },
  '/app': {
    target: DEV_URL,
    changeOrigin: true,
    // pathRewrite: { '^/app': '' },
  },
  '/login': {
    target: DEV_URL,
    changeOrigin: true,
    // pathRewrite: { '^/login': '' },
  },
  '/lcdp': {
    target: `${DEV_URL}`,
    changeOrigin: true,
  },
  '/img': {
    target: BASE_URL,
    changeOrigin: true,
    pathRewrite: { '^/img': '' },
  },
  '/engine': {
    target: BASE_URL,
    changeOrigin: true,
    pathRewrite: { '^/engine': 'engine' },
  }
}