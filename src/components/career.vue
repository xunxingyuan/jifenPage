<template>
  <div class="career">
    <div class="back"></div>
    <div v-if="pageShow" class="coverBox">
      <div class="introduce" v-if="showHome">
        <div class="contain">
          <span class="leftTop icon circle"></span>
          <span class="rightTop icon circle"></span>
          <span class="leftBot icon circle"></span>
          <span class="rightBot icon block"></span>
          <div class="introImg"></div>
          <div class="introText">
            <p>不同的性格和偏好伴随着生活经历</p>
            <p>会成就每个人不同的事业结果</p>
            <p>在创业时代，哪种动物昭示着你的创业人格？</p>
          </div>
          <div class="btnBox">
            <button @click="beginTest" class="enter">开始测试</button>
            <div class="enterInner"></div>
          </div>

        </div>
      </div>
      <div class="optionBox" v-if="showOption">
        <div class="optionShow">
          <!--<div class="optionTitle">-->
            <!--<span class="title" v-if="step===1">题目一</span>-->
            <!--<span class="title" v-if="step===2">题目二</span>-->
            <!--<span class="title" v-if="step===3">题目三</span>-->
            <!--<span class="title" v-if="step===4">题目四</span>-->
            <!--<span class="title" v-if="step===5">题目五</span>-->
            <!--<span class="title" v-if="step===6">题目六</span>-->
            <!--<span class="title" v-if="step===7">题目七</span>-->
          <!--</div>-->
          <div class="top">
            <div class="questionBox">
              <!--<div class="lineBox"></div>-->
              <!--<div class="lineBox"></div>-->
              <!--<div class="lineBox"></div>-->
              <p class="outside">{{step}}、{{selectOption.question}}</p>
            </div>

          </div>

          <div class="chose">
            <transition-group name="slide-fade">
              <div v-if="showOptionData" v-for="(item,index) in selectOption.options" v-bind:key="item.content" class="choseItem" @click="choseOptionData(item)">
                <p><span v-if="index===0">A.</span><span v-if="index===1">B.</span><span v-if="index===2">C.</span>  {{item.content}}</p>
              </div>
            </transition-group>

          </div>
        </div>
      </div>
    </div>
    <div v-if="pageShow&&captureShow" class="resultBox">
      <img :src="captureData" />
    </div>
    <div v-if="pageShow" class="showBox">
      <div class="topPart">
        <div class="topLeft">
          <div class="userIcon">
            <img crossorigin="anonymous"  :src="userInfo.img"/>
          </div>
          <p class="name">{{userInfo.name}}</p>
        </div>
        <img class="titleImg" src="http://newmedia.yokelly.com.cn/src/title.png" />
      </div>
      <div class="midPart">
        <div class="topInner">
          <div class="pic">
            <img :src="showResult.img" />
          </div>
          <div class="intro">
            <div class="introTitle">
              <p>{{showResult.name}}</p>
              <span>{{showResult.en}}</span>
            </div>
            <div class="introBot">
              <p class="introDesc">{{showResult.desc}}</p>
              <p>{{showResult.type}}</p>
            </div>
          </div>
        </div>
        <div class="midInner">
          {{showResult.content}}
        </div>
      </div>
      <div class="botPart">
        <img src="http://newmedia.yokelly.com.cn/src/bottom.png" />
      </div>
    </div>
    <div class="musicCtrl" :class="{'trans': musicPlay}" @click="ctrlMusic">
      <img src="http://newmedia.yokelly.com.cn/src/musicIcon.png" />
    </div>
    <audio id="audio2" style="display: none;" src="http://newmedia.yokelly.com.cn/src/music.mp3" preload="auto" loop="loop"></audio>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas'
