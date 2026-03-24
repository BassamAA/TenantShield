/**
 * Standalone PDF generation worker — runs as a child process outside Next.js bundling.
 * Reads letter JSON from stdin, writes PDF bytes to stdout.
 * stderr is used for error messages.
 */
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Load from the project's node_modules, not any parent workspace
const projectRoot = join(__dirname, '..');
const React = require(join(projectRoot, 'node_modules/react'));
const {
  Document, Page, Text, View, StyleSheet, renderToBuffer,
} = require(join(projectRoot, 'node_modules/@react-pdf/renderer'));

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    fontSize: 11,
    paddingTop: 60,
    paddingBottom: 60,
    paddingLeft: 72,
    paddingRight: 72,
    lineHeight: 1.5,
    color: '#1a1a1a',
  },
  letterhead: {
    borderBottomWidth: 2,
    borderBottomColor: '#1e3a5f',
    paddingBottom: 12,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  brandName:    { fontSize: 18, fontFamily: 'Times-Bold', color: '#1e3a5f', letterSpacing: 1 },
  brandTagline: { fontSize: 8, color: '#4a6741', marginTop: 2 },
  dateSection:  { textAlign: 'right', fontSize: 10, color: '#555' },
  sectionTitle: { fontFamily: 'Times-Bold', fontSize: 11, marginTop: 14, marginBottom: 4, textDecoration: 'underline' },
  paragraph:    { marginBottom: 10, textAlign: 'justify' },
  demandItem:   { marginBottom: 5, paddingLeft: 10 },
  citationItem: { marginBottom: 5, paddingLeft: 10, fontSize: 10, color: '#333' },
  highlight:    { fontFamily: 'Times-Bold' },
  urgentBadge:  { backgroundColor: '#7f1d1d', color: '#fff', padding: '3 8', fontSize: 9, borderRadius: 2, marginBottom: 16, alignSelf: 'flex-start' },
  signatureSection: { marginTop: 30 },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 72,
    right: 72,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    paddingTop: 6,
    fontSize: 7,
    color: '#888',
    textAlign: 'center',
  },
});

// ── Component (plain React.createElement — no JSX) ───────────────────────────
function LetterPDF({ letter }) {
  const { template, formData } = letter;
  const isEmergency = template.isEmergency;

  const c = (type, props, ...children) => React.createElement(type, props, ...children);

  return c(Document,
    { title: 'TenantShield Letter', author: formData.tenantName },

    c(Page, { size: 'LETTER', style: styles.page },

      // Letterhead
      c(View, { style: styles.letterhead },
        c(View, null,
          c(Text, { style: styles.brandName }, 'TENANTSHIELD'),
          c(Text, { style: styles.brandTagline }, 'Tenant Document Preparation Service'),
        ),
        c(View, { style: styles.dateSection },
          c(Text, null, letter.dateGenerated),
        ),
      ),

      // Emergency badge
      isEmergency
        ? c(View, { style: styles.urgentBadge },
            c(Text, null, 'URGENT — EMERGENCY NOTICE — RESPONSE REQUIRED WITHIN 24 HOURS'),
          )
        : null,

      // Addressee
      c(View, { style: { marginBottom: 16 } },
        c(Text, null, formData.landlordName),
        c(Text, { style: { marginTop: 6, fontSize: 10, color: '#555' } },
          'RE: ' + formData.propertyAddress + (formData.unitNumber ? ', Unit ' + formData.unitNumber : ''),
        ),
      ),

      // Salutation
      c(Text, { style: styles.paragraph }, 'Dear ' + formData.landlordName + ','),

      // Subject
      c(Text, { style: { ...styles.paragraph, fontFamily: 'Times-Bold' } },
        'RE: FORMAL NOTICE OF HOUSING CODE VIOLATION AND DEMAND FOR REPAIR\n' +
        'Property: ' + formData.propertyAddress + (formData.unitNumber ? ', Unit ' + formData.unitNumber : ''),
      ),

      // Opening
      c(Text, { style: styles.paragraph }, template.openingParagraph),

      // Violation description
      c(Text, { style: styles.sectionTitle }, 'DESCRIPTION OF VIOLATION'),
      c(Text, { style: styles.paragraph }, template.violationDescription),
      formData.issueDescription
        ? c(Text, { style: styles.paragraph },
            'Specifically, the following conditions have been observed:\n\n' + formData.issueDescription,
          )
        : null,
      c(Text, { style: styles.paragraph },
        'This condition has been ongoing since approximately ' +
        (formData.dateStarted || '[date not specified]') + '.' +
        (formData.complainedVerbally
          ? ' I have previously raised this issue verbally' +
            (formData.verbalComplaintDate ? ' on ' + formData.verbalComplaintDate : '') +
            '; despite this communication, the problem remains unresolved.'
          : '') +
        (formData.hasPhotos
          ? ' I have documented this condition with photographs, which will be submitted as evidence in any formal proceeding.'
          : ''),
      ),

      // Legal basis
      c(Text, { style: styles.sectionTitle }, 'LEGAL BASIS'),
      c(Text, { style: styles.paragraph }, template.legalBasis),
      c(Text, { style: { ...styles.paragraph, fontFamily: 'Times-Bold', fontSize: 10 } }, 'Applicable Legal Authority:'),
      ...template.legalCitations.map((citation, idx) =>
        c(Text, { key: idx, style: styles.citationItem },
          '• ' + citation.act + ', ' + citation.section + ':\n  ' + citation.description,
        ),
      ),

      // Demands
      c(Text, { style: styles.sectionTitle }, 'DEMANDS'),
      c(Text, { style: styles.paragraph },
        'I hereby formally demand that you take the following actions no later than ' +
        letter.deadlineDate + ' (' + template.deadlineDays + ' ' +
        (template.deadlineDays === 1 ? 'day' : 'days') + ' from the date of this letter):',
      ),
      ...template.demands.map((demand, idx) =>
        c(Text, { key: idx, style: styles.demandItem }, (idx + 1) + '. ' + demand),
      ),

      // Escalation
      c(Text, { style: styles.sectionTitle }, 'CONSEQUENCES OF NON-COMPLIANCE'),
      c(Text, { style: styles.paragraph }, template.escalationWarning),

      // Closing
      c(Text, { style: styles.paragraph }, template.closingStatement),

      // Signature
      c(View, { style: styles.signatureSection },
        c(Text, { style: styles.paragraph }, 'Respectfully,'),
        c(Text, { style: { marginTop: 20, fontFamily: 'Times-Bold' } }, formData.tenantName),
        c(Text, { style: { fontSize: 10, color: '#555' } },
          'Tenant, ' + formData.propertyAddress +
          (formData.unitNumber ? ', Unit ' + formData.unitNumber : ''),
        ),
      ),

      // Footer
      c(View, { style: styles.footer },
        c(Text, null,
          'This document was prepared with TenantShield (tenant-letter.com). ' +
          'TenantShield provides document preparation assistance and is not a law firm. ' +
          'This document does not constitute legal advice.',
        ),
      ),
    ),
  );
}

// ── Main: read letter from stdin, write PDF to stdout ───────────────────────
async function main() {
  let raw = '';
  process.stdin.setEncoding('utf8');
  for await (const chunk of process.stdin) raw += chunk;

  const letter = JSON.parse(raw);
  const element = React.createElement(LetterPDF, { letter });
  const buffer = await renderToBuffer(element);
  process.stdout.write(buffer);
}

main().catch((err) => {
  process.stderr.write('PDF worker error: ' + err.message + '\n');
  process.exit(1);
});
