<!-- @format -->

<script lang="ts" setup>

import zhConfig from 'tdesign-vue/es/locale/zh_CN';

console.log(import.meta)
console.log(import.meta.env)
</script>

<template>
  <div id="app">
    <t-config-provider :globalConfig="zhConfig">
      <main>
        <RouterView />
      </main>
    </t-config-provider>
  </div>
</template>
