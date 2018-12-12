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
        <img src="../../static/img/user.png" :style="{left: imgStyle.left + 'px',top: imgStyle.top + 'px',width: imgStyle.width + 'px',height: imgStyle.height + 'px'}"/>
      </div>
    </section>
    <section class="resultBlock" v-if="part === 4">

    </section>

  </div>
</template>

<script>
  export default {
    name: "show",
    data() {
      return {
        part: 2,
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
        recordStyle:{
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          rotate: 0
        }
      };
    },
    methods: {
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
      }
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
      padding-top: 50%;
      .touchBox {
        position: absolute;
        height: 50%;
        width: 100%;
        overflow: hidden;
        top: 0;
        left: 0;
        z-index: 10;
      }
      .imgBox{
        z-index: 1;
        position: absolute;
        height: 50%;
        width: 100%;
        overflow: hidden;
        top: 0;
        left: 0;
        img{
          position: absolute;
        }
      }

    }
    .resultBlock{

    }
  }
</style>
