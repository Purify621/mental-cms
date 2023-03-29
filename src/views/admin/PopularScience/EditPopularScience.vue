<template>
  <!-- 管理科普文章 -->
  <div class="EditPopularScience-container">
    <el-row>
      <el-col :span="4">
        <el-select v-model="queryList.type" size="medium" clearable placeholder="请选择" @change="typeChange()">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <!-- 表格组件 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%; height:76vh;"
    >
      <el-table-column
        width="550"
        prop="title"
        label="标题"
      />
      <el-table-column
        prop="type"
        label="类型"
      />
      <el-table-column
        prop="date"
        label="时间"
      />
      <el-table-column
        label="状态"
        prop="status"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            class="operationButton"
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <!-- 删除提示 onConfirm 点击确认按钮时触发 onCancel 点击取消按钮时触发 -->
          <el-popconfirm
            title="确定要删除该学生信息吗？"
            @onConfirm="Delete"
          >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
    <el-dialog title="管理公告" width="35%" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" size="medium" placeholder="请选择" @change="typeChange()">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-input v-model="form.date" disabled autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { deleteArticleId, getArticlePageQuery, updateArticle } from '@/api/Popularscience'
export default {
  name: 'EditPopularScience',
  components: {

  },
  mixins: [],
  props: {

  },
  data() {
    return {
      tableData: [], // 表格数据
      value: true,
      deleteId: 0, // 要删除的元素id
      queryList: { currentPage: 1, pageSize: 10, type: '' }, // 分页查询
      total: 0,
      options: [
        { value: '心理科普' },
        { value: '前沿进展' }
      ],
      dialogFormVisible: false,
      form: {
        id: 0,
        title: '',
        type: '',
        date: '',
        status: 1
      },
      formLabelWidth: '80px'
    }
  },
  computed: {

  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      // 分页查询
      getArticlePageQuery(this.queryList).then(res => {
        this.tableData = res.data.data
        this.tableData.forEach(item => {
          item.date = item.date.slice(0, 10)
        })
        this.total = res.data.total
      })
    },
    // 编辑按钮
    handleEdit(row) {
      this.form.id = row.id
      this.form.title = row.title
      this.form.type = row.type
      this.form.date = row.date
      this.form.status = row.status
      // 显示编辑弹出层
      this.dialogFormVisible = true
    },
    // 取消操作
    closeDialog() {
      this.dialogFormVisible = false
      this.form = {
        id: 0,
        title: '',
        type: '',
        date: '',
        status: 0
      }
    },
    // 确定操作
    confirmDialog() {
      updateArticle(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        this.dialogFormVisible = false
        this.getData()
      })
    },
    // 查询改变的时候
    typeChange() {
      this.getData()
    },
    // 分页改变
    handleCurrentChange(val) {
      this.queryList.currentPage = val
      this.getData()
    },
    // 删除按钮
    handleDelete(index) {
      // 赋值当前要删除的id值
      this.deleteId = this.tableData[index].id
    },
    // 确定删除操作
    Delete() {
      deleteArticleId(this.deleteId).then(res => {
        if (res.code === 200) {
          // 重新获取数据
          this.getData()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
        this.getData()
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.EditPopularScience-container{
  width: 100%;
  margin: 15px;
}
.operationButton{
  margin-right: 10px;
}
</style>
