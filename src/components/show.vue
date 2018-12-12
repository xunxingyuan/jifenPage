<template>
  <div class="show">
    <v-touch class="touchBox" @panstart="update" @panend="update"  @panmove="move" @pinchmove="pinch" @pinchstart="update" @pinchend="update" @rotatestart="update" @rotateend="update" @rotatemove="rotate"></v-touch>
    <div class="imgBox">
      <img src="../../static/img/user.png" :style="{left: imgStyle.left + 'px',top: imgStyle.top + 'px',width: imgStyle.width + 'px',height: imgStyle.height + 'px'}"/> 
      <!-- transform: 'rotate('+ imgStyle.rotate + 'deg)' -->
    </div>

    <p>类型：{{type}}</p>
    <p>放大缩小比例：{{scale}}</p>
    <p>角度:{{rotateDeg}}</p>
    <p>移动距离X:{{distanceX}}</p>
    <p>移动距离Y:{{distanceY}}</p>
    <p>{{imgStyle}}</p>
  </div>
</template>

<script>
export default {
  name: "show",
  data() {
    return {
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
.show {
  width: 100%;
  height: 100%;
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
</style>
