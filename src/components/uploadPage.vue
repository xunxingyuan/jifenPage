<template>
  <div class="upload-page">
    <div class="uploadCard" v-for="item in list">
      <div class="top">
        <span class="status" v-if="item.status === 0">审核中</span>
        <span class="status success" v-if="item.status === 1">审核通过</span>
        <span class="status fail" v-if="item.status === 2">审核未通过</span>
        <div>上传图片张数: {{item.imgList.length}}</div>
      </div>
      <div class="mid">
        {{item.feeling}}
      </div>
      <div class="bot">
        <span>上传时间:{{item.uploadTime}}</span>
        <x-button class="btn" :mini="true" type="primary" @click.native="viewImg(item)">查看图片</x-button>
      </div>
    </div>

    <p v-if="list.length === 0" class="tips">暂无上传记录</p>
    <div class="imgBox">
      <img class="previewer-demo-img" v-for="(item, index) in choseList" :src="item.src" width="100" @click="show(index)">
      <div v-transfer-dom>
        <previewer :list="choseList" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
      </div>
    </div>
  </div>
</template>

<script>
  import { dateFormat,XButton,Previewer, TransferDom } from 'vux'

  export default {
    name: "upload-page",
    directives: {
      TransferDom
    },
    data(){
      return {
        list: [],
        nick: '',
        phone: '',
        choseList: [],
        options: {
          getThumbBoundsFn (index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}

          }
        }
      }
    },
    components:{
      XButton,
      Previewer
    },
    methods:{
      _initData: function (id) {
        this.list = []
        this.$api.user.getUserUpload({
          id: id
        }).then((res)=>{

          if(res.data.code === 200){
            res.data.data.list.forEach((e)=>{
              e.uploadTime = dateFormat(e.uploadTime, 'YYYY-MM-DD HH:mm:ss')
              this.list.push(e)
            })
          }
        })
      },
      logIndexChange (arg) {
        console.log(arg)
      },
      show (index) {
        this.$refs.previewer.show(index)
      },
      viewImg(item){
        this.choseList = []
        item.imgList.forEach((e)=>{
          this.choseList.push({
            src: e
          })
        })
        setTimeout(()=>{
          this.show(0)
        },200)
      }
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
  .upload-page{
    background: #f7f7f7;
    padding: 1rem;
    height: 100%;
    width: 100%;
    overflow: auto;
    overflow-x: hidden;
    .tips{
      width: 100%;
      font-size: 14px;
      color: #666;
      margin-top: 3rem;
      text-align: center;
    }
    .uploadCard{
      border: solid 1px #ddd;
      border-radius: 3px;
      box-shadow:  0 0 2px 0 #ccc;
      margin-bottom: 1rem;
      .top{
        border-bottom: solid 1px #ddd;
        width: 100%;
        padding: 8px 1rem;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #333;
        .status{
          color: #10aeff;
        }
        .success{
          color: #0bb20c;
        }
        .fail{
          color: #e64340;
        }
      }
      .mid{
        padding: 8px 1rem;
        border-bottom: solid 1px #ddd;
        min-height: 2rem;
        font-size: 14px;
        color: #333;
      }
      .bot{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #888;
        width: 100%;
        padding: 8px 1rem;
        .btn{
          width: 80px;
          margin: 0;
          padding: 0 10px;
        }
      }
    }
    .imgBox{
      position: absolute;
      /*opacity: 0;*/
      top: 0;
      left: 0;
      display: flex;
      width: 200px;
      height: 100px;
      .previewer-demo-img{
        opacity: 0;
      }
    }
  }
</style>
