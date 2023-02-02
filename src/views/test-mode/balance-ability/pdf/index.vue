<!--
 * @Author      : Mr.bin
 * @Date        : 2023-02-02 13:54:59
 * @LastEditTime: 2023-02-02 17:10:02
 * @Description : 平衡能力测试-PDF
-->
<template>
  <div
    class="test-balance-ability-pdf"
    v-loading.fullscreen.lock="fullscreenLoading"
  >
    <!-- PDF区域 -->
    <div id="pdf" class="pdf-wrapper">
      <div class="top">
        <el-image class="logo" :src="logoSrc" fit="scale-down"></el-image>

        <div class="title">平衡能力测试报告</div>

        <div class="divider"></div>

        <div class="info">
          <div class="item">{{ hospital }}</div>
          <div class="item">姓名：{{ pdfData.userName }}</div>
          <div class="item">年龄：{{ pdfData.currentAge }}</div>
          <div class="item">性别：{{ pdfData.sex }}</div>
          <div class="item">测试日期：{{ pdfData.pdfTime }}</div>
        </div>

        <div class="divider"></div>
      </div>

      <div class="main">
        <div class="left">
          <el-image class="img" :src="scoreSrc" fit="scale-down"></el-image>

          <div class="table">
            <table class="item" border="1">
              <tr :style="{ height: '40px' }" bgcolor="#E7E6E6" align="center">
                <td rowspan="2">测试项目</td>
                <td colspan="1">动作1</td>
                <td colspan="1">动作2</td>
                <td colspan="1">动作3</td>
                <td colspan="1">动作4</td>
                <td colspan="1">动作5</td>
                <td colspan="1">动作6</td>
                <td colspan="1">动作7</td>
                <td colspan="1">动作8</td>
              </tr>
              <tr :style="{ height: '40px' }" align="center">
                <td colspan="1">一档睁眼直立</td>
                <td colspan="1">一档睁眼屈膝</td>
                <td colspan="1">二档睁眼直立</td>
                <td colspan="1">二档睁眼屈膝</td>
                <td colspan="1">一档闭眼直立</td>
                <td colspan="1">一档闭眼屈膝</td>
                <td colspan="1">二档闭眼直立</td>
                <td colspan="1">二档闭眼屈膝</td>
              </tr>
              <tr :style="{ height: '40px' }" align="center">
                <td bgcolor="#E7E6E6">左腿</td>
                <td>{{ pdfData.balanceAbilityResult.l1 }}</td>
                <td>{{ pdfData.balanceAbilityResult.l2 }}</td>
                <td>{{ pdfData.balanceAbilityResult.l3 }}</td>
                <td>{{ pdfData.balanceAbilityResult.l4 }}</td>
                <td>{{ pdfData.balanceAbilityResult.l5 }}</td>
                <td>{{ pdfData.balanceAbilityResult.l6 }}</td>
                <td>{{ pdfData.balanceAbilityResult.l7 }}</td>
                <td>{{ pdfData.balanceAbilityResult.l8 }}</td>
              </tr>
              <tr :style="{ height: '40px' }" align="center">
                <td bgcolor="#E7E6E6">右腿</td>
                <td>{{ pdfData.balanceAbilityResult.r1 }}</td>
                <td>{{ pdfData.balanceAbilityResult.r2 }}</td>
                <td>{{ pdfData.balanceAbilityResult.r3 }}</td>
                <td>{{ pdfData.balanceAbilityResult.r4 }}</td>
                <td>{{ pdfData.balanceAbilityResult.r5 }}</td>
                <td>{{ pdfData.balanceAbilityResult.r6 }}</td>
                <td>{{ pdfData.balanceAbilityResult.r7 }}</td>
                <td>{{ pdfData.balanceAbilityResult.r8 }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="right">
          <div class="score">总分：{{ pdfData.score }}分</div>
          <div class="ability">平衡能力：{{ pdfData.ability }}</div>
          <div class="advice">建议：</div>
          <div class="people">评测人员：</div>
        </div>
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="btn">
      <el-button class="item" type="primary" @click="handlePdf"
        >保存PDF</el-button
      >
      <el-button class="item" type="warning" @click="handleGoBack"
        >返 回</el-button
      >
    </div>
  </div>
</template>

<script>
import { initDB } from '@/db/index.js'

export default {
  name: 'test-balance-ability-pdf',

  data() {
    return {
      /* 路由传参 */
      userId: JSON.parse(this.$route.query.userId),
      pdfTime: JSON.parse(this.$route.query.pdfTime),
      routerName: JSON.parse(this.$route.query.routerName),

      logoSrc: require('@/assets/img/Company_Logo/logo_1.png'), // 公司商标

      scoreSrc: require('@/assets/img/Test/Balance_Ability/PDF/评分标准.png'), // 评分标准

      fullscreenLoading: false,

      pdfData: {
        balanceAbilityResult: {
          l1: null, // 一档睁眼直立，左腿（动作1）
          r1: null, // 一档睁眼直立，右腿（动作1）
          l2: null, // 一档睁眼屈膝，左腿（动作2）
          r2: null, // 一档睁眼屈膝，右腿（动作2）
          l3: null, // 二档睁眼直立，左腿（动作3）
          r3: null, // 二档睁眼直立，右腿（动作3）
          l4: null, // 二档睁眼屈膝，左腿（动作4）
          r4: null, // 二档睁眼屈膝，右腿（动作4）
          l5: null, // 一档闭眼直立，左腿（动作5）
          r5: null, // 一档闭眼直立，右腿（动作5）
          l6: null, // 一档闭眼屈膝，左腿（动作6）
          r6: null, // 一档闭眼屈膝，右腿（动作6）
          l7: null, // 二档闭眼直立，左腿（动作7）
          r7: null, // 二档闭眼直立，右腿（动作7）
          l8: null, // 二档闭眼屈膝，左腿（动作8）
          r8: null // 二档闭眼屈膝，右腿（动作8）
        }
      },

      hospital: window.localStorage.getItem('hospital')
        ? window.localStorage.getItem('hospital')
        : '未设置医院'
    }
  },

  created() {
    this.getTestData()
  },

  methods: {
    /**
     * @description: 获取对应 [ID、测试时间] 的测试报告源数据，并做相关计算
     */
    getTestData() {
      this.fullscreenLoading = true
      const db = initDB()
      db.test_data
        .where({
          userId: this.userId,
          pdfTime: this.pdfTime
        })
        .toArray()
        .then(res => {
          this.pdfData = res[0]
        })
        .catch(err => {
          this.$confirm(
            `${err}。获取ID为 [${this.userId}] 的用户数据失败，请重试！`,
            '提示',
            {
              type: 'warning',
              center: true,
              showClose: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              confirmButtonText: '重 试',
              cancelButtonText: '返 回'
            }
          )
            .then(() => {
              this.getTestData()
            })
            .catch(() => {
              this.handleGoBack()
            })
        })
        .finally(() => {
          this.fullscreenLoading = false
        })
    },

    /**
     * @description: 保存PDF
     */
    handlePdf() {
      this.$htmlToPdf(
        'pdf',
        `平衡能力测试报告 ${this.$moment().format('YYYY-MM-DD HH_mm_ss')}`,
        500
      )
    },

    /**
     * @description: 返回上一页
     */
    handleGoBack() {
      this.$router.push({
        path: this.routerName
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test-balance-ability-pdf {
  width: 100vw;
  height: 100vh;
  padding: 10px;
  @include flex(column, stretch, stretch);

  /* PDF区域 */
  .pdf-wrapper {
    flex: 1;
    @include flex(column, stretch, stretch);

    .top {
      position: relative;
      @include flex(column, stretch, center);
      .logo {
        position: absolute;
        top: 10px;
        right: 5px;
        width: 180px;
      }
      .title {
        font-size: 50px;
      }
      .divider {
        margin-top: 15px;
        border: 1px solid rgb(204, 204, 204);
        width: 100%;
      }
      .info {
        width: 100%;
        margin-top: 15px;
        @include flex(row, space-around, center);
        .item {
          font-size: 20px;
        }
      }
    }

    .main {
      flex: 1;
      @include flex(row, space-between, center);

      .left {
        flex: 1;
        @include flex(column, center, center);
        .img {
          width: 65%;
        }
        .table {
          margin-top: 30px;
        }
      }

      .right {
        margin-right: 50px;
        @include flex(column, center, stretch);
        .score {
          font-size: 30px;
        }
        .ability {
          font-size: 30px;
        }
        .advice {
          font-weight: 700;
          border: 2px solid black;
          border-radius: 6px;
          padding: 4px;
          margin-top: 40px;
          font-size: 20px;
          height: 200px;
          width: 300px;
        }
        .people {
          font-weight: 700;
          border: 2px solid black;
          border-radius: 6px;
          padding: 4px;
          font-size: 20px;
          margin-top: 20px;
        }
      }
    }
  }

  /* 按钮组 */
  .btn {
    @include flex(row, center, center);
    margin: 20px 0;
    .item {
      font-size: 28px;
      margin: 0 50px;
    }
  }
}
</style>
