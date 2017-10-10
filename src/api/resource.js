
import { API_ROOT } from 'api/config'

// 接口请求地址对象
const apiResource = {
  // 登录：手机号登陆
  login: '/login',
  // 公司相关接口：公司起名
  companyName: '/company/name',
  // 公司相关接口：公司详情/公司核名
  companyDetail: '/company/detail',
  // 公司相关接口：公司经营范围
  companyScope: '/company/scope',
  // 公司相关接口：公司工商信息
  companyIdBiz: '/company',
  // 工商材料相关接口：工商材料获取全部列表
  materialAll: '/material/all',
  // 工商材料相关接口：根据类型获取列表
  materialIndus: '/material/indus',
  // 工商材料相关接口：根据子分类获取列表
  materialClassify: '/material/classify',
  // 工商材料相关接口：获取工商材料详情
  materialIdMsg: '/material',
  // 工商材料相关接口：下载工商材料
  materialIdDown: '/material'
}

// 导出相关请求地址
export const loginResource = API_ROOT.concat(apiResource.login)
export const companyNameResource = API_ROOT.concat(apiResource.companyName)
export const companyDetailResource = API_ROOT.concat(apiResource.companyDetail)
export const companyScopeResource = API_ROOT.concat(apiResource.companyScope)
export const companyIdBizResource = API_ROOT.concat(apiResource.companyIdBiz)
export const materialAllResource = API_ROOT.concat(apiResource.materialAll)
export const materialIndusResource = API_ROOT.concat(apiResource.materialIndus)
export const materialClassifyResource = API_ROOT.concat(apiResource.materialClassify)
export const materialIdMsgResource = API_ROOT.concat(apiResource.materialIdMsg)
export const materialIdDownResource = API_ROOT.concat(apiResource.materialIdDown)
