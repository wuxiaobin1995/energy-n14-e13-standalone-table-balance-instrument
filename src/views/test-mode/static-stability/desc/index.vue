<!--
 * @Author      : Mr.bin
 * @Date        : 2023-02-02 15:54:15
 * @LastEditTime: 2023-02-09 15:06:53
 * @Description : 静态稳定测试-描述
-->
<template>
  <div class="test-static-stability-desc">
    <!-- 语音播放 -->
    <audio ref="audio" controls="controls" hidden :src="audioSrc" />

    <div class="wrapper">
      <div class="main">
        <div class="left">
          <div class="title">静态稳定测试</div>
          <div class="text">
            请双脚平稳站立在训练台中心上保持一定的下蹲角度，使重心保持在绿色区域内，可选择睁眼/闭眼进行测试。
          </div>
        </div>

        <div class="content">
          <el-image class="img" :src="showImg" fit="scale-down"></el-image>
        </div>

        <div class="right">
          <div class="time">
            <span>测试时长：</span>
            <el-input-number
              v-model="time"
              :precision="0"
              :step="5"
              :min="10"
              :max="120"
            ></el-input-number>
          </div>

          <div class="coefficient">
            <span>晃动系数：</span>
            <el-select v-model="coefficient" placeholder="请选择晃动系数">
              <el-option
                v-for="item in options"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <div class="btn">
        <el-button class="item" type="danger" round @click="handleGoBack"
          >返 回</el-button
        >
        <el-button class="item" type="primary" round @click="handleStart"
          >开 始 测 试</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
/* 路径模块 */
import path from 'path'

export default {
  name: 'test-static-stability-desc',

  data() {
    return {
      showImg: require('@/assets/img/Test/Dynamic_Stability/Desc/图形示意图.png'),

      /* 语音相关 */
      audioOpen: this.$store.state.voiceSwitch,
      audioSrc: path.join(__static, `narrate/mandarin/静态稳定测试.mp3`),

      time: 20, // 测试时长10~120，默认20s
      options: [
        {
          value: '1'
        },
        {
          value: '2'
        },
        {
          value: '3'
        }
      ],
      coefficient: '1' // 晃动系数1、2、3
    }
  },

  mounted() {
    if (this.audioOpen === true) {
      setTimeout(() => {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      }, 500)
    }
  },

  methods: {
    /**
     * @description: 开始测试
     */
    handleStart() {
      this.$router.push({
        path: '/test-static-stability-measure',
        query: {
          time: JSON.stringify(this.time),
          coefficient: JSON.stringify(this.coefficient),
          routerName: JSON.stringify('/test-static-stability-desc')
        }
      })
    },

    /**
     * @description: 回到上一页
     */
    handleGoBack() {
      this.$router.push({
        path: '/test-select'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test-static-stability-desc {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 86%;
    height: 90%;
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 20px 60px;
    @include flex(column, stretch, stretch);

    .main {
      flex: 1;
      @include flex(row, space-around, stretch);

      .left {
        width: 30%;
        .title {
          font-weight: 700;
          font-size: 50px;
          color: green;
        }
        .text {
          font-size: 24px;
          margin-top: 20px;
          line-height: 2em;
        }
      }

      .content {
        flex: 1;
        @include flex(row, center, center);
        .img {
          width: 75%;
        }
      }

      .right {
        width: 30%;
        .time {
          margin-top: 80px;
          font-size: 20px;
        }
        .coefficient {
          font-size: 20px;
          margin-top: 50px;
        }
      }
    }

    .btn {
      @include flex(row, space-around, center);
      .item {
        font-size: 28px;
        width: 250px;
      }
    }
  }
}
</style>
