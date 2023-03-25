<template>
  <div class="questionBank-container">
    <el-button icon="el-icon-circle-plus-outline" size="small" plain @click="addTestQuestion">新建试题</el-button>
    <!-- 题库展示卡片 -->
    <el-row :gutter="24">
      <el-col v-for="item in questionBankInfo" :key="item.id" :span="6">
        <questionBankCard :id="item.id" :title="item.title" :details="item.details" :status="item.status" @hswitch="hswitch" />
      </el-col>
    </el-row>
    <!-- 弹出层 -->
    <questionDialog ref="child" title="新建试题" :question-info="questionBankInfoDialog" />
  </div>
</template>
<script>
import questionBankCard from '@/components/questionBankCard'
import questionDialog from '@/components/questionDialog'
import { getQuesionBankAll, updateQuestionStatus } from '@/api/questionbank'
export default {
  name: 'QuestionBankPage',
  components: {
    questionBankCard,
    questionDialog
  },
  mixins: [],
  props: {

  },
  data() {
    return {
      // 试题信息
      questionBankInfo: { 'id': 0, 'title': '', 'details': '', 'number': 0, 'status': 2 },
      // 弹出层内容
      questionBankInfoDialog: { 'id': 0, 'title': '', 'details': '', 'number': 0, 'status': 0 }
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  created() {
    this.getquestionBankAll()
  },
  methods: {
    // 添加试题
    addTestQuestion() {
      this.qState = 0
      this.questionBankInfoDialog = { 'id': 0, 'title': '', 'details': '', 'number': 0, 'status': 0 }
      // 显示弹层
      this.$refs.child.dialogFormVisible = true
    },
    // 获取题库信息
    getquestionBankAll() {
      getQuesionBankAll().then(res => {
        if (res.code === 200) {
          this.questionBankInfo = res.data
        }
      })
    },
    // 滑块执行的操作
    hswitch(id) {
      // 发送请求修改当前值的状态
      updateQuestionStatus(id).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '修改状态成功',
            type: 'success'
          })
        }
        // 重新获取题库信息
        this.getquestionBankAll()
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.questionBank{
  &-container {
    padding: 15px;
    background-color: rgb(240, 242, 245);
    .el-button{
      margin-bottom: 15px;
    }
  }
}
</style>
