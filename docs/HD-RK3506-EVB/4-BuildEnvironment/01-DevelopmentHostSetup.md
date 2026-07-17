---
sidebar_position: 1
---

# 开发主机环境搭建

:::tip 提示

本节详细介绍如何在Windows系统上利用VMware安装一台Ubuntu系统（以Ubuntu 22为例展示）的虚拟机（安装VMware、新建VMware虚拟机、为虚拟机安装Ubuntu系统、设置共享文件夹，中文设置，安装工具包软件包等）。


:::

## 1. 下载Ubuntu镜像文件

  1- 进入镜像网站：https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/，选择需要下载的版本：

<img src={require('./images/01-developmenthostsetup-01.png').default} alt="企业微信截图_17763276372155.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

2- 点击需要的版本进行下载

<img src={require('./images/01-developmenthostsetup-12.png').default} alt="企业微信截图_17763323532819.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

-   desktop：表示这个系统是有GUI图形界面的。
-   live-server：表示这个系统是没有GUI界面的，只有命令行。
-   amd64：适合于amd架构的芯片：Intel处理器和AMD处理器一般是amd64架构。

## 2. 安装VMware

  什么是VMware Workstation：VMware Workstation是一款由VMware公司开发的桌面虚拟化软件，允许用户在单一的物理计算机上同时运行多个操作系统。它提供了一种安全、封闭的环境来测试、开发、演示和部署软件。

