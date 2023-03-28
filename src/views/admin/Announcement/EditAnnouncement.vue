<template>
  <!-- 管理科普文章 -->
  <div class="EditPopularScience-container">
    <!-- 表格组件 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;"
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
            @click="handleEdit(scope.$index, scope.row)"
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
  </div>
</template>
<script>
import { getPageQuery, deleteById } from '@/api/announcement'
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
      queryList: { currentPage: 1, pageSize: 10 }, // 分页查询
      total: 0
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
      getPageQuery(this.queryList).then(res => {
        this.tableData = res.data.data
        this.tableData.forEach(item => {
          item.date = item.date.slice(0, 10)
        })
        this.total = res.data.total
      })
    },
    // 编辑按钮
    handleEdit() {

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
      deleteById(this.deleteId).then(res => {
        if (res.code === 200) {
          // 重新获取数据
          this.getData()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
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
