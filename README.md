<!--
 * @Author      : Mr.bin
 * @Date        : 2022-04-22 09:49:27
 * @LastEditTime: 2023-03-14 15:19:31
 * @Description : energy-n14-e13-standalone-table-balance-instrument
-->

# 台式平衡训练系统-单机版

## 串口定义

- 第一位代表 x 轴距离，第二位代表 y 轴距离（单位：mm）
- 前、右为正，左后为负
- 0.1 秒发一次数据
- y 轴往前照射，x 轴往左照射
- x 轴（左右）单边走 60mm，y 轴（前后）单边走 90mm

## 更新日志

- v2.0.0
  1. 重构了界面样式与布局
  2. 增加和修改一些功能
  3. 增加语音功能

## 其他

- 计算年龄：this.$moment().diff('1995-12-22', 'years')
