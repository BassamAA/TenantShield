import { JurisdictionInfo } from '@/types';

export const JURISDICTIONS: JurisdictionInfo[] = [
  { id: 'ontario', name: 'Ontario', country: 'CA', flag: '🇨🇦' },
  { id: 'quebec', name: 'Quebec', country: 'CA', flag: '🇨🇦' },
  { id: 'british-columbia', name: 'British Columbia', country: 'CA', flag: '🇨🇦' },
  { id: 'alberta', name: 'Alberta', country: 'CA', flag: '🇨🇦' },
  { id: 'new-york', name: 'New York', country: 'US', flag: '🇺🇸' },
  { id: 'california', name: 'California', country: 'US', flag: '🇺🇸' },
  { id: 'texas', name: 'Texas', country: 'US', flag: '🇺🇸' },
  { id: 'florida', name: 'Florida', country: 'US', flag: '🇺🇸' },
  { id: 'illinois', name: 'Illinois', country: 'US', flag: '🇺🇸' },
];

export const JURISDICTION_LABELS: Record<string, string> = Object.fromEntries(
  JURISDICTIONS.map((j) => [j.id, j.name])
);
