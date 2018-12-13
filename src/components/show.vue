<template>
  <div class="show">
    <section class="loadingPage flexCenter" v-if="part === 1">
      <img class="loading" src="../../static/showSrc/loading.png"/>
      <p>Loading....</p>
    </section>
    <section class="choseImg flexCenter" v-if="part === 2">
      <p>我要上封面</p>
      <button class="make">制作封面</button>
    </section>
    <section class="editImg" v-if="part === 3">
      <v-touch class="touchBox" @panstart="update" @panend="update"  @panmove="move" @pinchmove="pinch" @pinchstart="update" @pinchend="update" @rotatestart="update" @rotateend="update" @rotatemove="rotate"></v-touch>
      <div class="imgBox">
        <img :src="styleSrc" class="background" />
        <img src="../../static/img/user.png" :style="{left: imgStyle.left + 'px',top: imgStyle.top + 'px',width: imgStyle.width + 'px',height: imgStyle.height + 'px'}"/>
        <p class="userTitle">{{userTitle}}</p>
        <p class="userName">{{userName}}</p>
      </div>
      <div>

      </div>
      <div class="colorChose">
        <p>文字颜色:</p>
        <div class="colorBlock" v-for="item in colorList" :style="{backgroundColor: item}"></div>
      </div>
      <div class="styleChose">
        <swiper dots-position="center" height="25vh" dots-class="dotStyle">
          <swiper-item v-for="(item,index) in styleList" :key="index">
            <div class="ImgBlock">
              <img v-for="img in item.child" :src="img.src" @click="choseImg(img)" />
            </div>
          </swiper-item>
        </swiper>
      </div>
    </section>
    <section class="resultBlock" v-if="part === 4">

    </section>

  </div>
</template>

<script>
  import {
    Swiper,
    SwiperItem,
    XImg
  } from "vux";
  export default {
    name: "show",
    components:{
      Swiper,
      SwiperItem,
      XImg
    },
    data() {
      return {
        part: 3,
        type: "",
        scale: "",
        distanceX: "",
        distanceY: "",
        rotateDeg: "",
        imgStyle:{
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          rotate: 0
        },
        titleStyle:{
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          color: '#000'
        },
        nameStyle:{
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          color: '#000'
        },
        recordStyle:{
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          rotate: 0
        },
        styleList:[{
          name: 'part1',
          child:[{
            src: '../../static/showSrc/fengmian/1.png'
          },{
            src: '../../static/showSrc/fengmian/2.png'
          },{
            src: '../../static/showSrc/fengmian/3.png'
          },{
            src: '../../static/showSrc/fengmian/4.png'
          }]
        },{
          name: 'part2',
          child:[{
            src: '../../static/showSrc/fengmian/5.png'
          },{
            src: '../../static/showSrc/fengmian/6.png'
          },{
            src: '../../static/showSrc/fengmian/7.png'
          },{
            src: '../../static/showSrc/fengmian/8.png'
          }]
        },{
          name: 'part3',
          child:[{
            src: '../../static/showSrc/fengmian/9.png'
          },{
            src: '../../static/showSrc/fengmian/10.png'
          },{
            src: '../../static/showSrc/fengmian/11.png'
          },{
            src: '../../static/showSrc/fengmian/12.png'
          }]
        }],
        styleSrc: '../../static/showSrc/fengmian/1.png',
        userTitle: '',
        userTitleColor: '#000',
        userName: '',
        userNameColor: '#000',
        colorList:['#267832','#888','#f9f9f9','#675432']
      };
    },
    methods: {
      //页面进入计数
      countEnter: function(id) {
        this.$api.common.countEnter({
          id: id,
          channel: 'show'
        });
      },
      //完成测试计数
      countFinish: function() {
        this.$api.common.countResult({
          channel: 'show'
        });
      },
      //完成分享计数
      countShare: function() {
        this.$api.common.countShare({
          channel: 'show'
        });
      },
      //js分享初始化
      jsShareInit: function() {
        let _self = this;
        this.$api.auth
          .getJsSign({
            url: window.location.href
          })
          .then(res => {
            if (res.data.code === 200) {
              _self.$wechat.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来,若要查看传入的参数,可以在pc端打开,参数信息会通过log打出,仅在pc端时才会打印。
                appId: res.data.data.sign.appid, // 必填,公众号的唯一标识
                timestamp: res.data.data.sign.timestamp, // 必填,生成签名的时间戳
                nonceStr: res.data.data.sign.nonceStr, // 必填,生成签名的随机串
                signature: res.data.data.sign.signature, // 必填,签名
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填,需要使用的JS接口列表
              });
              _self.$wechat.ready(function() {
                _self.$wechat.showOptionMenu();
                _self.$wechat.onMenuShareTimeline({
                  title: "测测你的动物型创业人格", // 分享标题
                  link: "http://newmedia.yokelly.com.cn/career", // 分享链接,该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: "http://newmedia.yokelly.com.cn/src/catIcon.jpg", // 分享图标
                  success: function() {
                    // 用户点击了分享后执行的回调函数
                    _self.countShare();
                  }
                });
                _self.$wechat.onMenuShareAppMessage({
                  title: "测测你的动物型创业人格", // 分享标题
                  desc: "在创业时代，哪种动物能代表你的创业人格？", // 分享描述
                  link: "http://newmedia.yokelly.com.cn/career", // 分享链接,该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: "http://newmedia.yokelly.com.cn/src/catIcon.jpg", // 分享图标
                  type: "", // 分享类型,music.video或link,不填默认为link
                  dataUrl: "", // 如果type是music或video,则要提供数据链接,默认为空
                  success: function() {
                    // 用户点击了分享后执行的回调函数
                    _self.countShare();
                  }
                });
              });
            }
          });
      },
      //检查用户
      checkUser: function() {
        let _self = this;
        let id = window.localStorage.getItem("userIdShow");
        if (id) {
          this.$api.user
            .checkAuthInfo({
              id: id
            })
            .then(res => {
              if (res.data.code === 200) {
                this.countEnter(id);

              } else {
                window.localStorage.removeItem("userIdShow");
                this.redirectLocation();
              }
            });
        } else {
          if (!this.$route.query.hasOwnProperty("code")) {
            this.redirectLocation();
          } else {
            this.$api.auth
              .getInfoToken({
                code: this.$route.query.code,
                channel: 'show'
              })
              .then(res => {
                if (res.data.code === 200) {
                  window.localStorage.setItem("userIdShow", res.data.data.id);
                  this.checkUser();
                }
              });
          }
        }
      },
      //重定向
      redirectLocation: function() {
        this.$api.auth.getInfoAuth({
          channel: 'show'
        }).then(res => {
          if (res.data.code === 200) {
            window.location = res.data.data.url;
          }
        });
      },
      //预加载图片
      checkImg: function(list) {
        return new Promise((resolve, reject) => {
          let count = 0;
          list.forEach(e => {
            this.getImg(e.img).then(() => {
              count += 1;
              if (count === list.length) {
                resolve();
              }
            });
          });
        });
      },
      //图片获取
      getImg: function(url) {
        return new Promise((resolve, reject) => {
          let newImg = new Image();
          newImg.src = url;
          newImg.onload = () => {
            resolve();
          };
          newImg.onerror = () => {
            reject();
          };
        });
      },
      //容器生成图片
      cutImg: function() {
        let _self = this;
        let picDom = document.querySelector(".showBox");
        let width = picDom.offsetWidth;
        let height = picDom.offsetHeight;
        let scaleBy = 4; //缩放比例
        let opts = {
          // canvas: canvas,
          logging: false, //日志开关
          width: width,
          height: height,
          scale: scaleBy,
          allowTaint: true,
          windowWidth: width,
          windowHeight: height
        };
        html2canvas(picDom, opts).then(data => {
          // _self.captureData = data.toDataURL();
          // _self.captureShow = true;
          _self.$vux.loading.hide();
        });
      },


      update: function(){
        this.recordStyle.left =  this.imgStyle.left
        this.recordStyle.top =  this.imgStyle.top
        this.recordStyle.width =  this.imgStyle.width
        this.recordStyle.height =  this.imgStyle.height
        this.recordStyle.rotate =  this.imgStyle.rotate
      },
      move: function(e) {
        console.log(e);
        this.distanceX = e.deltaX;
        this.distanceY = e.deltaY;
        this.imgStyle.left = this.recordStyle.left + e.deltaX
        this.imgStyle.top = this.recordStyle.top + e.deltaY
      },
      pinch: function(e) {
        console.log(e);
        this.scale = e.scale;
        this.imgStyle.width = this.recordStyle.width*e.scale;
        this.imgStyle.height = this.recordStyle.height*e.scale;
      },
      rotate: function(e) {
        this.type = "rotate";
        this.rotateDeg = e.rotation;
        this.imgStyle.rotate = this.recordStyle.rotate + e.rotation -360;
      },
      choseImg: function (item) {
        this.styleSrc = item.src
      }
    },
    mounted() {
      this.checkUser();
    }
  };
