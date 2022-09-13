<!--
 * @Author      : Mr.bin
 * @Date        : 2022-04-22 09:49:03
 * @LastEditTime: 2022-04-22 10:30:10
 * @Description : 根组件
-->
<template>
  <div id="app">
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
// 路由过渡动效
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
