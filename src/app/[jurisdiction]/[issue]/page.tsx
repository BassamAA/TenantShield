import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import WizardContainer from '@/components/wizard/WizardContainer';
import { JURISDICTIONS, JURISDICTION_LABELS } from '@/data/jurisdictions';
import { ISSUES, ISSUE_LABELS, ISSUE_URL_MAP } from '@/data/issues';
import { Jurisdiction, IssueCategory } from '@/types';

// Map URL slugs to internal IDs
const JURISDICTION_URL_MAP: Record<string, Jurisdiction> = Object.fromEntries(
  JURISDICTIONS.map((j) => [j.id, j.id])
);

const ISSUE_REVERSE_MAP: Record<string, IssueCategory> = Object.fromEntries(
  Object.entries(ISSUE_URL_MAP).map(([id, slug]) => [slug, id as IssueCategory])
);

interface PageProps {
  params: Promise<{ jurisdiction: string; issue: string }>;
}

function resolveParams(raw: { jurisdiction: string; issue: string }): {
  jurisdiction: Jurisdiction | null;
  issue: IssueCategory | null;
} {
  const jurisdiction = JURISDICTION_URL_MAP[raw.jurisdiction] || null;
  const issue = ISSUE_REVERSE_MAP[raw.issue] || (ISSUE_URL_MAP[raw.issue] ? raw.issue as IssueCategory : null);
  return { jurisdiction, issue };
}

