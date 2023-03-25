<template>
  <div class="student-container">
    <!-- 条件查询及添加按钮 -->
    <el-row :gutter="24" class="conditionalQuery">
      <el-col :span="19">
        <el-input v-model="queryList.tid" placeholder="工号" clearable @clear="getTeacherInfo()" />
        <!-- 可清空单选 -->
        <el-select v-model="queryList.gender" clearable placeholder="请选择" @clear="getTeacherInfo()">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
          </el-option>
        </el-select>
        <el-input v-model="queryList.title" placeholder="职称" clearable @clear="getTeacherInfo()" />
        <el-input v-model="queryList.school" placeholder="学校" clearable @clear="getTeacherInfo()" />
        <!-- 点击查询时重新发起请求进行条件查询 -->
        <el-button @click="getTeacherInfo()">查询</el-button>
      </el-col>
      <el-col :span="5">
        <!-- 添加按钮 -->
        <el-button type="primary" @click="changeTeacherDialog">添加教师</el-button>
        <el-button type="danger" @click="batchDelete">批量删除</el-button>
      </el-col>
    </el-row>

    <!-- 表格组件 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="tid"
        label="工号"
        width="150"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="80"
      />
      <el-table-column
        prop="age"
        label="年龄"
        width="80"
      />
      <el-table-column
        prop="gender"
        label="性别"
        width="100"
      />
      <el-table-column
        prop="title"
        label="职称"
      />
      <el-table-column
        prop="department"
        label="学院"
      />
      <el-table-column
        prop="school"
        label="学校"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            class="operationButton"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <!-- 删除提示 onConfirm 点击确认按钮时触发 onCancel 点击取消按钮时触发 -->
          <el-popconfirm
            title="确定要删除该教师信息吗？"
            @onConfirm="teacherDelete"
          >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
    <!-- 教师弹出层组件 包含 添加教师和修改教师信息 -->
    <teacherDialog ref="teacherChild" :teacher-info="teacherInfo" :title="titleDialog[stateDialog]" :state="stateDialog" @teacherUpdate="teacherUpdate" @teacherAdd="teacherAdd" />
  </div>
</template>
<script>
import { teacherInfo, selectTeacherInfo, updateteacherInfo, deleteTeacherInfo, addTeacher } from '@/api/teacher'
import teacherDialog from '@/components/teacherDialog' // 教师弹出层组件
export default {
  name: 'TeacherPage',
  components: {
    teacherDialog
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      // 查询列表 sid gender age 可传可不传
      queryList: { currentPage: 1, pageSize: 10, tid: '', gender: '', title: '', school: '' },
      // 数据总计
      total: 0,
      // 单选属性
      cities: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
      // 弹出层显示状态
      centerDialogVisible: false,
      // 教师信息
      teacherInfo: { tid: '', name: '', age: '', gender: '', title: '', department: '', school: '' },
      // 删除的tid信息对象
      tidList: { tids: '' },
      // 弹出层标题
      titleDialog: ['添加教师', '修改教师信息'],
      // 弹出层状态 0 => 添加 1 => 修改
      stateDialog: 0,
      // 存储选中的值
      multipleSelection: [],
      deleteList: []
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    // 初始化基本数据
    this.getTeacherInfo()
  },
  methods: {
    // 获取教师信息 包含条件查询
    async getTeacherInfo() {
      const { data } = await teacherInfo(this.queryList)
      // 查询数据
      this.tableData = data.data
      // 查询数量
      this.total = data.total
    },
    // 当前页
    handleCurrentChange(val) {
      this.queryList.currentPage = val
      this.getTeacherInfo()
    },
    // 编辑按钮
    handleEdit(index, row) {
      // 修改弹出层状态为编辑
      this.stateDialog = 1
      // 显示弹出层组件
      this.$refs.teacherChild.childDialogVisible = true
      // 根据学号查询教师信息
      selectTeacherInfo(row.tid).then(res => {
        this.teacherInfo = res.data
      })
    },
    // 确定修改教师信息按钮
    teacherUpdate(data) {
      // 把子组件修改的最新值赋值给当前教师信息
      this.teacherInfo = data
      // 修改教师信息
      updateteacherInfo(this.teacherInfo).then(res => {
        if (res.code === 200) {
          // 关闭弹出层
          this.$refs.teacherChild.childDialogVisible = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          // 重新加载教师信息
          this.getTeacherInfo()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除按钮
    handleDelete(index, row) {
      // 把当前行的sid给到变量sids
      this.tidList.tids = row.tid
    },
    // 确定删除
    teacherDelete() {
      // 发请求执行删除操作
      deleteTeacherInfo(this.tidList).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          // 重新加载教师信息
          this.getTeacherInfo()
        }
      })
    },
    // 确定添加教师信息按钮
    teacherAdd() {
      addTeacher(this.teacherInfo).then(res => {
        if (res.code === 200) {
          // 关闭弹出层
          this.$refs.teacherChild.childDialogVisible = false
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
          // 重新加载教师信息
          this.getTeacherInfo()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加教师
    changeTeacherDialog() {
      // 修改弹出层状态为添加
      this.stateDialog = 0
      // 修改教师数据为空
      this.teacherInfo = { tid: '', name: '', age: '', gender: '', title: '', department: '', school: '' }
      // 显示弹出层
      this.$refs.teacherChild.childDialogVisible = true
    },
    // 复选框的操作
    handleSelectionChange(val) {
      // val拿到的是当前行的数据对象
      this.multipleSelection = val
    },
    // 批量删除
    batchDelete() {
      // 先清空批量删除数组
      this.deleteList = []
      // 遍历复选框的每一个数据对象拿到 tid (工号) 添加到待删除的deleteList数组中
      this.multipleSelection.forEach(item => {
        this.deleteList.push(item.tid)
      })
      // 把数组转换为字符串 并赋值给对象tids
      this.tidList.tids = this.deleteList.toString()
      // 提示弹框
      this.$confirm('此操作将永久删除教师信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 如果批量删除数组长度＞0 则表示选择了数据，此时在发送请求进行删除，避免出现用户没有选择而进行批量删除的错误
        if (this.deleteList.length > 0) {
          deleteTeacherInfo(this.tidList).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '批量删除成功',
                type: 'success'
              })
              // 重新加载教师信息
              this.getTeacherInfo()
            }
          })
        } else {
          this.$message({
            message: '您还没有选择要删除的用户'
          })
        }
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
.student {
  &-container{
    margin: 15px;
  }
}
.pagination{
  margin: 10px;
}
// 条件查询
.conditionalQuery{
  .el-input{
    margin: 5px 10px 5px 0;
    width: 170px;
  }
  .el-select{
    margin: 5px 10px 5px 0;
    width: 170px;
  }
  .el-button{
    height: 40px;
    margin: 5px 10px 5px 0;
  }
}
// 编辑按钮
.operationButton{
  margin-right: 8px;
}
</style>
