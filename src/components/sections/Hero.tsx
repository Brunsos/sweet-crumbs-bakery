import Link from 'next/link';

interface HeroProps {
  content?: {
    heroTitle?: string;
    heroSubtitle?: string;
    heroBgImage?: {
      node?: {
        sourceUrl?: string;
        altText?: string;
      };
    };
  } | null;
}

const Hero = ({ content }: HeroProps) => {
  return (
    <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-6xl">
            {content?.heroTitle || "Sweet Crumbs"}
          </h1>
          <p className="mt-6 text-lg leading-8 text-amber-800 max-w-2xl mx-auto">
            {content?.heroSubtitle || "Freshly baked cookies made with love, using only the finest ingredients. Every bite is a moment of pure bliss."}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/menu"
              className="rounded-md bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 transition-colors"
            >
              View Our Menu
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold leading-6 text-amber-900 hover:text-amber-700 transition-colors"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mt-16 flow-root sm:mt-24">
          <div className="relative rounded-xl bg-amber-900/5 p-2 ring-1 ring-inset ring-amber-900/10 lg:rounded-2xl lg:p-4">
            <img
              src={content?.heroBgImage?.node?.sourceUrl || "/api/placeholder/800/400"}
              alt={content?.heroBgImage?.node?.altText || "Sweet Crumbs bakery"}
              className="w-full rounded-md shadow-2xl ring-1 ring-amber-900/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;