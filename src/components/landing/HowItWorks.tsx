export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Select your location',
      description: 'Choose your province or state. Your letter will cite the exact laws and housing codes that apply to you.',
      icon: '📍',
    },
    {
      step: '02',
      title: 'Pick the issue',
      description: 'Select from 10 common violations — mold, no heat, pests, broken locks, electrical hazards, and more.',
      icon: '🔍',
    },
    {
      step: '03',
      title: 'Fill in your details',
      description: 'Enter your name, landlord name, address, and a brief description. Takes about 2 minutes.',
      icon: '✏️',
    },
    {
      step: '04',
      title: 'Download your letter',
      description: 'Get a professional PDF demand letter citing real law, with a firm deadline and escalation warning.',
      icon: '📄',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
            How TenantShield Works
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            No legal knowledge required. Just answer four questions and we handle the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => (
            <div key={s.step} className="relative">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+24px)] right-[-50%] h-0.5 bg-gray-200 z-0" />
              )}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-navy-50 border-2 border-navy-100 rounded-2xl flex items-center justify-center text-3xl mb-4">
                  {s.icon}
                </div>
                <span className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-1">{s.step}</span>
                <h3 className="font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sample letter callout */}
        <div className="mt-16 bg-navy-50 border border-navy-100 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-navy-400 mb-2">Sample excerpt</p>
              <h3 className="text-xl font-bold text-navy-900 mb-3">
                Your letter sounds like it came from a paralegal
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every letter cites the real legislation — not vague threats. Your landlord will know you mean business.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 font-mono text-xs text-gray-700 leading-relaxed shadow-sm">
              <p className="text-gray-400 mb-2">— Sample letter excerpt —</p>
              <p className="mb-2">
                <span className="font-bold">RE: FORMAL NOTICE OF HOUSING CODE VIOLATION</span>
              </p>
              <p className="mb-2 text-gray-600">
                Pursuant to <span className="text-navy-800 font-semibold">Section 20(1) of the Residential Tenancies Act, 2006, S.O. 2006, c. 17</span>, you are legally obligated to maintain the rental unit in a good state of repair and fit for habitation...
              </p>
              <p className="text-gray-400">
                ...failure to remediate within <span className="text-red-600 font-semibold">14 days</span> will result in an application to the <span className="text-navy-800 font-semibold">Landlord and Tenant Board (LTB)</span>...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
