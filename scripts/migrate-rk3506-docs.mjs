import fs from 'node:fs';
import path from 'node:path';

const repo = path.resolve(import.meta.dirname, '..');
const source = path.resolve(repo, '..', '万象奥科', 'RK3506产品资料', 'RK3506-EVB-100Ask');
const target = path.join(repo, 'docs', 'HD-RK3506-EVB');

const categories = {
  '': ['', 'HD-RK3506-EVB', 1],
  '快速使用': ['1-QuickStart', '快速使用', 2],
  '板载功能体验': ['2-OnboardFeatures', '板载功能体验', 3],
  '应用开发/交叉编译环境搭建': ['3-ApplicationDevelopment/1-CrossCompilation', '交叉编译环境搭建', 1],
  '应用开发/基础编程': ['3-ApplicationDevelopment/2-BasicProgramming', '基础编程', 2],
  '应用开发/硬件接口应用编程': ['3-ApplicationDevelopment/3-HardwareInterfaces', '硬件接口应用编程', 3],
  '应用开发/图形页面应用开发': ['3-ApplicationDevelopment/4-GraphicsDevelopment', '图形页面应用开发', 4],
  '应用开发/应用部署与自启动': ['3-ApplicationDevelopment/5-DeploymentAndAutostart', '应用部署与自启动', 5],
  '开发环境与编译体系': ['4-BuildEnvironment', '开发环境与编译体系', 4],
  '驱动开发': ['5-DriverDevelopment', '驱动开发', 5],
  '系统开发': ['6-SystemDevelopment', '系统开发', 6],
};

const categoryParents = {
  '3-ApplicationDevelopment': ['应用开发', 4],
};

const names = {
  'HD-RK3506-EVB产品介绍': 'ProductIntroduction',
  '开箱清单与硬件接口速览': 'UnboxingAndHardwareOverview',
  '02-_硬件连接': '02-HardwareConnection',
  '03-_串口调试指南': '03-SerialDebugging',
  '04-_ADB调试连接与常用指令': '04-ADBDebugging',
  '05-_文件传输指南': '05-FileTransfer',
  '06-_一分钟快速体验': '06-OneMinuteQuickStart',
  '07-_固件烧录全流程': '07-FirmwareFlashing',
  '01-_网络使用': '01-NetworkUsage', '02-_WIFI与蓝牙': '02-WiFiAndBluetooth',
  '03-_U盘与SD卡使用': '03-USBDriveAndSDCard', '04-_显示接口使用(MIPI_RGB)': '04-DisplayInterfaces',
  '05-_扩展IO使用': '05-ExpansionIO', '06-_串口使用': '06-SerialPortUsage', '07-_RTC时钟': '07-RTCClock',
  '01-_交叉编译工具链安装与配置': '01-CrossCompilerInstallation', '02-_Makefile的使用及工程模板': '02-MakefileAndProjectTemplate',
  '01-_HelloWorld_程序编译与运行': '01-HelloWorldCompilation', '02-_Shell脚本编程': '02-ShellScripting',
  '03-_文件基础操作': '03-BasicFileOperations', '04-_输入系统应用编程': '04-InputSystemProgramming', '05-_网络编程': '05-NetworkProgramming',
  '01-_GPIO应用编程': '01-GPIOProgramming', '02-_串口(UART)应用编程': '02-UARTProgramming',
  '04-_CAN总线应用编程': '04-CANBusProgramming', '05-_I2C应用编程': '05-I2CProgramming',
  '06-_加密芯片_RJGT102应用编程': '06-RJGT102SecurityChipProgramming', '01-_LVGL应用编程': '01-LVGLProgramming',
  '01-_应用部署与打包': '01-ApplicationDeploymentAndPackaging', '02-_设置应用开机自启动': '02-ApplicationAutostart',
  '01-开发主机环境搭建': '01-DevelopmentHostSetup', '02-SDK源码获取': '02-SDKSourceAcquisition',
  '03-_完整系统编译': '03-FullSystemBuild', '04-_SDK开发指南': '04-SDKDevelopmentGuide',
  'HelloWorld驱动开发入门(无硬件操作)': '01-HelloWorldDriverIntroduction', '01-_UART驱动开发指南': '02-UARTDriverDevelopment',
  '02-SPI驱动开发指南': '03-SPIDriverDevelopment', '03-_PWM开发指南': '04-PWMDriverDevelopment',
  '04-_I2C开发指南': '05-I2CDriverDevelopment', '05-_Pinctrl开发指南': '06-PinctrlDriverDevelopment',
  '06-_CAN_CAN-FD_开发指南': '07-CANAndCANFDDriverDevelopment', '07-_WATCHDOG开发指南': '08-WatchdogDriverDevelopment',
  'RK3506_OTA升级指南': '01-OTAUpgradeGuide', 'RK3506_SD卡启动指南': '02-SDCardBootGuide',
  'RK3506_UVC摄像头开发指南': '03-UVCCameraDevelopmentGuide', 'SSH_网络远程登录指南': '04-SSHRemoteLoginGuide',
};

const normalize = value => value.split(path.sep).join('/');
const documentTitle = base => base
  .replace(/^\d+-_?/, '')
  .replaceAll('_', ' ')
  .replace(/\s+/g, ' ')
  .trim();
const markdownFiles = fs.readdirSync(source, {recursive: true, withFileTypes: true})
  .filter(entry => entry.isFile() && entry.name.toLowerCase().endsWith('.md'))
  .map(entry => path.join(entry.parentPath, entry.name));

