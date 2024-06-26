<!--
 * @Author      : Mr.bin
 * @Date        : 2023-02-02 15:54:15
 * @LastEditTime: 2023-02-03 09:18:03
 * @Description : 静态平衡训练-描述
-->
<template>
  <div class="train-static-equilibrium-desc">
    <!-- 语音播放 -->
    <audio ref="audio" controls="controls" hidden :src="audioSrc" />

    <div class="wrapper">
      <div class="main">
        <div class="left">
          <div class="title">静态平衡训练</div>
          <div class="text">
            请双腿平稳站立在平台中心上，保持指定的动作，并维持重心在绿圈范围内。
          </div>
        </div>

        <div class="content">
          <el-image class="img" :src="showImg" fit="scale-down"></el-image>
        </div>

        <div class="right">
          <div class="trainPosture">
            <span>训练姿势：</span>
            <el-select v-model="trainPosture" placeholder="请选择">
              <el-option
                v-for="item in optionsTrainPosture"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <div class="coefficient">
            <span>晃动系数：</span>
            <el-select v-model="coefficient" placeholder="请选择">
              <el-option
                v-for="item in optionsCoefficient"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <div class="num">
            <span>训练组数：</span>
            <el-input-number
              v-model="num"
              :precision="0"
              :step="1"
              :min="1"
              :max="10"
            ></el-input-number>
          </div>

          <div class="time">
            <span>训练时长：</span>
            <el-input-number
              v-model="time"
              :precision="0"
              :step="5"
              :min="10"
              :max="120"
            ></el-input-number>
          </div>

          <div class="restTime">
            <span>休息时长：</span>
            <el-input-number
              v-model="restTime"
              :precision="0"
              :step="5"
              :min="5"
              :max="60"
            ></el-input-number>
          </div>
        </div>
      </div>

      <div class="btn">
        <el-button class="item" type="danger" round @click="handleGoBack"
          >返 回</el-button
        >
        <el-button class="item" type="primary" round @click="handleStart"
          >开 始 训 练</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
/* 路径模块 */
import path from 'path'

export default {
  name: 'train-static-equilibrium-desc',

  data() {
    return {
      showImg: require('@/assets/img/Train/Static_Equilibrium/Desc/图形示意图.png'),

      /* 语音相关 */
      audioOpen: this.$store.state.voiceSwitch,
      audioSrc: path.join(__static, `narrate/mandarin/静态平衡训练.mp3`),

      trainPosture: '双脚平行站立', // 训练姿势
      optionsTrainPosture: [
        {
          value: '双脚平行站立'
        },
        {
          value: '双脚并拢站立'
        },
        {
          value: '双脚串联步站立'
        },
        {
          value: '单腿站立'
        },
        {
          value: '双脚静蹲'
        },
        {
          value: '单脚静蹲'
        }
      ],

      coefficient: '1', // 晃动系数1、2、3
      optionsCoefficient: [
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

      num: 3, // 训练组数，1~10，默认3

      time: 30, // 训练时长，10~120，默认30s

      restTime: 30 // 休息时长，5~60，默认30s
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
     * @description: 开始训练
     */
    handleStart() {
      this.$router.push({
        path: '/train-static-equilibrium-measure',
        query: {
          trainPosture: JSON.stringify(this.trainPosture),
          coefficient: JSON.stringify(this.coefficient),
          num: JSON.stringify(this.num),
          time: JSON.stringify(this.time),
          restTime: JSON.stringify(this.restTime),
          routerName: JSON.stringify('/train-static-equilibrium-desc')
        }
      })
    },

    /**
     * @description: 回到上一页
     */
    handleGoBack() {
      this.$router.push({
        path: '/train-select'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.train-static-equilibrium-desc {
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
        .trainPosture {
          font-size: 20px;
          margin-top: 50px;
        }
        .coefficient {
          font-size: 20px;
          margin-top: 50px;
        }
        .num {
          font-size: 20px;
          margin-top: 50px;
        }
        .time {
          font-size: 20px;
          margin-top: 50px;
        }
        .restTime {
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
