<template>
  <div class="career">
    <div class="coverBox">
      <div class="introduce" v-if="showHome">
        <p>测测你的创业风格是哪种动物？</p>
        <p>不同的性格和偏好伴随着生活经历</p>
        <p>会成就每个人不同的事业结果</p>
        <p>在创业时代，哪种动物能代表你的创业人格？</p>
        <button @click="beginTest">开始测试</button>
      </div>
      <div class="optionBox" v-if="showOption">
        <transition name="slide-fade">
          <p>{{selectOption.question}}</p>
        </transition>
        <div v-for="item in selectOption.options" :key="item.id">
          <transition name="slide-fade">
            <p v-if="showOptionData" @click="choseOptionData(item)">{{item.content}}</p>
          </transition>
        </div>
      </div>
    </div>
    <div v-if="captureShow" class="resultBox">
      <img :src="captureData" />
    </div>
    <div class="showBox">
      <p>{{showResult.name}}</p>
      <p>{{showResult.type}}</p>
      <p>{{showResult.content}}</p>
    </div>
    <!-- <button @click="cutImg">截图</button> -->
  </div>
</template>

<script>
  import html2canvas from 'html2canvas'
  import {
    setTimeout
  } from 'timers';
  export default {
    components: {},
    name: "",
    data() {
      return {
        questionList: [{
          id: 1,
          question: '难得假期，阳光正好，你会:',
          options: [{
            content: '待在家里静享时光，好好休息',
            jump: 2,
            resultId: ''
          }, {
            content: '约上好友去酒吧痛痛快快放松一下',
            jump: 3,
            resultId: ''
          }]
        }, {
          id: 2,
          question: '在家里睡到自然醒，时间富余，你会:',
          options: [{
            content: '找点事情来充实自己，绘画、插花或为自己做个健康早餐',
            jump: 4,
            resultId: ''
          }, {
            content: '点个外卖，躺在床上翻翻微博朋友圈',
            jump: 6,
            resultId: ''
          }]
        }, {
          id: 3,
          question: '你打电话给约最好的朋友一起去玩，但她有点事走不开，你会：',
          options: [{
            content: '约定好在她处理好事情后，陪你去玩',
            jump: 5,
            resultId: ''
          }, {
            content: '十分理解，约其他的朋友，陪你去玩',
            jump: 7,
            resultId: ''
          }]
        }, {
          id: 4,
          question: '你在家里做着手头的事情，一个朋友突然发信息约你见面，你会：',
          options: [{
            content: '自己的时间已安排充实，下次再约',
            jump: 8,
            resultId: ''
          }, {
            content: '来者是客，热情招待',
            jump: 10,
            resultId: ''
          }]
        }, {
          id: 5,
          question: '终于和朋友一起到了酒吧，服务员向你推荐新品，你会：',
          options: [{
            content: '尝试一下，有何不可',
            jump: 9,
            resultId: ''
          }, {
            content: '忠于自己喜欢的味道',
            jump: 11,
            resultId: ''
          }]
        }, {
          id: 6,
          question: '你在家里做着手头的事情，一个朋友突然发信息约你见面，你会：',
          options: [{
            content: '自己的时间已安排充实，下次再约',
            jump: 8,
            resultId: ''
          }, {
            content: '来者是客，热情招待',
            jump: 10,
            resultId: ''
          }]
        }, {
          id: 7,
          question: '终于和朋友一起到了酒吧，服务员向你推荐新品，你会：',
          options: [{
            content: '尝试一下，有何不可',
            jump: 9,
            resultId: ''
          }, {
            content: '忠于自己喜欢的味道',
            jump: 11,
            resultId: ''
          }]
        }, {
          id: 8,
          question: '对于选择享受独处的私人时光，你的看法是：',
          options: [{
            content: '一个人的状态更自由，无拘无束',
            jump: 12,
            resultId: ''
          }, {
            content: '工作比较忙碌，只是想调整作息',
            jump: 13,
            resultId: ''
          }]
        }, {
          id: 9,
          question: '你和你的朋友在酒吧中玩的正嗨，突然有一群男子前来搭讪，你会：',
          options: [{
            content: '仔细观察他们的行为谈吐，判断是否可交',
            jump: 0,
            resultId: 2
          }, {
            content: '客气交谈，但会保持距离',
            jump: 0,
            resultId: 1
          }, {
            content: '出来玩，就应该开开心心的交朋友',
            jump: 0,
            resultId: 3
          }]
        }, {
          id: 10,
          question: '招待完朋友，天色已晚，你会：',
          options: [{
            content: '天黑之后，就想回家',
            jump: 12,
            resultId: ''
          }, {
            content: '随便逛逛吃吃，买些小东西再回家',
            jump: 13,
            resultId: ''
          }]
        }, {
          id: 11,
          question: '你和你的朋友在酒吧中玩的正嗨，突然有一群男子前来搭讪，你会：',
          options: [{
            content: '仔细观察他们的行为谈吐，判断是否可交',
            jump: 0,
            resultId: 2
          }, {
            content: '客气交谈，但会保持距离',
            jump: 0,
            resultId: 1
          }, {
            content: '出来玩，就应该开开心心的交朋友',
            jump: 0,
            resultId: 3
          }]
        }, {
          id: 12,
          question: '你一个人坐在家里看电视，窗外突然“砰”的发出一声巨响，你会：',
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
        }, {
          id: 13,
          question: '你一个人坐在家里看电视，窗外突然“砰”的发出一声巨响，你会：',
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
        showResult: {
          id: 1,
          name: '狐狸',
          type: 'E-外向 S-感觉 T-思维 P-知觉',
          content: '你是一个引人注目、充满魅力和影响力的人，一直在寻找生活中最好的事物，并希望与朋友分享。你活跃、有趣，对生活饱含热情，你们知道如何适应环境，从而影响他人，社交能力极强，是一个很有感染力、善于调动人力和部署项目的实干者。'
        },
        bindCss: '',
        resultList: [{
          id: 1,
          name: '狐狸',
          type: 'E-外向 S-感觉 T-思维 P-知觉',
          content: '你是一个引人注目、充满魅力和影响力的人，一直在寻找生活中最好的事物，并希望与朋友分享。你活跃、有趣，对生活饱含热情，你们知道如何适应环境，从而影响他人，社交能力极强，是一个很有感染力、善于调动人力和部署项目的实干者。'
        }, {
          id: 2,
          name: '狮子',
          type: 'E-外向 N-直觉 T-思维 J-判断',
          content: '你的独立性、理性思维主导着你的生活，你做事一丝不苟，对自己的价值观十分忠诚。你很看中自己的事业，对自己未来的发展有着坚定的追求。工作中你们拒绝让主观情绪影响自己的决策，可能会让一些人认为是铁石心肠，但作为领导者，总要为团队作出普通人无法判断的决定。'
        }, {
          id: 3,
          name: '海豚',
          type: 'E-外向 N-直觉  F-情感  P-知觉',
          content: '你是一个饱含热情、极富想象的人。比常人更具有创造力和感染力，有无限的能量，极其渴望学习新事物和结识新朋友。你们常常能给身边的人带来快乐并敏锐的意识到他们的需求，人缘很好。'
        }, {
          id: 4,
          name: '猫',
          type: 'I-内向 S-感觉 T-思维 P-知觉',
          content: '你天生安静、擅长分析，对设计、开发这样的技术领域富有很高的热情，总喜欢搞清楚事情的来龙去脉。你是个很冷静的观察者，灵活度和反应力极高，对常规和戒律不屑一顾，对不熟的人来说，你高冷有距离感，但对于朋友，你是个有趣、值得深交的人才。'
        }, {
          id: 5,
          name: '鹿',
          type: 'I-内向 S-感觉 F-情感  J-判断',
          content: '你是一个体贴、安静并值得信任的人。你能在每一个人身上看到潜力，你也非常乐于帮助别人把他的能力发挥到极致。你总是在推动个人发展和团队成长。在生活中，你对赞美和批评比较敏感，有些情绪化，但却能让人感觉到亲切，并给予信赖。'
        }, {
          id: 6,
          name: '树懒',
          type: 'I-内向 S-感觉 F-情感  P-知觉',
          content: '和你这类人待在一起时，总会让人感觉放松而静谧。你生活随性、洒脱，喜欢按照自己的节奏生活，随时随地享受生活。你体贴、关心身边的朋友，你们认为价值观对自己很重要，但又不是那种会为了价值观去奋力一拼的人。'
        }]
      }
    },
    methods: {
      cutImg: function() {
        let _self = this
        let picDom = document.querySelector(".showBox");
        let width = picDom.offsetWidth;
        let height = picDom.offsetHeight;
        let scaleBy = 3; //缩放比例
        let opts = {
          logging: false, //日志开关
          width: width,
          height: height,
          scale: scaleBy
        };
        html2canvas(picDom, opts).then(canvas => {
          _self.captureData = canvas.toDataURL();
          _self.captureShow = true
        });
      },
      beginTest: function() {
        this.showHome = false
        this.showOption = true
        setTimeout(() => {
          this.showOptionData = true
        }, 500)
      },
      choseOptionData: function(item) {
        if (item.jump === 0) {
          this.showOptionData = false
          this.showOption = false
          this.resultList.forEach((e) => {
            if (e.id === item.resultId) {
              this.showResult = e
              setTimeout(() => {
                this.cutImg()
              }, 1000)
            }
          })
        } else {
          this.showOptionData = false
          this.showOption = false
          this.questionList.forEach(element => {
            if (element.id === item.jump) {
              this.selectOption = element
              this.showOption = true
              setTimeout(() => {
                this.showOptionData = true
              }, 500)
            }
          });
        }
      },
      checkUser: function() {
        let _self = this
        let id = window.localStorage.getItem('userIdCareer')
        if (id) {
          this.$api.user.checkAuthInfo({
            id: id
          }).then((res) => {
            if (res.data.code === 200) {
              console.log('user comfirm')
            } else {
              window.localStorage.removeItem('userIdCareer')
              this.redirectLocation()
            }
          })
        } else {
          if (!this.$route.query.hasOwnProperty('code')) {
            this.redirectLocation()
          } else {
            this.$api.auth.getInfoToken({
              code: this.$route.query.code
            }).then((res) => {
              if (res.data.code === 200) {
                window.localStorage.setItem('userIdCareer', res.data.data.id)
              }
            })
          }
        }
      },
      redirectLocation: function() {
        this.$api.auth.getInfoAuth().then((res) => {
          if (res.data.code === 200) {
            window.location = res.data.data.url
          }
        })
      },
    },
    mounted() {
      this.checkUser()
    }
  }
</script>

<style lang='less'>
  .career {
    height: 100%;
    width: 100%;
    overflow: auto;
    .coverBox {
      width: 100%;
      height: 100%;
      background: #fff;
      padding: 1rem;
    }
    .showBox {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      padding: 1rem;
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
    .slide-fade-leave-to {
      transform: translateX(-50px);
      opacity: 0;
    }
  }
</style>
