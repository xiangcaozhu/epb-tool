import axios from 'axios'
// import Vue from 'vue'
import qs from 'qs'
import {
  loginResource,
  companyNameResource,
  companyDetailResource,
  companyScopeResource,
  companyIdBizResource,
  materialAllResource,
  materialIndusResource,
  materialClassifyResource,
  materialIdMsgResource,
  materialIdDownResource
} from 'api/resource'

// import { Cookies } from 'quasar'

// axios.defaults.withCredentials = true
axios.defaults.timeout = 20000

// request拦截器
// axios.interceptors.request.use(
//   config => {
//     const token = Cookies.get('m')
//     config.data = JSON.stringify(config.data)
//     config.headers = {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//     if (token) {
//       config.headers = {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': token
//       }
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )

// response拦截器
// axios.interceptors.response.use(
//   response => {
//     if (response.data.errCode === 2) {
//       Vue.$router.push({
//         path: '/login',
//         query: { redirect: Vue.$router.currentRoute.fullPath }
//       })
//       return response
//     }
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )

export default {
  // 手机号登陆
  login (mobile) {
    return axios.post(loginResource, qs.stringify({
      mobile
    }))
  },
  // 公司起名
  getCompanyName (city, industry) {
    return axios.get(companyNameResource, {
      params: {
        city,
        industry
      }
    })
  },
  // 公司详情/公司核名
  getCompanyDetail (city, name, industry, from) {
    return axios.get(companyDetailResource, {
      params: {
        name,
        city,
        industry,
        from
      }
    })
  },
  // 公司经营范围
  getCompanyScope (city, industry) {
    return axios.get(companyScopeResource, {
      params: {
        city,
        industry
      }
    })
  },
  // 公司工商信息
  getCompanyIdBiz (id) {
    return axios.get(`${companyIdBizResource}/${id}/biz`)
  },
  // 获取全部列表
  getMaterialAll () {
    return axios.get(materialAllResource)
  },
  // 根据类型获取列表
  getMaterialIndus (indus) {
    return axios.get(materialIndusResource, {
      params: {
        indus
      }
    })
  },
  // 根据子分类获取列表
  getMaterialClassify (classify) {
    return axios.get(materialClassifyResource, {
      params: {
        classify
      }
    })
  },
  // 获取工商材料详情
  getMaterialIdMsg (id) {
    return axios.get(`${materialIdMsgResource}/${id}/msg`, {
      params: {
        id
      }
    })
  },
  // 下载工商材料
  getMaterialIdDown (id) {
    return axios.get(`${materialIdDownResource}/${id}/down`, {
      params: {
        id
      }
    })
  }
}
