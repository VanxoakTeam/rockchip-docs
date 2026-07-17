---
sidebar_position: 7
---

# 固件烧录全流程

:::tip 提示

本指南针对首次使用 **HD-RK3506-EVB** 开发板的用户，介绍快速查看开发板系统信息的常用命令。

:::

## 1. 烧写前准备

### 1.1 硬件部分

  1.  开发板
2.  调试串口及相应的连接线缆（TTL电平）
3.  USB-C数据线（供电以及烧录）

### 1.2 软件部分

  1.  Windows 7以上系统
2.  驱动助手DriverAssitant
3.  瑞芯微烧录工具RKDevTool\_Release 3.31
4.  系统固件文件

> 注：相关软件资料软件可以从[资料下载](https://vanxoak.yuque.com/wb353n/lc7mxy/yz864tupkga1qzq5)进行下载

  系统固件组成如下所示：

| 文件 | 描述 |
| --- | --- |
| MiniLoaderAll.bin | 引导文件 |
| uboot.img | uboot镜像 |
| boot.img | 内核镜像 |
| recovery.img | recovery镜像 |
| rootfs.img | 文件系统镜像 |
| misc.img | 来自rockchip的自定义文件 |
| oem.img | oem分区的固件镜像 |
| parameter.txt | 分区表 |
| userdata.img | 用户空间的固件镜像 |
| update.img | 上述文件打包而成，完整的系统镜像 |

## 2. USB烧写

### 2.1 usb驱动安装

  解压上面提供的DriverAssitant\_v5.13.zip压缩包，进入DriverAssitant\_v5.13目录，双击运行DriverInstall.exe进行安装：

<img src={require('./images/07-firmwareflashing-01.png').default} alt="image.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

  点击“驱动安装”，若出现windows安全提醒，点击信任后继续安装。

<img src={require('./images/07-firmwareflashing-08.png').default} alt="image.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

<img src={require('./images/07-firmwareflashing-09.png').default} alt="安装成功" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

### 2.2 解压烧写工具

  解压上面提供的RKDevTool.zip，进入RKDevTool\_Release目录后双击运行RKDevTools.exe：

<img src={require('./images/07-firmwareflashing-10.png').default} alt="image.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

### 2.3 连接开发板

  使用USB-C数据线，将电脑和开发板USB Device进行连接。

<img src={require('./images/07-firmwareflashing-11.png').default} alt="image.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

### 2.4 进入Loader模式

  使用镊子短接RECOVERY按键，然后在使用Type-c连接上PC机与USB-Device，待电脑上位机RKDevTool软件检测到设备，显示"发现一个LOADER设备"后，再断开RECOVERY短接工具。

<img src={require('./images/07-firmwareflashing-12.png').default} alt="RECOVER 示意图" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

<img src={require('./images/07-firmwareflashing-13.png').default} alt="image.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

**注意：烧录时，如果识别不到设备，请先检查烧录接口是否接错，烧录接口要接J2 USB device（固件下载）接口。**

### 2.5 选择固件

  固件有两中格式，一种是将所有固件打包成为一个update.img文件，另外一种是一个个单独的文件，如uboot.img，boot.img，rootfs.img等文件。

使用打包好的固件update.img的好处是烧录方便，但是由于要将所有部分统一烧录，烧录时间会久一点。使用一个个单独文件烧录的好处是烧录速度快，可以单独只烧录需要修改的部分，缺点是操作会麻烦些。下面分开介绍：

#### 1）update.img烧写

<img src={require('./images/07-firmwareflashing-14.png').default} alt="image.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

#### 2）全部分开烧写

  第一次烧写需要选择全部固件，如下图所示。点击分区最后一列的空白处，在弹出的窗口中选择对应分区文件的路径；

<img src={require('./images/07-firmwareflashing-15.png').default} alt="image.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

#### 3）单独烧写

  单独烧写某个镜像，如单独烧写内核所在的boot.img，如下

<img src={require('./images/07-firmwareflashing-02.png').default} alt="image.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

> **注：单独烧写某个img固件时，需要导入parameter.txt分区文件，否则无法分配烧写地址。**

### 2.6 Maskrom模式

  在开发过程中，我们有可能会碰到无法进入**Loader**模式的情况，例如系统固件损坏不能正常进入系统。这时我们则需要采用MASKROM模式进行烧写，用跳线帽短接核心板上**MASKROM**焊接点，然后重新上电。**MASKROM**位置如下图：

<img src={require('./images/07-firmwareflashing-03.png').default} alt="MASKROM 示意图" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

  发现MASKROM设备后拔出跳线帽，然后点接执行刷机，软件操作与Loade模式一样。需注意的是，**此模式刷机必须勾选Loader 分区。**

<img src={require('./images/07-firmwareflashing-04.png').default} alt="image.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

  或者可以直接通过“升级固件”去烧写update.img。

<img src={require('./images/07-firmwareflashing-05.png').default} alt="image.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

## 3. update.img打包制作

  进入SDK目录查看 tools/linux/Linux\_Pack\_Firmware/rockdev/rk3506-package-file文件，其中未被#注释的固件都会在打包过程中被打包进update.img。

```plain
# NAME		Relative path
#
#HWDEF		HWDEF
package-file	package-file
bootloader	Image/MiniLoaderAll.bin
parameter	Image/parameter.txt
uboot       Image/uboot.img
boot        Image/boot.img
rootfs      Image/rootfs.img
recovery	Image/recovery.img
oem			Image/oem.img
userdata    Image/userdata.img
misc		Image/misc.img
# 要写入backup分区的文件就是自身（update.img）
# SELF 是关键字，表示升级文件（update.img）自身
# 在生成升级文件时，不加入SELF文件的内容，但在头部信息中有记录
# 在解包升级文件时，不解包SELF文件的内容。
  backup		RESERVED
#update-script	update-script
#recover-script	recover-script
```

  一般此文件无须修改，将我们自己的制作的固件放入`rockdev`，固件名与package-file文件一样：

```plain
vanxoak@bab121111f64:/work/bsp/rk3506/rk3506-linux6.1-sdk_release$  ls rockdev/
boot.img           misc.img  parameter.txt  uboot.img
MiniLoaderAll.bin  oem.img   recovery.img   rootfs.img   userdata.img
```

  执行命令打包整包 `./build.sh updateimg`，最后会在`rockdev`目录下生成新的`update.img`。

```shell
vanxoak@bab121111f64:/work/bsp/rk3506/rk3506-linux6.1-sdk_release$ ./build.sh updateimg

Making update image...
==========================================
Start packing update image
==========================================
Generating package-file for update:
# NAME  PATH
  package-file    package-file
parameter       parameter.txt
bootloader      MiniLoaderAll.bin
uboot   uboot.img
misc    misc.img
recovery        recovery.img
boot    boot.img
rootfs  rootfs.img
oem     oem.img
userdata        userdata.img
Packing /work/itrunk/rk3506/rk3506_linux6.1_sdk_release/output/firmware/update.img for update...
Android Firmware Package Tool v2.27
------ PACKAGE ------
Add file: ./package-file
package-file,Add file: ./package-file done,offset=0x800,size=0xd1,userspace=0x1
Add file: ./parameter.txt
parameter,Add file: ./parameter.txt done,offset=0x1000,size=0x1ec,userspace=0x1,flash_address=0x00000000
Add file: ./MiniLoaderAll.bin
bootloader,Add file: ./MiniLoaderAll.bin done,offset=0x1800,size=0x411c0,userspace=0x83
Add file: ./uboot.img
uboot,Add file: ./uboot.img done,offset=0x43000,size=0x400000,userspace=0x800,flash_address=0x00002000
Add file: ./misc.img
misc,Add file: ./misc.img done,offset=0x443000,size=0xc000,userspace=0x18,flash_address=0x00004000
Add file: ./recovery.img
recovery,Add file: ./recovery.img done,offset=0x44f000,size=0xde1600,userspace=0x1bc3,flash_address=0x00004a00
Add file: ./boot.img
boot,Add file: ./boot.img done,offset=0x1230800,size=0x3d2e00,userspace=0x7a6,flash_address=0x0000ba00
Add file: ./rootfs.img
rootfs,Add file: ./rootfs.img done,offset=0x1603800,size=0x2780000,userspace=0x4f00,flash_address=0x00010a00
Add file: ./oem.img
oem,Add file: ./oem.img done,offset=0x3d83800,size=0x660000,userspace=0xcc0,flash_address=0x00030a00
Add file: ./userdata.img
userdata,Add file: ./userdata.img done,offset=0x43e3800,size=0x260000,userspace=0x4c0,flash_address=0x00038a00
Add CRC...
Make firmware OK!
------ OK ------
********rkImageMaker ver 2.23********
Generating new image, please wait...
Writing head info...
Writing boot file...
Writing firmware...
Generating MD5 data...
MD5 data generated successfully!
New image generated successfully!

Run 'make edit-package-file' if you want to change the package-file.

Running 90-updateimg.sh - build_updateimg succeeded.
```

## 4. 工具使用技巧

  如果烧录配置修改好了，想在下次启动时使用相同的配置，可以右键点击分区配置区域任意位置，在弹出的菜单中选“导出配置”，这时会提示选择保存文件的路径及文件名。只要覆盖当前文件夹下的config.cfg文件，重新启动瑞芯微开发工具AndroidTool时就会自动加载这个配置文件。

<img src={require('./images/07-firmwareflashing-06.png').default} alt="image.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>


  如果上一步保存了多个配置，可以在使用中随时导入，而不必重新启动工具。方法是右键点击分区配置区域任意位置，在弹出的菜单中选择“导入配置”，如下图所示。

<img src={require('./images/07-firmwareflashing-07.png').default} alt="导入烧写配置" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>