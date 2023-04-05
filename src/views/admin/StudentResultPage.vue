<template>
  <div class="content">
    <el-col :span="4">
      <el-input v-model="queryList.pname" placeholder="请输入要查询的名称" />
    </el-col>
    <el-col :span="4" style="margin-left:20px;">
      <el-button type="primary" @click="getData()">查询</el-button>
    </el-col>
    <!-- 表格组件 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%; height: 73vh; margin-top: 20px;"
    >
      <el-table-column
        prop="pname"
        label="学生姓名"
      />
      <el-table-column
        prop="title"
        label="试题名称"
      />
      <el-table-column
        prop="score"
        label="得分"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            class="operationButton"
            size="mini"
            @click="handleEdit(scope.row)"
          >详情</el-button>
          <!-- 删除提示 onConfirm 点击确认按钮时触发 onCancel 点击取消按钮时触发 -->
          <el-button
            slot="reference"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      align="center"
      :current-page="queryList.currentPage"
      :page-size="queryList.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      title="学生试题详情"
      :visible.sync="dialogVisible"
      top="70px"
      width="50%"
    >
      <div style="height:400px;  overflow-y: auto;">
        <el-table
          :data="questionContent"
          style="width: 100%;"
        >
          <el-table-column
            prop="title"
            label="试题名称"
          />
          <el-table-column
            prop="answer"
            label="选择名称"
          />
          <el-table-column
            prop="answerScore"
            label="分值"
          />
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getPageAll } from '@/api/result'
export default {
  name: 'StudentResultPage',
  components: {

  },
  mixins: [],
  props: {

  },
  data() {
    return {
      tableData: [],
      queryList: { currentPage: 1, pageSize: 10, pname: '' },
      total: 0,
      dialogVisible: false,
      questionContent: [] // 弹出层试题详情
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleCurrentChange(val) {
      this.queryList.currentPage = val
      this.getData()
    },
    getData() {
      getPageAll(this.queryList).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    handleEdit(row) {
      // 把json内容转换为js对象
      this.questionContent = JSON.parse(row.questionContent)
      this.dialogVisible = true
    },
    handleDelete(row) {

    }
  }
}
</script>
<style lang='scss' scoped>
.content{
  margin: 20px;
}
.el-dialog__body{
  padding: 0;
  overflow: hidden;

}
</style>
