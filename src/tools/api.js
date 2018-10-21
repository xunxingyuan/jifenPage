import axios from 'axios'
import Qs from 'qs'

function get(url,data) {
  return axios.get(url,{
    params: data
  })
}
function postForm(url,data) {
  let reqData = Qs.stringify(data);
  return axios.post(url,reqData,{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
}

export default {
  auth: {
    //获取code
    getAuth: (data)=>{
      return get('/api/auth/getAuth',data)
    },
    //获取token
    getToken: (data)=>{
      return get('/api/auth/getToken',data)
    },
    //更新token
    updateToken: (data)=>{
      return get('/api/auth/updateToken',data)
    },
    //js鉴权
    getJsSign: (data)=>{
      return get('/api/auth/getSign',data)
    }
  },
  user: {
    //检查用户基本信息
    checkInfo: (data)=>{
      return get('/api/user/checkInfo',data)
    },
    //新增用户信息
    addUser: (data)=>{
      return postForm('/api/user/addUser',data)
    },
    //更新用户信息
    updateUser: (data)=>{
      return postForm('/api/user/updateUser',data)
    },
    //用户上传图片
    uploadImg: (data)=>{
      return postForm('/api/user/uploadImg',data)
    },
    //获取用户上传列表
    getUserUpload: (data)=>{
      return get('/api/user/getUpload',data)
    }
  },
  admin:{
    login: (data)=>{
      return postForm('/api/admin/login',data)
    },
    getUser: (data)=>{
      return get('/api/admin/getUserList',data)
    },
    getJf: (data)=>{
      return get('/api/admin/getJf',data)
    },
    getUploadList: (data)=>{
      return get('/api/admin/getUploadList',data)
    },
    comfirm: (data)=>{
      return get('/api/admin/comfirm',data)
    }
  }
}
