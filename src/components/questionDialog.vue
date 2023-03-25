<template>
  <div>
    <!-- 题库弹层 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="questionInfo">
        <el-form-item label="试题名称" :label-width="formLabelWidth">
          <el-input v-model="questionInfo.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="试题状态" :label-width="formLabelWidth">
          <el-radio-group v-model="questionInfo.status">
            <el-radio :label="0">已启用</el-radio>
            <el-radio :label="1">已停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="试题描述" :label-width="formLabelWidth">
          <el-input v-model="questionInfo.details" autocomplete="off" />
        </el-form-item>
        <el-form-item label="试题内容" :label-width="formLabelWidth">
          <!-- minRows 显示最小行数 maxRows 超过最大行数会显示导航栏 -->
          <el-input
            v-model="questionInfo.content"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
          />
        </el-form-item>

        <el-upload
          ref="upload"
          action=""
          class="upload-demo"
          :on-change="handleChange"
          :auto-upload="false"
          :limit="1"
        >
          点击上传
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'QuestionDialog',
  components: { },
  mixins: [],
  props: {
    // 弹出层标题
    title: {
      type: String,
      default: ''
    },
    // 试题对象
    questionInfo: {
      type: Object,
      default: () => ({ id: 1, title: '', details: '', number: 0, status: 0 })
    }
  },
  data() {
    return {
      // 是否显示弹层
      dialogFormVisible: false,
      // 表单label宽度
      formLabelWidth: '80px',
      resultInfo: {
        'id': 1448,
        'did': 137,
        'sex_specific': 3,
        'question_index': 1,
        'title': '你头痛吗？',
        'anwsers': {
          'new_1': {
            'did': '0',
            'anwser': '无',
            'anwser_score': '0'
          },
          'new_2': {
            'did': '0',
            'anwser': '轻度',
            'anwser_score': '1'
          },
          'new_3': {
            'did': '0',
            'anwser': '中度',
            'anwser_score': '2'
          },
          'new_4': {
            'did': '0',
            'anwser': '偏重',
            'anwser_score': '3'
          },
          'new_5': {
            'did': '0',
            'anwser': '严重',
            'anwser_score': '4'
          }
        }
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 确认按钮
    confirmDialog() {
      this.dialogFormVisible = false
    },
    handleChange(file) {
      const reader = new FileReader() // 先new 一个读文件的对象 FileReader
      if (typeof FileReader === 'undefined') {
        // 用来判断你的浏览器是否支持 FileReader
        this.$message({
          type: 'info',
          message: '您的浏览器不支持文件读取。'
        })
        return
      }
      reader.readAsArrayBuffer(file.raw) // 读任意文件
      reader.onload = function(e) {
        var ints = new Uint8Array(e.target.result) // 要使用读取的内容，所以将读取内容转化成Uint8Array
        // ints = ints.slice(0, 5000) // 截取一段读取的内容
        const snippets = new TextDecoder('utf-8').decode(ints) // 二进制缓存区内容转化成中文（即也就是读取到的内容）
        console.log('读取的内容如下：')
        console.log(snippets)
      }
    },
    // json编辑器内容变化
    onJsonChange(value) {
      console.log('value:', value)
    },
    // json编辑器内容保存
    onJsonSave(value) {
      console.log('value:', value)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
