import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-navy-900 via-navy-800 to-navy-700 text-white py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-8">
          <span className="w-2 h-2 bg-trust-green rounded-full animate-pulse"/>
          <span className="text-gray-300">Used by tenants in Ontario, Quebec, California &amp; more</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
          Force Your Landlord<br />
          to Fix It —{' '}
          <span className="text-trust-green">Legally.</span>
        </h1>

        <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
          Generate a legally-worded demand letter citing your actual tenant rights laws. Ready in 3 minutes. Looks like it was written by a paralegal.
        </p>

        <p className="text-sm text-gray-400 mb-10">
          Mold. No heat. Pests. Broken locks. Electrical hazards. We cover them all.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/wizard"
            className="bg-trust-green hover:bg-green-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
          >
            Generate My Letter — Free Preview
          </Link>
          <p className="text-sm text-gray-400">
            No account required · Preview before you pay
          </p>
        </div>

        {/* Social proof strip */}
        <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl mx-auto border-t border-white/10 pt-10">
          <div>
            <p className="text-3xl font-bold text-white">10+</p>
            <p className="text-xs text-gray-400 mt-1">Jurisdictions covered</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">100+</p>
            <p className="text-xs text-gray-400 mt-1">Legal citations included</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">3 min</p>
            <p className="text-xs text-gray-400 mt-1">Average completion time</p>
          </div>
        </div>
      </div>
    </section>
  );
}
