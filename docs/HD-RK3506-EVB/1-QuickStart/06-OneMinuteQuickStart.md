---
sidebar_position: 6
---

# 一分钟快速体验

:::tip 提示

本指南针对首次使用 **HD-RK3506-EVB** 开发板的用户，介绍快速查看开发板系统信息的常用命令。

:::

> 注意：文中命令行出现的“**root@rk3506-buildroot:/#** ”是命令行终端的用户名root和主机名**rk3506-buildroot**，不需要输入。

## 1. 查看磁盘和内存大小

  使用df命令查看系统上磁盘使用情况，如下为默认磁盘使用情况，仅供参考。

```plain
root@rk3506-buildroot:/# df -h
Filesystem                Size      Used Available Use% Mounted on
ubi0:rootfs             136.5M     72.0M     64.5M  53% /
devtmpfs                 48.7M         0     48.7M   0% /dev
tmpfs                    48.8M    100.0K     48.7M   0% /var/log
tmpfs                    48.8M      8.0K     48.8M   0% /tmp
tmpfs                    48.8M    144.0K     48.7M   0% /run
tmpfs                    48.8M         0     48.8M   0% /dev/shm
/dev/ubi6_0               7.6M    140.0K      7.5M   2% /oem
/dev/ubi7_0              29.2M    320.0K     28.9M   1% /userdata
```

  使用free命令查看内存使用情况，如下所示。

```plain
root@rk3506-buildroot:/# free -h
              total        used        free      shared  buff/cache   available
Mem:          97.6M       27.8M       46.7M      252.0K       23.1M       64.6M
Swap:             0           0           0

```

## 2. 关机和重启

  当需要关机时，如果有数据存储操作，为了确保数据完全写入，可执行sync 命令：

```plain
root@rk3506-buildroot:/# sync
```

  完成数据同步后再关闭电源关机。

  也可以执行 reboot 命令重启开发板：

```plain
root@rk3506-buildroot:/# reboot
```

  该命令会自动完成数据同步后再重启系统。

## 3. 查看内核版本

  使用`uname -a`命令可以查看内核版本信息：

```plain
root@rk3506-buildroot:/# uname -a
Linux rk3506-buildroot 6.1.99 #16 SMP PREEMPT Tue Dec 31 10:58:14 CST 2024 armv7l GNU/Linux
```

  也可以通过查看`/proc/version` 文件，获得系统内核版本信息：

```plain
root@rk3506-buildroot:/# cat /proc/version
Linux version 6.1.99 (vanxoak@6fe447f5e3d9) (arm-none-linux-gnueabihf-gcc (GNU Toolchain for the A-profile Architecture 10.3-2021.07 (arm-10.29)) 10.3.1 20210621, GNU ld (GNU Toolchain for the A-profile Architecture 10.3-2021.07 (arm-10.29)) 2.36.1.20210621) #16 SMP PREEMPT Tue Dec 31 10:58:14 CST 2024
```

  

## 4. 查看磁盘分区信息

  通过查看`/proc/partitions` 文件，可以获得系统所有的分区信息：

```plain
root@rk3506-buildroot:/# cat /proc/partitions
major minor  #blocks  name

  31        0       1024 mtdblock0
  31        1       4096 mtdblock1
  31        2       1024 mtdblock2
  31        3      20480 mtdblock3
  31        4      10240 mtdblock4
  31        5     163840 mtdblock5
  31        6      16384 mtdblock6
  31        7      41344 mtdblock7
```

## 5. 查看CPU信息

  通过查看`/proc/cpuinfo`文件，可以获得CPU等信息：

  其中CPU Serial为CPU的唯一ID，即使是重新刷机，这个唯一ID也不会变。

```plain
root@rk3506-buildroot:/# cat /proc/cpuinfo
processor       : 0
model name      : ARMv7 Processor rev 5 (v7l)
BogoMIPS        : 48.00
Features        : half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae 
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xc07
CPU revision    : 5

processor       : 1
model name      : ARMv7 Processor rev 5 (v7l)
BogoMIPS        : 48.00
Features        : half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae 
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xc07
CPU revision    : 5

processor       : 2
model name      : ARMv7 Processor rev 5 (v7l)
BogoMIPS        : 48.00
Features        : half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae 
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xc07
CPU revision    : 5

Hardware        : Generic DT based system
Revision        : 0000
Serial          : d3fb587707590f26
root@rk3506-buildroot:/# 
```

  其中`BogoMIPS`参数可以用来衡量处理器的运算能力，表示CPU每秒钟可以处理的指令数，单位百万。

## 6. 查看挂载信息

  通过查看`mount`命令，可以获得文件系统的挂载信息：

```plain
root@rk3506-buildroot:/# mount
ubi0:rootfs on / type ubifs (rw,relatime,assert=read-only,ubi=0,vol=0)
devtmpfs on /dev type devtmpfs (rw,relatime,size=49880k,nr_inodes=12470,mode=755)
sysfs on /sys type sysfs (rw,relatime)
tmpfs on /var/log type tmpfs (rw,relatime)
tmpfs on /tmp type tmpfs (rw,relatime)
tmpfs on /run type tmpfs (rw,relatime)
proc on /proc type proc (rw,relatime)
devpts on /dev/pts type devpts (rw,relatime,gid=5,mode=620,ptmxmode=000)
tmpfs on /dev/shm type tmpfs (rw,nosuid,nodev,noexec,relatime)
configfs on /sys/kernel/config type configfs (rw,relatime)
debugfs on /sys/kernel/debug type debugfs (rw,relatime)
pstore on /sys/fs/pstore type pstore (rw,nosuid,nodev,noexec,relatime)
/dev/ubi7_0 on /userdata type ubifs (rw,relatime,assert=read-only,ubi=7,vol=0)
/dev/ubi6_0 on /oem type ubifs (rw,relatime,assert=read-only,ubi=6,vol=0)
adb on /dev/usb-ffs/adb type functionfs (rw,relatime)

```

## 7. 心跳灯的操控

  心跳灯位于 /sys/class/leds/run，向 brightness 输入 0 和 1 实现对心跳灯的控制。

```shell
# 开灯
  echo 0 > /sys/class/leds/run/brightness
#关灯
echo 1 > /sys/class/leds/run/brightness
```