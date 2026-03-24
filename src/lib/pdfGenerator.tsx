import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { GeneratedLetter } from '@/types';
import React from 'react';

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
  brandName: {
    fontSize: 18,
    fontFamily: 'Times-Bold',
    color: '#1e3a5f',
    letterSpacing: 1,
  },
  brandTagline: {
    fontSize: 8,
    color: '#4a6741',
    marginTop: 2,
  },
  dateSection: {
    textAlign: 'right',
    fontSize: 10,
    color: '#555',
  },
  sectionTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    marginTop: 14,
    marginBottom: 4,
    textDecoration: 'underline',
  },
  paragraph: {
    marginBottom: 10,
    textAlign: 'justify',
  },
  demandItem: {
    marginBottom: 5,
    paddingLeft: 10,
  },
  citationItem: {
    marginBottom: 5,
    paddingLeft: 10,
    fontSize: 10,
    color: '#333',
  },
  signatureSection: {
    marginTop: 30,
  },
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
  highlight: {
    fontFamily: 'Times-Bold',
  },
  urgentBadge: {
    backgroundColor: '#7f1d1d',
    color: '#fff',
    padding: '3 8',
    fontSize: 9,
    borderRadius: 2,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
});

interface LetterPDFProps {
  letter: GeneratedLetter;
}

export function LetterPDF({ letter }: LetterPDFProps) {
  const { template, formData } = letter;
  const isEmergency = template.isEmergency;

  return (
    <Document
      title={`TenantShield — Violation Letter`}
      author={formData.tenantName}
      subject={`Formal Notice of Housing Violation — ${formData.propertyAddress}`}
    >
      <Page size="LETTER" style={styles.page}>
        {/* Letterhead */}
        <View style={styles.letterhead}>
          <View>
            <Text style={styles.brandName}>TENANTSHIELD</Text>
            <Text style={styles.brandTagline}>Tenant Document Preparation Service</Text>
          </View>
          <View style={styles.dateSection}>
            <Text>{letter.dateGenerated}</Text>
          </View>
        </View>

        {/* Emergency badge */}
        {isEmergency && (
          <View style={styles.urgentBadge}>
            <Text>⚠ URGENT — EMERGENCY NOTICE — RESPONSE REQUIRED WITHIN 24 HOURS</Text>
          </View>
        )}

        {/* Addressee */}
        <View style={{ marginBottom: 16 }}>
          <Text>{formData.landlordName}</Text>
          <Text style={{ marginTop: 6, fontSize: 10, color: '#555' }}>
            RE: {formData.propertyAddress}{formData.unitNumber ? `, Unit ${formData.unitNumber}` : ''}
          </Text>
        </View>

        {/* Salutation */}
        <Text style={styles.paragraph}>Dear {formData.landlordName},</Text>

        {/* Subject line */}
        <Text style={{ ...styles.paragraph, ...styles.highlight }}>
          RE: FORMAL NOTICE OF HOUSING CODE VIOLATION AND DEMAND FOR REPAIR{'\n'}
          Property: {formData.propertyAddress}{formData.unitNumber ? `, Unit ${formData.unitNumber}` : ''}
        </Text>

        {/* Opening */}
        <Text style={styles.paragraph}>{template.openingParagraph}</Text>

        {/* Violation description */}
        <Text style={styles.sectionTitle}>DESCRIPTION OF VIOLATION</Text>
        <Text style={styles.paragraph}>{template.violationDescription}</Text>
        {formData.issueDescription && (
          <Text style={styles.paragraph}>
            Specifically, the following conditions have been observed and experienced:{'\n\n'}
            {formData.issueDescription}
          </Text>
        )}
        <Text style={styles.paragraph}>
          This condition has been ongoing since approximately {formData.dateStarted || '[date not specified]'}.
          {formData.complainedVerbally
            ? ` I have previously raised this issue verbally${formData.verbalComplaintDate ? ` on ${formData.verbalComplaintDate}` : ''}; despite this communication, the problem remains unresolved.`
            : ''}
          {formData.hasPhotos
            ? ' I have documented this condition with photographs, which will be submitted as evidence in any formal proceeding.'
            : ''}
        </Text>

        {/* Legal basis */}
        <Text style={styles.sectionTitle}>LEGAL BASIS</Text>
        <Text style={styles.paragraph}>{template.legalBasis}</Text>
        <Text style={{ ...styles.paragraph, fontFamily: 'Times-Bold', fontSize: 10 }}>
          Applicable Legal Authority:
        </Text>
        {template.legalCitations.map((citation, idx) => (
          <Text key={idx} style={styles.citationItem}>
            • {citation.act}, {citation.section}:{'\n'}
              {citation.description}
          </Text>
        ))}

        {/* Demands */}
        <Text style={styles.sectionTitle}>DEMANDS</Text>
        <Text style={styles.paragraph}>
          I hereby formally demand that you take the following actions no later than{' '}
          <Text style={styles.highlight}>{letter.deadlineDate}</Text>{' '}
          ({template.deadlineDays} {template.deadlineDays === 1 ? 'day' : 'days'} from the date of this letter):
        </Text>
        {template.demands.map((demand, idx) => (
          <Text key={idx} style={styles.demandItem}>
            {idx + 1}. {demand}
          </Text>
        ))}

        {/* Escalation */}
        <Text style={styles.sectionTitle}>CONSEQUENCES OF NON-COMPLIANCE</Text>
        <Text style={styles.paragraph}>{template.escalationWarning}</Text>

        {/* Closing */}
        <Text style={styles.paragraph}>{template.closingStatement}</Text>

        {/* Signature */}
        <View style={styles.signatureSection}>
          <Text style={styles.paragraph}>Respectfully,</Text>
          <Text style={{ marginTop: 20, fontFamily: 'Times-Bold' }}>{formData.tenantName}</Text>
          <Text style={{ fontSize: 10, color: '#555' }}>
            Tenant, {formData.propertyAddress}{formData.unitNumber ? `, Unit ${formData.unitNumber}` : ''}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            This document was prepared with TenantShield (tenant-letter.com). TenantShield provides document preparation assistance and is not a law firm. This document does not constitute legal advice.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
