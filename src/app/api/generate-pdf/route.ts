import { NextRequest, NextResponse } from 'next/server';
import { GeneratedLetter } from '@/types';
import { generatePdfBuffer } from '@/lib/generatePdfBuffer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const letter: GeneratedLetter = body.letter;

    if (!letter || !letter.letterBody) {
      return NextResponse.json({ error: 'Invalid letter data' }, { status: 400 });
    }

    const pdfBuffer = await generatePdfBuffer(letter);

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
