export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  readingTimeMinutes: number;
  excerpt: string;
  sections: { heading: string; body: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'demand-letter-landlord-template',
    title: 'How to Write a Demand Letter to Your Landlord (With Template)',
    metaTitle: 'How to Write a Demand Letter to Your Landlord | Free Template Guide',
    metaDescription:
      'A demand letter to your landlord is the most powerful tool a tenant has. Learn exactly what to include, what language to use, and how to make it legally effective.',
    publishedAt: '2025-01-15',
    readingTimeMinutes: 7,
    excerpt:
      'A demand letter is often the single most effective action a tenant can take. It creates a legal record, signals seriousness, and is frequently the required first step before filing with a housing tribunal.',
    sections: [
      {
        heading: 'What Is a Demand Letter to a Landlord?',
        body: `A demand letter to your landlord is a formal written notice that identifies a specific problem with your rental unit, cites the legal obligation your landlord has to fix it, sets a clear deadline for repair, and states what you will do if they fail to comply.

Unlike a text message or verbal complaint, a formal demand letter creates a legal paper trail. Housing tribunals and courts in virtually every North American jurisdiction expect tenants to have provided written notice before they will entertain a complaint. A well-written letter signals that you are an informed tenant who is prepared to escalate — and many landlords will act immediately upon receiving one.`,
      },
      {
        heading: 'What Must a Demand Letter Include?',
        body: `An effective demand letter has five essential components:

1. **Your full name and the rental unit address** — establishes exactly who is writing and about which property.

2. **A clear description of the problem** — specific details: what the issue is, when it started, how it affects your use of the unit. Vague descriptions ("the apartment is in bad shape") are easy to dismiss. Specific ones ("black mold visible on the north bathroom wall since approximately October 12, 2024") are not.

3. **The specific law that requires the landlord to fix it** — this is what separates a demand letter from an informal complaint. In Ontario, cite Section 20(1) of the Residential Tenancies Act, 2006. In California, cite Civil Code § 1941. Including the actual statute name and section number signals that you know your rights.

4. **A specific deadline** — "as soon as possible" is unenforceable. "within 14 days of the date of this letter" is. Emergency issues (no heat, no water, broken locks) warrant 24-hour deadlines.

5. **A clear statement of consequences** — name the regulatory body where you will file a complaint if the landlord does not comply. In Ontario, that is the Landlord and Tenant Board (LTB). In Quebec, the Tribunal administratif du logement (TAL). In California, local Code Enforcement or the Department of Consumer Affairs.`,
      },
      {
        heading: 'How to Send the Letter',
        body: `Send your demand letter in a way that creates proof of delivery:

- **Email with read receipt** — creates a timestamp and delivery confirmation.
- **Certified mail** — creates a signed postal receipt. Some jurisdictions require this for formal notice to be legally valid.
- **Both** — the belt-and-suspenders approach. Email for speed, certified mail for legal completeness.

Keep a copy of everything you send. If the issue goes to tribunal, your paper trail is your evidence.`,
      },
      {
        heading: 'What Happens After You Send the Letter?',
        body: `Most landlords respond to a formal demand letter — if only to avoid being named in a tribunal application. If your landlord repairs the issue by the deadline, document that the repair was made (photographs, date, written confirmation if possible).

If your landlord ignores the letter, you have established the paper trail needed to file a complaint. In Ontario, that means an Application to the Landlord and Tenant Board (Form T6 for maintenance issues). In California, you can file a complaint with your city or county Code Enforcement, or initiate a rent withholding claim under Civil Code § 1942. In Quebec, you file with the TAL.

The letter does not guarantee a specific outcome — but it is almost always necessary to achieve one.`,
      },
      {
        heading: 'Why Not Just Write the Letter Yourself?',
        body: `You can — and you should keep it simple and factual. The difficulty is knowing which specific statute applies in your jurisdiction, what deadlines are legally appropriate for your issue type, and what language to use that courts and tribunals recognize as formal notice.

TenantShield generates demand letters with the correct statute citations, deadline language, and regulatory body references for your jurisdiction and issue automatically. The result is a letter that looks and reads like it was prepared by a paralegal — because the legal text is modeled on the language used in actual tenant advocacy.`,
      },
    ],
  },
  {
    slug: 'landlord-ignores-complaints',
    title: 'Landlord Ignoring Your Complaints? Here\'s Exactly What to Do',
    metaTitle: 'Landlord Ignoring Repair Requests? What Tenants Can Do Legally',
    metaDescription:
      'If your landlord is ignoring your repair requests or complaints, you have legal options. Here is a step-by-step guide to escalating from verbal complaint to formal legal action.',
    publishedAt: '2025-01-22',
    readingTimeMinutes: 6,
    excerpt:
      'When your landlord ignores you, most tenants feel stuck. But ignoring a formal complaint actually strengthens your legal position. Here is the escalation path from text message to tribunal.',
    sections: [
      {
        heading: 'Why Landlords Ignore Repair Requests',
        body: `Landlords ignore repair requests for several reasons: they are hoping the problem resolves itself, they are testing whether you will follow up, or they are banking on the fact that most tenants never escalate. The last assumption is usually correct — and it is exactly why escalating with a formal written demand letter is so effective.

The moment a tenant sends a formal written notice citing specific legislation, the dynamic changes. The landlord now has written proof that they were notified, which means that any subsequent housing authority investigation will include that letter as evidence that they chose not to act.`,
      },
      {
        heading: 'Step 1: Document Everything',
        body: `Before you send anything, document the problem thoroughly:

- **Photographs or video** with timestamps showing the issue (mold, broken lock, no heat, etc.)
- **A written record** of every verbal complaint you made: date, what you said, what the landlord said
- **Any texts or emails** you have already exchanged about the issue

This documentation becomes your evidence if the matter goes to a housing tribunal. The more specific and dated your records, the stronger your case.`,
      },
      {
        heading: 'Step 2: Send a Formal Written Demand Letter',
        body: `A verbal complaint or a text message does not create the legal paper trail required by most housing authorities before they will accept a complaint. A formal demand letter does.

Your letter should cite the specific statute that obligates your landlord to make the repair (e.g., Section 20 of Ontario's Residential Tenancies Act, or California Civil Code § 1941), set a specific deadline (24 hours for emergencies, 14 days for non-emergency maintenance), and state clearly that you will escalate to the relevant housing authority if they fail to comply.

Send it by email with a read receipt and/or certified mail so you have proof of delivery.`,
      },
      {
        heading: 'Step 3: File a Complaint with Your Housing Authority',
        body: `If the landlord misses your deadline, your next step depends on your jurisdiction:

**Ontario:** File an Application to the LTB (Form T6 — Maintenance). Filing fee is approximately $53. Hearings are typically scheduled within 6–12 weeks.

**Quebec:** File a complaint with the Tribunal administratif du logement (TAL). The TAL can order repairs and rent reductions.

**California:** Contact your city or county Code Enforcement office. A code inspector will visit the property. If violations are found, the landlord faces fines and a compliance order. You may also be able to withhold rent under Civil Code § 1942 after proper notice.

**New York:** File a complaint with the NYC Department of Housing Preservation and Development (HPD), or with the State Division of Housing and Community Renewal (DHCR) for regulated units.

**Texas:** Contact your local code enforcement or file a Justice Court claim for breach of the warranty of habitability.`,
      },
      {
        heading: 'What About Rent Withholding?',
        body: `Rent withholding is a legal remedy in some jurisdictions, but it is high-risk if done incorrectly. In California, you may be able to "repair and deduct" — make the repair yourself and deduct the cost from rent — but the requirements are strict. In Ontario, the LTB does not permit tenants to simply stop paying rent; you must apply for a rent abatement through the Board.

Do not withhold rent without understanding the specific rules in your jurisdiction. The safest path is to pay rent, send your demand letter, and let the housing authority compel the repair.`,
      },
      {
        heading: 'Can Your Landlord Evict You for Complaining?',
        body: `Retaliatory eviction is illegal in virtually every jurisdiction covered by TenantShield. Ontario's Residential Tenancies Act explicitly prohibits evictions filed in response to a tenant asserting their rights. California Civil Code § 1942.5 does the same.

If your landlord serves an eviction notice within 180 days of a repair complaint or housing authority inspection, there is a legal presumption of retaliation in California. Document any eviction notice carefully and consider contacting a legal aid clinic immediately.`,
      },
    ],
  },
  {
    slug: 'ontario-tenant-rights-repairs',
    title: 'Ontario Tenant Rights: What Your Landlord Is Legally Required to Fix',
    metaTitle: 'Ontario Tenant Rights: Landlord Repair Obligations Under the RTA',
    metaDescription:
      'Under the Ontario Residential Tenancies Act, your landlord must maintain your unit in a good state of repair. Learn exactly what they are required to fix — and what happens if they refuse.',
    publishedAt: '2025-02-01',
    readingTimeMinutes: 8,
    excerpt:
      'Ontario tenants have strong legal protections under the Residential Tenancies Act, 2006. Your landlord is legally required to maintain your unit — and the LTB has real enforcement powers.',
    sections: [
      {
        heading: 'The Legal Foundation: Section 20 of the RTA',
        body: `Section 20(1) of the Residential Tenancies Act, 2006 (RTA) states that a landlord is responsible for providing and maintaining a residential complex, including the rental units in it, in a good state of repair and fit for habitation and for complying with health, safety, housing, and maintenance standards.

This obligation exists regardless of whether it is written into your lease. The RTA is a minimum standard — lease clauses that purport to give the landlord less responsibility are void.

Section 20(2) extends this to properties a landlord knew were in disrepair at the time the tenancy agreement was entered into. You cannot waive your right to a habitable unit.`,
      },
      {
        heading: 'What Must Your Ontario Landlord Fix?',
        body: `The landlord's maintenance obligation covers a wide range of issues:

**Structural and building systems:** Roof, walls, floors, windows, doors, foundation, plumbing, electrical systems, and heating systems must all be maintained in good repair.

**Heat:** Under Ontario Regulation 516/06, the minimum indoor temperature from September 1 to June 15 must be at least 20°C (68°F). Failure to provide adequate heat is an emergency violation.

**Water:** Both hot and cold running water must be continuously provided. The landlord cannot shut off water without at least 24 hours written notice except in emergencies.

**Pest control:** Landlords are responsible for pest extermination under both the RTA and municipal property standards bylaws. This includes cockroaches, mice, rats, and bedbugs.

**Mold and moisture:** Mold is a maintenance and habitability issue covered by Section 20. The presence of visible mold, particularly from a water leak or moisture issue that the landlord has failed to address, is a violation.`,
      },
      {
        heading: 'What Are "Vital Services" Under the RTA?',
        body: `Section 21 of the RTA deals specifically with vital services — defined as heat, electricity, gas, hot and cold water, and fuel. A landlord cannot withhold or reduce vital services intentionally, even for non-payment of rent.

If a landlord deliberately cuts vital services, you can apply immediately to the LTB for an emergency order (Form T2 — Tenant Rights) to have them restored. This is one of the few situations where the LTB can act on an urgent basis.`,
      },
      {
        heading: 'How to File a Maintenance Complaint with the LTB',
        body: `Before filing with the Landlord and Tenant Board, you are expected to have given your landlord written notice of the issue and a reasonable time to repair it. This is why your demand letter is so important — it establishes that you gave proper notice.

Once the deadline has passed without repair, you can file Form T6 (Tenant Application about Maintenance) with the LTB. The current filing fee is approximately $53. Hearings are typically scheduled several weeks to a few months out.

In addition to ordering the landlord to make the repair, the LTB can award a rent abatement — a reduction of past or future rent reflecting the diminished value of the rental unit during the period the issue went unaddressed. Abatements of 10–25% of monthly rent are common for significant issues.`,
      },
      {
        heading: 'What About Municipal Property Standards?',
        body: `In addition to the LTB, most Ontario municipalities have Property Standards bylaws that overlap with the RTA. Filing a complaint with your municipality's Property Standards department triggers a bylaw officer inspection. If violations are found, the officer can issue a work order requiring the landlord to make repairs within a specified timeframe — and fines for non-compliance.

This can be a faster path to getting repairs done than the LTB process, especially for visible issues like broken locks, pest infestations, or mold. Filing with both the municipality and the LTB simultaneously is a legitimate strategy.`,
      },
    ],
  },
  {
    slug: 'mold-in-rental-landlord-responsible',
    title: 'Mold in Your Rental: Is Your Landlord Legally Responsible?',
    metaTitle: 'Mold in Rental Unit: Is the Landlord Legally Required to Fix It?',
    metaDescription:
      'Mold in a rental unit is more than a nuisance — it is a health hazard and a housing code violation. Learn when your landlord is legally responsible and how to force them to remediate.',
    publishedAt: '2025-02-10',
    readingTimeMinutes: 7,
    excerpt:
      'Black mold, bathroom mold, and moisture damage are among the most common tenant complaints. In nearly every jurisdiction, the landlord is legally responsible for mold caused by structural or maintenance failures.',
    sections: [
      {
        heading: 'When Is the Landlord Responsible for Mold?',
        body: `Landlord responsibility for mold turns on causation: how did the mold get there?

**The landlord is responsible when mold results from:**
- A roof leak, plumbing leak, or water infiltration they failed to repair
- Inadequate ventilation built into the unit (chronic bathroom condensation with no fan or window)
- A prior moisture issue they knew about and did not disclose or fix before your tenancy
- Foundation dampness or structural moisture problems

**The landlord may argue the tenant is responsible when:**
- Mold results from the tenant's own behaviour (not running the bathroom exhaust fan, drying laundry indoors in excess, blocking ventilation)
- The tenant caused water damage through negligence

In practice, most residential mold is caused by structural or maintenance deficiencies — and housing tribunals in Ontario, Quebec, and California generally place the burden on the landlord to demonstrate that they were not at fault, not on the tenant.`,
      },
      {
        heading: 'The Health Consequences of Mold',
        body: `Mold exposure is not merely cosmetic. The health effects depend on the mold type and exposure duration, but common consequences include:

- Respiratory irritation and coughing
- Asthma exacerbation and new onset
- Allergic reactions: sneezing, runny nose, eye irritation
- In high concentrations, toxic mold (Stachybotrys — "black mold") can cause more serious neurological and respiratory effects, particularly in children, the elderly, and immunocompromised individuals

Many jurisdictions classify extensive mold as an immediate habitability violation precisely because of these documented health risks.`,
      },
      {
        heading: 'What Does the Law Say About Mold?',
        body: `**Ontario:** Section 20 of the Residential Tenancies Act requires landlords to maintain units fit for habitation. Ontario Regulation 517/06 (the Property Standards regulation) explicitly includes the prohibition on conditions that constitute a health hazard. Mold from a maintenance failure is a health hazard.

**California:** Health and Safety Code § 17920.3 lists "dampness, or visible mold growth" as a condition that renders a rental unit substandard. Civil Code § 1941 requires landlords to maintain habitable conditions. A unit with significant mold growth fails the habitability standard.

**Quebec:** The Civil Code of Québec (Art. 1854) requires a landlord to deliver and maintain the dwelling in a good state of repair and fit for habitation. Toxic or extensive mold growth fails this standard.`,
      },
      {
        heading: 'How to Document Mold for a Legal Complaint',
        body: `Documentation is everything. Before sending your demand letter:

1. **Photograph the mold** from multiple angles with clear timestamps. Capture the location, spread, and any visible water damage nearby.
2. **Note when you first observed it** and when it appeared or worsened.
3. **Record any verbal complaints** you made to the landlord and their response.
4. **If you have health symptoms**, note them and whether they correlate with time spent in the unit.

If the mold is extensive, consider requesting a mold inspection from a certified indoor air quality professional. A written report from an inspector is compelling evidence in any tribunal proceeding.`,
      },
      {
        heading: 'Sending a Demand Letter for Mold Remediation',
        body: `Your mold demand letter should:
- Describe the location, extent, and nature of the mold
- State when you first observed it and any prior verbal complaints
- Cite the specific statute applicable in your jurisdiction
- Demand remediation (not just painting over) within 14 days
- State that failure to remediate will result in a complaint to the relevant housing authority

Paint and bleach do not constitute remediation. Proper mold remediation involves identifying the moisture source, fixing it, removing and replacing affected materials, and in significant cases, professional abatement. Your letter should make clear that you are demanding root-cause remediation, not cosmetic treatment.`,
      },
    ],
  },
  {
    slug: 'california-tenant-rights-habitability',
    title: 'California Tenant Rights: Habitability Laws Every Renter Must Know',
    metaTitle: 'California Tenant Rights 2025: Habitability, Repairs & Rent Withholding',
    metaDescription:
      'California has some of the strongest tenant protection laws in the US. Learn what habitability conditions your landlord must maintain, what to do when they fail, and how to protect yourself.',
    publishedAt: '2025-02-18',
    readingTimeMinutes: 9,
    excerpt:
      "California's implied warranty of habitability gives tenants powerful legal tools. Here is a plain-English breakdown of what your landlord must provide, what violates the law, and what remedies you have.",
    sections: [
      {
        heading: 'The Implied Warranty of Habitability in California',
        body: `California Civil Code § 1941 establishes that a landlord must provide and maintain a rental unit in a condition fit for human occupation — this is the implied warranty of habitability. It exists automatically in every residential lease; you cannot waive it.

Civil Code § 1941.1 specifies the conditions that must be present for a rental unit to be considered habitable. A unit that lacks any of these is legally uninhabitable, and a landlord who fails to maintain them after proper notice is in breach.`,
      },
      {
        heading: 'What California Law Requires Your Landlord to Provide',
        body: `Under § 1941.1, every California rental unit must have:

1. **Effective waterproofing and weather protection** — roof, walls, doors, windows
2. **Plumbing facilities in good working order**, including hot and cold running water
3. **A functioning gas facility** (if applicable) in good working order
4. **Heating facilities** capable of maintaining 70°F (21°C) in all rooms
5. **An electrical system** in good working order
6. **Clean and sanitary grounds** and building areas
7. **Adequate garbage and rubbish receptacles**
8. **Floors, stairways, and railings** in good repair
9. **Locks** on exterior doors and windows accessible from outside

Health and Safety Code § 17920.3 adds that units are substandard if they contain dampness or visible mold, inadequate natural light, inadequate ventilation, or lead paint in a deteriorated condition.`,
      },
      {
        heading: 'The "Repair and Deduct" Remedy',
        body: `California Civil Code § 1942 gives tenants a powerful remedy when a landlord fails to make repairs after proper notice: the right to repair and deduct.

If your landlord does not repair a habitability defect within a reasonable time (typically interpreted as 30 days, but immediately for emergencies) after you have given written notice, you may:
1. Hire a qualified contractor to make the repair
2. Deduct the cost from your next rent payment

Limitations: you may only use this remedy twice in any 12-month period, and the deduction cannot exceed one month's rent. This remedy is best suited for moderate repairs — it is not appropriate for major structural work.

**Critical:** you must have given written notice first and waited a reasonable time. Repair-and-deduct without written prior notice gives the landlord grounds to dispute the deduction and potentially pursue you for unpaid rent.`,
      },
      {
        heading: 'Rent Withholding in California',
        body: `California does not have an explicit statutory right to withhold all rent for habitability violations in the way some other states do. However, under common law and various court decisions, courts have recognized that a landlord's breach of the warranty of habitability may partially excuse the tenant's rent obligation.

This is a high-risk strategy that can result in eviction proceedings even if you are ultimately right on the merits. It should not be pursued without legal advice. The safer paths are:

- **Repair and deduct** (as above)
- **File a complaint with local Code Enforcement** — an inspector will visit and can issue a compliance order
- **Sue in Small Claims Court** for rent overpaid during the uninhabitable period
- **File a habitability complaint with the Department of Consumer Affairs** in some cities`,
      },
      {
        heading: 'Anti-Retaliation Protections',
        body: `California Civil Code § 1942.5 provides strong anti-retaliation protections. If your landlord retaliates against you for asserting your habitability rights — by raising rent, reducing services, or serving an eviction notice — within 180 days of a habitability complaint or housing inspection, there is a legal presumption of retaliation.

Prohibited retaliation includes: serving a notice to quit, threatening eviction, reducing services, or making any other adverse action in response to a legitimate tenant complaint. Tenants who prove retaliation may recover actual damages, punitive damages, and attorney's fees.`,
      },
      {
        heading: 'How to Send a Habitability Demand Letter in California',
        body: `A California habitability demand letter should cite § 1941 and the specific habitability condition required by § 1941.1 that is not being met. It should describe the defect specifically, request repair within a specified timeframe (24 hours for emergencies, 30 days for non-emergency issues), and state that you will contact Code Enforcement and exercise your repair-and-deduct rights if the landlord does not comply.

Send by email (for timestamp) and certified mail (for legal completeness). Keep all receipts and correspondence.`,
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
