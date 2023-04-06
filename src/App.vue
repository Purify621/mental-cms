<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// 解释
// 1. beforeunload 事件在用户退出页面时触发，通常用于确认用户是否真的要离开当前页面。
// 2. beforeunload 事件在用户关闭浏览器窗口时不会触发。
// 3. beforeunload 事件在用户刷新页面时不会触发。
const beforeUnload = function(e) {
  e = e || window.event
  if (e || window.event) e.returnValue = 1
  return 1
}
export default {
  name: 'App',
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('beforeunload', beforeUnload)
    })
  },
  beforeDestroy() {
    // 页面销毁的时候执行 退出登录
    window.removeEventListener('beforeunload', beforeUnload)
  }
}
</script>

<style lang="scss">
/* 在此修改的都是全局的 */
// table 的内边距更改
.el-table{
  margin-top: 20px;
  th{
    padding: 9px;
  }
  td{
    padding: 9px;
  }
}
// 去掉scope才能给弹出层设置圆角，当然此时会给所有的都设置
.el-dialog{
  border-radius: 10px !important;
}
</style>
