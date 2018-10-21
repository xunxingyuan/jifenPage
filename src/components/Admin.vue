<template>
  <div class="admin">
    <div class="loginBox">
      <span class="title">悦嘉丽活动管理平台</span>
      <div class="item">
        <p>用户名：</p> <input type="text" v-model="username"/>
      </div>
      <div class="item">
        <p>密码：</p> <input type="password"  v-model="password"/>
      </div>
      <button class="btn" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "admin",
    data(){
      return {
        username: '',
        password: ''
      }
    },
    methods:{
      login: function () {
        if(this.username&&this.password){
          this.$api.admin.login({
            user: this.username,
            password: this.password
          }).then((res)=>{
            if(res.data.code === 200){
              this.$vux.toast.show({
                type: 'text',
                text: '登录成功'
              })
              window.sessionStorage.setItem('loginState','1')
              this.$router.push({
                name: 'manage'
              })
            }else{
              this.$vux.toast.show({
                type: 'text',
                text: '用户名密码错误'
              })
            }
          })
        }
      }
    }
  }
</script>

<style lang='less'>
  .admin{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: #2d3a4b;
    .loginBox{
      width: 22rem;
      height: 25rem;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      .title{
        font-size: 32px;
        color: #fff;
        margin-bottom: 4rem;
      }
      .item{
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        p{
          width: 7rem;
          font-size: 18px;
          color: #fff;
        }
        input{
          flex: 1;
          height: 3rem;
          padding: 0 1rem;
          background: #fff;
          border: none;
          outline: none;
          color: #333;
          font-size: 18px;
        }
      }
      .btn{
        width: 100%;
        height: 3rem;
        background-color: #409eff;
        color: #fff;
        border: solid 1px #409eff;
        outline: none;
        margin-top: 1rem;
      }
    }
  }
</style>
