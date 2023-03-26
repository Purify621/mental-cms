// 建立快捷访问
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 登录时需要直接显示的信息
  token: state => state.user.token,
  name: state => state.user.name,
  id: state => state.user.id,
  role: state => state.user.role,
  avatar: state => state.user.avatar,
  school: state => state.user.school,
  // 路由信息
  routes: state => state.permission.routes
}
export default getters
