<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 菜单 -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- 菜单项 -->
        <sidebar-item v-for="(route,index) in routes" :key="index" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      // return this.$router.options.routes 没加权限验证的路由
      return this.$store.getters.routes // 有权限验证的路由
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果设置了路径，侧边栏将突出显示所设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    // 是否展示logo
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    // 变量
    variables() {
      return variables
    },
    // 是否出错
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
