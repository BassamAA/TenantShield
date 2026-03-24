import { spawn } from 'child_process';
import { join } from 'path';
import { GeneratedLetter } from '@/types';

export function generatePdfBuffer(letter: GeneratedLetter): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const workerPath = join(process.cwd(), 'scripts', 'pdf-worker.mjs');
    const child = spawn(process.execPath, [workerPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const chunks: Buffer[] = [];
    const errChunks: Buffer[] = [];

    child.stdout.on('data', (chunk: Buffer) => chunks.push(chunk));
    child.stderr.on('data', (chunk: Buffer) => errChunks.push(chunk));

    child.on('close', (code) => {
      if (code !== 0) {
        const errMsg = Buffer.concat(errChunks).toString();
        reject(new Error(`PDF worker exited with code ${code}: ${errMsg}`));
      } else {
        resolve(Buffer.concat(chunks));
      }
    });

    child.on('error', reject);

    child.stdin.write(JSON.stringify(letter));
    child.stdin.end();
  });
}