**下载链接**： [VMware-workstation-full-17.6.1.zip](https://vanxoak.yuque.com/attachments/yuque/0/2026/zip/35275148/1784078006615-305b9cee-5908-488b-9b24-54293e645c5f.zip)

1- 双击安装，点击下一步

<img src={require('./images/01-developmenthostsetup-23.png').default} alt="企业微信截图_17764071365181.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

2- 勾选接受协议后，点击下一步

<img src={require('./images/01-developmenthostsetup-34.png').default} alt="企业微信截图_17763888617852.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

3- 选择安装位置，勾选添加到系统PATH，点击下一步

<img src={require('./images/01-developmenthostsetup-43.png').default} alt="企业微信截图_17763889683240.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

4- 点击下一步

<img src={require('./images/01-developmenthostsetup-44.png').default} alt="企业微信截图_17763890517321.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

5- 点击下一步

<img src={require('./images/01-developmenthostsetup-45.png').default} alt="企业微信截图_17763891552444.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

6- 点击安装，点击完成，就完成安装了

## 3. 新建虚拟机

1- 系统框中搜索VMware后，双击打开。

<img src={require('./images/01-developmenthostsetup-46.png').default} alt="image.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

<img src={require('./images/01-developmenthostsetup-47.png').default} alt="企业微信截图_17763901335086.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

2- 点击创建新的虚拟机；或点击左上角的**文件**，点击**新建虚拟机**；两种方式均可

<img src={require('./images/01-developmenthostsetup-02.png').default} alt="企业微信截图_17763903688246.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

3- 选择通过经典模式创建虚拟机，点击下一步

<img src={require('./images/01-developmenthostsetup-03.png').default} alt="企业微信截图_17763905225620.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

4- 选择下载的系统镜像文件，点击下一步

<img src={require('./images/01-developmenthostsetup-04.png').default} alt="企业微信截图_17763919493083.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

5- 输入Linux全名、用户名、密码和确认密码后，点击下一步

-   全名：这是计算机的名字，在命令行终端会显示，建议简短以系统版本命名
-   用户名：默认的用户名，会在命令行终端显示，建议简短，英文
-   密码：建议简短，经常会输入

<img src={require('./images/01-developmenthostsetup-05.png').default} alt="企业微信截图_1776392746843.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

6- 输入虚拟机名称、虚拟机安装位置，点击下一步

-   虚拟机名称：这里的虚拟机名称是VMware管理虚拟机时使用的，不是虚拟机内部的名称。
-   安装位置：选择一个空间足够的位置即可，尽量不要包含中文、特殊符号、空格等。

<img src={require('./images/01-developmenthostsetup-06.png').default} alt="企业微信截图_17763934048584.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

7- 输入最大磁盘大小，选择讲虚拟磁盘拆分为多个文件，点击下一步

-   最大磁盘大小：这是指定虚拟机占用宿主机的最大大小，这个可以调整大一些，因为虚拟机实际占用大小是慢慢增加的，而不是一开始就是指定值大小，并且这个值后期可以修改。

<img src={require('./images/01-developmenthostsetup-07.png').default} alt="企业微信截图_17763934792071.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

8- 点击自定义硬件

<img src={require('./images/01-developmenthostsetup-08.png').default} alt="企业微信截图_17763940368498.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

-   设置虚拟机内存

<img src={require('./images/01-developmenthostsetup-09.png').default} alt="企业微信截图_17763942145806.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

-   设置处理器

<img src={require('./images/01-developmenthostsetup-10.png').default} alt="企业微信截图_17763943327757.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

-   设置网络适配器

<img src={require('./images/01-developmenthostsetup-11.png').default} alt="企业微信截图_17763943901404.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

桥接模式：

-   在桥接模式下，虚拟机直接连接到主机的物理网络，就像是网络中的一个独立主机。
-   虚拟机将会获得与物理网络相同的IP地址（通常通过DHCP分配），因此它可以与网络中的其他物理设备进行直接通信。
-   这种模式适用于需要虚拟机与外部网络设备进行完全交互的场景，例如测试网络服务和配置。

NAT模式：

-   NAT模式允许虚拟机通过主机的IP地址访问外部网络。
-   虚拟机在一个虚拟的内部网络中运行，具有独立的私有IP地址，通过主机的网络连接进行地址转换。
-   这种模式限制了外部网络直接访问虚拟机，但虚拟机可以主动访问外部网络。适合需要访问互联网但不需要被外部设备访问的场景。

仅主机模式：

-   在仅主机模式下，虚拟机与主机之间建立一个隔离的网络，不与外部网络相连。
-   虚拟机可以与主机以及同一模式下的其他虚拟机进行通信，但不能直接访问外部网络。
-   适用于需要隔离测试环境或模拟内部网络的情况，不需要与外部设备通信。

综上，如果希望虚拟机可以上网，那么不要选择“仅主机模式”，建议选择NAT模式。

-   配置完后点击右下角关闭按钮，确认配置后点击完成按钮

<img src={require('./images/01-developmenthostsetup-13.png').default} alt="企业微信截图_17763945487071.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

<img src={require('./images/01-developmenthostsetup-14.png').default} alt="企业微信截图_17763946499168.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

至此，虚拟机的裸机创建成功，接下来我们还需要在裸机上安装Ubuntu操作系统才可以使用。

## 4. 在虚拟机安装操作系统

  1- 开启虚拟机：选中虚拟机，点击开启虚拟机进行启动

<img src={require('./images/01-developmenthostsetup-15.png').default} alt="企业微信截图_1776394901267.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

2- 等待虚拟机启动，来到如图界面，选择键盘布局，点击Continue

<img src={require('./images/01-developmenthostsetup-16.png').default} alt="企业微信截图_1776395274339.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

3- 勾选，点击Continue

<img src={require('./images/01-developmenthostsetup-17.png').default} alt="企业微信截图_17764054186338.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

4- 勾选Erase disk and install Ubuntu，点击Install Now

<img src={require('./images/01-developmenthostsetup-18.png').default} alt="企业微信截图_17764056789753.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

5- 点击Continue

<img src={require('./images/01-developmenthostsetup-19.png').default} alt="企业微信截图_17764058388282.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

6- 点击Continue

<img src={require('./images/01-developmenthostsetup-20.png').default} alt="企业微信截图_1780047714614.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

7- 进行系统相关设置，设置完毕后点击Continue

-   Your name：可以随意填写
-   Your Computer Name：计算机的名字，在终端显示，建议依据系统版本取简短英文。
-   Pick a username：用户名，在终端显示，建议取简短英文。
-   Choose a password：密码，经常输入，可以取简单点。
-   Log in automatically：自动登录，也就是登陆时不需要手动输入密码，根据个人喜好选择。

<img src={require('./images/01-developmenthostsetup-21.png').default} alt="企业微信截图_17764061391832.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

8- 等待系统安装，点击Restart Now 完成安装，重启虚拟机

<img src={require('./images/01-developmenthostsetup-22.png').default} alt="企业微信截图_17764066846345.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

## 5. 安装基础的工具包和软件包

  1- 打开终端：桌面右击，点击 Open in Terminal 打开终端

<img src={require('./images/01-developmenthostsetup-24.png').default} alt="企业微信截图_17764078991673.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

2- 在终端执行如下命令，安装常用工具包和软件包

```shell
# 更新软件包列表，获取最新的软件包信息
  sudo apt update -y

# 升级已安装的所有软件包到最新版本
  sudo apt upgrade -y

# 安装build-essential，包含了编译软件所需的基本工具，如gcc、g++和make等
  sudo apt install build-essential -y

# 安装git版本控制系统，用于代码管理和版本控制
  sudo apt install git -y

# 安装网络工具包：
# net-tools：包含ifconfig、netstat等常用网络命令
# curl：用于发送HTTP请求的命令行工具
# wget：用于从网络下载文件的工具
  sudo apt install net-tools curl wget -y

# 安装SSH服务器，允许远程安全连接到此服务器
  sudo apt install openssh-server -y

#安装vim文本编辑工具
sudo apt install vim -y
```

## 6. 设置共享文件夹

### 6.1 创建共享文件夹

  首先在Windows系统中，创建一个文件夹来用作共享文件夹，可以根据自己的需求，找一个盘符空间相对大一点的目录创建。

这里以D:/ubuntu-share目录为例，创建一个no1的目录，用作与ubuntu共享的目录

<img src={require('./images/01-developmenthostsetup-25.png').default} alt="企业微信截图_17764130365781.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

### 6.2 VMware设置

  1- 虚拟机设置：

VMware控制台左侧点击需要设置共享文件夹的虚拟机，然后点击左侧的编辑虚拟机设置：

<img src={require('./images/01-developmenthostsetup-26.png').default} alt="企业微信截图_17764131426794.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

2- 点击选项，点击共享文件夹，勾选总是启用，点击添加

<img src={require('./images/01-developmenthostsetup-27.png').default} alt="企业微信截图_17764133042497.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

3- 添加共享文件夹目录

-   点击下一步

<img src={require('./images/01-developmenthostsetup-28.png').default} alt="企业微信截图_17764133921139.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

-   设置共享文件夹路径与名称，点击下一步

<img src={require('./images/01-developmenthostsetup-29.png').default} alt="企业微信截图_17764134933032.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

-   勾选启用此共享，点击完成

<img src={require('./images/01-developmenthostsetup-30.png').default} alt="企业微信截图_17764135461853.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

4- 点击确定，完成共享文件夹设置

<img src={require('./images/01-developmenthostsetup-31.png').default} alt="企业微信截图_17764136253796.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

### 6.3 Ubuntu设置

  VMware设置完成之后，进行Ubuntu的设置。开启虚拟机，打开终端。

1- 输入以下命令，显示共享文件夹

```shell
u22@ubuntu22:~/Desktop$ vmware-hgfsclient 
share
```

2- 创建hgfs目录

```shell
u22@ubuntu22:~/Desktop$ cd /mnt/
u22@ubuntu22:/mnt$ sudo mkdir /mnt/hgfs
u22@ubuntu22:/mnt$ ls
hgfs
```

3- 挂载共享目录

```shell
sudo /usr/bin/vmhgfs-fuse .host:/ /mnt/hgfs -o allow_other -o uid=1000 -o gid=1000 -o umask=022
```

验证是否挂载成功：

-   在Windows文件夹中，创建一个文件

<img src={require('./images/01-developmenthostsetup-32.png').default} alt="企业微信截图_17764146186100.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

-   虚拟机中，在ubuntu切换进该目录，查看文件，创建成功

```shell
u22@ubuntu22:/mnt$ cd /mnt/hgfs/share/no1/
u22@ubuntu22:/mnt/hgfs/share/no1$ ls
1.txt
```

4- 设置开机自动挂载

输入以下命令，编辑/etc/fstab文件

```shell
sudo vim /etc/fstab
```

按 i 键进行输入，在最后面，插入挂载命令，按ESC键，: 键后输入wq进行保存

```shell
.host:/ /mnt/hgfs fuse.vmhgfs-fuse allow_other,uid=1000,gid=1000,umask=022 0 0
```

<img src={require('./images/01-developmenthostsetup-33.png').default} alt="企业微信截图_17764163113081.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

5- 重启虚拟机，进入共享文件夹，查看是否挂载成功

```shell
u22@ubuntu22:~/Desktop$ cd /mnt/hgfs/share/no1/
u22@ubuntu22:/mnt/hgfs/share/no1$ ls
1.txt
```

## 7. 中文设置

  1- 点击桌面右上角，点击Settings设置

<img src={require('./images/01-developmenthostsetup-35.png').default} alt="企业微信截图_17767347531169.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

2- 下翻，点击Region & Language，点击Manage Installed Languages下载语言

<img src={require('./images/01-developmenthostsetup-36.png').default} alt="企业微信截图_1776735190836.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

3- 点击Install下载，输入虚拟机用户密码后开始下载

<img src={require('./images/01-developmenthostsetup-37.png').default} alt="企业微信截图_17767352484537.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

4- 下载完成后，将汉语拖至第一个，点击Apply System-Wide添加

<img src={require('./images/01-developmenthostsetup-38.png').default} alt="企业微信截图_17767355749913.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

5- 点击Language打开语言选择

<img src={require('./images/01-developmenthostsetup-39.png').default} alt="企业微信截图_17767357341774.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

6- 选择Chinese中文，点击Select选择

<img src={require('./images/01-developmenthostsetup-40.png').default} alt="企业微信截图_17767350486697.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

7- 选择完成后，点击Restart重启会话

<img src={require('./images/01-developmenthostsetup-41.png').default} alt="企业微信截图_17767359935717.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>

8- 会话重启后，需要选择是否修改文件夹名称

> ⚠️注：建议保留英文名称，中文名称需要额外添加中文输入法后，才能在终端进入以下目录

<img src={require('./images/01-developmenthostsetup-42.png').default} alt="企业微信截图_17767366133232.png" style={{display: 'block', margin: '20px auto', maxWidth: '80%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}/>