---
sidebar_position: 2
---

# SDK源码获取

:::tip 提示

本文档主要介绍如何获取SDK源码。


:::
> 
> SDK包含了开发rk3506平台所需的各种软件组件、源代码、工具、库、文档以及示例代码等。这些资源旨在帮助开发人员基于rk3506芯片进行高效的软件开发、系统定制以及应用程序开发。

## 1. SDK源码获取

### 1.1 百度网盘下载SDK源码包

  点击下列链接，进入百度网盘下载页面。

[rk3506_linux6.1_sdk_v1.2.0_iot_evb_20260617_MD5_70ed402fb13718a6710a35065dfe68eb.tar.gz]()

  进入RK3506-EVB-SDK发布，选择修改日期最新的RK3506 SDK源码包进行下载。

<img src={require('./images/02-sdksourceacquisition-01.png').default} alt="image.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

  下载完后，将RK3506 SDK源码包放入Ubuntu 开发主机中，使用以下命令解压SDK。

```shell
# 解压SDK, 因为SDK更新原因，压缩包后的时间可能不一样，请以资料下载中的为主
tar -zxvf rk3506_linux6.1_sdk_v1.2.0_iot_evb_20260617_MD5_70ed402fb13718a6710a35065dfe68eb.tar.gz
# 进入SDK目录
cd rk3506_linux6.1_sdk_v1.2.0/
```

## 2. SDK源码包工程目录介绍

  一个通用 Linux SDK 工程目录包含有 buildroot、app、kernel、device、docs、external 等目录。

```shell
.
├── app					# 存放上层应用 app，主要是 qcamera/qfm/qplayer/settings 等一些应用程序。
├── buildroot		    # 基于 buildroot (2024.02) 开发的根文件系统。
├── build.sh -> device/rockchip/common/scripts/build.sh
├── common -> device/rockchip/common
├── device			    # 存放各芯片板级配置和Parameter文件，以及一些编译与打包固件的脚本和预备文件。
├── docs				# 存放芯片模块开发指导文档、平台支持列表、芯片平台相关文档、Linux开发指南等。
├── external		    # 存放第三方相关仓库,包括音频、视频、网络、recovery 等。
├── hal					# 存放RK3506 HAL层相关源码
├── kernel -> kernel-6.1
├── kernel-6.1	        # 存放 kernel 6.1 开发的代码。
├── Makefile -> device/rockchip/common/Makefile
├── prebuilts		    # 存放交叉编译工具链
├── README.md -> device/rockchip/common/README.md
├── rkbin				# 存放 Rockchip 相关的 Binary 和工具
├── rkflash.sh -> device/rockchip/common/scripts/rkflash.sh
├── rockdev -> output/firmware
├── rtos				# 存放Rtos相关代码
├── tools				# 存放 Linux 和 Windows 操作系统环境下常用工具
├── u-boot			    # 存放uboot源码
├── Vanxoak_SDK_Update_Log_20260601.txt
└── yocto				# 存放yocoto源码
```