if (fs.existsSync(target)) fs.rmSync(target, {recursive: true, force: true});
fs.mkdirSync(target, {recursive: true});

const writeCategory = (dir, label, position) => {
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(path.join(dir, '_category_.json'), JSON.stringify({
    label, position, collapsed: true,
    link: {type: 'generated-index', description: `${label}相关文档。`},
  }, null, 2) + '\n');
};

for (const [rel, [label, position]] of Object.entries(categoryParents)) writeCategory(path.join(target, rel), label, position);
for (const [srcCategory, [destCategory, label, position]] of Object.entries(categories)) {
  if (srcCategory) writeCategory(path.join(target, destCategory), label, position);
}

const docs = [];
for (const srcDoc of markdownFiles) {
  const rel = path.relative(source, srcDoc);
  const srcDir = normalize(path.dirname(rel)) === '.' ? '' : normalize(path.dirname(rel));
  const category = categories[srcDir];
  if (!category) throw new Error(`No category mapping for ${srcDir}`);
  const base = path.basename(srcDoc, '.md');
  const englishBase = names[base];
  if (!englishBase) throw new Error(`No English name mapping for ${base}`);
  const destDir = path.join(target, category[0]);
  const destDoc = path.join(destDir, `${englishBase}.md`);
  docs.push({srcDoc, srcDir, base, englishBase, destDir, destDoc});
}

for (const doc of docs) {
  fs.mkdirSync(doc.destDir, {recursive: true});
  const imageDir = path.join(doc.destDir, 'images');
  fs.mkdirSync(imageDir, {recursive: true});
  let content = fs.readFileSync(doc.srcDoc, 'utf8').replace(/^\uFEFF/, '');
  let imageIndex = 0;
  const sourceAssetDir = path.join(path.dirname(doc.srcDoc), 'assets');
  if (fs.existsSync(sourceAssetDir)) {
    const sourceImages = fs.readdirSync(sourceAssetDir, {withFileTypes: true})
      .filter(entry => entry.isFile())
      .map(entry => path.join(sourceAssetDir, entry.name))
      .filter(file => /\.(png|jpe?g|gif|svg|webp)$/i.test(file));
    for (const srcImage of sourceImages) {
      const sourceName = path.basename(srcImage);
      const refs = [`assets/${sourceName}`, `./assets/${sourceName}`, encodeURI(`assets/${sourceName}`)];
      if (!refs.some(ref => content.includes(ref))) continue;
      imageIndex += 1;
      const ext = path.extname(srcImage).toLowerCase();
      const englishImage = `${doc.englishBase.toLowerCase()}-${String(imageIndex).padStart(2, '0')}${ext}`;
      fs.copyFileSync(srcImage, path.join(imageDir, englishImage));
      for (const ref of refs) content = content.replaceAll(ref, `images/${englishImage}`);
    }
  }
  // Remove stale Yuque-export placeholders; the export places the valid asset immediately after each one.
  content = content.replace(/!\[[^\]]*\]\(\.\/images\/[^)]+\)/g, '');
  // Yuque Markdown permits text that MDX interprets as JSX/expressions. Normalize known constructs.
  content = content.replaceAll('<br>', '<br/>');
  if (doc.englishBase === '02-WiFiAndBluetooth') {
    content = content.replace(/\| (select|system-alias|agent|remove|advertise) (<[^|]+>) \|/g, '| `$1 $2` |');
  }
  if (doc.englishBase === '02-MakefileAndProjectTemplate') {
    content = content.replace('| $< |', '| `$<` |');
  }
  if (doc.englishBase === '02-ShellScripting') {
    content = content.replace(/\| (\$\{[^|]+\}) \|/g, '| `$1` |');
    content = content.replace('| < | 按照ASCII', '| `&lt;` | 按照ASCII');
    content = content.replace('左花括号 { 可以写在', '左花括号 `{` 可以写在');
  }
  if (doc.englishBase === '05-NetworkProgramming') {
    content = content.replaceAll('客户端<--->服务器', '客户端 &lt;---&gt; 服务器');
    content = content.replaceAll('头文件<netinet/in.h>', '头文件 `&lt;netinet/in.h&gt;`');
  }
  if (doc.englishBase === '08-WatchdogDriverDevelopment') {
    content = content.replace(/^-\s+(interrupts|clocks) = (.+);$/gm, '- `$1 = $2;`');
  }
  const title = documentTitle(doc.base);
  // Keep exactly one canonical document title at the top. Section headings later in the source remain unchanged.
  if (/^\s*#\s+[^\n]+\n/.test(content)) {
    content = content.replace(/^\s*#\s+[^\n]+\n/, `# ${title}\n`);
  } else {
    content = `# ${title}\n\n${content}`;
  }
  const numericPrefix = Number.parseInt(doc.englishBase, 10);
  const position = Number.isFinite(numericPrefix) ? numericPrefix : (doc.srcDir ? 1 : doc.englishBase === 'ProductIntroduction' ? 1 : 2);
  if (!content.startsWith('---\n')) content = `---\nsidebar_position: ${position}\n---\n\n${content}`;
  fs.writeFileSync(doc.destDoc, content);
}

console.log(`Migrated ${docs.length} Markdown documents to ${target}`);
console.log(`Copied ${fs.readdirSync(target, {recursive: true, withFileTypes: true}).filter(e => e.isFile() && /\.(png|jpe?g|gif|svg|webp)$/i.test(e.name)).length} referenced images`);
