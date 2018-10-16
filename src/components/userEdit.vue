<template>
  <div class="user-edit">
    <group title="个人信息" >
      <x-input title="手机号码" type="tel" is-type="china-mobile" v-model="phonenumber"></x-input>
      <x-input title="昵称" type="text" :min="2" :max="10" v-model="nickname"></x-input>
    </group>
    <group title="收货人信息（选填）" class="group">
      <x-input title="姓名" type="text" :min="2" :max="10" v-model="name"></x-input>
      <x-address :raw-value="true"  title="地区" v-model="address" :list="addressData" @on-hide="showAddress"  placeholder="请选择地址"></x-address>
      <x-input title="详细地址" type="text" :max="40" v-model="addressDetail"></x-input>
    </group>
    <div class="btnBox">
      <x-button type="primary" @click.native="submit">提交</x-button>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, XButton, XAddress, ChinaAddressV4Data, Value2nameFilter as value2name } from 'vux'
  export default {
    components: {
      XAddress,
      XButton,
      Group,
      XInput,
    },
    name: "user-edit",
    data(){
      return {
        phonenumber: '',
        nickname: '',
        name: '',
        inputAddress: '',
        addressDetail: '',
        address: [],
        addressData: ChinaAddressV4Data,
        status: 'add'
      }
    },
    methods:{
      showAddress (e) {
        console.log(this.address)
        console.log(this.getName(this.address))
        this.inputAddress = this.getName(this.address)
      },
      getName (value) {
        return value2name(value, ChinaAddressV4Data)
      },
      _initData(id){
        this.$api.user.checkInfo({
          id: id
        }).then((res)=>{
          if(res.data.code === 200){
            this.status = 'update'
            this.phonenumber = res.data.data.phone
            this.nickname = res.data.data.nick
            this.name = res.data.data.name
            this.inputAddress = res.data.data.areaName
            this.addressDetail = res.data.data.address
            this.address= res.data.data.areaCode
          }else{
            this.status = 'add'
          }
        })
      },
      submit(){
        let id = window.localStorage.getItem('userIdJF')
        if(this.phonenumber&&this.nickname){

          if(this.status === 'add'){
            this.$api.user.addUser({
              id: id,
              phone: this.phonenumber,
              nick: this.nickname,
              name: this.name,
              areaCode: JSON.stringify(this.address),
              areaName: this.inputAddress,
              address: this.addressDetail
            }).then((res)=>{
              if(res.data.code === 200){
                this.$vux.toast.show({
                  type: 'success',
                  text: '保存成功'
                })
                this.$router.back()
              }else{
                this.$vux.toast.show({
                  type: 'warn',
                  text: '系统故障，请稍后重试'
                })
              }
            })
          }else {
            this.$api.user.updateUser({
              id: id,
              phone: this.phonenumber,
              nick: this.nickname,
              name: this.name,
              areaCode: JSON.stringify(this.address),
              areaName: this.inputAddress,
              address: this.addressDetail
            }).then((res)=>{
              if(res.data.code === 200){
                this.$vux.toast.show({
                  type: 'success',
                  text: '保存成功'
                })
                this._initData(id)
              }else{
                this.$vux.toast.show({
                  type: 'warn',
                  text: '系统故障，请稍后重试'
                })
              }
            })
          }
        }else{
          this.$vux.toast.show({
            type: 'warn',
            text: '手机号和昵称不能为空'
          })
        }
      }
    },
    mounted(){
      let id = window.localStorage.getItem('userIdJF')
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
  .user-edit{
    .group{
      margin-bottom: 1rem;
    }
    .btnBox{
      padding: 0 1rem;
    }
  }
</style>
