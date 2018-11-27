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
  common:{
    //页面计数
    countEnter: (data)=>{
      return get('/api/count/enter',data)
    },
    //获取结果计数
    countResult: (data)=>{
      return get('/api/count/result',data)
    }
  },
  auth: {
    //获取code
    getAuth: (data)=>{
      return get('/api/auth/getAuth',data)
    },
    //获取信息code
    getInfoAuth: (data)=>{
      return get('/api/auth/getInfoAuth',data)
    },
    //获取Info token

    getInfoToken: (data)=>{
      return get('/api/auth/getInfoToken',data)
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
    },
    //鉴权用户检查
    checkAuthInfo: (data)=>{
      return get('/api/user/checkAuthInfo',data)
    },


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
    },
    getLimt: (data)=>{
      return get('/api/admin/getLimit',data)
    },
    setLimt: (data)=>{
      return get('/api/admin/setLimit',data)
    },
    getNotice:(data)=>{
      return get('/api/admin/notice',data)
    },
    setNotice:(data)=>{
      return get('/api/admin/noticeSet',data)
    }
  }
}
