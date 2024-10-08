<!--
 * @Author      : Mr.bin
 * @Date        : 2022-04-22 09:49:03
 * @LastEditTime: 2024-07-31 11:58:03
 * @Description : 根组件
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
/* 串口通信库 */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

export default {
  name: 'App',

  data() {
    return {
      /* 串口相关 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200, // 默认波特率115200

      /* 其他 */
      xStandard: 0, // x轴距离基准值，单位mm
      yStandard: 0 // y轴距离基准值，单位mm
    }
  },

  created() {
    this.initLocalStorage()
    this.initSerialPort()
  },
  beforeDestroy() {
    if (this.usbPort) {
      if (this.usbPort.isOpen) {
        this.usbPort.close()
      }
    }
  },

  methods: {
    /**
     * @description: 软件启动后，初始化localStorage的一些值
     */
    initLocalStorage() {
      /* 初始化医院名称 */
      if (!window.localStorage.getItem('hospital')) {
        window.localStorage.setItem('hospital', '')
      }
      /* 初始化边界运动距离，x轴单边60mm，y轴单边90mm */
      if (!window.localStorage.getItem('maxAction')) {
        window.localStorage.setItem('maxAction', 60)
      }
      /* 初始化免责声明的终端用户名称 */
      if (!window.localStorage.getItem('disclaimer_name')) {
        window.localStorage.setItem('disclaimer_name', '')
      }
      /* 初始化免责声明的设备编号 */
      if (!window.localStorage.getItem('disclaimer_device_id')) {
        window.localStorage.setItem('disclaimer_device_id', '')
      }
    },

    /**
     * @description: 初始化串口对象
     */
    initSerialPort() {
      SerialPort.list()
        .then(ports => {
          /* 遍历设备的USB串口，目标设备需安装驱动 */
          let comPath = ''
          for (const port of ports) {
            if (/^USB/.test(port.pnpId)) {
              comPath = port.path
              break
            }
          }

          /* 验证USB有没有连接到电脑，但不能验证有无数据发送给上位机 */
          if (comPath) {
            this.$notify({
              title: '通知',
              message: `连接到串口：${comPath}；波特率为：${this.scmBaudRate}`,
              type: 'success',
              position: 'bottom-right',
              duration: 4000
            })

            /**
             * @description: 创建串口实例
             * @param {String} comPath 串行端口的系统路径。例如：在Mac、Linux上的/dev/tty.XXX或Windows上的COM1
             * @param {Object} 配置项
             */
            this.usbPort = new SerialPort(comPath, {
              baudRate: this.scmBaudRate, // 默认波特率115200
              autoOpen: true // 是否自动开启串口
            })
            /* 调用 this.usbPort.open() 成功时触发（开启串口成功） */
            this.usbPort.on('open', () => {})
            /* 调用 this.usbPort.open() 失败时触发（开启串口失败） */
            this.usbPort.on('error', () => {
              this.$alert(
                `请重新连接USB线，然后点击"刷新页面"按钮！`,
                '串口开启失败',
                {
                  type: 'error',
                  showClose: false,
                  center: true,
                  confirmButtonText: '刷新页面',
                  callback: () => {
                    window.location.reload()
                  }
                }
              )
            })

            this.parser = this.usbPort.pipe(new Readline({ delimiter: '\n' }))
            this.parser.on('data', data => {
              // console.log(data) // {String} 230,160

              const dataArray = data.split(',') // 将原始数据以逗号作为分割符，组成一个数组
              this.xStandard = parseInt(dataArray[0])
              this.yStandard = parseInt(dataArray[1])

              /* 数据校验 */
              if (!isNaN(this.xStandard) && !isNaN(this.yStandard)) {
                /* 关闭串口 */
                if (this.usbPort) {
                  if (this.usbPort.isOpen) {
                    this.usbPort.close()
                  }
                }
                /* 设置Vuex中的传感器基准值 */
                this.$store
                  .dispatch('setZeroStandard', {
                    xStandard: this.xStandard,
                    yStandard: this.yStandard
                  })
                  .then(() => {
                    this.$message({
                      message: '开机调零成功',
                      type: 'success',
                      duration: 2500
                    })
                  })
                  .catch(err => {
                    this.$alert(
                      `${err}。请重新连接USB线，然后点击"刷新页面"按钮！`,
                      '开机调零失败',
                      {
                        type: 'error',
                        showClose: false,
                        center: true,
                        confirmButtonText: '刷新页面',
                        callback: () => {
                          window.location.reload()
                        }
                      }
                    )
                  })
              }
            })
          } else {
            this.$getLogger('没有检测到USB连接')
            this.$confirm(
              `请重新连接USB线，然后点击"刷新页面"按钮！`,
              '没有检测到USB连接',
              {
                type: 'error',
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                center: true,
                confirmButtonText: '刷新页面',
                cancelButtonText: '忽 略'
              }
            )
              .then(() => {
                window.location.reload()
              })
              .catch(() => {})
          }
        })
        .catch(err => {
          this.$getLogger(err)
          this.$confirm(
            `${err}。请重新连接USB线，然后点击"刷新页面"按钮！`,
            `初始化SerialPort.list失败`,
            {
              type: 'error',
              showClose: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              center: true,
              confirmButtonText: '刷新页面',
              cancelButtonText: '忽 略'
            }
          )
            .then(() => {
              window.location.reload()
            })
            .catch(() => {})
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
