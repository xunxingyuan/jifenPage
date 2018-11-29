<template>
  <div class="manage">
    <div class="left">
      <p class="title">悦嘉丽</p>
      <div class="nav" @click="chose(1)" :class="{'active': choseData===1 }">种草用户管理</div>
      <div class="nav" @click="chose(2)" :class="{'active': choseData===2 }">种草审批管理</div>
      <div class="nav" @click="chose(3)" :class="{'active': choseData===3 }">种草通用设置</div>
      <div class="nav" @click="chose(4)" :class="{'active': choseData===4 }">创业测试数据</div>
    </div>
    <div class="right">
      <div v-if="choseData === 1">
        <div class="header">
          <span class="topNav">用户管理</span>
        </div>
        <div class="header">
          <el-select v-model="selectUserType" placeholder="请选择">
            <el-option
              v-for="item in useroptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input class="input" v-model="userInput" v-if="selectUserType!=='0'"></el-input>
          <el-button @click="searchUser(1)" type="primary">搜索</el-button>
        </div>
        <div>
          <div>
            <el-table :data="userList" border style="width: 100%">
              <el-table-column fixed prop="id" label="ID"></el-table-column>
              <el-table-column prop="nick" label="昵称"></el-table-column>
              <el-table-column prop="phone" label="电话"></el-table-column>
              <el-table-column prop="areaName" label="地区"></el-table-column>
              <el-table-column prop="address" label="详细地址"></el-table-column>
              <!--<el-table-column-->
              <!--prop="zip"-->
              <!--label="积分"-->
              <!--&gt;-->
              <!--<template slot-scope="scope">-->
              <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
              <!--fixed="right"-->
              <!--label="操作"-->
              <!--width="100">-->
              <!--<template slot-scope="scope">-->
              <!--<el-button type="text" size="small">编辑</el-button>-->
              <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
          </div>
          <el-pagination
            @current-change="handleCurrentChangeUser"
            class="pageChose"
            background
            layout="total,prev, pager, next"
            :total="userCtrl.total"
          ></el-pagination>
        </div>
      </div>
      <div v-if="choseData === 2">
        <div class="header">
          <span class="topNav">审核管理</span>
        </div>
        <div class="header">
          <el-select v-model="uploadType" placeholder="请选择">
            <el-option
              v-for="item in uploadoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input class="input" v-model="uploadInput" placeholder="支持用户名、手机号、用户心得"></el-input>
          <el-button @click.native="searchUpload(1)" type="primary">搜索</el-button>
        </div>
        <div>
          <div>
            <el-table :data="uploadList" border key="aTable" style="width: 100%">
              <el-table-column fixed prop="uploadTime" label="日期"></el-table-column>

              <el-table-column prop="nick" label="昵称"></el-table-column>

              <el-table-column prop="phone" width="120" label="手机号"></el-table-column>

              <el-table-column prop="feeling" label="感受" width="300"></el-table-column>

              <el-table-column prop="imgList.length" label="图片数量" width="80"></el-table-column>

              <el-table-column label="查看图片" width="80">
                <template slot-scope="scope">
                  <el-button @click="viewImg(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="审核状态">
                <template slot-scope="scope">
                  <span v-show="scope.row.status === 0">审核中</span>
                  <span v-show="scope.row.status === 1">审核通过</span>
                  <span v-show="scope.row.status === 2">审核不通过</span>
                </template>
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                    v-show="scope.row.status === 0"
                    @click="pass(scope.row)"
                    type="text"
                    size="small"
                  >审核通过</el-button>
                  <el-button
                    v-show="scope.row.status === 0"
                    @click="unpass(scope.row)"
                    type="text"
                    size="small"
                  >审核不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination
            @current-change="handleCurrentChangeUpload"
            class="pageChose"
            background
            layout="total,prev, pager, next"
            :total="this.uploadCtrl.total"
          ></el-pagination>
        </div>
      </div>
      <div v-if="choseData === 3">
        <div class="header">
          <span class="topNav">通用设置</span>
        </div>
        <div class="limit">
          <p>用户每月上传次数限制:</p>
          <el-input class="input" v-model="uploadLimt"></el-input>
          <el-button @click.native="setLimit" type="primary">保存</el-button>
        </div>
        <div class="header">
          <span class="topNav">活动通知设置</span>
        </div>
        <div class="limit">
          <p>活动名称:</p>
          <el-input v-model="activeName"></el-input>
        </div>
        <div class="limit">
          <p>上传成功提示:</p>
          <el-input v-model="uploadSuccess"></el-input>
        </div>
        <div class="limit">
          <p>上传成功底部文字:</p>
          <el-input v-model="uploadBottom"></el-input>
        </div>
        <div class="limit">
          <p>审核通过提示:</p>
          <el-input v-model="comfirmSuccess"></el-input>
        </div>
        <div class="limit">
          <p>审核通过底部文字:</p>
          <el-input v-model="comfirmSuccessBottom"></el-input>
        </div>
        <div class="limit">
          <p>审核未通过提示:</p>
          <el-input v-model="confirmFail"></el-input>
        </div>
        <div class="limit">
          <p>审核未通过底部文字:</p>
          <el-input v-model="confirmFailBottom"></el-input>
        </div>
        <el-button @click.native="setNotice" type="primary">保存</el-button>
      </div>
      <div v-if="choseData === 4">
        <div class="header">
          <span class="topNav">数据概况</span>
        </div>
        <div>
          <p>参与总用户数：</p>
          <p>页面点击数：</p>
          <p>完成测试用户数：</p>
          <p>页面分享成功次数：</p>
        </div>
      </div>
    </div>
    <div class="viewImgBox" v-if="showImgCtrl">
      <div class="imgContainer" @click="showImgCtrl = false">
        <div class="inner" v-for="(item,index) in viewList" :key="index">
          <img @click.stop :src="item" :preview="0">
        </div>
        <div class="close" @click="showImgCtrl = false">
          <img src="../../static/img/Close.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "vux";
