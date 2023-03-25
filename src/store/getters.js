// 建立快捷访问
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  school: state => state.user.school,
  name: state => state.user.name,
  routes: state => state.permission.routes
}
export default getters