const SEO_COPY: Record<IssueCategory, { headline: string; description: string; keyword: string }> = {
  'mold-moisture': {
    headline: 'Mold in Your Rental? Force Your Landlord to Fix It.',
    description: 'Mold and moisture in a rental unit is a serious health hazard — and your landlord is legally required to fix it. Generate a formal demand letter citing the exact law in your jurisdiction.',
    keyword: 'mold landlord complaint letter',
  },
  'no-heat': {
    headline: 'No Heat in Your Apartment? Your Landlord Must Restore It Immediately.',
    description: 'No heat in a rental unit is a legal emergency. Your landlord has a statutory obligation to restore heat within 24 hours. Generate your formal demand letter now.',
    keyword: 'no heat landlord complaint letter',
  },
  'no-hot-water': {
    headline: 'No Hot Water? Send a Formal Demand Letter to Your Landlord.',
    description: 'Hot water is a vital service that your landlord is legally required to provide. Generate a legally-worded demand letter citing your tenant rights.',
    keyword: 'no hot water landlord complaint letter',
  },
  'pest-infestation': {
    headline: 'Cockroaches, Mice, or Bedbugs? Your Landlord Must Exterminate.',
    description: 'Pest infestations violate housing maintenance standards. Your landlord is legally required to pay for professional extermination. Generate your demand letter today.',
    keyword: 'pest infestation landlord complaint letter',
  },
  'broken-lock': {
    headline: 'Broken Lock? Your Landlord Must Fix It — It\'s a Safety Emergency.',
    description: 'A broken lock on your rental unit is a security emergency. Your landlord is legally required to repair it immediately. Generate your formal demand letter.',
    keyword: 'broken lock landlord complaint letter',
  },
  'plumbing-failure': {
    headline: 'Plumbing Problems in Your Rental? Your Landlord Must Repair Them.',
    description: 'Plumbing failures in rental units violate your landlord\'s duty to maintain habitable premises. Generate a professional demand letter citing the applicable housing code.',
    keyword: 'plumbing failure landlord complaint letter',
  },
  'electrical-hazard': {
    headline: 'Electrical Hazard in Your Rental? This Is a Legal Emergency.',
    description: 'Faulty electrical wiring or fixtures in a rental unit is a serious fire and safety hazard. Your landlord must act immediately. Generate your emergency demand letter.',
    keyword: 'electrical hazard landlord complaint letter',
  },
  'no-running-water': {
    headline: 'No Running Water? Your Landlord Must Restore It Within 24 Hours.',
    description: 'Running water is a vital service that your landlord cannot legally withhold. Generate a formal emergency demand letter citing your tenant rights.',
    keyword: 'no running water landlord complaint letter',
  },
  'fire-safety': {
    headline: 'Broken Smoke Detector or Blocked Fire Exit? Force Your Landlord to Fix It.',
    description: 'Fire safety violations in rental units are serious and illegal. Missing smoke detectors and blocked exits put lives at risk. Generate your demand letter now.',
    keyword: 'fire safety landlord complaint letter',
  },
  'structural-damage': {
    headline: 'Structural Damage in Your Rental? Your Landlord Must Repair It.',
    description: 'Structural damage to a rental unit is a habitability violation. Your landlord is legally obligated to assess and repair all structural issues. Generate your demand letter.',
    keyword: 'structural damage landlord complaint letter',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const raw = await params;
  const { jurisdiction, issue } = resolveParams(raw);

  if (!jurisdiction || !issue) {
    return { title: 'Not Found | TenantShield' };
  }

  const jurisdictionName = JURISDICTION_LABELS[jurisdiction];
  const issueName = ISSUE_LABELS[issue];
  const seoCopy = SEO_COPY[issue];

  return {
    title: `${issueName} Demand Letter — ${jurisdictionName} Tenant Rights | TenantShield`,
    description: `${seoCopy.description} — ${jurisdictionName} specific laws and housing codes.`,
    openGraph: {
      title: `${issueName} Complaint Letter — ${jurisdictionName}`,
      description: seoCopy.description,
      type: 'website',
    },
    alternates: {
      canonical: `/${raw.jurisdiction}/${raw.issue}`,
    },
  };
}

export function generateStaticParams() {
  const params: { jurisdiction: string; issue: string }[] = [];
  for (const j of JURISDICTIONS) {
    for (const issueSlug of Object.values(ISSUE_URL_MAP)) {
      params.push({ jurisdiction: j.id, issue: issueSlug });
    }
  }
  return params;
}

export default async function JurisdictionIssuePage({ params }: PageProps) {
  const raw = await params;
  const { jurisdiction, issue } = resolveParams(raw);

  if (!jurisdiction || !issue) {
    notFound();
  }

  const jurisdictionName = JURISDICTION_LABELS[jurisdiction];
  const issueName = ISSUE_LABELS[issue];
  const seoCopy = SEO_COPY[issue];
  const issueInfo = ISSUES.find((i) => i.id === issue)!;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* SEO Hero Banner */}
      <div className="bg-navy-900 py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-xs text-gray-500 mb-4 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-400">{jurisdictionName}</span>
            <span>/</span>
            <span className="text-gray-300">{issueName}</span>
          </nav>
          <h1 className="text-white font-extrabold text-2xl sm:text-4xl leading-tight mb-3">
            {seoCopy.headline}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-4">
            {seoCopy.description}
          </p>
          <p className="text-gray-400 text-sm">
            Jurisdiction: <span className="text-white font-semibold">{jurisdictionName}</span>
            {issueInfo.isEmergency && (
              <span className="ml-3 inline-block bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                EMERGENCY — 24h deadline
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Wizard pre-filled */}
      <WizardContainer
        preselectedJurisdiction={jurisdiction}
        preselectedIssue={issue}
      />

      {/* SEO content section */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-navy-900 mb-4">
            {issueName} — Tenant Rights in {jurisdictionName}
          </h2>
          <div className="prose prose-sm text-gray-600 max-w-none">
            <p>
              If you are experiencing <strong>{issueName.toLowerCase()}</strong> in your rental unit in{' '}
              <strong>{jurisdictionName}</strong>, you have legal rights. Your landlord has a statutory obligation to
              maintain your rental unit in a habitable condition, and failing to address{' '}
              {issueName.toLowerCase()} issues violates applicable housing maintenance standards.
            </p>
            <p className="mt-3">
              TenantShield generates a professionally worded demand letter that cites the specific tenant
              protection laws applicable in {jurisdictionName}. The letter establishes a formal legal record,
              sets a clear deadline for repair, and includes escalation language referencing the appropriate
              housing authority in your jurisdiction.
            </p>
            <p className="mt-3">
              {issueInfo.isEmergency
                ? `${issueName} is classified as an emergency issue, requiring your landlord to respond within 24 hours under ${jurisdictionName} law.`
                : `${issueName} requires resolution within 14 days under ${jurisdictionName} housing standards.`}{' '}
              Your letter will specify the exact deadline.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