export default {
  components: {},
  name: "manage",
  data() {
    return {
      choseData: 1,
      userList: [],
      userCtrl: {
        page: 0,
        total: 0
      },
      userInput: "",
      selectUserType: "0",
      useroptions: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "昵称"
        },
        {
          value: "2",
          label: "手机"
        }
      ],
      uploadInput: "",
      uploadoptions: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "3",
          label: "待审核"
        },
        {
          value: "1",
          label: "审核通过"
        },
        {
          value: "2",
          label: "审核未通过"
        }
      ],
      uploadType: "0",
      uploadCtrl: {
        page: 0,
        total: 0
      },
      uploadList: [],
      viewList: [],
      showImgCtrl: false,
      uploadLimt: "",
      activeName: "",
      uploadSuccess: "",
      uploadBottom: "",
      confirmFail: "",
      confirmFailBottom: "",
      comfirmSuccess: "",
      comfirmSuccessBottom: ""
    };
  },
  methods: {
    chose: function(val) {
      this.choseData = val;
      if (val === 1) {
        this.$api.admin
          .getUser({
            page: this.userCtrl.page
          })
          .then(res => {
            if (res.data.code === 200) {
              this.userList = res.data.data.users;
              this.userCtrl.total = res.data.data.total;
            }
          });
      } else if (val === 2) {
        this.$api.admin
          .getUploadList({
            page: this.uploadCtrl.page
          })
          .then(res => {
            if (res.data.code === 200) {
              let resData = res.data.data;
              this.uploadCtrl.total = resData.total;
              this.uploadList = resData.uploadList;
              this.uploadList.forEach(e => {
                e.uploadTime = dateFormat(e.uploadTime, "YYYY-MM-DD HH:mm:ss");
              });
            }
          });
      } else if (val === 3) {
        this.getLimit();
        this.getNotice();
      } else if (val === 4) {
        this.getTestData();
      }
    },
    searchUser: function(item) {
      if (item === 1) {
        this.userCtrl.page = 0;
      }
      let data = {
        text: this.userInput,
        type: this.selectUserType,
        page: this.userCtrl.page
      };
      this.$api.admin.getUser(data).then(res => {
        this.userList = res.data.data.users;
        this.userCtrl.total = res.data.data.total;
      });
    },
    searchUpload: function(item) {
      if (item === 1) {
        this.uploadCtrl.page = 0;
      }
      let data = {
        text: this.uploadInput,
        type: this.uploadType,
        page: this.uploadCtrl.page
      };
      this.$api.admin.getUploadList(data).then(res => {
        if (res.data.code === 200) {
          let resData = res.data.data;
          this.uploadCtrl.total = resData.total;
          this.uploadList = resData.uploadList;
          this.uploadList.forEach(e => {
            e.uploadTime = dateFormat(e.uploadTime, "YYYY-MM-DD HH:mm:ss");
          });
        }
      });
    },
    handleCurrentChangeUser(val) {
      this.userCtrl.page = val - 1;
      this.searchUser();
    },
    handleCurrentChangeUpload(val) {
      this.uploadCtrl.page = val - 1;
      this.searchUpload();
    },
    handleClick(row) {
      console.log(row);
      this.$api.admin
        .getJf({
          phone: row.phone
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$vux.toast.show({
              type: "text",
              text: "积分：" + res.data.data.jifen.response.point
            });
            this.$alert(
              "积分：" + res.data.data.jifen.response.point,
              "用户积分",
              { confirmButtonText: "确定" }
            );
          } else {
            this.$vux.toast.show({
              type: "text",
              text: "获取商城数据失败"
            });
          }
        });
    },
    pass(row) {
      this.$confirm("此操作将审核通过用户上传的图片，是否确认", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$api.admin
          .comfirm({
            id: row._id,
            type: 0
          })
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            }
            this.searchUpload();
          });
      });
    },
    unpass(row) {
      this.$confirm("此操作将审核不通过用户上传的图片，是否确认", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$api.admin
          .comfirm({
            id: row._id,
            type: 1
          })
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            }
            this.searchUpload();
          });
      });
    },
    viewImg(row) {
      this.viewList = row.imgList;
      this.showImgCtrl = true;
    },
    getLimit() {
      this.$api.admin.getLimt().then(res => {
        if (res.data.code === 200) {
          this.uploadLimt = res.data.data.limit;
        }
      });
    },
    setLimit() {
      this.$api.admin
        .setLimt({
          limit: this.uploadLimt
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
          }
        });
    },
    setNotice() {
      let data = {
        activeName: this.activeName,
        uploadSuccess: this.uploadSuccess,
        uploadBottom: this.uploadBottom,
        confirmFail: this.confirmFail,
        confirmFailBottom: this.confirmFailBottom,
        comfirmSuccess: this.comfirmSuccess,
        comfirmSuccessBottom: this.comfirmSuccessBottom
      };
      this.$api.admin.setNotice(data).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        }
      });
    },
    getNotice() {
      this.$api.admin.getNotice().then(res => {
        if (res.data.code === 200) {
          this.activeName = res.data.data.activeName;
          this.uploadSuccess = res.data.data.uploadSuccess;
          this.uploadBottom = res.data.data.uploadBottom;
          this.confirmFail = res.data.data.confirmFail;
          this.confirmFailBottom = res.data.data.confirmFailBottom;
          this.comfirmSuccess = res.data.data.comfirmSuccess;
          this.comfirmSuccessBottom = res.data.data.comfirmSuccessBottom;
        }
      });
    },
    getTestData() {
      this.$api.admin.getCareerData();
    }
  },
  mounted() {
    let state = window.sessionStorage.getItem("loginState");
    if (state !== "1") {
      this.$router.push({
        name: "admin"
      });
    } else {
      this.chose(1);
    }
  }
};
</script>

