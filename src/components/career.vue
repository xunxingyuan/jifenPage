<template>
  <div class="career">
    <div class="coverBox">
      <div class="introduce" v-if="showHome">
        <p>测测你的创业风格是哪种动物？</p>
        <p>不同的性格和偏好伴随着生活经历</p>
        <p>会成就每个人不同的事业结果</p>
        <p>在创业时代，哪种动物能代表你的创业人格？</p>
        <button @click="choseOptionData(1)">开始测试</button>
      </div>
      <div class="optionBox" v-if="showOption">
        <transition name="slide-fade">
          <p>{{selectOption.question}}</p>
        </transition>
        <div v-for="item in selectOption.options" :key="item.id">
            <transition name="slide-fade">
              <p v-if="showOptionData" @click="choseOptionData(item.jump)">{{item.content}}</p>
            </transition>
        </div>
      </div>
    </div>
    <div v-if="captureShow" class="resultBox">
      <img :src="captureData" />
    </div>
    <div class="showBox"></div>
    <!-- <button @click="cutImg">截图</button> -->
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
        questionList: [{
          id: 1,
          question: '难得假期，阳光正好，你会',
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
          question: '在家里睡到自然醒，时间富余，你会',
          options: [{
            content: '找点事情来充实自己，绘画、插花或为自己做个健康早餐',
            jump: 4,
            resultId: ''
          }, {
            content: '点个外卖，躺在床上翻翻微博朋友圈',
            jump: 6,
            resultId: ''
          }]
        }],
        selectOption: {
          id: 1,
          question: '难得假期，阳光正好，你会',
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
        bindCss: ''
      }
    },
    methods: {
      cutImg: function() {
        let _self = this
        let picDom = document.querySelector(".showBox");
        console.log(picDom.offsetWidth)
        console.log(picDom.offsetHeight)
        let width = picDom.offsetWidth;
        let height = picDom.offsetHeight;
        let scaleBy = 3; //缩放比例
        console.log(window.devicePixelRatio)
        let opts = {
          //            canvas:canvas,
          logging: false, //日志开关
          width: width,
          height: height,
          scale: scaleBy
        };
        html2canvas(picDom, opts).then(canvas => {
          console.log(canvas)
          _self.captureData = canvas.toDataURL();
          _self.captureShow = true
        });
      },
      choseOptionData: function(id) {
        if (id === 1) {
          this.showHome = false
        }
        this.showOptionData = false
        this.questionList.forEach(element => {
          if (element.id === id) {
            this.selectOption = element
            this.showOption = true
            setTimeout(()=>{
              this.showOptionData = true
            },500)
          }
        });
      }
    }
  }
</script>

<style lang='less'>
  .career {
    height: 100%;
    width: 100%;
    overflow: auto;
    .showBox {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1
    }
    .resultBox {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
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
