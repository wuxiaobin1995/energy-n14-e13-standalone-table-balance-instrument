/*
 * @Author      : Mr.bin
 * @Date        : 2022-04-22 09:49:03
 * @LastEditTime: 2022-12-27 10:25:14
 * @Description : vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [
  //   createPersistedState({
  //     key: 'vuex-persistedstate', // 自定义Storage中的Key名，默认是vuex
  //     storage: window.sessionStorage, // 使用sessionStorage来固化数据
  //     reducer(val) {
  //       return {
  //         aaa: val.aaa,
  //         bbb: val.bbb,
  //         ccc: val.ccc
  //       }
  //     }
  //   })
  // ],

  state: {
    // x，y调零基准值
    zeroStandard: {
      xStandard: null,
      yStandard: null
    },

    // 当前选择的用户及其信息
    currentUserInfo: {
      userId: '', // 唯一id
      userName: '', // 姓名
      sex: '', // 性别
      affectedSide: '', // 患侧
      height: '', // 身高
      weight: '', // 体重
      birthday: '', // 出生日期
      remarks: '', // 备注
      lastLoginTime: '' // 最后登录时间
    },

    // 平衡能力测试的最终结果
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
    },

    // 语音开关
    voiceSwitch: true
  },

  mutations: {
    // x，y调零基准值
    SET_ZEROSTANDARD(state, zeroStandard) {
      state.zeroStandard = zeroStandard
    },

    // 当前选择的用户及其信息
    CHANGE_CURRENTUSERINFO(state, currentUserInfo) {
      state.currentUserInfo = currentUserInfo
    },

    // 平衡能力测试的最终结果
    CHANGE_BALANCEABILITYRESULT(state, balanceAbilityResult) {
      state.balanceAbilityResult = balanceAbilityResult
    },

    // 语音开关
    SET_VOICESWITCH(state, voiceSwitch) {
      state.voiceSwitch = voiceSwitch
    }
  },

  actions: {
    // x，y调零基准值
    setZeroStandard({ commit }, zeroStandard) {
      return new Promise((resolve, reject) => {
        commit('SET_ZEROSTANDARD', zeroStandard)
        resolve()
      })
    },

    // 当前选择的用户及其信息
    changeCurrentUserInfo({ commit }, currentUserInfo) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_CURRENTUSERINFO', currentUserInfo)
        resolve()
      })
    },

    // 平衡能力测试的最终结果
    changeBalanceAbilityResult({ commit }, balanceAbilityResult) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_BALANCEABILITYRESULT', balanceAbilityResult)
        resolve()
      })
    },

    // 语音开关
    setVoiceSwitch({ commit }, voiceSwitch) {
      return new Promise((resolve, reject) => {
        commit('SET_VOICESWITCH', voiceSwitch)
        resolve()
      })
    }
  }
})