<style lang='less'>
.manage {
  width: 100%;
  height: 100%;
  display: flex;
  background: #f7f7f7;
  .left {
    height: 100%;
    min-width: 220px;
    width: 220px;
    background: #2d3a4b;
    .title {
      height: 5rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 32px;
    }
    .nav {
      width: 100%;
      height: 3rem;
      text-align: center;
      line-height: 3rem;
      font-size: 18px;
      color: #fff;
      margin-bottom: -1px;
      background: rgba(19, 27, 35, 0.96);
      cursor: pointer;
    }
    .active {
      background: #10aeff;
      color: #fff;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    padding: 2rem;
    overflow-y: auto;
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      .topNav {
        font-size: 24px;
        display: block;
        margin-right: 1rem;
      }
      .input {
        width: 20rem;
      }
    }
    .pageChose {
      margin-top: 1rem;
    }
    .limit {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      p {
        width: 200px;
      }
      .input {
        width: 200px;
      }
    }
  }
  .viewImgBox {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    .imgContainer {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      overflow-x: auto;
      box-sizing: border-box;
      padding: 1rem;
      .inner {
        height: auto;
        width: 30rem;
        min-width: 30rem;
        margin-right: 1rem;
        img {
          width: 100%;
        }
      }
      .close {
        position: fixed;
        top: 1rem;
        right: 1rem;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>
