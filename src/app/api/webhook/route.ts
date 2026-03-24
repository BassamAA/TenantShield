import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { generateLetter } from '@/lib/templateEngine';
import { generatePdfBuffer } from '@/lib/generatePdfBuffer';
import { WizardFormData } from '@/types';
import Stripe from 'stripe';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook signature verification failed';
    console.error('Webhook error:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const meta = session.metadata || {};
      const customerEmail = session.customer_details?.email;

      console.log('Payment successful:', { sessionId: session.id, plan: meta.plan });

      if (customerEmail && meta.jurisdiction && meta.issue && meta.tenantName) {
        try {
          const formData: WizardFormData = {
            jurisdiction:        meta.jurisdiction,
            issue:               meta.issue,
            tenantName:          meta.tenantName,
            landlordName:        meta.landlordName        || '',
            propertyAddress:     meta.propertyAddress     || '',
            unitNumber:          meta.unitNumber          || '',
            dateStarted:         meta.dateStarted         || '',
            issueDescription:    meta.issueDescription    || '',
            complainedVerbally:  meta.complainedVerbally  === 'true',
            verbalComplaintDate: meta.verbalComplaintDate || '',
            hasPhotos:           meta.hasPhotos           === 'true',
          };

          const letter = generateLetter(formData);
          const pdfBuffer = await generatePdfBuffer(letter);

          const filename = `TenantShield-Letter-${meta.jurisdiction}-${meta.issue}.pdf`;

          await resend.emails.send({
            from: 'TenantShield <noreply@tenant-letter.com>',
            to: customerEmail,
            subject: 'Your TenantShield Demand Letter',
            html: buildEmailHtml(formData.tenantName, meta.plan || 'one-time'),
            attachments: [{ filename, content: pdfBuffer.toString('base64') }],
          });

          console.log('Email sent to:', customerEmail.slice(0, 3) + '***');
        } catch (err) {
          // Don't fail the webhook — log and continue
          console.error('Failed to send confirmation email:', err instanceof Error ? err.message : err);
        }
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription cancelled:', subscription.id);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}

function buildEmailHtml(tenantName: string, plan: string): string {
  const isSubscription = plan === 'subscription';
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#1e3a5f;padding:32px 40px;">
            <p style="margin:0;font-size:22px;font-weight:bold;color:#ffffff;letter-spacing:1px;">
              Tenant<span style="color:#4a9e6b;">Shield</span>
            </p>
            <p style="margin:4px 0 0;font-size:11px;color:#94b8d6;">Tenant Document Preparation Service</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 16px;font-size:16px;color:#1e3a5f;font-weight:bold;">
              Hi ${tenantName},
            </p>
            <p style="margin:0 0 16px;font-size:14px;color:#444;line-height:1.6;">
              Your demand letter is attached to this email as a PDF.
            </p>
            <p style="margin:0 0 24px;font-size:14px;color:#444;line-height:1.6;">
              <strong>Next steps:</strong>
            </p>
            <ol style="margin:0 0 24px;padding-left:20px;font-size:14px;color:#444;line-height:2;">
              <li>Print the letter or save the attached PDF</li>
              <li>Send it to your landlord via email <em>and</em> certified mail</li>
              <li>Keep a copy with the date you sent it</li>
              <li>If your landlord does not respond by the deadline, contact the regulatory body named in the letter</li>
            </ol>

            ${isSubscription ? `
            <div style="background:#f0f7f2;border-left:4px solid #4a9e6b;padding:16px;border-radius:0 8px 8px 0;margin-bottom:24px;">
              <p style="margin:0;font-size:13px;color:#2d6a4f;line-height:1.6;">
                <strong>You have an active subscription.</strong> You can generate unlimited letters
                at <a href="https://tenant-letter.com/wizard" style="color:#1e3a5f;">tenant-letter.com/wizard</a>
                — each one will be emailed to you automatically.
              </p>
            </div>` : ''}

            <div style="background:#fef9ec;border:1px solid #f0d060;padding:16px;border-radius:8px;">
              <p style="margin:0;font-size:12px;color:#7a6010;line-height:1.6;">
                <strong>Legal Disclaimer:</strong> TenantShield is a document preparation service, not a law firm.
                This letter does not constitute legal advice. For advice specific to your situation,
                consult a qualified lawyer or tenant rights organization in your jurisdiction.
              </p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f4f6f9;padding:24px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
              © ${new Date().getFullYear()} TenantShield · tenant-letter.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
