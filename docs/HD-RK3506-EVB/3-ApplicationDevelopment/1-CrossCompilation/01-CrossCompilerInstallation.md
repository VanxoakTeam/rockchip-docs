---
sidebar_position: 1
---

# 交叉编译工具链安装与配置

:::tip 提示

本指南将指导您如何配置交叉编译工具链。

:::

首先解压交叉编译工具链：[arm-buildroot-linux-gnueabihf_sdk-buildroot.tar.gz](https://vanxoak.yuque.com/attachments/yuque/0/2026/gz/57754166/1784077901946-deb31570-b497-4510-80b2-d5945e5be23a.gz)，到 Ubuntu 虚拟机的用户目录下，执行命令：

```shell
#解压到用户目录下：
tar -xvzf  arm-buildroot-linux-gnueabihf_sdk-buildroot.tar.gz -C ~/
```

解压完成后，执行以下命令更新交叉编译工具链路径，确保所有工具和库文件指向当前解压路径：

```shell
~/arm-buildroot-linux-gnueabihf_sdk-buildroot/relocate-sdk.sh
```

> **注意：上述命令只需运行一次，在每次移动工具链目录后，都需要重新执行此命令以更新路径。**

然后可运行交叉编译工具链的环境设置脚本，用于为应用开发准备完整的交叉编译环境：

```shell
source ~/arm-buildroot-linux-gnueabihf_sdk-buildroot/environment-setup
```

查看交叉编译工具链是否能正常运行：

```shell
user@ubuntu:~$ arm-buildroot-linux-gnueabihf-gcc -v
Using built-in specs.
COLLECT_GCC=/home/kik/arm-buildroot-linux-gnueabihf_sdk-buildroot/bin/arm-buildroot-linux-gnueabihf-gcc.br_real
COLLECT_LTO_WRAPPER=/home/kik/arm-buildroot-linux-gnueabihf_sdk-buildroot/bin/../libexec/gcc/arm-buildroot-linux-gnueabihf/12.4.0/lto-wrapper
Target: arm-buildroot-linux-gnueabihf
Configured with: ./configure --prefix=/work/vanxoak/rk3506/rk3506_linux6.1_sdk/buildroot/output/rockchip_rk3506/host --sysconfdir=/work/vanxoak/rk3506/rk3506_linux6.1_sdk/buildroot/output/rockchip_rk3506/host/etc --enable-static --target=arm-buildroot-linux-gnueabihf --with-sysroot=/work/itrunk/rk3506/rk3506_linux6.1_sdk/buildroot/output/rockchip_rk3506/host/arm-buildroot-linux-gnueabihf/sysroot --enable-__cxa_atexit --with-gnu-ld --disable-libssp --disable-multilib --disable-decimal-float --enable-plugins --enable-lto --with-gmp=/work/itrunk/rk3506/rk3506_linux6.1_sdk/buildroot/output/rockchip_rk3506/host --with-mpc=/work/itrunk/rk3506/rk3506_linux6.1_sdk/buildroot/output/rockchip_rk3506/host --with-mpfr=/work/itrunk/rk3506/rk3506_linux6.1_sdk/buildroot/output/rockchip_rk3506/host --with-pkgversion='Buildroot linux-6.1-stan-rkr4.2-1-g5f8a92d2-dirty' --with-bugurl=https://gitlab.com/buildroot.org/buildroot/-/issues --without-zstd --disable-libquadmath --disable-libquadmath-support --enable-tls --enable-threads --without-isl --without-cloog --with-abi=aapcs-linux --with-cpu=cortex-a7 --with-fpu=neon-vfpv4 --with-float=hard --with-mode=arm --enable-languages=c,c++ --with-build-time-tools=/work/itrunk/rk3506/rk3506_linux6.1_sdk/buildroot/output/rockchip_rk3506/host/arm-buildroot-linux-gnueabihf/bin --enable-shared --disable-libgomp
Thread model: posix
Supported LTO compression algorithms: zlib
gcc version 12.4.0 (Buildroot linux-6.1-stan-rkr4.2-1-g5f8a92d2-dirty) 
```

打印上述类似的版本信息，证明工具链已成功安装。每次打开新的 shell 终端，需重新运行交叉编译工具链的环境设置脚本。也可将该命令写入~/.bashrc 文件中，这样每次打开新的 shell 终端会自动设置交叉编译环境。
