import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { LetterPDF } from '@/lib/pdfGenerator';
import { GeneratedLetter } from '@/types';
import React from 'react';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const letter: GeneratedLetter = body.letter;

    if (!letter || !letter.letterBody) {
      return NextResponse.json({ error: 'Invalid letter data' }, { status: 400 });
    }

    const element = React.createElement(LetterPDF, { letter });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(element as any);

    // Convert Buffer to Uint8Array for NextResponse compatibility
    const uint8Array = new Uint8Array(pdfBuffer);

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="TenantShield-Letter-${letter.jurisdiction}-${letter.issue}.pdf"`,
        'Content-Length': uint8Array.length.toString(),
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    const message = error instanceof Error ? error.message : 'PDF generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
