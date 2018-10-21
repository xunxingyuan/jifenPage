<template>
  <div class="home">
    <div v-if="!show" class="loadingPage">
      <x-img class="logo" src="../../static/img/logo.png"></x-img>
      <spinner :type="loadingType" size="40px"></spinner>
    </div>
    <div v-if="show" class="homePage">
      <swiper v-if="showImg"  class="imgBox" @on-index-change="onSwiperItemIndexChange" :list="srcList" :show-dots="false" :interval="1500" :aspect-ratio="300/800" :auto="true" height="100vh"></swiper>
      <div v-else>
        <section class="topPart">
          <x-img class="logo" src="../../static/img/logo.png"></x-img>
          <span class="intro" @click="showRuler = true">活动规则</span>
        </section>
        <section class="part1" v-show="step===1">
          <div class="top">
            <p class="black">[comfort zone]明星单品</p>
            <p class="black">守护你的盛世美颜</p>
            <p>明星们都喜欢的护肤品</p>
            <p>你Pick了吗？</p>
          </div>
          <div class="mid">
            <p>快来分享你对[comfort zone]产品的使用感受</p>
            <p>你来晒评价，我来送积分</p>
            <p>更有机会获得双11明星素颜套装</p>
            <p>详细规则点击右上角↗</p>
          </div>
          <button class="btn btn_tran" @click.stop="start">马上参与</button>
        </section>
        <section class="part2" v-show="step===2">
          <div class="top">
            <p>快去<span>微博、朋友圈、小红书</span></p>
            <p>说出你的使用感受</p>
            <p>为[comfort zone]家族圈粉</p>
            <p class="botOne">是真爱，就晒出来！</p>
          </div>
          <swiper class="midBox" :show-dots="false" :interval="1500" :aspect-ratio="300/800" :list="showList1" :auto="true" height="200px"></swiper>
          <div class="bot">
            <p>100积分即将到手</p>
            <p>你还在犹豫什么</p>
            <button class="btn btn_tran" @click="step=3">马上参与</button>
          </div>
        </section>
        <section class="part3" v-show="step===3">
          <div class="top">
            <div>
              <p class="topTitle">快来完成你的晒图任务吧！</p>
              <p>把你的使用心得分享出来，</p>
              <p>审核通过之后就能获得200积分啦！</p>
            </div>
            <img class="upload" src="../../static/img/upload.png" @click="step = 5" />
            <div class="topBot">
              <p>*记得上传清晰图片和文字</p>
              <p>优质分享还会在首页展示哦！</p>
            </div>
          </div>
          <div class="bot">
            <button class="btn btn_tran" @click="step = 5">马上参与</button>
            <button class="btn btn_tran" @click="step = 4">看大家晒</button>
          </div>
        </section>
        <section class="part4" v-show="step===4">
          <span @click.stop="step = 3" class="back">< 返回</span>
          <div class="imgContain">
            <div class="img" v-for="item in showAll">
              <!--<x-img :src="item.img"></x-img>-->
              <img :src="item.img" />
            </div>
          </div>
        </section>
        <section class="part5" v-show="step===5">
          <div class="top" @click.stop="uploadImg">
            <img src="../../static/img/upload.png"/>
          </div>
          <div class="showPreload">
            <div class="imgPreviewBox" v-for="(item,index) in localIds">
              <img class="chose" :src="item"/>
            </div>
          </div>
          <p class="del" @click="localIds = []">清空图片</p>
          <div class="mid">
            <group>
              <x-input title="手机号码" type="tel" is-type="china-mobile" :disabled="!phoneCanChange"  v-model="phonenumber"></x-input>
              <x-input title="昵称" type="text" :min="2" :max="10" v-model="nickname"></x-input>
            </group>
            <group>
              <x-textarea :max="100" placeholder="谈谈您的使用感受和心得吧~" :show-counter="true"  v-model="userFeeling"></x-textarea>
            </group>
          </div>

          <div class="bot">
            <x-button type="primary" @click.native="comfirmUpload">提交</x-button>
          </div>
        </section>
        <section class="activeIntro" v-if="showRuler">
          <div class="introBox">
            <x-img class="logo" src="../../static/img/logo.png"></x-img>
            <p class="title">规则说明：</p>
            <p class="ruler">1、分享方式：在各大分享平台（如：微信、微博、小红书等）晒出您对[comfort zone]的使用体验，并截图上传至活动平台，审核通过后即可获得积分奖励。</p>
            <p class="ruler">2、晒图规则：不可重复上传相同内容，不可上传他人的晒图，否则会被判定审核不通过</p>
            <button class="btn" @click="start">马上参与</button>
            <span class="close" @click="showRuler = false">
           <x-img src="../../static/img/Close.png"></x-img>
         </span>
          </div>
        </section>
        <!--<p>晒图赚积分</p>-->
        <!--<div><button @click="uploadImg">我要晒图</button></div>-->
        <!--<div><button @click="viewInfo">我的会员信息</button></div>-->
        <!--<div><button>我的图片</button></div>-->
        <div class="user" >
          <img @click.stop="viewInfo('user')" src="../../static/img/user.png"/>
          <img @click.stop="viewInfo('upload')" src="../../static/img/order.png"/>
        </div>
        <div class="bottom">
          <p>粤ICP备17110392号-1</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import UserEdit from "./userEdit";
  import { Swiper,SwiperItem,XImg,Spinner,XTextarea,Group,XButton,XInput } from 'vux'

  export default {
    name: 'home',
    components: {
      XButton,
      UserEdit,
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
        show: false,
        loadingType: 'bubbles',
        swiperItemIndex: 1,
        srcList:[{
          img: '../../static/img/1.jpg'
        },{
          img: '../../static/img/2.jpg'
        },{
          img: '../../static/img/3.jpg'
        }],
        showList1:[{
          img: '../../static/img/show/04.png'
        },{
          img: '../../static/img/show/06.png'
        },{
          img: '../../static/img/show/07.jpg'
        }],
        showAll:[{
          img: '../../static/img/show/01.png'
        },{
          img: '../../static/img/show/02.png'
        },{
          img: '../../static/img/show/03.png'
        },{
          img: '../../static/img/show/04.png'
        },{
          img: '../../static/img/show/06.png'
        },{
          img: '../../static/img/show/07.jpg'
        }],
        showImg: true,
        showRuler: false,
        step: 1,
        userFeeling: '',
        localIds: [],
        phonenumber: '',
        nickname: '',
        phoneCanChange: true

      }
    },
    methods:{
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
            if(this.phonenumber.trim()!=='' && this.nickname.trim()!==''){
              _self.$vux.loading.show({
                text: '上传中'
              })
              this.updateUser(id).then((res)=>{
                if(res.data.code === 200){
                  let result = []
                  _self.uploadImgOneByOne(_self.localIds,0,result)
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
                text: '用户信息不能为空哦~'
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
              window.localStorage.removeItem('userIdJF')
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
      viewInfo: function (type) {
        if(type === 'user'){
          this.$router.push({
            name: 'userEdit'
          })
        }else{
          this.$router.push({
            name: 'uploadPage'
          })
        }

      },
      onSwiperItemIndexChange: function (val) {
        if(val=== 2){
          setTimeout(()=>{
            this.showImg = false
          },1500)
        }
      },
      start: function () {
        this.showRuler = false
        this.step = 2
        let id = window.localStorage.getItem('userIdJF')
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
          // else{
          //   this.$vux.confirm.show({
          //     // 组件除show外的属性
          //     title: '',
          //     content: '需要完善个人信息才能上传哦，是否去完善？',
          //     onCancel () {
          //     },
          //     onConfirm () {
          //       _self.$router.push({
          //         name: 'userEdit'
          //       })
          //     }
          //   })
          // }
        })
      },
      checkImg:  function () {
        let list1 = [{
          img: '../../static/img/logo.png'
        },{
          img: '../../static/img/1.jpg'
        },{
          img: '../../static/img/2.jpg'
        },{
          img: '../../static/img/3.jpg'
        }]

        return new Promise((resolve,reject)=>{
          let count = 0
          list1.forEach((e)=>{
            this.getImg(e.img).then(()=>{
              count+=1
              if(count === 4){
                resolve()
              }
            })
          })

        })
      },
      getImg: function (url) {
        return new Promise((resolve,reject)=>{
          let newImg = new Image()
          newImg.src = url
          // console.log(url+':beginload')
          newImg.onload = () => {
            // console.log(url+':loaded')
            resolve()
          }
          newImg.onerror = () =>{
            reject()
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
      }
    },
    mounted(){
      this.checkPage()
      let enter = window.sessionStorage.getItem('enter')
      if(enter === '1'){
        this.showImg = false
        this.show = true
      }else{
        this.checkImg().then(()=>{
          console.log('loaded')
          setTimeout(()=>{
            this.show = true
          },1500)
        })
      }
    }
  }
</script>
<style lang="less">
 .home{
   height: 100%;
   width: 100%;
   .loadingPage{
     background: url("../../static/img/bg1.jpg");
     background-size: cover;
     height: 100%;
     width: 100%;
     display: flex;
     flex-flow: column;
     align-items: center;
     img{
       width: 200px;
     }
   }
   .homePage{
     background: url("../../static/img/bg2.jpg");
     background-size: cover;
     height: 100%;
     width: 100%;
   }

   .user{
     position: absolute;
     right: 1rem;
     bottom: 10px;
     img{
       width: 36px;
       height: 36px;
     }
   }
   .bottom{
     position: absolute;
     bottom: 10px;
     left: 0;
     text-align: center;
     font-size: 12px;
     width: 100%;
     color: #fff;
   }
   .btn_tran{
     border: solid 2px #fff;
     color: #fff;
     font-size: 20px;
     width: 160px;
     height: 45px;
     background: transparent;
     border-radius: 3px;
     outline: none;
   }
   .imgBox{
     position: absolute;
     height: 100%;
     width: 100%;
     left: 0;
     top: 0;
     z-index: 10;
   }
   .part1,.part2,.part3,.part4,.part5{
     position: absolute;
     width: 100%;
     height: 100%;
     left: 0;
     top: 0;
     display: flex;
     flex-flow: column;
     align-items: center;
     justify-content: center;
     padding: 0 10%;
     background: rgba(255,255,255,0.2);
     text-align: center;
   }
   .part5{
     z-index: 6;
     background: #f7f7f7;
     justify-content: flex-start;
     padding: 0;
     .top{
       height: 60px;
       min-height: 60px;
       margin-top: 1rem;
       width: 90%;
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
       margin: 0.5rem 0;
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
   .part4{
     box-sizing: border-box;
     padding: 0 10px;
     z-index: 6;
     .back{
       font-size: 18px;
       font-weight: 700;
       margin-bottom: 1rem;
       width: 100%;
       padding: 0 1rem;
       text-align: left;
     }
     .imgContain{
       height: 80vh;
       width: 100%;
       overflow: auto;
       display: flex;

       .img{
         display: inline-block;
         width: auto;
         min-width: 300px;
         margin-right: 1rem;
         height: 100%;
         img{
           width: auto;
           height: 100%;
         }
       }
     }
   }
   .part3{
     padding: 0;
      .top{
        height: 65%;
        width: 70%;
        background: #fff;
        padding: 1rem 10px;
        margin-bottom: 2rem;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-around;
        .topTitle{
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        .upload{
          width: 120px;
          height: 120px;
        }
        .topBot{
          font-size: 14px;
          color: #999;
        }
      }
     .bot{
       width: 100%;
       display: flex;
       justify-content: space-around;
       .btn{
         width: 120px;
       }
     }
   }
   .part2{
      .top{
        font-size: 18px;
        span{
          color: #FF728B;
          font-weight: 700;
        }
        .botOne{
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

      }
     .midBox{
       width: 100px;
     }
     .bot{
       margin-top: 10px;
       color: #fff;
       .btn{
         margin-top: 10px;
       }
     }
   }
   .part1{
     .top{
       font-size: 18px;
       color: #000;
       text-align: center;
       margin-bottom: 3rem;
       .black{
         font-weight: 700;
         font-size: 22px;
       }
     }
     .mid{
       text-align: center;
       font-size: 14px;
       color: #000;
     }
     .btn{
       margin-top: 5rem;
     }
   }
   .topPart{
     z-index: 5;
     display: flex;
     flex-flow: column;
     align-items: center;
     position: absolute;
     width: 100%;
     .logo{
       width: 140px;
       height: 140px;
       margin-top: -30px;
     }
     .intro{
       position: absolute;
       right: 0.5rem;
       top: 0.5rem;
       font-size: 14px;
     }
   }
   .activeIntro{
     background: rgba(0,0,0,0.4);
     z-index: 6;
     position: absolute;
     left: 0;
     top: 0;
     height: 100%;
     width: 100%;
     padding: 1rem;
     box-sizing: border-box;
     .introBox{
       background: #fff;
       width: 100%;
       height: 100%;
       position: relative;
       padding: 6rem 2rem 2rem 2rem;
       display: flex;
       flex-flow: column;
       align-items: center;
       overflow: auto;
       .logo{
         width: 140px;
         height: 140px;
         margin-top: -30px;
         position: absolute;
         left: 50%;
         margin-left: -25%;
         top: 0;
       }
       .title{
         font-size: 16px;
         margin-bottom: 10px;
         align-self: flex-start;
         font-weight: 700;
       }
       .ruler{
         margin-bottom: 5px;
       }
       .btn{
         margin-top: 4rem;
         width: 180px;
         height: 60px;
         font-size: 20px;
         border-radius: 3px;
         outline: none;
         border: none;
         color: #fff;
         background: #333;
       }
       .close{
         position: absolute;
         display: block;
         right: 5px;
         top: 5px;
         width: 24px;
         height: 24px;
       }
     }
   }
 }
</style>
