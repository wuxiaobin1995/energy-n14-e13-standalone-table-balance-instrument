<!--
 * @Author      : Mr.bin
 * @Date        : 2022-04-22 11:43:29
 * @LastEditTime: 2022-04-22 11:43:30
 * @Description : 首页
-->
<template>
  <div class="home">
    <el-image class="logo__img" :src="logoSrc" fit="fit"></el-image>
  </div>
</template>

<script>
export default {
  name: 'home',

  data() {
    return {
      logoSrc: require('@/assets/img/Company_Logo/logo_1.png') // 公司商标
    }
  },

  created() {
    this.$store.dispatch('setIsCollapse', false)
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .logo__img {
    width: 60%;
  }
}
</style>
