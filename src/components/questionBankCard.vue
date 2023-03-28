<template>
  <div>
    <!-- 题库卡片组件 -->
    <el-card class="box-card">
      <div class="questionLogo">
        <div>
          <el-avatar shape="square" :size="50" :src="logo" />
        </div>
        <div class="status">
          <el-switch
            v-model="sValue"
            class="statusTitle"
            active-color="#00a870"
            active-text="启用"
            inactive-text="禁用"
            @change="handleSwitch()"
          />
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <svg :class="status === 0 ? '' : 'moreError'" t="1675063616832" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3314" width="24" height="24"><path d="M512 704c35.2 0 64 28.8 64 64s-28.8 64-64 64-64-28.8-64-64 28.8-64 64-64z m-64-192c0 35.2 28.8 64 64 64s64-28.8 64-64-28.8-64-64-64-64 28.8-64 64z m0-256c0 35.2 28.8 64 64 64s64-28.8 64-64-28.8-64-64-64-64 28.8-64 64z" p-id="3315" /></svg>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="deleteQuestion">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <p class="pTitle" :class="status === 0 ? 'pTitleSuccess' : 'pError'">{{ title }}</p>
      <p class="pSubTitle" :class="status === 0 ? 'pSubTitleSuccess' : 'pError'">{{ details }}</p>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'QuestionBankCard',
  mixins: [],
  props: {
    id: {
      type: Number,
      default: 0
    },
    // 题库状态
    status: {
      type: Number,
      default: 0
    },
    // 题库标题
    title: {
      type: String,
      default: ''
    },
    // 详情
    details: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 滑块状态
      sValue: true
    }
  },
  created() {
    // 判断当前状态 来控制滑块状态
    if (this.status === 0) {
      this.sValue = true
    } else {
      this.sValue = false
    }
  },
  methods: {
    // 滑块按钮
    handleSwitch() {
      // 通知父组件进行相关操作
      this.$emit('hswitch', this.id)
    },
    // 删除试题
    deleteQuestion() {
      // 删除操作
    }
  }
}
</script>
<style lang='scss' scoped>
// 图标
.questionLogo {
  width: 100%;
  height: 9vh;
  display: flex;
  position: relative;
  // 状态
  .status{
    position: absolute;
    width: 80px;
    height: 24px;
    right: 0;
    display: flex;
    .statusTitle{
      display: block;
      width: 62px;
      line-height: 24px;
      text-align: center;
      border-radius: 5px;
      font-size: 12px;
    }
    // 状态为0的样式
    .statusTitleSuccess{
      color: white;
      background-color: #00a870;
    }
    // 状态为1的样式
    .statusTitleError{
      display: block;
      width: 62px;
      line-height: 24px;
      text-align: center;
      border-radius: 5px;
      font-size: 12px;
      color: #bababa;
      background-color: rgb(238, 238, 238);
    }
    // 状态为1时更多图标的样式
    .moreError{
      fill: #a8abb2;
    }
  }
}
// 标题
.pTitle{
  font-weight: 400;
  font-size: 20px;
}
// 状态为 0 时的标题颜色
.pTitleSuccess{
  color: #303133;
}
// 描述标题
.pSubTitle{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;  // 超出两行显示省略号
  overflow: hidden;
  font-size: 12px;
  margin-bottom: 30px;
}
// 状态为 0 时的描述标题颜色
.pSubTitleSuccess{
  color: #606266;
}
// 状态为 1 时标题和描述的样式
.pError{
  color: #c0c4cc;
}
</style>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    height: 227px;
    margin-bottom: 20px;
  }
  /* 下拉菜单样式 */
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>

<style>
/* 滑块样式 */
.el-switch__label * {
    line-height: 1;
    font-size: 12px;
    display: inline-block;
  }
 .el-switch__label {
    position: absolute;
    display: none;
    color: #fff !important;
    font-size: 12px !important;
  }
  /*打开时文字位置设置*/
.el-switch__label--right {
    z-index: 1;
    top: 1px;
    right: 7px;
  }
  /*关闭时文字位置设置*/
.el-switch__label--left {
    z-index: 1;
    left: 7px;
  }
  /*显示文字*/
.el-switch__label.is-active {
    display: block;
  }
   /*开关宽度*/
.el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 55px !important;
  }
</style>
