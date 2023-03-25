import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import createPersistedstate from 'vuex-persistedstate' // vuex持久化插件

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters,
  // 持久化配置
  plugins: [
    createPersistedstate({
      key: 'mental-store',
      paths: ['user']
    })
  ]
})

export default store
