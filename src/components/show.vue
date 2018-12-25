<template>
  <div class="show">
    <section class="loadingPage flexCenter" v-if="part === 1">
      <img class="loading" src="../../static/showSrc/loading.gif"/>
      <!--<p>Loading....</p>-->
    </section>
    <section class="choseImg flexCenter" v-if="part === 2">
      <img src="http://newmedia.yokelly.com.cn/src/show/home.jpg" class="home" />
      <div class="btn">
        <input class="upload" type="file" @change="getUploadImg()" accept="image/*" ref="uploadImgData" />
      </div>
    </section>
    <section class="editImg" v-if="part === 3">
      <v-touch class="touchBox" :style="{height: countHeight + 'px'}" @panstart="update" @panend="update"  @panmove="move" @pinchmove="pinch" @pinchstart="update" @pinchend="update"></v-touch>
      <div class="imgBox" :style="{height: countHeight + 'px',width: countHeight*1563/2122 + 'px',minHeight: countHeight + 'px' }">
        <img :src="styleSrc" class="background" :style="{height: countHeight + 'px',width: countHeight*1563/2122 + 'px'}" />
        <!--transform: 'rotate('+ imgStyle.rotate+'deg)'-->
        <img style="z-index: 5" :src="userUpload" :style="{left: imgStyle.left + 'px',top: imgStyle.top + 'px',width: imgStyle.width + 'px',height: imgStyle.height,transform: 'rotate('+ imgStyle.rotate+'deg)'}"/>
        <p class="userTitle" :style="{left: titleStyle.left + 'px',top: titleStyle.top + 'px',fontSize: titleStyle.fontSize + 'px',color: titleStyle.color}">{{userTitle}}</p>
        <p class="userName" :style="{left: nameStyle.left + 'px',top: nameStyle.top + 'px',fontSize: nameStyle.fontSize + 'px',color: nameStyle.color}">{{userName}}</p>
      </div>
      <div class="transIcon" @click.stop="rotateImg"></div>
      <div class="backIcon" @click.stop="back"></div>
      <div class="forwardIcon" @click.stop="forward"></div>
      <div class="colorChose" v-if="editStep ===2||editStep === 3">
        <div @click="choseTextColor(item)" class="colorBlock" v-for="item in colorList" :style="{backgroundColor: item}" :class="{'active': selectColor === item}"></div>
      </div>
      <div class="styleChose">
        <div class="ImgBlock">
          <img v-for="img in styleListNew" :src="img.src" @click="choseImg(img)" />
        </div>
        <!--<swiper dots-position="center" height="25vh" dots-class="dotStyle">-->
        <!--<swiper-item v-for="(item,index) in styleList" :key="index">-->
        <!--<div class="ImgBlock">-->
        <!--<img v-for="img in item.child" :src="img.src" @click="choseImg(img)" />-->
        <!--</div>-->
        <!--</swiper-item>-->
        <!--</swiper>-->
      </div>

      <div class="inputBox" v-if="showInput">
        <div class="inputItem title" v-if="editStep=== 2">
          <p class="introTitle">请输入你的封面标题</p>
          <input v-model="userTitle" placeholder="输入可以为空" />
          <p class="tips">手指缩放可以调整大小，底部可以替换文本颜色哦</p>
          <button @click="confirmInput">确认</button>
        </div>
        <div class="inputItem name" v-if="editStep===3">
          <p class="introTitle">请输入你的姓名</p>
          <input v-model="userName" placeholder="输入可以为空"  />
          <p class="tips">手指缩放可以调整大小，底部可以替换文本颜色哦</p>
          <button @click="confirmName">确认</button>
        </div>
      </div>
      <div class="tipsBox" v-if="tipShow">
        <div class="tipContain">
          <div class="tip">
            <img src="../../static/showSrc/tip1.png" />
          </div>
        </div>

      </div>
    </section>
    <section class="resultBlock" v-if="part === 4">
      <img :src="captureData" />
      <div class="cover" v-if="shareTip">
        <div class="shareTips">
          <div class="text">
            长按保存图片，可分享给好友。
          </div>
        </div>
      </div>
      <div class="backIcon" @click.stop="backMake"></div>
    </section>
    <div class="musicCtrl" :class="{'trans': musicPlay}" @click="ctrlMusic">
      <div class="music"></div>
      <div class="nomusic"></div>
    </div>
    <audio
      id="audio2"
      style="display: none;"
      src="http://newmedia.yokelly.com.cn/src/music.mp3"
      preload="auto"
      loop="loop"
    ></audio>
  </div>
