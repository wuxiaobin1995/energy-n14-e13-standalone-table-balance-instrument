/*
 * @Author      : Mr.bin
 * @Date        : 2022-04-22 10:05:30
 * @LastEditTime: 2022-04-22 10:21:28
 * @Description : 封装axios
 */
import axios from 'axios'

const instance = axios.create({
  // baseURL: '', // 本地
  // baseURL: '', // 云端
  timeout: 10000
})

export { instance }
