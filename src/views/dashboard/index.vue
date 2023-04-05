<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <p>所属: {{ school }}</p>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>公告</span>
        </div>
        <div v-for="item in data" :key="item.id" class="text item">
          <a @click="openDialog(item.id)">{{ item.title }}</a>
        </div>
      </el-card>
    </div>
    <!-- 公告弹出层 -->
    <el-dialog title="公告" :visible.sync="dialogVisible" width="30%">
      <span v-html="content" />
      <span slot="footer" class="dialog-footer">
        <span>当前公告浏览人数 {{ total }}</span>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAll, getById } from '@/api/announcement'
export default {
  name: 'Dashboard',
  data() {
    return {
      dialogVisible: false, // 控制弹出层
      data: [], // 公告数据
      content: '', // 要渲染的文本内容
      total: 0 // 公告浏览人数
    }
  },
  computed: {
    ...mapGetters(['name', 'school'])
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取数据
    getData() {
      getAll().then((res) => {
        this.data = res.data
      })
    },
    // 打开弹出层
    openDialog(id) {
      // 根据id查询当前公告信息
      getById(id).then(res => {
        this.content = res.data.data
        this.total = res.data.total
      })
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 30px;
  }
}
.text {
  // 知识科普标题显示区域
  a {
    text-decoration: none;
    color: black;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    position: relative; /* 父元素需要有定位，这样 ::before 元素才能相对定位 */
    display: inline-block; /* 使下划线仅覆盖文本的宽度 */
    padding-bottom: 0.1em; /* 给下划线留出空间 */
    &::before {
      content: ""; /* 伪元素需要有 content 属性，这里为空 */
      position: absolute; /* 相对定位于父元素 */
      right: 0; /* 移出从右退出 */
      bottom: 0; /* 置于文本下方 */
      width: 0%; /* 初始宽度为0 */
      height: 2px; /* 下划线高度 */
      background-color: palevioletred; /* 下划线颜色 */
      transition: width 0.6s ease-out; /* 过渡动画 */
    }
    &:hover::before {
      left: 0; // 移入从左显示
      width: 100%;
    }
  }
}
// 卡片区域
.box-card {
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 16px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix span {
  font-size: 20px;
}

.box-card {
  width: 480px;
}
</style>