</template>

<script>
  import html2canvas from "html2canvas";
  import Vue from "vue";
  import EXIF from "exif-js";
  Vue.use(EXIF);    //全局申明

  export default {
    name: "show",
    data() {
      return {
        part: 1,
        type: "",
        scale: "",
        distanceX: "",
        distanceY: "",
        rotateDeg: "",
        imgStyle:{
          left: 0,
          top: 0,
          width: 40,
          height: 'auto',
          rotate: 0
        },
        titleStyle:{
          left:70,
          top: 100,
          width: 40,
          height: 40,
          color: '#000',
          fontSize: 24
        },
        nameStyle:{
          left: 70,
          top: 300,
          width: 40,
          height: 40,
          color: '#000',
          fontSize: 20
        },
        recordStyle:{
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          rotate: 0
        },
        imgList:[{
          img: 'http://newmedia.yokelly.com.cn/src/show/home.jpg'
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page01.jpg',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page01_bg.png',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page02.jpg',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page02_bg.png',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page03.jpg',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page03_bg.png',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page04.jpg',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page04_bg.png',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page05.jpg',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page05_bg.png',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page06.jpg',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page06_bg.png',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page07.jpg',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page07_bg.png',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page08.jpg',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page08_bg.png',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page09.jpg',
        },{
          img: 'http://newmedia.yokelly.com.cn/src/show/page09_bg.png',
        }],
        styleListNew:[{
          src: 'http://newmedia.yokelly.com.cn/src/show/page01.jpg',
          url: 'http://newmedia.yokelly.com.cn/src/show/page01_bg.png'
        },{
          src: 'http://newmedia.yokelly.com.cn/src/show/page02.jpg',
          url: 'http://newmedia.yokelly.com.cn/src/show/page02_bg.png'
        },{
          src: 'http://newmedia.yokelly.com.cn/src/show/page03.jpg',
          url: 'http://newmedia.yokelly.com.cn/src/show/page03_bg.png'
        },{
          src: 'http://newmedia.yokelly.com.cn/src/show/page04.jpg',
          url: 'http://newmedia.yokelly.com.cn/src/show/page04_bg.png'
        },{
          src: 'http://newmedia.yokelly.com.cn/src/show/page05.jpg',
          url: 'http://newmedia.yokelly.com.cn/src/show/page05_bg.png'
        },{
          src: 'http://newmedia.yokelly.com.cn/src/show/page06.jpg',
          url: 'http://newmedia.yokelly.com.cn/src/show/page06_bg.png'
        },{
          src: 'http://newmedia.yokelly.com.cn/src/show/page07.jpg',
          url: 'http://newmedia.yokelly.com.cn/src/show/page07_bg.png'
        },{
          src: 'http://newmedia.yokelly.com.cn/src/show/page08.jpg',
          url: 'http://newmedia.yokelly.com.cn/src/show/page08_bg.png'
        },{
          src: 'http://newmedia.yokelly.com.cn/src/show/page09.jpg',
          url: 'http://newmedia.yokelly.com.cn/src/show/page09_bg.png'
        }],
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
        tipShow: true,
        editStep: 1,
        styleSrc: 'http://newmedia.yokelly.com.cn/src/show/page01_bg.png',
        userUpload: '',
        showInput: false,
        inputType:'title',
        userTitle: '',
        userTitleColor: '#000',
        userName: '',
        userNameSave: '',
        userNameColor: '#000',
        colorList:['#267832','#888','#f9f9f9','#675432','#561232'],
        selectColor:'#000',
        captureData: '',
        countHeight: 0,
        shareTip: true,
        Orientation: '',
        musicPlay: true
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
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage","chooseImage","previewImage"] // 必填,需要使用的JS接口列表
              });
              _self.$wechat.ready(function() {
                _self.$wechat.showOptionMenu();
                _self.$wechat.onMenuShareTimeline({
                  title: "我要上封面", // 分享标题
                  link: "http://newmedia.yokelly.com.cn/show", // 分享链接,该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  // imgUrl: "http://newmedia.yokelly.com.cn/src/catIcon.jpg", // 分享图标
                  success: function() {
                    // 用户点击了分享后执行的回调函数
                    _self.countShare();
                  }
                });
                _self.$wechat.onMenuShareAppMessage({
                  title: "我要上封面", // 分享标题
                  desc: "制作你的专属时尚封面！", // 分享描述
                  link: "http://newmedia.yokelly.com.cn/show", // 分享链接,该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: "", // 分享图标
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
                this.userNameSave = res.data.data.nickname
                this.countEnter(id);
                this.jsShareInit();
                this.audioAutoPlay("audio2");
                this.checkImg(this.imgList).then(() => {
                  this.part = 2
                });
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
        _self.$vux.loading.show({
          text: "生成中"
        });
        let imgWidth = _self.imgStyle.width
        let imgHeight = _self.imgStyle.height

//        if (navigator.userAgent.match(/iphone/i)){
//          if(_self.Orientation != "" && _self.Orientation != 1){
//            switch(_self.Orientation){
//              case 6://需要顺时针（向左）90度旋转
//                _self.imgStyle.rotate += 90
//                break;
//              case 8://需要逆时针（向右）90度旋转
//                _self.imgStyle.rotate -= 90
//                break;
//              case 3://需要180度旋转
//                _self.imgStyle.rotate += 180
//                break;
//              default:
//                break;
//            }
//          }
//        }
        let picDom = document.querySelector(".imgBox");
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
        _self.shareTip = true
        setTimeout(()=>{
          html2canvas(picDom, opts).then((data) => {
            _self.captureData = data.toDataURL();
            _self.part = 4;
            _self.countFinish()
            _self.$vux.loading.hide();
            setTimeout(()=>{
              _self.shareTip = false
            },1500)
          });
        },200)
      },
      //音乐播放
      audioAutoPlay(id) {
        let audio = document.getElementById(id);
        if (window.WeixinJSBridge) {
          WeixinJSBridge.invoke(
            "getNetworkType",
            {},
            function(e) {
              audio.play();
            },
            false
          );
        } else {
          document.addEventListener(
            "WeixinJSBridgeReady",
            function() {
              WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
                audio.play();
              });
            },
            false
          );
        }
        audio.play();
        return false;
      },
      ctrlMusic: function() {
        let audio = document.getElementById("audio2");
        if (this.musicPlay) {
          audio.pause();
          this.musicPlay = false;
        } else {
          audio.play();
          this.musicPlay = true;
        }
      },

      //制作图片
      selectFileImage(file) {
        // 图片方向角
        var Orientation = null;

        if (file) {
          var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式

          if (!rFilter.test(file.type)) {
            alert("请选择jpeg、png格式的图片");
            return;
          }
          //获取照片方向角属性
          EXIF.getData(file, function () {
            EXIF.getAllTags(this);
            Orientation = EXIF.getTag(this, 'Orientation');
          });
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          var image = new Image();
          image.src = e.target.result;
          image.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0, this.naturalWidth, this.naturalHeight);
            var base64 = null;
            if (Orientation != "" && Orientation != 1 && Orientation != undefined) {
              var width = this.naturalWidth;
              var height = this.naturalHeight;
              switch (Orientation) {
                case 6://需要顺时针90度旋转
                  canvas.width = height;
                  canvas.height = width;
                  ctx.rotate(90 * Math.PI / 180);
                  ctx.drawImage(this, 0, -height);
                  break;
                case 8://需要逆时针90度旋转
                  canvas.width = height;
                  canvas.height = width;
                  ctx.rotate(-90 * Math.PI / 180);
                  ctx.drawImage(this, -width, 0);
                  break;
                case 3://需要180度旋转
                  ctx.rotate(180 * Math.PI / 180);
                  ctx.drawImage(this, -width, -height);
                  break;
              }
            }
            base64 = canvas.toDataURL("image/jpeg");
            _self.userUpload =  base64
          };
        };
      },
      uploadImg: function () {
        let _self = this
        _self.$wechat.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            if(window.wxjs_is_wkwebview){
              let id = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              _self.$wechat.getLocalImgData({
                localId: id, // 图片的localID
                success: function (res) {
                  _self.userUpload = res.localData; // localData是图片的base64数据，可以用img标签显示
                  _self.part = 3
                  _self.tipShow = true
                  setTimeout(()=>{
                    _self.tipShow = false
                  },1500)
                }
              });
            }else{
              _self.userUpload = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              _self.part = 3
              _self.tipShow = true
              setTimeout(()=>{
                _self.tipShow = false
              },1500)
            }
          }
        });


      },
      getUploadImg: function () {
        let _self = this
        console.log(this.$refs.uploadImgData.files[0])
        // let img = new Image();

        //去获取拍照时的信息，解决拍出来的照片旋转问题
        EXIF.getData(this.$refs.uploadImgData.files[0], function() {
          EXIF.getAllTags(this);
          _self.Orientation = EXIF.getTag(this, 'Orientation');
          console.log(_self.Orientation)
        });

       // this.selectFileImage(this.$refs.uploadImgData.files[0])
       //  _self.part = 3
       //  _self.tipShow = true
       //  setTimeout(()=>{
       //    _self.tipShow = false
       //  },1500)

        if(window.FileReader) {
          let fr = new FileReader();
          fr.readAsDataURL(_self.$refs.uploadImgData.files[0]);
          fr.onload  = function(e) {
//            _self.userUpload = e.target.result
//            _self.part = 3
//            _self.tipShow = true
//            setTimeout(()=>{
//              _self.tipShow = false
//            },1500)


            let image = new Image();
            image.src = e.target.result;
            image.onload = function () {
              let canvas = document.createElement("canvas");
              canvas.width = this.naturalWidth;
              canvas.height = this.naturalHeight;
              let ctx = canvas.getContext("2d");
              ctx.drawImage(this, 0, 0, this.naturalWidth, this.naturalHeight);
              let base64 = null;
              if (_self.Orientation != "" && _self.Orientation != 1 && _self.Orientation != undefined) {
                let width = this.naturalWidth;
                let height = this.naturalHeight;
                switch (_self.Orientation) {
                  case 6://需要顺时针90度旋转
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(90 * Math.PI / 180);
                    ctx.drawImage(this, 0, -height);
                    break;
                  case 8://需要逆时针90度旋转
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(-90 * Math.PI / 180);
                    ctx.drawImage(this, -width, 0);
                    break;
                  case 3://需要180度旋转
                    ctx.rotate(180 * Math.PI / 180);
                    ctx.drawImage(this, -width, -height);
                    break;
                }
              }
              base64 = canvas.toDataURL("image/jpeg");

              _self.userUpload = base64
              _self.part = 3
              _self.tipShow = true
              setTimeout(() => {
                _self.tipShow = false
              }, 1500)
            }
          }
        }

        // let _self = this
        // _self.userUpload = window.URL.createObjectURL(this.$refs.uploadImgData.files[0]);
        // _self.part = 3
        // _self.tipShow = true
        // setTimeout(()=>{
        //   _self.tipShow = false
        // },1500)
      },
      update: function(){
        if(this.editStep === 1){
          this.recordStyle.left =  this.imgStyle.left
          this.recordStyle.top =  this.imgStyle.top
          this.recordStyle.width =  this.imgStyle.width
          // this.recordStyle.height =  this.imgStyle.height
          // this.recordStyle.rotate =  this.imgStyle.rotate%360
        }else if(this.editStep === 2){
          this.recordStyle.left =  this.titleStyle.left
          this.recordStyle.top =  this.titleStyle.top
          this.recordStyle.width =  this.titleStyle.width
          this.recordStyle.height =  this.titleStyle.height
          this.recordStyle.rotate =  this.titleStyle.rotate
          this.recordStyle.fontSize = this.titleStyle.fontSize
        }else if(this.editStep === 3){
          this.recordStyle.left =  this.nameStyle.left
          this.recordStyle.top =  this.nameStyle.top
          this.recordStyle.width =  this.nameStyle.width
          this.recordStyle.height =  this.nameStyle.height
          this.recordStyle.rotate =  this.nameStyle.rotate
          this.recordStyle.fontSize = this.nameStyle.fontSize

        }

      },
      //旋转
      rotateImg: function () {
        this.imgStyle.rotate += 90
      },
      rotateEnd: function () {
        if(this.editStep === 1){
          this.recordStyle.rotate =  this.imgStyle.rotate%360
        }
      },
      move: function(e) {
        this.distanceX = e.deltaX;
        this.distanceY = e.deltaY;
        if(this.editStep === 1){
          this.imgStyle.left = this.recordStyle.left + e.deltaX
          this.imgStyle.top = this.recordStyle.top + e.deltaY
        }else if(this.editStep === 2){
          this.titleStyle.left = this.recordStyle.left + e.deltaX
          this.titleStyle.top = this.recordStyle.top + e.deltaY
        }else if(this.editStep === 3){
          this.nameStyle.left = this.recordStyle.left + e.deltaX
          this.nameStyle.top = this.recordStyle.top + e.deltaY
        }

      },
      pinch: function(e) {
        this.scale = e.scale;
        if(this.editStep === 1){
          this.imgStyle.width = this.recordStyle.width*e.scale;
          // this.imgStyle.height = this.recordStyle.height*e.scale;
        }else if(this.editStep === 2){
          this.titleStyle.width = this.recordStyle.width*e.scale;
          this.titleStyle.height = this.recordStyle.height*e.scale;
          this.titleStyle.fontSize = this.recordStyle.fontSize*e.scale;
        }else if(this.editStep === 3){
          this.nameStyle.width = this.recordStyle.width*e.scale;
          this.nameStyle.height = this.recordStyle.height*e.scale;
          this.nameStyle.fontSize = this.recordStyle.fontSize*e.scale;

        }

      },
      rotate: function(e) {
        this.type = "rotate";
        this.rotateDeg = e.rotation;
        this.imgStyle.rotate = this.recordStyle.rotate + e.rotation;
      },
      choseImg: function (item) {
        this.styleSrc = item.url
      },
      choseTextColor: function (val) {
        this.selectColor = val
        if(this.editStep === 2){
          this.titleStyle.color = val
        }else if(this.editStep === 3){
          this.nameStyle.color = val
        }
      },
      confirmInput: function () {
        this.editStep = 2
        this.showInput = false
      },
      confirmName: function () {
        this.editStep = 3
        this.showInput = false
      },
      //步骤前进
      forward: function () {
        if(this.editStep === 3){
          this.cutImg()
        }else{
          if(!this.userName&&this.editStep=== 2){
            this.userName = this.userNameSave
          }
          this.showInput = true
          this.editStep += 1
        }
      },
      //步骤后退
      back: function () {
        if(this.editStep === 1){
          this.part = 2
        }else{
          this.editStep -= 1
          if(this.editStep!==1){
            this.showInput = true
          }
        }
      },
      backMake: function () {
        this.part = 3
      }
    },
    mounted() {
      this.checkUser();
      let width = document.body.scrollWidth
      let height = document.body.scrollHeight
      let leftLen = (height-50-100)- (width*2122)/1563
      if(leftLen>0){
        this.imgStyle.width = document.body.scrollWidth
        this.countHeight = (width*2122)/1563
      }else{
        this.imgStyle.width = ((height-50-100)*1563)/2122
        this.countHeight = height-50-100
      }
      // this.imgStyle.width = document.body.scrollWidth
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

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
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
    display: flex;
    align-items: center;
    justify-content: center;
    .loadingPage{
      height: 100%;
      width: 100%;
      background: #fff;
      flex-flow: column;
      /*.loading{*/
      /*width: 100px;*/
      /*height: 100px;*/
      /*animation: rotateTrans 1.5s infinite linear;*/
      /*}*/
      .loading{
        width: 250px;
        height: auto;
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
      align-items: center;
      justify-content: center;
      .home{
        width: 100%;
        height: auto;
      }
      .btn{
        position: absolute;
        right: 0;
        bottom: 5%;
        width: 50%;
        height: 150px;
        .upload{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 5;
        }
      }

    }
    .editImg{
      height: 100vh;
      overflow-y: scroll;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column;
      width: 100%;
      background: #ddd;
      align-self: flex-start;
      .touchBox {
        position: absolute;
        /*height: 135.73vw;*/
        width: 100vw;
        overflow: hidden;
        top: 0;
        left: 0;
        z-index: 10;
      }
      .imgBox{
        z-index: 1;
        /*height: 135.73vw;*/
        /*width: 100vw;*/
        overflow: hidden;
        background: #f3f3f3;
        position: relative;
        img,.userTitle,.userName{
          position: absolute;
        }
        .background{
          width: 100%;
          height: 100%;
          z-index: 10;
          position: absolute;
          left: 0;
          top: 0;
        }
        .userTitle,.userName{
          z-index: 11;
          width: 70vw;
          height: auto;
          text-align: center;
          line-height: 1.1;
        }

      }
      .colorChose{
        height: 50px;
        min-height: 50px;
        width: 100%;
        background: #f5f5f5;
        border-top: solid 1px #ddd;
        border-bottom: solid 1px #ddd;
        padding: 9px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 14px;
        .colorBlock{
          width: 20px;
          height: 20px;
          border-radius: 10px;
          border: solid 3px #fff;
        }
        .active{
          width: 28px;
          height: 28px;
          border-radius: 14px;
        }
      }
      .styleChose{
        width: 100%;
        height: 100px;
        min-height: 100px;
        overflow-x: auto;
        padding-top: 4px;
        position: relative;
        .ImgBlock{
          width: 100%;
          height: 100%;
          display: flex;
          padding-right: 8px;
          img{
            height: 96px;
            width: 72px;
            min-width: 72px;
            margin-left: 8px;
          }
        }
      }
      .backIcon{
        width: 40px;
        height: 40px;
        position: fixed;
        left: 1rem;
        top: 40%;
        z-index: 15;
        background: url("../../static/showSrc/return.png");
        background-size: cover;
      }
      .forwardIcon{
        width: 40px;
        height: 40px;
        position: fixed;
        right: 1rem;
        top: 40%;
        z-index: 15;
        background: url("../../static/showSrc/next.png");
        background-size: cover;
      }
      .transIcon{
        position: absolute;
        width: 30px;
        height: 30px;
        background: url("../../static/showSrc/circle.png");
        background-size: cover;
        top: 10px;
        left: 10px;
        z-index: 15;
      }

      .inputBox{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #000;
        z-index: 16;
        color: #fff;
        padding-top: 100px;
        .inputItem{
          width: 100%;
          display: flex;
          flex-flow: column;
          align-items: center;
          padding: 0 10%;
          p{
            width: 100%;
            margin-bottom: 1rem;
            font-size: 20px;
          }
          .introTitle{
            font-weight: 600;
          }
          input{
            width: 100%;
            height: 32px;
            background: transparent;
            border: none;
            border-bottom: 2px solid #c3ad71;
            outline: none;
            color: #c3ad71;
            padding: 0 10px;
            border-radius: 0;
            font-size: 18px;
          }
          .tips{
            color: #999;
            font-size: 12px;
            margin-bottom: 2rem;
          }
          button{
            width: 100px;
            height: 32px;
            border: 2px solid #c3ad71;
            background: transparent;
            color: #fff;
            border-radius: 3px;
            outline: none;
            font-size: 16px;
          }
        }
      }
      .tipsBox{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 20;
        .tipContain{
          width: 200px;
          height: 172.69px;
          background: #666;
          padding: 1rem;
          border-radius: 3px;
          .tip{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: solid 2px #ddd;
            background: url("../../static/showSrc/tipBg.png");
            background-size: 100% 100%;
            img{
              margin-bottom: 2rem;
              width: 55px;
              height: 64.5px;
            }
          }
        }

      }
      /*.dotStyle{*/
      /*bottom: 5px;*/
      /*}*/
    }
    .resultBlock{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      img{
        width: 100vw;
        height: auto;
      }
      .backIcon{
        width: 40px;
        height: 40px;
        position: fixed;
        left: 1rem;
        top: 40%;
        z-index: 15;
        background: url("../../static/showSrc/return.png");
        background-size: cover;
      }
      .cover{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 16;
        background: rgba(0,0,0,0.4);
        .shareTips{
          width: 200px;
          height: 172.69px;
          border-radius: 3px;
          background: #666;
          color: #fff;
          padding: 1rem;
          .text{
            width: 100%;
            height: 100%;
            border: solid 1px #fff;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            text-align: center;
          }
        }
      }
    }
    .musicCtrl {
      position: fixed;
      z-index: 20;
      right: 10px;
      top: 10px;
      width: 32px;
      height: 32px;
      .music {
        width: 32px;
        height: 32px;
        background: url("http://newmedia.yokelly.com.cn/src/nomusic.png");
        background-size: 100% 100%;
      }
    }
    .trans {
      animation: 3s rotate infinite linear; //linear 匀速运动
      .music {
        width: 32px;
        height: 32px;
        background: url("http://newmedia.yokelly.com.cn/src/music.png");
        background-size: 100% 100%;
      }
    }
  }
</style>
