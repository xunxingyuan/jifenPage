<template>
  <div class="home">
    <p>晒图赚积分</p>
    <div><button @click="uploadImg">我要晒图</button></div>
    <div><button @click="viewInfo">我的会员信息</button></div>
    <div><button>我的图片</button></div>
  </div>
</template>

<script>
  import UserEdit from "./userEdit";

  export default {
    name: 'home',
    components: {
      UserEdit

    },
    methods:{
      uploadImg: function () {
        let id = window.localStorage.getItem('userIdJF')
        let _self = this
        this.$api.user.checkInfo({
          id: id
        }).then((res)=>{
          if(res.data.code === 200){
            this.$wechat.chooseImage({
              count: 9, // 默认9
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                console.log(res)
                _self.$vux.loading.show({
                  text: '上传中'
                })
                let result = []
                _self.uploadImgOneByOne(localIds,0,result)
              }
            });
          }else{
            this.$vux.confirm.show({
              // 组件除show外的属性
              title: '',
              content: '需要完善个人信息才能上传哦，是否去完善？',
              onCancel () {
              },
              onConfirm () {
                _self.$router.push({
                  name: 'userEdit'
                })
              }
            })
          }
        })
      },
      //依次长传图片
      uploadImgOneByOne: function (list,index,result) {
        let _self = this
        if(index< (list.length)){
          _self.$wechat.uploadImage({
            localId: list[index], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 0, // 默认为1，显示进度提示
            success: function (res) {
              let serverId = res.serverId; // 返回图片的服务器端ID
              result.push(serverId)
              _self.uploadImgOneByOne(list,index+1,result)
            }
          });
        }else{
          console.log(result)
          let id = window.localStorage.getItem('userIdJF')
          _self.$api.user.uploadImg({
            id: id,
            lists: JSON.stringify(result)
          }).then((res)=>{
            _self.$vux.loading.hide()
            if(res.data.code === 200){
              _self.$vux.toast.show({
                type: 'success',
                text: '上传成功'
              })
            }else{
              _self.$vux.toast.show({
                type: 'warn',
                text: res.data.msg
              })
            }
          })
        }
      },
      checkPage: function () {
        //检查当前微信用户
        let id = window.localStorage.getItem('userIdJF')
        if(id){
          this.$api.auth.updateToken({
            id: id
          }).then((res)=>{
            if(res.data.code === 200){
              console.log('user comfirm')
            }else{
              this.redirectLocation()
            }
          })
        }else{
          if(!this.$route.query.hasOwnProperty('code')){
            this.redirectLocation()
          }else{
            this.$api.auth.getToken({
              code: this.$route.query.code
            }).then((res)=>{
              if(res.data.code === 200){
                window.localStorage.setItem('userIdJF',res.data.data.id)
              }
            })
          }
        }
        //获取权限
        console.log(window.location.href)
        this.$api.auth.getJsSign({
          url: window.location.href
        }).then((res)=>{
          if(res.data.code === 200){
            this.$wechat.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.data.sign.appid, // 必填，公众号的唯一标识
              timestamp: res.data.data.sign.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.data.sign.nonceStr, // 必填，生成签名的随机串
              signature: res.data.data.sign.signature,// 必填，签名
              jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage'] // 必填，需要使用的JS接口列表
            });
            this.$wechat.ready(function(){
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            });
          }else{

          }
        })
      },
      redirectLocation: function () {
        this.$api.auth.getAuth().then((res)=>{
          if(res.data.code === 200){
            window.location = res.data.data.url
          }
        })
      },
      viewInfo: function () {
        this.$router.push({
          name: 'userEdit'
        })
      }
    },
    mounted(){
      this.checkPage()
    }
  }
</script>
<style lang="less">

</style>
