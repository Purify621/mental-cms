<template>
  <div class="navbar">
    <!-- 顶部导航栏 -->
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 用户头像 -->
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <a @click="openIndividual">
            <el-dropdown-item>
              个人信息
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 个人信息全局弹出层 -->
    <el-dialog title="个人信息" width="40%" :visible.sync="dialogFormVisible">
      <div class="individual-container">
        <!-- 公共的 -->
        <div v-if="role === 'SuperAdmin'" class="content">
          <p>姓名</p>
          <input v-model="user.username" :disabled="disabled" type="text" class="content-input">
        </div>
        <div v-else class="content">
          <p>姓名</p>
          <input v-model="user.name" :disabled="disabled" type="text" class="content-input">
        </div>
        <div class="content">
          <p>性别</p>
          <input v-model="user.gender" :disabled="disabled" type="text" class="content-input">
        </div>
        <div class="content">
          <p>头像</p>
          <input v-model="user.avatar" :disabled="disabled" type="text" class="content-input">
        </div>
        <!-- 公共的 -->

        <!-- 管理员 -->
        <div v-if="role == 'SuperAdmin'" class="content">
          <p>邮箱</p>
          <input v-model="user.email" :disabled="disabled" type="text" class="content-input">
        </div>
        <!-- 管理员 -->

        <!-- 教师的 -->
        <div v-if="role == 'teacher'" class="content">
          <p>职称</p>
          <input v-model="user.title" :disabled="disabled" type="text" class="content-input">
        </div>
        <div v-if="role == 'teacher'" class="content">
          <p>学院</p>
          <input v-model="user.department" :disabled="disabled" type="text" class="content-input">
        </div>
        <div v-if="role == 'teacher'" class="content">
          <p>个签</p>
          <input v-model="user.signature" :disabled="disabled" type="text" class="content-input">
        </div>
        <!-- 教师的 -->

        <!-- 公共的 -->
        <div class="content">
          <p>学校</p>
          <input v-model="user.school" :disabled="disabled" type="text" class="content-input">
        </div>
        <!-- 公共的 -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit">编辑</el-button>
        <el-button type="primary" @click="modifyUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getInfoId, updateAdminInfo } from '@/api/admin'
import { updateteacherInfo, selectTeacherInfo } from '@/api/teacher'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      user: {}, // 用户信息
      dialogFormVisible: false, // 是否显示弹出层
      disabled: true // 输入框是否禁用
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'id',
      'role'
    ])
  },
  created() {
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // 用户登出
      await this.$store.dispatch('user/logout')
      // 清空用户路由权限表
      await this.$store.dispatch('permission/resetState')
      // 跳转至登录页
      this.$router.push(`/login}`)
    },
    // 让弹出层显示并查询当前登录对应角色的信息
    openIndividual() {
      if (this.role === 'SuperAdmin') {
        this.queryAdminInfo()
      } else if (this.role === 'teacher') {
        this.queryTeacherInfo()
      }
      // 让输入框变为禁用
      this.disabled = true
      // 显示弹出层
      this.dialogFormVisible = true
    },
    // 编辑按钮
    edit() {
      this.disabled = false
    },
    // 确定按钮用于发起请求修改角色信息
    modifyUser() {
      if (this.role === 'SuperAdmin') {
        updateAdminInfo(this.user).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.dialogFormVisible = false
          }
        }).catch(err => {
          console.log(err)
        })
      } else if (this.role === 'teacher') {
        // 修改管理员信息
        updateteacherInfo(this.user).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.dialogFormVisible = false
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 查询管理员信息
    queryAdminInfo() {
      getInfoId(this.id).then(res => {
        this.user = res.data
      })
    },
    // 查询教师信息
    queryTeacherInfo() {
      selectTeacherInfo(this.id).then(res => {
        this.user = res.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.individual-container{
  height: 300px;
  .content{
    width: 80%;
    margin: 0 auto;
    height: 40px;
    display: flex;
    p{
      width: 60px;
    }
  }
  .content-input{
    width: 100%;
    border: none;
    outline: none;
    cursor: pointer;
    &:hover{
      background-color: rgb(240, 246, 255)
    }
  }
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
