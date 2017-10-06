import axios from 'axios'
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
} from 'api'

export default {
	// 手机号登陆
	login (mobile) {
		return axios.post(loginResource, {
			params: {
				mobile
			}
		})
	},
	// 公司起名
	getCompanyName (city,industry) {
		return axios.get(companyNameResource, {
			params: {
				city,
				industry
			}
		})
	},
	// 公司详情/公司核名
	getCompanyDetail (name,city,industry,from) {
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
	getCompanyScope (city,industry) {
		return axios.get(companyScopeResource, {
			params: {
				city,
				industry
			}
		})
	},
	// 公司工商信息
	getCompanyIdBiz (id) {
		return axios.get(companyIdBizResource)
	},
	//获取全部列表
	getMaterialAll () {
		return axios.get(materialAllResource)
	},
	// 根据类型获取列表
	getMaterialIndus (indus) {
		return axios.get(materialIndusResource, {
			params:{
				indus
			}
		})
	},
	// 根据子分类获取列表
	getMaterialClassify (classify) {
		return axios.get(materialClassifyResource,{
			params:{
				classify
			}
		})
	},
	// 获取工商材料详情
	getMaterialIdMsg (id) {
		return axios.get(materialIdMsgResource)
	},
	// 下载工商材料
	getMaterialIdDown (id) {
		return axios.get(materialIdDownResource)
	}
} 