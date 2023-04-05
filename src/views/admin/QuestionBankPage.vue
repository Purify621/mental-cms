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
    <el-container class="card_container" style="height:75vh;">
      <!-- 题库展示卡片 -->
      <div v-for="item in questionBankInfo" :key="item.id" style="width:24%; height: 45%;">
        <el-card style="margin:10px 10px 10px 10px">
          <div slot="header" class="clearfix">
            <span>{{ item.title }}</span>
            <el-dropdown style="float:right">
              <span class="el-dropdown-link" style="cursor: pointer;">
                操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-delete" @click.native="deleteQuestion(item.id)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="text">
            <div class="top">
              <img :src="item.picturebox" alt="">
              <el-tooltip :content="'是否启用'" placement="left" effect="light">
                <el-switch
                  v-model="item.status"
                  class="statusTitle"
                  @change="hswitch(item.id)"
                />
              </el-tooltip>
            </div>
            <div class="content">
              {{ item.details }}
            </div>
          </div>
        </el-card>
      </div>

    </el-container>
    <!-- 弹出层 -->
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
import { updateQuestionStatus, downloadQuestion, getQuestionPageQuery, uploadQuestion, deleteQuestion } from '@/api/questionbank'
export default {
  name: 'QuestionBankPage',
  components: {
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
  created() {
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
          // 将状态值转换为布尔值
          this.questionBankInfo.forEach(item => {
            if (item.status === 1) {
              item.status = false
            } else {
              item.status = true
            }
          })
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
    },
    // 删除试题
    deleteQuestion(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送请求删除试题
        deleteQuestion(id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 重新获取列表数据
            this.getData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.questionBank-container{
  background-color: white !important;
}
// 试题卡片的样式
.card_container{
  height: 490px;
  overflow: hidden;
  flex-wrap: wrap;  // 超出父容器自动换行
  .text{
    .top{
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      position: relative;
      img{
        border-radius: 10px;
        width: 60px;
        height: 60px;
      }
      .statusTitle{
        display: block;
        width: 62px;
        line-height: 24px;
        text-align: center;
        border-radius: 5px;
        font-size: 12px;
      }
    }
    .content{
      height: 60px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;  // 超出两行显示省略号
      overflow: hidden;
      font-size: 14px;
    }
  }
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
