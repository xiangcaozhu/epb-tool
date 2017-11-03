
// 配置api请求地址
const API_CONFIG = {
  host: DEV ? '/qidashi-boot' : 'http://tool.epbiao.com/api',
  // host: 'http://tool.epbiao.com/api',
  IP: ''
}

// 导出已经处理过的根地址
export const API_ROOT = ''.concat(API_CONFIG.host, API_CONFIG.IP)
