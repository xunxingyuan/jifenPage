<template>
  <div class="upload">
    <div class="topBlock">
      <p class='topTitle'>YOKELLY素人种草</p>
      <p>做个行走的种草机，还能带走 双十一明星素颜套装哦</p>
    </div>
    <div class='inputBlock'>
      <p>你的昵称<span>*</span></p>
      <p class='intro'>有趣的名字快报上来~</p>
      <input type='text' v-model="nickname" max="10" min="2" />
    </div>
    <div class='inputBlock'>
      <p>联系方式<span>*</span></p>
      <p class='intro'>快留下联系电话，要是获奖了联系不到你不就亏大了？</p>
      <input type='number' :disabled="!phoneCanChange"  v-model="phonenumber" />
    </div>
    <div class='inputBlock'>
      <p>晒图种草<span>*</span></p>
      <p class='intro'>可上传5张，多多益善哦~</p>
      <p class='intro1'>支持jpg,png,gif,bmp,psd等图片格式</p>
      <div class='uploadChose' @click.stop="uploadImg">
        <img src="../../static/img/upload.png"/>
      </div>
      <p class='intro' v-if="localIds.length!==0">已选择{{localIds.length}}张图片</p>
    </div>
    <div class='inputBlock'>
      <p>晒图分享<span>*</span></p>
      <p class='intro'>说说你为什么推荐这款产品？你有什么与众不同的护肤秘籍？</p>
      <group>
        <x-textarea class='feeling' :max="100" placeholder="谈谈您的使用感受和心得吧~" :show-counter="true"  v-model="userFeeling"></x-textarea>
      </group>
    </div>
    <div class="bot">
      <x-button type="primary" @click.native="comfirmUpload">提交</x-button>
    </div>
  </div>
</template>

<script>
  import { Swiper,SwiperItem,XImg,Spinner,XTextarea,Group,XButton,XInput } from 'vux'

  export default {
    name: "upload",
    components: {
      XButton,
      Swiper,
      SwiperItem,
      XImg,
      Spinner,
      XTextarea,
      Group,
      XInput
    },
    data(){
      return {
        userFeeling: '',
        localIds: [],
        phonenumber: '',
        nickname: '',
        phoneCanChange: true
      }
    },
    methods:{
      _initData: function (id) {
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
          }
        })

        let _self = this
        this.$api.user.checkInfo({
          id: id
        }).then((res)=>{
          if(res.data.code === 200){
            this.phonenumber = res.data.data.phone
            if(this.phonenumber!==''){
              this.phoneCanChange = false
            }
            this.nickname = res.data.data.nick
          }
        })
      },
      updateUser: function (id) {
        return this.$api.user.updateUser({
          id: id,
          phone: this.phonenumber,
          nick: this.nickname,
          name: '',
          areaCode: JSON.stringify([]),
          areaName: '',
          address: ''
        })
      },
      uploadImg: function () {
        let _self = this
        this.$wechat.chooseImage({
          count: 5, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            _self.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            console.log(res)
          }
        });
      },
      comfirmUpload: function () {
        let id = window.localStorage.getItem('userIdJF')
        let _self = this
        if(this.userFeeling.trim()===''){
          this.$vux.toast.show({
            type: 'text',
            text: '心得不能为空哦~'
          })
        }else{
          if(_self.localIds.length === 0){
            this.$vux.toast.show({
              type: 'text',
              text: '您没有选择图片哦~'
            })
          }else{
            if(this.phonenumber.trim()!=='' && this.nickname.trim()!==''&&this.nickname.length>1&&this.phonenumber.length>10){
              _self.$vux.loading.show({
                text: '上传中'
              })
              this.updateUser(id).then((res)=>{
                if(res.data.code === 200){
                  let result = []
                  _self.uploadImgOneByOne(_self.localIds,0,result)
                }else if(res.data.code === 202){
                  _self.$vux.loading.hide()
                  this.$vux.toast.show({
                    type: 'text',
                    text: '当月上传已达最大次数！'
                  })
                }else{
                  _self.$vux.loading.hide()
                  this.$vux.toast.show({
                    type: 'text',
                    text: '系统故障，请稍后重试~'
                  })
                }
              })
            }else{
              this.$vux.toast.show({
                type: 'text',
                text: '手机号码或者昵称有误~'
              })

            }
          }
        }


      },
      //依次传图片
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
            feeling: _self.userFeeling,
            lists: JSON.stringify(result)
          }).then((res)=>{
            _self.$vux.loading.hide()
            if(res.data.code === 200){
              _self.$vux.toast.show({
                type: 'success',
                text: '上传成功'
              })
              _self.step = 1
              _self.$router.push({
                name: 'uploadPage'
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
    },
    mounted(){
      let id = window.localStorage.getItem('userIdJF')
      window.sessionStorage.setItem('enter','1')
      if(!id){
        this.$router.push({
          name: 'home'
        })
      }else{
        this._initData(id)
      }
    }
  }
</script>

<style lang='less'>
  .upload{
    z-index: 6;
    background: #f7f7f7;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
    .topBlock{
      background: #3A67A0;
      border-bottom: solid 4px #2C4E7B;
      padding: 10px 0;
      p{
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #fff;
      }
      .topTitle{
        font-size: 18px;
      }
    }
    .inputBlock{
      padding: 10px;
      padding-bottom: 0;
      p{
        color:#000;
      }
      span{
        color:#DB2824;
      }
      .intro{
        color:#666;
        font-size: 14px;
      }
      .intro1{
        color:#999;
        font-size: 12px;
      }
      input{
        height: 2rem;
        line-height: 2rem;
        outline: none;
        padding: 0 5px;
        width:100%;
        border: solid 1px #ddd;
        font-size: 14px;
        color: #333;
      }
      .feeling{
        font-size: 14px;
        color: #333;
      }
      .uploadChose{
        width: 100px;
        height: 100px;
        border: dashed 1px #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 30px;
          height: 30px;
        }
      }
    }



    .top{
      height: 60px;
      min-height: 60px;
      width: 90%;
      margin: 1rem 5%;
      border: dashed 1px #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 30px;
        height: 30px;
      }
    }
    .showPreload{
      height: 140px;
      min-height: 100px;
      width: 90%;
      border: solid 1px #ddd;
      padding: 10px;
      margin: 0 5%;
      background: #fff;
      display: flex;
      overflow: auto;
      .imgPreviewBox{
        margin-right: 10px;
        width: auto;
        position: relative;
        .chose{
          height: 120px;
          width: auto;
        }
      }

    }
    .del{
      width: 100%;
      text-align: right;
      padding: 0 1rem;
      color: #10aeff;
    }
    .mid{
      width: 100%;
      display: block;
    }
    .bot{
      margin-top: 1rem;
      width: 100%;
      padding: 0 1rem;
    }
  }
</style>
