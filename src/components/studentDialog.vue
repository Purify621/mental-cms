<template>
  <div>
    <!-- 封装的 学生弹出层 包含 添加和修改 -->
    <el-dialog
      :title="title"
      :visible.sync="childDialogVisible"
      width="40%"
    >
      <el-form :model="studentInfo">
        <el-row :gutter="24">
          <el-col :span="9">
            <el-form-item label="学号" :label-width="formLabelWidth">
              <el-input v-model="studentInfo.sid" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="studentInfo.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年龄" :label-width="formLabelWidth">
              <el-input v-model="studentInfo.age" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="年级" :label-width="formLabelWidth">
              <el-input v-model="studentInfo.grade" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-select v-model="studentInfo.gender" placeholder="请选择">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="学院" :label-width="formLabelWidth">
              <el-input v-model="studentInfo.college" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="学校" :label-width="formLabelWidth">
              <el-input v-model="studentInfo.school" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="studentInfo.address" autocomplete="off" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="childDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'StudentDialog',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 学生信息
    studentInfo: {
      type: Object,
      default: () => ({ sid: '', name: '', age: '', grade: '', gender: '', college: '', school: '', address: '' })
    },
    // 确认按钮执行状态 0 添加请求 1 修改请求
    state: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 是否显示弹出层
      childDialogVisible: false,
      // 单label宽度
      formLabelWidth: '50px'
    }
  },
  methods: {
    // 确认按钮
    confirmDialog() {
      if (this.state === 0) {
        // 通知父组件进行添加请求
        this.$emit('studentAdd')
      } else if (this.state === 1) {
        const data = this.studentInfo
        // 通知父组件进行修改请求 并传递值过去
        this.$emit('studentUpdate', data)
      }
    }
  }
}
</script>