import { setTimeout } from 'timers';
  export default {
    components: {},
    name: "",
    data() {
      return {
        musicPlay: true,
        step: 1,
        pageShow: false,
        questionList: [{
          id: 1,
          question: '难得假期，阳光正好，你会?',
          options: [{
            content: '待在家里静享时光，好好休息',
            jump: 2,
            resultId: ''
          }, {
            content: '约上好友去酒吧痛痛快快放松一下',
            jump: 3,
            resultId: ''
          }]
        },{
          id: 2,
          question: '在家里睡到自然醒，时间富余，你会?',
          options: [{
            content: '找点事情来充实自己，绘画、插花或为自己做个健康早餐',
            jump: 4,
            resultId: ''
          }, {
            content: '点个外卖，躺在床上翻翻微博朋友圈',
            jump: 6,
            resultId: ''
          }]
        },{
          id: 3,
          question: '你打电话给约最好的朋友一起去玩，但她有点事走不开，你会?',
          options: [{
            content: '约定好在她处理好事情后，陪你去玩',
            jump: 5,
            resultId: ''
          }, {
            content: '十分理解，约其他的朋友，陪你去玩',
            jump: 7,
            resultId: ''
          }]
        },{
          id: 4,
          question: '你在家里做着手头的事情，一个朋友突然发信息约你见面，你会?',
          options: [{
            content: '自己的时间已安排充实，下次再约',
            jump: 8,
            resultId: ''
          }, {
            content: '来者是客，热情招待',
            jump: 10,
            resultId: ''
          }]
        },{
          id: 5,
          question: '终于和朋友一起到了酒吧，服务员向你推荐新品，你会?',
          options: [{
            content: '尝试一下，有何不可',
            jump: 9,
            resultId: ''
          }, {
            content: '忠于自己喜欢的味道',
            jump: 11,
            resultId: ''
          }]
        },{
          id: 6,
          question: '你在家里做着手头的事情，一个朋友突然发信息约你见面，你会?',
          options: [{
            content: '自己的时间已安排充实，下次再约',
            jump: 8,
            resultId: ''
          }, {
            content: '来者是客，热情招待',
            jump: 10,
            resultId: ''
          }]
        },{
          id: 7,
          question: '终于和朋友一起到了酒吧，服务员向你推荐新品，你会?',
          options: [{
            content: '尝试一下，有何不可',
            jump: 9,
            resultId: ''
          }, {
            content: '忠于自己喜欢的味道',
            jump: 11,
            resultId: ''
          }]
        },{
          id: 8,
          question: '对于选择享受独处的私人时光，你的看法是?',
          options: [{
            content: '一个人的状态更自由，无拘无束',
            jump: 12,
            resultId: ''
          }, {
            content: '工作比较忙碌，只是想调整作息',
            jump: 13,
            resultId: ''
          }]
        },{
          id: 9,
          question: '你和你的朋友在酒吧中玩的正嗨，突然有一群异性前来搭讪，你会?',
          options: [{
            content: '仔细观察他们的行为谈吐，判断是否可交',
            jump: 0,
            resultId: 2
          }, {
            content: '客气交谈，但会保持距离',
            jump: 0,
            resultId: 1
          },{
            content: '出来玩，就应该开开心心的交朋友',
            jump: 0,
            resultId: 3
          }]
        },{
          id: 10,
          question: '招待完朋友，天色已晚，你会?',
          options: [{
            content: '天黑之后，就想回家',
            jump: 12,
            resultId: ''
          }, {
            content: '随便逛逛吃吃，买些小东西再回家',
            jump: 13,
            resultId: ''
          }]
        },{
          id: 11,
          question: '你和你的朋友在酒吧中玩的正嗨，突然有一群异性前来搭讪，你会?',
          options: [{
            content: '仔细观察他们的行为谈吐，判断是否可交',
            jump: 0,
            resultId: 2
          }, {
            content: '客气交谈，但会保持距离',
            jump: 0,
            resultId: 1
          },{
            content: '出来玩，就应该开开心心的交朋友',
            jump: 0,
            resultId: 3
          }]
        },{
          id: 12,
          question: '你一个人坐在家里看电视，窗外突然“砰”的发出一声巨响，你会?',
          options: [{
            content: '跑出去看看',
            jump: 0,
            resultId: 4
          }, {
            content: '什么声音你都不感兴趣',
            jump: 0,
            resultId: 6
          }, {
            content: '默默的从声音中了解事态的发展',
            jump: 0,
            resultId: 5
          }]
        },{
          id: 13,
          question: '你一个人坐在家里看电视，窗外突然“砰”的发出一声巨响，你会?',
          options: [{
            content: '跑出去看看',
            jump: 0,
            resultId: 4
          }, {
            content: '什么声音你都不感兴趣',
            jump: 0,
            resultId: 6
          }, {
            content: '默默的从声音中了解事态的发展',
            jump: 0,
            resultId: 5
          }]
        }],
        selectOption: {
          id: 1,
          question: '难得假期，阳光正好，你会?',
          options: [{
            content: '待在家里静享时光，好好休息',
            jump: 2,
            resultId: ''
          }, {
            content: '约上好友去酒吧痛痛快快放松一下',
            jump: 3,
            resultId: ''
          }]
        },
        captureData: '',
        captureShow: false,
        showHome: true,
        showOption: false,
        showOptionData: false,
        showResult:{
          id: 1,
          en: 'FOX',
          name: '狐狸',
          type: 'E-外向 S-感觉 T-思维 P-知觉',
          desc: '让当下的事情有条不紊的进行',
          img: 'http://newmedia.yokelly.com.cn/src/fox.jpg',
          content: '你是一个引人注目、充满魅力和影响力的人，一直在寻找生活中最好的事物，并希望与朋友分享。你活跃、有趣，对生活饱含热情，社交能力极强，知道如何适应环境，从而影响他人，是一个善于调动人力和部署项目的管理型创业人才。'
        },
        bindCss: '',
        resultList:[{
          id: 1,
          en: 'FOX',
          name: '狐狸',
          type: 'E-外向 S-感觉 T-思维 P-知觉',
          desc: '让当下的事情有条不紊的进行',
          img: 'http://newmedia.yokelly.com.cn/src/fox.jpg',
          content: '你是一个引人注目、充满魅力和影响力的人，一直在寻找生活中最好的事物，并希望与朋友分享。你活跃、有趣，对生活饱含热情，社交能力极强，知道如何适应环境，从而影响他人，是一个善于调动人力和部署项目的管理型创业人才。'
        },{
          id: 2,
          en: 'LION',
          name: '狮子',
          desc: '把点子变成众人的愿景',
          img: 'http://newmedia.yokelly.com.cn/src/lion.jpg',
          type: 'E-外向 N-直觉 T-思维 J-判断',
          content: '你的独立性、理性思维主导着你的生活，你做事一丝不苟，对自己的价值观十分忠诚。你很看中自己的事业，对自己未来的发展有着坚定的追求。工作中你拒绝让主观情绪影响自己的决策，可能会让一些人认为是铁石心肠。但在团队中，你是一个能作出普通人无法判断的决定、主持大局的领导型创业人才。'
        },{
          id: 3,
          en: 'DOLPHIN',
          name: '海豚',
          desc: '天下没有不可能做到的事',
          img: 'http://newmedia.yokelly.com.cn/src/dolphin.jpg',
          type: 'E-外向 N-直觉  F-情感  P-知觉',
          content: '你是一个饱含热情、极富想象的人。比常人更具有创造力和感染力，拥有无限的能量，极其渴望学习新事物和结识新朋友。你们常常能给身边的人带来快乐并敏锐的意识到他们的需求，人缘极好，是一个创新能力和变通能力极强的启发型创业人才。'
        },{
          id: 4,
          en: 'CAT',
          name: '猫',
          desc: '冷静观察却迅速行动',
          img: 'http://newmedia.yokelly.com.cn/src/cat.jpg',
          type: 'I-内向 S-感觉 T-思维 P-知觉',
          content: '你天生安静、擅长分析，对设计、开发这样的技术领域富有很高的热情，总喜欢搞清楚事情的来龙去脉。你是个很冷静的观察者，灵活度和反应力极高，对常规和戒律不屑一顾，对不熟的人来说，你高冷有距离感，但对于朋友，你是个有趣、值得深交的人。你是一个逻辑性清晰、重视效率的实干型创业人才。'
        },{
          en: 'DEER',
          id: 5,
          name: '鹿',
          desc: '将每一个人的潜力发挥到极致',
          img: 'http://newmedia.yokelly.com.cn/src/deer.jpg',
          type: 'I-内向 S-感觉 F-情感  J-判断',
          content: '你是一个体贴、安静并值得信任的人。你能在每一个人身上看到潜力，也非常乐于帮助别人把他的能力发挥到极致。你总是在推动个人发展和团队成长。在生活中，你对赞美和批评比较敏感，有些情绪化，但却能让人感觉到亲切，并给予信赖。是一个很有感染力、善于激发别人的赠与型创业人才。'
        },{
          en: 'SLOTH',
          id: 6,
          name: '树懒',
          desc: '将光亮带入他人的黑暗',
          img: 'http://newmedia.yokelly.com.cn/src/sloth.jpg',
          type: 'I-内向 S-感觉 F-情感  P-知觉',
          content: '当他人和你待在一起时，总会感觉放松而静谧。你生活随性、洒脱，喜欢按照自己的节奏生活，随时随地享受生活。你体贴、关心身边的朋友，你们认为价值观对自己很重要，但又不是那种会为了价值观去奋力一拼的人。是一个一丝不苟、有条不紊的思考型创业人才。'
        }],
        userInfo: {
          name: '',
          img: ''
        }
      }
    },
    methods: {
      //头像转base64
      img2base64(url,src) {
        const img = new Image();
        img.crossOrigin = "Anonymous"
        img.src = url
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const cxt = c.getContext('2d');
          cxt.drawImage(img, 0, 0);
          // 得到图片的base64编码数据
          src = c.toDataURL('image/png')
        }
      },
      //音乐播放
      audioAutoPlay(id) {
        let audio = document.getElementById(id);
        if (window.WeixinJSBridge) {
          WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            audio.play();
          }, false);
        } else {
          document.addEventListener("WeixinJSBridgeReady", function () {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
              audio.play();
            });
          }, false);
        }
        audio.play();
        return false;
      },
      ctrlMusic: function () {
        let audio = document.getElementById('audio2');
        if(this.musicPlay){
          audio.pause()
          this.musicPlay = false
        }else{
          audio.play();
          this.musicPlay = true
        }
      },
      cutImg: function() {
        let _self = this
        let picDom = document.querySelector(".showBox");
        let width = picDom.offsetWidth;
        let height = picDom.offsetHeight;
        let scaleBy = 3; //缩放比例
        let opts = {
          //            canvas:canvas,
          logging: false, //日志开关
          width: width,
          height: height,
          scale: scaleBy,
          allowTaint:true
        };
        html2canvas(picDom, opts).then(canvas => {
          _self.captureData = canvas.toDataURL();
          _self.captureShow = true
          this.$vux.loading.hide()
        });
      },
      beginTest: function () {
        this.showHome = false
        this.showOption = true
        this.step = 1
        setTimeout(()=>{
          this.showOptionData = true
        },500)
      },
      choseOptionData: function(item) {
        if(item.jump === 0){
          this.countFinish()
          this.$vux.loading.show({
            text: '生成中'
          })
          let list = [{
            img: 'http://newmedia.yokelly.com.cn/src/title.png'
          },{
            img: 'http://newmedia.yokelly.com.cn/src/bottom.png'
          },{
            img: 'http://newmedia.yokelly.com.cn/src/bg3.jpg'
          },{
            img: 'http://newmedia.yokelly.com.cn/src/box.png'
          }]

          this.showOptionData = true
          this.showOption = true
          this.resultList.forEach((e)=>{
            if(e.id === item.resultId){
              this.showResult =  e
              list.push({
                img: e.img
              })
              this.checkImg(list).then(()=>{
                this.cutImg()
              })
            }
          })
        }else{
          this.step+=1
          this.showOptionData = false
          this.showOption = false
          this.questionList.forEach(element => {
            if (element.id === item.jump) {
              this.selectOption = element
              this.showOption = true
              setTimeout(()=>{
                this.showOptionData = true
              },500)
            }
          });
        }
      },
      //页面进入计数
      countEnter: function (id) {
        this.$api.common.countEnter({
          id: id
        })
      },
      //完成测试计数
      countFinish: function () {
        this.$api.common.countResult()
      },
      //完成分享计数
      countShare: function () {
        this.$api.common.countShare()
      },
      //预加载图片
      checkImg:  function (list) {
        return new Promise((resolve,reject)=>{
          let count = 0
          list.forEach((e)=>{
            this.getImg(e.img).then(()=>{
              count+=1
              if(count === list.length){
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
          newImg.onload = () => {
            resolve()
          }
          newImg.onerror = () =>{
            reject()
          }
        })
      },

      //js分享初始化
      jsShareInit: function () {
        let _self = this
        this.$api.auth.getJsSign({
          url: window.location.href
        }).then((res)=>{
          if(res.data.code === 200){
            _self.$wechat.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.data.sign.appid, // 必填，公众号的唯一标识
              timestamp: res.data.data.sign.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.data.sign.nonceStr, // 必填，生成签名的随机串
              signature: res.data.data.sign.signature,// 必填，签名
              jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
            });
            _self.$wechat.ready(function(){
              _self.$wechat.showOptionMenu()
              _self.$wechat.onMenuShareTimeline({
                title: '创业测试', // 分享标题
                link: 'http://newmedia.yokelly.com.cn/career', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://newmedia.yokelly.com.cn/src/catIcon.jpg', // 分享图标
                success: function () {
                  // 用户点击了分享后执行的回调函数
                  _self.countShare()
                }
              })
              _self.$wechat.onMenuShareAppMessage({
                title: '创业测试', // 分享标题
                desc: '在创业时代，哪种动物昭示着你的创业人格？', // 分享描述
                link: 'http://newmedia.yokelly.com.cn/career', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://newmedia.yokelly.com.cn/src/catIcon.jpg', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  // 用户点击了分享后执行的回调函数
                  _self.countShare()
                }
              });
            });
          }
        })
      },

      checkUser: function () {
        let _self = this
        let id = window.localStorage.getItem('userIdCareer')
        if(id){
          this.$vux.loading.show({
            text: '资源加载中'
          })
          this.$api.user.checkAuthInfo({
            id: id
          }).then((res)=>{
            if(res.data.code === 200){
              this.countEnter(id)
              this.jsShareInit()
              let list = [{
                img: 'http://newmedia.yokelly.com.cn/src/bg1top.jpg'
              },{
                img: 'http://newmedia.yokelly.com.cn/src/page1.png'
              },{
                img: 'http://newmedia.yokelly.com.cn/src/bg2.jpg'
              },{
                img: 'http://newmedia.yokelly.com.cn/src/chose.png'
              },{
                img: 'http://newmedia.yokelly.com.cn/src/option.png'
              }]
              this.checkImg(list).then(()=>{
                this.pageShow = true
                this.$vux.loading.hide()
                this.audioAutoPlay('audio2')
              })
              this.userInfo.name = res.data.data.nickname
              this.userInfo.img = res.data.data.headimgurl.replace('http://thirdwx.qlogo.cn/','/wxSrc/')

            }else{
              window.localStorage.removeItem('userIdCareer')
              this.redirectLocation()
            }
          })
        }else{
          if(!this.$route.query.hasOwnProperty('code')){
            this.redirectLocation()
          }else{
            this.$api.auth.getInfoToken({
              code: this.$route.query.code
            }).then((res)=>{
              if(res.data.code === 200){
                window.localStorage.setItem('userIdCareer',res.data.data.id)
                this.checkUser()
              }
            })
          }
        }
      },
      redirectLocation: function () {
        this.$api.auth.getInfoAuth().then((res)=>{
          if(res.data.code === 200){
            window.location = res.data.data.url
          }
        })
      },
    },
    mounted(){
      this.checkUser()
    }
  }
