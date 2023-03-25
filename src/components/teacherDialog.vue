<template>
  <div>
    <!-- 封装的 教师弹出层 包含 添加和修改 -->
    <el-dialog
      :title="title"
      :visible.sync="childDialogVisible"
      width="40%"
    >
      <el-form :model="teacherInfo">
        <el-row :gutter="24">
          <el-col :span="9">
            <el-form-item label="工号" :label-width="formLabelWidth">
              <el-input v-model="teacherInfo.tid" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="teacherInfo.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年龄" :label-width="formLabelWidth">
              <el-input v-model="teacherInfo.age" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-select v-model="teacherInfo.gender" placeholder="请选择">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="职称" :label-width="formLabelWidth">
              <el-input v-model="teacherInfo.title" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学院" :label-width="formLabelWidth">
              <el-input v-model="teacherInfo.department" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="学校" :label-width="formLabelWidth">
              <el-input v-model="teacherInfo.school" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
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
    teacherInfo: {
      type: Object,
      default: () => ({ sid: '', name: '', age: '', gender: '', title: '', department: '', school: '' })
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
        this.$emit('teacherAdd')
      } else if (this.state === 1) {
        const data = this.teacherInfo
        // 通知父组件进行修改请求 并传递值过去
        this.$emit('teacherUpdate', data)
      }
    }
  }
}
</script>
