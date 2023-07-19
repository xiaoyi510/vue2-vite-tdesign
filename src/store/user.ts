import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: {},
  }),
  getters: {
    nickname: state => state.userInfo.nickname ?? '',
  },
  actions: {
    setUserInfo(userInfo: Object) {
      this.userInfo = userInfo
      console.log('设置了', userInfo)
    },
  },
})
