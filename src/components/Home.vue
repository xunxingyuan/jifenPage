<template>
  <div class="home">
    <div v-if="!show" class="loadingPage">
      <x-img class="logo" src="../../static/img/logo2new.gif"></x-img>
    </div>
    <div v-if="show" class="homePage">
      <swiper v-if="showImg"  class="imgBox" @on-index-change="onSwiperItemIndexChange" :show-desc-mask="false" :list="srcList" :show-dots="false" :interval="1500" :aspect-ratio="1181/2100" :auto="true" height="100vh"></swiper>
      <div class="homeBg" v-else>
        <section class="topPart">
          <x-img class="logo" src="../../static/img/logo.png"></x-img>
          <span class="intro" @click="showRuler = true">活动规则</span>
        </section>
        <section class="part1" v-show="step===1">
          <div class="top">
            <p class="black">[comfort zone]明星单品</p>
            <p class="black">守护你的盛世美颜</p>
            <p class="introBot">明星们都喜欢的护肤品</p>
            <p>你Pick了吗？</p>
          </div>
          <div class="mid">
            <p>快来分享你对[comfort zone]产品的使用感受</p>
            <!--<p>你来晒评价，我来送积分</p>-->
            <p>即有机会获得双11明星素颜套装</p>
            <p class="small">详细规则点击右上角↗</p>
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
          <div class="midContain">
            <div class="leftCorner">
              <img src="../../static/img/corner.png" />
            </div>
            <div class="rightCorner">
              <img src="../../static/img/corner.png" />
            </div>
            <swiper class="midBox" :show-dots="false" :interval="1500" :aspect-ratio="300/800" :list="showList1" :auto="true" height="220px"></swiper>

          </div>
          <div class="bot">
            <p>双十一素颜套即将到手</p>
            <p>你还在犹豫什么?</p>
            <button class="btn btn_tran" @click="step=3">马上参与</button>
          </div>
        </section>
        <section class="part3" v-show="step===3">
          <div class="top">
            <div>
              <p class="topTitle">快来完成你的晒图任务吧！</p>
              <p>把你的使用心得分享出来，</p>
              <p>角逐前十，带走素颜套装。</p>
            </div>
            <div class="uploadOuter" @click="toUpload">
              <img class="upload" src="../../static/img/upload.png"   />
            </div>
            <div class="topBot">
              <p>*记得上传清晰图片和文字</p>
              <p>优质分享还会在首页展示哦！</p>
            </div>
          </div>
          <div class="bot">
            <button class="btn btn_tran" @click="toUpload">我要晒图</button>
            <button class="btn btn_tran" @click="step = 4">看大家晒图</button>
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
        <section class="activeIntro" v-if="showRuler">
          <div class="introBox">
            <x-img class="logo" src="../../static/img/logo.png"></x-img>
            <p class="title">规则说明：</p>
            <p class="ruler">1、参与方式：在各大分享平台（如微博、微信朋友圈、小红书等）晒出您对悦嘉丽[comfort zone]舒适地带产品的评价，并截图上传至“素人种草”活动；</p>
            <p class="ruler">2、活动时间：11月01日-11月7日</p>
            <p class="ruler">   评选时间：11月08日-11月11日</p>
            <p class="ruler">   获奖公布时间：11月12日</p>
            <p class="ruler">3、活动奖品：票数最高的前10名，将获得价值1290元的双11明星素颜套装（套装含：3支每日晶采爽肤水）；</p>
            <p class="ruler">4、晒图规则：不可重复上传相同内容，不可上传他人的晒图，否则会被判定审核不通过；工作人员将在5个工作日内完成图片审核，请您耐心等待；</p>
            <p class="ruler">*凡用户参与晒图活动并上传图片，即视图片版权为用户本人所有并授权悦嘉丽官方使用。</p>
            <div class="btnBox"><button class="btn" @click="start">马上参与</button></div>
            <span class="close" @click="showRuler = false">
           <x-img src="../../static/img/Close.png"></x-img>
         </span>
          </div>
        </section>
        <div class="user" v-show="step!==4">
          <img @click.stop="viewInfo('user')" src="../../static/img/user.png"/>
          <img @click.stop="viewInfo('upload')" src="../../static/img/order.png"/>
        </div>
        <div class="bottom" v-show="step!==4">
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
          img: 'http://phgjhxlc8.bkt.clouddn.com/1.jpg'
        },{
          img: 'http://phgjhxlc8.bkt.clouddn.com/2.jpg'
        }],
        showList1:[{
          img: 'http://phgjhxlc8.bkt.clouddn.com/01.jpg'
        },{
          img: 'http://phgjhxlc8.bkt.clouddn.com/02.jpg'
        },{
          img: 'http://phgjhxlc8.bkt.clouddn.com/03.jpg'
        }],
        showAll:[{
          img: 'http://phgjhxlc8.bkt.clouddn.com/01.jpg'
        },{
          img: 'http://phgjhxlc8.bkt.clouddn.com/02.jpg'
        },{
          img: 'http://phgjhxlc8.bkt.clouddn.com/03.jpg'
        },{
          img: 'http://phgjhxlc8.bkt.clouddn.com/04.jpg'
        },{
          img: 'http://phgjhxlc8.bkt.clouddn.com/06.jpg'
        },{
          img: 'http://phgjhxlc8.bkt.clouddn.com/07.jpg'
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
      toUpload: function () {
        this.$router.push({
          name: 'upload'
        })
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
        if(val=== 1){
          setTimeout(()=>{
            this.showImg = false
          },1500)
        }
      },
      start: function () {
        this.showRuler = false
        this.step = 2

      },
      checkImg:  function () {
        let list1 = [{
          img: '../../static/img/logo2new.gif'
        },{
          img: '../../static/img/logo.png'
        },{
          img: 'http://phgjhxlc8.bkt.clouddn.com/1.jpg'
        },{
          img: 'http://phgjhxlc8.bkt.clouddn.com/2.jpg'
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
          },3500)
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
     background: url("http://phgjhxlc8.bkt.clouddn.com/bg1.jpg");
     background-size: cover;
     height: 100%;
     width: 100%;
     display: flex;
     flex-flow: column;
     align-items: center;
     justify-content: center;
     img{
       width: 200px;
     }
   }
   .homePage{
     height: 100%;
     width: 100%;
   }
   .homeBg{
     background: url("http://phgjhxlc8.bkt.clouddn.com/bg2.jpg");
     background-size: cover;
     height: 100%;
     width: 100%;
   }

   .user{
     position: absolute;
     right: 1rem;
     bottom: 8px;
     z-index: 5;
     img{
       width: 24px;
       height: 24px;
     }
   }
   .bottom{
     position: absolute;
     bottom: 10px;
     left: 0;
     text-align: center;
     font-size: 14px;
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
   .part1,.part2,.part3,.part4{
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
   .part4{
     box-sizing: border-box;
     padding: 0 10px;
     z-index: 6;
     align-items: center;
     justify-content: flex-start;
     .back{
       margin-top: 1.4rem;
       font-size: 16px;
       margin-bottom: 1.5rem;
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
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-around;
        .topTitle{
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        .uploadOuter{
          width: 120px;
          height: 120px;
          border-radius: 60px;
          border: solid 1px #333;
          display: flex;
          align-items: center;
          justify-content: center;
          .upload{
            width: 32px;
            height: 32px;
            background: #fff;
          }
        }

        .topBot{
          font-size: 14px;
          color: #999;
        }
      }
     .bot{
       width: 100%;
       margin-top: 2rem;
       display: flex;
       justify-content: space-around;
       align-items: center;
       .btn{
         border:solid 1px #fff;
         height: 32px;
         width: 120px;
         font-size: 14px;
       }
     }
   }
   .part2{
      .top{
        font-size: 18px;
        span{
          color: #e64340;
          font-weight: 700;
        }
        .botOne{
          margin-bottom: 1rem;
          font-size: 16px;
        }
      }
      .midContain{
        position: relative;
        .midBox{
           width: 123.75px;
           z-index: 5
        }
        .leftCorner{
          z-index: 4;
          position: absolute;
          width: 30px;
          height: 40px;
          left: -20px;
          top: -12px;
          overflow: hidden;
          img{
            width: 15px;
            height: 24px;
          }
        }
        .rightCorner{
          position: absolute;
          width: 30px;
          height: 40px;
          right: -20px;
          bottom: -27px;
          z-index: 4;
          img{
            width: 15px;
            height: 24px;
            transform: rotate(180deg);
          }
        }
      }

     .bot{
       margin-top: 10px;
       color: #fff;
       .btn{
         margin-top: 10px;
         border:solid 1px #fff;
         height: 32px;
         width: 120px;
         font-size: 14px;
       }
     }
   }
   .part1{
     .top{
       font-size: 16px;
       color: #333;
       text-align: center;
       margin-bottom: 3rem;
       .black{
         /*font-weight: 700;*/
         font-size: 24px;
         color: #000;
       }
       .introBot{
         margin-top: 10px;
       }
     }
     .mid{
       text-align: center;
       font-size: 14px;
       color: #333;
       .small{
         font-size: 12px;
         margin-top: 10px;
       }
     }
     .btn{
       margin-top: 5rem;
       border:solid 1px #fff;
       height: 36px;
       width: 140px;
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
       right: 1rem;
       top: 1.4rem;
       font-size: 12px;
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
       overflow: auto;
       .logo{
         width: 140px;
         height: 140px;
         margin-top: -30px;
         position: absolute;
         left: 50%;
         margin-left: -70px;
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
       .btnBox{
         width: 100%;
         display: flex;
         align-items: center;
         justify-content: center;
         .btn{
           margin-top: 4rem;
           width: 135.5px;
           height: 31px;
           min-height: 31px;
           font-size: 18px;
           border-radius: 3px;
           outline: none;
           border: none;
           color: #fff;
           background: #333;
         }
       }

       .close{
         position: fixed;
         display: block;
         right: 2rem;
         top: 2rem;
         width: 24px;
         height: 24px;
       }
     }
   }
 }
</style>
