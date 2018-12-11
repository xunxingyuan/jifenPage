<template>
  <div class="show">
    <v-touch
      class = "touchBox"
      @panstart="onPanStart"
      :pan-options="{ direction: 'horizontal', threshold: 100 }">
    </v-touch>
    <p>事件</p>
    <p>{{log}}</p>
  </div>
</template>

<script>
  export default {
    name: "show",
    data(){
      return {
        log:''
      }
    },
    methods:{
      onPanStart: function (e) {
        console.log(e)
        this.log = e
      }
    }
  }
</script>

<style lang='less'>
  .show{
    width: 100%;
    height: 100%;
    .touchBox{
      width: 100%;
      height: 50%;
    }
  }
</style>
