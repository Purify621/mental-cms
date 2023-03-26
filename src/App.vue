<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
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
