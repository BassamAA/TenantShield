import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { join } from 'path';
import { GeneratedLetter } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const letter: GeneratedLetter = body.letter;

    if (!letter || !letter.letterBody) {
      return NextResponse.json({ error: 'Invalid letter data' }, { status: 400 });
    }

    const pdfBuffer = await generatePdfViaWorker(letter);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="TenantShield-Letter-${letter.jurisdiction}-${letter.issue}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    const message = error instanceof Error ? error.message : 'PDF generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function generatePdfViaWorker(letter: GeneratedLetter): Promise<Buffer> {
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

    child.on('error', (err) => reject(err));

    const input = JSON.stringify(letter);
    child.stdin.write(input);
    child.stdin.end();
  });
}
