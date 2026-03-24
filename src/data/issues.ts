import { IssueInfo } from '@/types';

export const ISSUES: IssueInfo[] = [
  { id: 'mold-moisture', label: 'Mold / Moisture', icon: '🔬', isEmergency: false },
  { id: 'no-heat', label: 'No Heat', icon: '🌡️', isEmergency: true },
  { id: 'no-hot-water', label: 'No Hot Water', icon: '🚿', isEmergency: true },
  { id: 'pest-infestation', label: 'Pest Infestation (Roaches / Mice / Rats / Bedbugs)', icon: '🐛', isEmergency: false },
  { id: 'broken-lock', label: 'Broken Lock / Security Issue', icon: '🔓', isEmergency: true },
  { id: 'plumbing-failure', label: 'Plumbing Failure', icon: '🔧', isEmergency: false },
  { id: 'electrical-hazard', label: 'Electrical Hazard', icon: '⚡', isEmergency: true },
  { id: 'no-running-water', label: 'No Running Water', icon: '💧', isEmergency: true },
  { id: 'fire-safety', label: 'Fire Safety Violation (Smoke Detectors / Fire Exits)', icon: '🔥', isEmergency: true },
  { id: 'structural-damage', label: 'Structural Damage', icon: '🏚️', isEmergency: false },
];

export const ISSUE_LABELS: Record<string, string> = Object.fromEntries(
  ISSUES.map((i) => [i.id, i.label])
);

export const ISSUE_URL_MAP: Record<string, string> = {
  'mold-moisture': 'mold',
  'no-heat': 'no-heat',
  'no-hot-water': 'no-hot-water',
  'pest-infestation': 'pest-infestation',
  'broken-lock': 'broken-lock',
  'plumbing-failure': 'plumbing',
  'electrical-hazard': 'electrical-hazard',
  'no-running-water': 'no-running-water',
  'fire-safety': 'fire-safety',
  'structural-damage': 'structural-damage',
};
