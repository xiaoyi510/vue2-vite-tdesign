<script lang="ts">
import api from '@/api'
import router from '@/router'
import { useUserStore } from '@/store/user'

export default {
  name: 'Index',
  data() {
    return {
      userStore: useUserStore(),
      router,
    }
  },
  mounted() {
    api.common.getIp().then((res) => {
      console.log(res)
    })
  },
  methods: {
    setUserInfo() {
      this.userStore.setUserInfo({ id: 123, nickname: '哈哈' })
    },
    getUserInfo() {
      return this.userStore.nickname
    },
  },
}
</script>

<template>
  <div class="index flex">
    <div class="title">
      你好啊
    </div>
    <div>Vue2+Vite+pinia</div>
    <div>
      <t-button @click="setUserInfo">
        点击设置
      </t-button>
      <t-button @click="getUserInfo">
        点击获取
      </t-button>
      <t-button @click="router.push('/check')">
        到第二个页面
      </t-button>

      
      <div>{{ userStore.nickname }}</div>
    </div>
  </div>
</template>

<style lang="less">
.index {
  width: 100%;
  max-width: 720px;
  height: 100vh;
  background-image: linear-gradient(45deg, #f3724b, #ec4e37);
  padding: 50px 20px;
  padding-top: 150px;
  align-items: center;
  color: #f1f5cf;
  flex-direction: column;
  margin: 0 auto;

  .title {
    font-size: 28px;
    font-weight: 600;
  }
}
</style>
