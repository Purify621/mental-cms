<template>
  <div class="questionBank-container">
    <div style="display:flex;">
      <el-upload
        ref="upload"
        action
        :http-request="upload"
        :show-file-list="false"
        :before-upload="beforeUpload"
        accept=".json"
        :on-change="handleChange"
      >
        <el-button slot="trigger" size="small" type="primary">上传试题</el-button>
      </el-upload>
      <el-button class="textbutton" size="small" type="text" plain @click="downloadTemplate">下载模板</el-button>
    </div>

    <!-- <el-button size="small" type="text" plain @click="downloadTemplate">上传试题</el-button> -->
    <!-- <el-button icon="el-icon-circle-plus-outline" size="small" plain @click="addTestQuestion">新建试题</el-button> -->
    <el-container style="height:75vh;">
      <!-- 题库展示卡片 -->
      <el-row :gutter="24">
        <el-col v-for="item in questionBankInfo" :key="item.id" :span="6">
          <questionBankCard :id="item.id" :logo="item.picturebox" :title="item.title" :details="item.details" :status="item.status" @hswitch="hswitch" />
        </el-col>
      </el-row>
    </el-container>
    <!-- 弹出层 -->
    <questionDialog ref="child" title="新建试题" :question-info="questionBankInfoDialog" />
    <!-- 分页组件 -->
    <div class="block pagination">
      <el-pagination
        align="center"
        :current-page="queryList.currentPage"
        :page-size="queryList.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import questionBankCard from '@/components/questionBankCard'
import questionDialog from '@/components/questionDialog'
import { updateQuestionStatus, downloadQuestion, getQuestionPageQuery, uploadQuestion } from '@/api/questionbank'
export default {
  name: 'QuestionBankPage',
  components: {
    questionBankCard,
    questionDialog
  },
  data() {
    return {
      // 试题信息
      questionBankInfo: { 'id': 0, 'title': '', 'details': '', 'number': 0, 'status': 2 },
      // 弹出层内容
      questionBankInfoDialog: { 'id': 0, 'title': '', 'details': '', 'number': 0, 'status': 0 },
      total: 10,
      queryList: { currentPage: 1, pageSize: 8 },
      fileList: [] // 上传文件的列表
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    // this.getquestionBankAll()
    this.getData()
  },
  methods: {
    beforeUpload(file) {
      const isRightSize = file.size / 1024 < 500
      if (!isRightSize) this.$message.error(`文件大小不能超过500KB`)
      return isRightSize
    },
    // 文件状态改变时的钩子
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    // 上传操作
    upload() {
      const formData = new FormData()
      this.fileList.forEach((res) => {
        formData.append('file', res.raw)
      })
      formData.append('uploadTime', this.MonthDate)
      uploadQuestion(formData).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          // 重新获取列表数据
          this.getScheduleData()
          this.$refs.upload.clearFiles() // 上传成功之后清除内容
        }
      }).catch((err) => {
        console.log(err)
        this.fileList = []
      })
    },
    // 分页组件改变时执行的操作
    handleCurrentChange(val) {
      this.queryList.currentPage = val
      this.getData()
    },
    // 添加试题
    addTestQuestion() {
      this.qState = 0
      this.questionBankInfoDialog = { 'id': 0, 'title': '', 'details': '', 'number': 0, 'status': 0 }
      // 显示弹层
      this.$refs.child.dialogFormVisible = true
    },
    // 获取试题数据 分页查询
    getData() {
      getQuestionPageQuery(this.queryList).then(res => {
        if (res.code === 200) {
          this.questionBankInfo = res.data.data
          this.total = res.data.total
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
    },
    // 下载试题模板
    downloadTemplate() {
      downloadQuestion().then(res => {
        const url = res.data
        fetch(url).then(res => {
          // 检查状态是否为成功
          if (!res.ok) {
            throw new Error('下载失败')
          }
          // 如果成功把结果转换为一个blob对象
          return res.blob()
        }).then(blob => {
          /*
             该语句使用 URL.createObjectURL 方法创建一个 URL 对象，
             然后创建一个链接元素，并将 URL 对象赋值给链接的 href 属性，
             设置下载属性并添加到文档的 body 元素中。接着，它模拟用户点击链接以启动下载，
             并在下载完成后清理创建的对象和链接元素。
          */
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = '试题模板.json'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }).catch(error => {
          console.error('下载失败', error)
        })
      })
    }
    // 获取题库信息 已弃用
    /* getquestionBankAll() {
      getQuesionBankAll().then(res => {
        if (res.code === 200) {
          this.questionBankInfo = res.data
        }
      })
    }, */
  }
}
</script>
<style lang='scss' scoped>
.questionBank-container{
  background-color: white !important;
}
.el-container{
  margin-top: 20px;
  height: 490px;
  overflow: hidden;
}
.questionBank{
  &-container {
    padding: 15px;
    background-color: rgb(240, 242, 245);
    .el-button{
      margin-bottom: 15px;
    }
  }
}
.textbutton{
  margin-left: 20px;
  color: black;
  border: none !important;
  &:hover{
    color: rgb(102, 177, 255);
  }
}
</style>
