import { spawn } from 'child_process';
import process from 'process';
import { generateDocument } from './ai-generate-doc.mjs';

function runBuild() {
  return new Promise((resolve, reject) => {
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const child = spawn(command, ['run', 'build'], {
      cwd: process.cwd(),
      env: process.env,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`Build failed with exit code ${code}`));
    });
  });
}

async function main() {
  const result = await generateDocument();
  if (result.help) {
    return;
  }

  await runBuild();
  console.log(
    JSON.stringify(
      {
        status: 'ok',
        outputPath: result.outputPath,
        targetType: result.targetType,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