</script>

<style lang='less'>
  .career {
    height: 100%;
    width: 100%;
    overflow: auto;
    background: #F8C2C2;
    .audio2{
      position: absolute;
      z-index: -2;
      opacity: 0;
    }
    .musicCtrl{
      position: fixed;
      right: 1rem;
      top: 1rem;
      width: 32px;
      height: 32px;
      img{
        width: 32px;
        height: 32px;
      }
    }
    .trans{
      animation: 3s rotate infinite linear; //linear 匀速运动
    }
    @keyframes rotate{
      0%{transform: rotate(0deg);}
      100%{transform: rotate(360deg);}
    }
    .backBox{
      background: #F8C2C2;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .coverBox{
      width: 100%;
      height: 100%;
      background: #fff;
      .introduce{
        width: 100%;
        height: 100%;
        background: url("http://newmedia.yokelly.com.cn/src/bg1top.jpg");
        background-size: 100% 100%;
        display: flex;
        flex-flow: column;
        padding: 10%;
        align-items: center;
        position: relative;
        .contain{
          border: solid 1px #303133;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: space-between;
          position: relative;
          .introImg{
            width: 280px;
            height: 168px;
            background: url("http://newmedia.yokelly.com.cn/src/page1.png");
            background-size: 100% 100%;
            margin-top: 1rem;
          }
          .leftTop{
            left: 0.8rem;
            top:  0.8rem;
          }
          .rightTop{
            right: 0.8rem;
            top:  0.8rem;
          }
          .leftBot{
            left: 0.8rem;
            bottom:  0.8rem;
          }
          .rightBot{
            right: 0;
            bottom: 0;
          }
          .block{
            width: 2rem;
            height: 2rem;
            border-top: solid 1px #303133;
            border-left: solid 1px #303133;
            overflow: hidden;
            position: relative;
          }
          .block::before{
            content: '';
            width: 4rem;
            height: 1px;
            background: #303133;
            position: absolute;
            top: 0.46rem;
            left: -0.6rem;
            transform: rotate(-45deg);
          }
          .icon{
            position: absolute;
          }
          .circle{
            width: 8px;
            height: 8px;
            background: #fff;
            border: solid 1px #303133;
            border-radius: 4px;
          }
          .btnBox{
            position: relative;
            width: 180px;
            height: 36px;
            margin-bottom: 2rem;
            .enter{
              width: 180px;
              border: solid 1px #303133;
              height: 36px;
              background: #fff;
              border-radius: 0.5rem;
              line-height: 36px;
              text-align: center;
              outline: none;
              font-size: 20px;
              position: absolute;
              left: 0;
              top: 0;
              z-index: 2;
            }
            .enterInner{
              width: 180px;
              border: solid 1px #303133;
              height: 36px;
              border-radius: 0.5rem;
              position: absolute;
              left: 5px;
              top: 5px;
              z-index: 1;
              background: #fff;
            }
          }
          .introText{
            position: absolute;
            bottom: 6rem;
            left: 0;
            font-size: 12px;
            color: #fff;
            text-align: center;
            width: 100%;
          }
        }


      }
      .optionBox{
        width: 100%;
        height: 100%;
        background: url("http://newmedia.yokelly.com.cn/src/bg2.jpg");
        background-size: 100% 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: flex-end;
        padding-bottom: 2rem;
        .optionShow{
          width: 90vw;
          height: 132.52vw;
          background: url("http://newmedia.yokelly.com.cn/src/chose.png");
          background-size: 100% 100%;
          position: relative;
          padding: 0 10%;
          .optionTitle{
            position: absolute;
            height: 2.5rem;
            width: 100%;
            left: 0;
            top: -0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            .title{
              width: 6rem;
              height: 2.5rem;
              background: #fff;
              border: solid 1px #303133;
              text-align: center;
              line-height: 2.5rem;
              font-size: 18px;
              color: #000;
            }
          }
          .top{
            height: 50%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 1rem;
            .questionBox{
              /*height: 9rem;*/
              width: 100%;
              position: relative;
              .lineBox{
                border-bottom: solid 1px #999;
                width: 100%;
                height: 3rem;
              }
              .outside{
                width: 100%;
                /*position: absolute;*/
                /*top: 3rem;*/
                /*left: 0;*/
                line-height: 3rem;
                font-size: 20px;
                font-weight: 600;
              }
            }
            .inside{
              font-size: 18px;
              line-height: 2.5;
              color: #fff;
              word-break: break-all;
              text-decoration:underline;
              text-decoration-style: solid;
              text-decoration-color:#303133;
              /*border-bottom: solid 1px #303133;*/
            }

          }
          .chose{
            width: 100%;
            height: 50%;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            position: relative;
            .choseItem{
              margin: -0.5rem 0;
              width: 285px;
              height: 85.5px;
              background: url("http://newmedia.yokelly.com.cn/src/option.png");
              background-size: 100% 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              padding: 0 2rem;
              p{
                text-align: left;
                line-height: 1.2;
                width: 100%;
              }
            }
          }
        }
      }
    }
    .showBox {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      /*padding: 1rem;*/
      background: url("http://newmedia.yokelly.com.cn/src/bg3.jpg");
      background-size: 100% 100%;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      .topPart{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .titleImg{
          width: 220px;
          margin-right: -50px;
        }
        .topLeft{
          text-align: center;
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          .userIcon{
            margin-top: 10px;
            margin-bottom: 10px;
            width: 72px;
            height: 72px;
            border-radius: 36px;
            background: #fff;
            border: solid 1px #303133;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
              width: 60px;
              height: 60px;
              border-radius: 30px;
            }
          }
          .name{
            width: 100px;
            text-align: center;
            line-height: 1.5;
            font-weight: 600;
            color: #231816;
            word-break: break-all;
          }
        }
      }
      .midPart{
        width: 100vw;
        height: 100vw;
        background: url("http://newmedia.yokelly.com.cn/src/box.png");
        background-size: 100% 100%;
        margin-bottom: -1.5rem;
        position: relative;
        margin-top: -1rem;
        padding: 8% 11%;
        .topInner{
          width: 100%;
          height: 53%;
          display: flex;
          .pic{
            width: 38%;
            padding: 10px;
            padding-top: 9%;
            position: relative;
            img{
              width: 100%;
              height: auto;
            }
          }
          .intro{
            width: 62%;
            height: 100%;
            .introTitle{
              height: 68%;
              display: flex;
              flex-flow: column;
              align-items: center;
              justify-content: center;
              padding-top: 10%;
              p{
                font-size: 32px;
                font-weight: 600;
              }
              span{
                font-size: 14px;
                color: #666;
              }
            }
            .introBot{
              height: 32%;
              display: flex;
              align-items: center;
              flex-flow: column;
              justify-content: center;
              font-size: 12px;
              color: #666;
              .introDesc{
                color: #000;
                font-weight: 600;
                font-size: 14px;
              }
            }
          }

        }
        .midInner{
          font-size: 12px;
          padding: 10px;
          line-height: 1.4;
          color: #666;
          height: 47%;
          display: flex;
          align-items: center;
          justify-content: center;
          word-break: break-all;
        }
      }
      .botPart{
        width: 100vw;
        height: 30.13vw;
        img{
          width: 100%;
          height: auto;
        }
      }
    }
    .resultBox {
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 2;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      img {
        width: 100%;
        height: 100%;
      }
    } //过渡效果
    .slide-fade-enter-active {
      transition: all 0.8s ease-in-out;
    }
    .slide-fade-leave-active {
      transition: all .5s ease;
    }
    .slide-fade-enter
    /* .slide-fade-leave-active for below version 2.1.8 */
    {
      transform: translateX(50px);
      opacity: 0;
    }
    .slide-fade-leave-to{
      transform: translateX(-50px);
      opacity: 0;
    }
  }
</style>
