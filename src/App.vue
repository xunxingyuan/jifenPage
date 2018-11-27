<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import "styles/main";

body {
  background-color: #fbf9fe;
}

  #app{
    height: 100%;
    width: 100%;
  }
</style>