</script>

<style lang='less'>
  @keyframes rotateTrans {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes opacityTrans {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }

  .flexCenter{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .show {
    width: 100%;
    height: 100%;
    background: #000;

    .loadingPage{
      height: 100%;
      width: 100%;
      background: #000;
      flex-flow: column;
      .loading{
        width: 100px;
        height: 100px;
        animation: rotateTrans 1.5s infinite linear;
      }
      p{
        color: #fff;
        font-size: 12px;
        margin-top: 1rem;
      }
    }
    .choseImg{
      height: 100%;
      width: 100%;
      flex-flow: column;
      p{
        font-size: 32px;
        color: #fff;
        margin-bottom: 30%;
      }
      .make{
        width: 100px;
        height: 32px;
        background: #fff;
        outline: none;
        border: solid 1px #ddd;
        animation: opacityTrans 1.5s infinite linear;
      }
    }
    .editImg{
      height: 100%;
      width: 100%;
      background: #ddd;
      display: flex;
      flex-flow: column;
      padding-top: 70vh;
      .touchBox {
        position: absolute;
        height: 70%;
        width: 100%;
        overflow: hidden;
        top: 0;
        left: 0;
        z-index: 10;
      }
      .imgBox{
        z-index: 1;
        position: absolute;
        height: 70%;
        width: 100%;
        overflow: hidden;
        top: 0;
        left: 0;

        img{
          position: absolute;
        }
        .background{
          width: 100%;
          height: 100%;
          z-index: 10;
        }
      }
      .colorChose{
        padding: 0.5vh 0;
        height: 5vh;
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 14px;
        .colorBlock{
          width: 20%;
          height: 4vh;
        }
      }
      .styleChose{
        width: 100%;
        height: 25vh;
        position: relative;
        .ImgBlock{
          width: 100%;
          height: 100%;
          display: flex;
          img{
            margin: 0 0.5%;
            height: 20vh;
            width: 24%;
          }
        }
      }
      .dotStyle{
        bottom: 5px;
      }
    }
    .resultBlock{

    }
  }
</style>
