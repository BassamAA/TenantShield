export type Jurisdiction =
  | 'ontario'
  | 'quebec'
  | 'british-columbia'
  | 'alberta'
  | 'new-york'
  | 'california'
  | 'texas'
  | 'florida'
  | 'illinois';

export type IssueCategory =
  | 'mold-moisture'
  | 'no-heat'
  | 'no-hot-water'
  | 'pest-infestation'
  | 'broken-lock'
  | 'plumbing-failure'
  | 'electrical-hazard'
  | 'no-running-water'
  | 'fire-safety'
  | 'structural-damage';

export interface WizardFormData {
  jurisdiction: Jurisdiction | '';
  issue: IssueCategory | '';
  tenantName: string;
  landlordName: string;
  propertyAddress: string;
  unitNumber: string;
  dateStarted: string;
  issueDescription: string;
  complainedVerbally: boolean;
  verbalComplaintDate: string;
  hasPhotos: boolean;
}

export interface JurisdictionInfo {
  id: Jurisdiction;
  name: string;
  country: 'CA' | 'US';
  flag: string;
}

export interface IssueInfo {
  id: IssueCategory;
  label: string;
  icon: string;
  isEmergency: boolean;
}

export interface LegalCitation {
  act: string;
  section: string;
  description: string;
}

export interface LetterTemplate {
  jurisdiction: Jurisdiction;
  issue: IssueCategory;
  deadlineDays: number;
  isEmergency: boolean;
  legalCitations: LegalCitation[];
  housingCode: string;
  regulatoryBody: string;
  regulatoryBodyUrl?: string;
  openingParagraph: string;
  violationDescription: string;
  legalBasis: string;
  demands: string[];
  escalationWarning: string;
  closingStatement: string;
}

export interface GeneratedLetter {
  jurisdiction: Jurisdiction;
  issue: IssueCategory;
  tenantName: string;
  landlordName: string;
  propertyAddress: string;
  unitNumber: string;
  dateGenerated: string;
  deadlineDate: string;
  letterBody: string;
  template: LetterTemplate;
  formData: WizardFormData;
}
