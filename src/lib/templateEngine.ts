import { WizardFormData, LetterTemplate, GeneratedLetter, Jurisdiction, IssueCategory } from '@/types';
import ontarioTemplates from '@/data/templates/ontario.json';
import quebecTemplates from '@/data/templates/quebec.json';
import californiaTemplates from '@/data/templates/california.json';
import bcTemplates from '@/data/templates/british-columbia.json';
import newYorkTemplates from '@/data/templates/new-york.json';
import placeholders from '@/data/templates/placeholders.json';

const ALL_TEMPLATES: LetterTemplate[] = [
  ...(ontarioTemplates as unknown as LetterTemplate[]),
  ...(quebecTemplates as unknown as LetterTemplate[]),
  ...(californiaTemplates as unknown as LetterTemplate[]),
  ...(bcTemplates as unknown as LetterTemplate[]),
  ...(newYorkTemplates as unknown as LetterTemplate[]),
];

const PLACEHOLDER_DATA = placeholders as Record<string, {
  regulatoryBody: string;
  regulatoryBodyUrl: string;
  act: string;
  housingCode: string;
  deadlineDaysStandard: number;
  deadlineDaysEmergency: number;
}>;

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function buildPlaceholderLetter(
  formData: WizardFormData,
  today: Date,
): GeneratedLetter {
  const jurisdiction = formData.jurisdiction as Jurisdiction;
  const issue = formData.issue as IssueCategory;
  const phData = PLACEHOLDER_DATA[jurisdiction];

  const isEmergency = ['no-heat', 'no-hot-water', 'broken-lock', 'electrical-hazard', 'no-running-water', 'fire-safety'].includes(issue);
  const deadlineDays = isEmergency ? phData.deadlineDaysEmergency : phData.deadlineDaysStandard;
  const deadlineDate = addDays(today, deadlineDays);

  const fakeTemplate: LetterTemplate = {
    jurisdiction,
    issue,
    deadlineDays,
    isEmergency,
    legalCitations: [
      {
        act: phData.act,
        section: 'Applicable sections',
        description: 'Landlord maintenance and habitability obligations.',
      },
    ],
    housingCode: phData.housingCode,
    regulatoryBody: phData.regulatoryBody,
    regulatoryBodyUrl: phData.regulatoryBodyUrl,
    openingParagraph: `I am writing to formally notify you of a serious habitability issue at the above-referenced rental unit, and to demand prompt remediation pursuant to ${phData.act}.`,
    violationDescription: `The rental unit is currently affected by a condition that impairs habitability and violates applicable housing maintenance standards.`,
    legalBasis: `Under ${phData.act}, you are legally required to maintain the rental premises in a habitable condition. The current deficiency constitutes a breach of these obligations.`,
    demands: [
      `Inspect and repair the issue within ${deadlineDays} ${deadlineDays === 1 ? 'day' : 'days'} of receipt of this letter`,
      `Provide written confirmation of all corrective actions taken`,
    ],
    escalationWarning: `If you fail to address this matter within the stated deadline, I will file a complaint with ${phData.regulatoryBody} and pursue all available legal remedies.`,
    closingStatement: `Please confirm receipt of this letter and advise of your intended course of action.`,
  };

  return buildLetter(formData, fakeTemplate, today, deadlineDate);
}

function buildLetter(
  formData: WizardFormData,
  template: LetterTemplate,
  today: Date,
  deadlineDate: Date,
): GeneratedLetter {
  const verbalParagraph = formData.complainedVerbally
    ? `\nPlease note that I have already raised this issue with you verbally${formData.verbalComplaintDate ? ` on ${formData.verbalComplaintDate}` : ''}. Despite this prior communication, the problem remains unresolved, necessitating this formal written notice.`
    : '';

  const photoParagraph = formData.hasPhotos
    ? `\nI have documented this condition with photographs, which are available and will be submitted as evidence in any formal proceeding.`
    : '';

  const demandsFormatted = template.demands
    .map((d, i) => `${i + 1}. ${d}`)
    .join('\n');

  const citationsFormatted = template.legalCitations
    .map((c) => `• ${c.act}, ${c.section}: ${c.description}`)
    .join('\n');

  const letterBody = `${formatDate(today)}

${formData.landlordName}
Re: ${formData.propertyAddress}${formData.unitNumber ? `, Unit ${formData.unitNumber}` : ''}

Dear ${formData.landlordName},

RE: FORMAL NOTICE OF HOUSING CODE VIOLATION AND DEMAND FOR REPAIR
Property: ${formData.propertyAddress}${formData.unitNumber ? `, Unit ${formData.unitNumber}` : ''}

${template.openingParagraph}

DESCRIPTION OF VIOLATION:

${template.violationDescription}

${formData.issueDescription ? `Specifically, the following conditions have been observed and experienced:\n\n${formData.issueDescription}` : ''}

This condition has been ongoing since approximately ${formData.dateStarted || '[date]'}.${verbalParagraph}${photoParagraph}

LEGAL BASIS:

${template.legalBasis}

Applicable legal authority includes:

${citationsFormatted}

DEMANDS:

I hereby formally demand that you take the following actions no later than ${formatDate(deadlineDate)} (${template.deadlineDays} ${template.deadlineDays === 1 ? 'day' : 'days'} from the date of this letter):

${demandsFormatted}

CONSEQUENCES OF NON-COMPLIANCE:

${template.escalationWarning}

${template.closingStatement}

Respectfully,

${formData.tenantName}
Tenant, ${formData.propertyAddress}${formData.unitNumber ? `, Unit ${formData.unitNumber}` : ''}`;

  return {
    jurisdiction: formData.jurisdiction as Jurisdiction,
    issue: formData.issue as IssueCategory,
    tenantName: formData.tenantName,
    landlordName: formData.landlordName,
    propertyAddress: formData.propertyAddress,
    unitNumber: formData.unitNumber,
    dateGenerated: formatDate(today),
    deadlineDate: formatDate(deadlineDate),
    letterBody,
    template,
    formData,
  };
}

export function generateLetter(formData: WizardFormData): GeneratedLetter {
  const today = new Date();

  const template = ALL_TEMPLATES.find(
    (t) => t.jurisdiction === formData.jurisdiction && t.issue === formData.issue
  );

  if (!template) {
    // Use placeholder for jurisdictions not yet fully templated
    return buildPlaceholderLetter(formData, today);
  }

  const deadlineDate = addDays(today, template.deadlineDays);
  return buildLetter(formData, template, today, deadlineDate);
}

export function getTemplate(jurisdiction: Jurisdiction, issue: IssueCategory): LetterTemplate | null {
  return ALL_TEMPLATES.find(
    (t) => t.jurisdiction === jurisdiction && t.issue === issue
  ) || null;
}
