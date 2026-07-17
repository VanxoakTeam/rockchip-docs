---
sidebar_position: 8
---

# WATCHDOG开发指南

## 1. WDT 驱动

### 1.1 驱动⽂件

  驱动⽂件所在位置： `drivers/watchdog/dw_wdt.c`

### 1.2 DTS 节点配置

  DTS 配置参考⽂档 为 `Documentation/devicetree/bindings/watchdog/dw_wdt.txt` ，本⽂主要说明 如下参数:

- `interrupts = <GIC\_SPI 120 IRQ\_TYPE\_LEVEL\_HIGH 0>;`

中断模式时候⽤于⾸先触发中断，再经过⼀个超时周期才产⽣复位信号。

- `clocks = <&cru PCLK\_WDT>;`

驱动WDT⼯作，并且⽤于计算每个计数周期。

## 2. WDT 使用

  应⽤操作`/dev/watchdog` 节点来控制watchdog，⽰例如下：

```bash
int main(void)
{
  int fd = open("/dev/watchdog", O_WRONLY); 通过open来启动watchdog
  int ret = 0;
  if (fd == -1) {
    perror("watchdog");
    exit(EXIT_FAILURE);
  }
  
  while (1) {
    ret = write(fd, "\0", 1); 通过write来喂狗
    if (ret != 1) {
      ret = -1;
      break;
    }
    sleep(10);
  }
  
  close(fd);
  return ret;
}
```

关于 `close()`

1.  正常情况下 `close()` ，不再喂狗，watchdog会⾃动重启。

`echo A > /dev/watchdog` , 这⾥写⼊的是除⼤写V以外的任意字符。

2.  `write(fd, "V", 1);` 再 `close()` ，写⼊⼤写V，内核继续喂狗，系统不会⾃动重启。

`echo V > /dev/watchdog`

3.  配置宏 `CONFIG_WATCHDOG_NOWAYOUT` ，重复步骤2，内核不会继续喂狗，系统会被重启。

## 3. 内核配置

```bash
Symbol: WATCHDOG [=y]
Type : boolean
Prompt: Watchdog Timer Support
  Location:
  (1) -> Device Drivers
    Defined at drivers/watchdog/Kconfig:6
```

## 4. 常⻅问题

### 4.1 WDT⽆法停⽌

  旧版本WDT没有相应的寄存器可以配置停⽌功能，只能通过disable clock或者软复位来停⽌WDT，有些 芯⽚的clock或者复位操作只能在安全环境执⾏，未来新版本的WDT添加了停⽌功能。

### 4.2 WDT精度

  WDT精度只有16档，相邻档位计数相差⽐较⼤，因此⽆法精细计数。

```bash
0000: 0x0000ffff
0001: 0x0001ffff
0010: 0x0003ffff
0011: 0x0007ffff
0100: 0x000fffff
0101: 0x001fffff
0110: 0x003fffff
0111: 0x007fffff
1000: 0x00ffffff
1001: 0x01ffffff
1010: 0x03ffffff
1011: 0x07ffffff
1100: 0x0fffffff
1101: 0x1fffffff
1110: 0x3fffffff
1111: 0x7fffffff
```

假设wdt clock为100MHz，最⼤超时时间 0x7fffffff / 100MHz = 21秒，如果需要更⼤的超时，需要调整 对应的wdt clock。

### 4.3 RK356X暂停功能

  使⽤Rockchip⾃带的io命令或者busybox的devmem命令可以实现暂停计数以及恢复计数。

打开

```bash
CONFIG_DEVMEM
```

关闭

```bash
CONFIG_STRICT_DEVMEM
```

0xfdc60504来⾃SYS\_GRF的GRF\_SOC\_CON1寄存器，对bit4写1暂停计数，写0恢复计数，⾼16位为写 使能位。

暂停计数

```bash
io -4 0xfdc60504 0x00100010
```

或者

```bash
busybox devmem 0xfdc60504 32 0x00100010
```

恢复计数

```bash
io -4 0xfdc60504 0x00100000
```

或者

```bash
busybox devmem 0xfdc60504 32 0x00100000
```

### 4.4 RK3588暂停功能

  暂停计数

```bash
io -4 0xfd58c000 0x00010001
```

或者

```bash
busybox devmem 0xfd58c000 32 0x00010001
```

恢复计数

```bash
io -4 0xfd58c000 0x00100000
```

或者

```bash
busybox devmem 0xfd58c000 32 0x00100000
```